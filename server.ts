import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini client if API key is present
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  }

  // API Route: Cultural AI Assistant / Multilingual Query
  app.post('/api/ask-heritage', async (req, res) => {
    try {
      const { question, language = 'en', stateContext } = req.body;
      if (!question) {
        return res.status(400).json({ error: 'Question is required' });
      }

      if (!ai) {
        // Fallback intelligent response when API key is not configured in environment
        return res.json({
          answer: `[Heritage Knowledge Base] Exploring Indian cultural heritage: "${question}". For detailed official historical records, architecture, and visitor guidance, please explore the dedicated state profiles and verified destination records in Heritage Hub of India.`,
          source: 'Built-in Indian Cultural Encyclopedia',
          language,
        });
      }

      const prompt = `You are the chief cultural historian and tourism guide for "Heritage Hub of India", a verified digital encyclopedia of Indian history, monuments, cuisines, art forms, and diversity.
User Question: "${question}"
Requested Language: ${language} (if not English, provide the primary response in this Indian language, accompanied by English translation if helpful)
Context: ${stateContext ? `State context: ${stateContext}` : 'All-India Heritage Context'}

Provide an authoritative, culturally respectful, factually accurate response with:
1. Historical context and regional significance
2. Key monuments, temples, or cultural traditions involved
3. Architectural details, dynasty/period, or cultural practices
4. Practical guidance for cultural travelers or researchers
Keep the tone dignified, scholarly yet engaging.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({
        answer: response.text,
        source: 'Gemini 2.5 Flash Cultural Intelligence',
        language,
      });
    } catch (error: any) {
      console.error('Error generating cultural response:', error);
      res.status(500).json({
        error: 'Failed to process cultural query',
        details: error?.message || 'Unknown error',
      });
    }
  });

  // API Route: Multilingual Translation
  app.post('/api/translate', async (req, res) => {
    try {
      const { text, targetLanguage = 'hi' } = req.body;
      if (!text) {
        return res.status(400).json({ error: 'Text is required' });
      }

      if (!ai) {
        return res.json({ translatedText: text, note: 'Gemini API not configured, returning original text' });
      }

      const prompt = `Translate the following Indian heritage tourism text into the specified language (${targetLanguage}). Ensure cultural terminology (such as 'Ghats', 'Rath', 'Gopuram', 'Mandapa', 'Haveli', 'Baori') is translated or transliterated respectfully with high linguistic fidelity.
Text to translate:
"${text}"
Output only the translated text, nothing else.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      res.json({ translatedText: response.text?.trim() });
    } catch (error: any) {
      console.error('Translation error:', error);
      res.status(500).json({ error: 'Translation failed', details: error?.message });
    }
  });

  // API Route: Database Health & Metrics
  app.get('/api/stats', (_req, res) => {
    res.json({
      status: 'active',
      name: 'Heritage Hub of India API',
      version: '2.0.0',
      entitiesCovered: 36, // 28 states + 8 UTs
    });
  });

  // Mount Vite middlewares in development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static assets from dist
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Heritage Hub of India server running on http://localhost:${PORT}`);
  });
}

startServer();
