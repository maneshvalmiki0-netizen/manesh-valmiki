import React, { useState } from 'react';
import { 
  Globe, Volume2, Sparkles, Send, BookOpen, Award, 
  MessageSquare, Layers, Check, ArrowRight, Compass 
} from 'lucide-react';
import { 
  SUPPORTED_LANGUAGES, CULTURAL_GREETINGS, CLASSICAL_LANGUAGES, UI_TRANSLATIONS 
} from '../data/multilingualData.ts';
import { SupportedLanguageCode } from '../types/heritage.ts';
import { speakText } from '../utils/speechSynthesis.ts';
import { getAllEntitiesSummary } from '../data/statesData.ts';

interface MultilingualExplorerViewProps {
  currentLanguage: string;
  onSelectLanguage: (lang: string) => void;
  onNavigateToState: (slug: string) => void;
}

export const MultilingualExplorerView: React.FC<MultilingualExplorerViewProps> = ({
  currentLanguage,
  onSelectLanguage,
  onNavigateToState,
}) => {
  const [selectedPhrase, setSelectedPhrase] = useState(CULTURAL_GREETINGS[0]);
  const [activeTab, setActiveTab] = useState<'bhasha-sangam' | 'classical-languages' | 'ai-assistant' | 'state-names'>('bhasha-sangam');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiLanguage, setAiLanguage] = useState(currentLanguage || 'hi');
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  const statesSummary = getAllEntitiesSummary();

  const handleSpeak = (text: string, langCode: string, key: string) => {
    setSpeakingKey(key);
    speakText(text, langCode);
    setTimeout(() => setSpeakingKey(null), 2500);
  };

  const handleAskCulturalAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;

    setAiLoading(true);
    setAiAnswer(null);

    try {
      const res = await fetch('/api/ask-heritage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: aiQuestion,
          language: aiLanguage,
        }),
      });

      const data = await res.json();
      if (data.answer) {
        setAiAnswer(data.answer);
      } else {
        setAiAnswer('Unable to retrieve cultural response. Please verify the query and try again.');
      }
    } catch (err: any) {
      setAiAnswer('Connection to Cultural Intelligence server was interrupted. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in">
      {/* Hero Header */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-stone-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#C85A32]/25 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Globe className="w-3.5 h-3.5 text-[#C85A32]" />
            Bhasha Sangam • Linguistic Heritage of India
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Automatic Multilingual Cultural Explorer
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            India is home to 22 constitutionally recognized scheduled languages, 11 classical languages, and hundreds of vibrant mother tongues. Explore India's cultural wisdom, script typography, native pronunciations, and AI-powered heritage localization.
          </p>
        </div>
      </div>

      {/* Language Selector Ribbon */}
      <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-[#C85A32]" />
            Explore Hub in Your Preferred Language
          </span>
          <span className="text-xs text-stone-500">
            Selected: <strong className="text-[#C85A32]">{SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage)?.name || 'English'}</strong>
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => onSelectLanguage(lang.code)}
                className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span>{lang.nativeName}</span>
                <span className={`text-[10px] ${isSelected ? 'text-amber-200' : 'text-stone-400'}`}>
                  ({lang.name})
                </span>
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex border-b border-stone-200 gap-2 sm:gap-6 overflow-x-auto text-xs sm:text-sm font-medium">
        <button
          onClick={() => setActiveTab('bhasha-sangam')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'bhasha-sangam'
              ? 'border-[#C85A32] text-[#C85A32] font-semibold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Script Comparison (Bhasha Sangam)</span>
        </button>

        <button
          onClick={() => setActiveTab('classical-languages')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'classical-languages'
              ? 'border-[#C85A32] text-[#C85A32] font-semibold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Classical Languages of India (9)</span>
        </button>

        <button
          onClick={() => setActiveTab('ai-assistant')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'ai-assistant'
              ? 'border-[#C85A32] text-[#C85A32] font-semibold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Multilingual Cultural AI Assistant</span>
        </button>

        <button
          onClick={() => setActiveTab('state-names')}
          className={`pb-3 border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'state-names'
              ? 'border-[#C85A32] text-[#C85A32] font-semibold'
              : 'border-transparent text-stone-600 hover:text-stone-900'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>36 States in Regional Scripts</span>
        </button>
      </div>

      {/* TAB 1: BHASHA SANGAM SCRIPT COMPARISON */}
      {activeTab === 'bhasha-sangam' && (
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                Linguistic Harmony: One Concept, 12 Scripts
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Click any phrase to see how it is written and spoken across India’s major regional languages.
              </p>
            </div>

            {/* Phrase Selector */}
            <div className="flex flex-wrap gap-2">
              {CULTURAL_GREETINGS.map((phrase) => (
                <button
                  key={phrase.id}
                  onClick={() => setSelectedPhrase(phrase)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    selectedPhrase.id === phrase.id
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                  }`}
                >
                  {phrase.english}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Phrase Detail Callout */}
          <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32]">
                Philosophical Meaning & Context
              </span>
              <span className="font-mono text-xs text-stone-500">
                Phonetic: /{selectedPhrase.phonetic}/
              </span>
            </div>
            <p className="text-sm font-serif font-semibold text-stone-900">
              "{selectedPhrase.meaning}"
            </p>
            <p className="text-xs text-stone-600">
              {selectedPhrase.usageContext}
            </p>
          </div>

          {/* 12 Script Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {SUPPORTED_LANGUAGES.map((lang) => {
              const langCode = lang.code;
              const text = (selectedPhrase as any)[lang.name.toLowerCase()] || (selectedPhrase as any)[langCode] || selectedPhrase.hindi;
              const isSpeaking = speakingKey === `${selectedPhrase.id}-${langCode}`;

              return (
                <div
                  key={lang.code}
                  className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3 hover:border-amber-300 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-stone-500">
                      <span className="font-semibold text-stone-800">{lang.name}</span>
                      <span className="font-mono text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-500">
                        {lang.script}
                      </span>
                    </div>

                    <p className="text-xl font-serif font-bold text-stone-900 py-1">
                      {text}
                    </p>
                  </div>

                  <button
                    onClick={() => handleSpeak(text.split('(')[0].trim(), langCode, `${selectedPhrase.id}-${langCode}`)}
                    className={`w-full py-1.5 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors ${
                      isSpeaking
                        ? 'bg-amber-100 border-[#C85A32] text-[#C85A32]'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                    <span>{isSpeaking ? 'Speaking…' : 'Pronounce'}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* TAB 2: CLASSICAL LANGUAGES */}
      {activeTab === 'classical-languages' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              The Classical Languages of India
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Languages recognized by the Government of India for their extraordinary antiquity, rich heritage, and ancient independent literature spanning millennia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLASSICAL_LANGUAGES.map((lang, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-serif font-bold text-stone-900">
                        {lang.name}
                      </h3>
                      <span className="text-xl font-serif text-[#C85A32]">
                        {lang.nativeScript}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 block">
                        Recognized {lang.yearRecognized}
                      </span>
                      <span className="text-[11px] text-stone-500 font-medium block mt-1">
                        Antiquity: {lang.antiquityYears}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {lang.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
                  <div className="text-stone-700">
                    <strong className="block text-stone-900">Earliest Epigraphical Record:</strong>
                    <span className="text-stone-600">{lang.earliestInscriptionOrText}</span>
                  </div>

                  <div>
                    <strong className="block text-stone-900">Monumental Epics & Texts:</strong>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {lang.prominentEpics.map((epic, i) => (
                        <span key={i} className="bg-stone-100 px-2 py-0.5 rounded text-[11px] text-stone-700">
                          {epic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TAB 3: AI CULTURAL ASSISTANT */}
      {activeTab === 'ai-assistant' && (
        <section className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#C85A32]">
                <Sparkles className="w-4 h-4" />
                <span>Powered by Gemini 2.5 Flash Cultural Intelligence</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900">
                Ask Cultural AI in Your Native Tongue
              </h2>
              <p className="text-xs sm:text-sm text-stone-600">
                Ask deep historical or cultural questions about any Indian temple, dynasty, festival, art form, or regional tradition in English, Hindi, Tamil, Telugu, Bengali, Kannada, or Marathi.
              </p>
            </div>

            {/* Language & Input Form */}
            <form onSubmit={handleAskCulturalAI} className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-medium text-stone-700">Answer Language:</span>
                <select
                  value={aiLanguage}
                  onChange={(e) => setAiLanguage(e.target.value)}
                  className="p-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium text-stone-800"
                >
                  {SUPPORTED_LANGUAGES.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.nativeName} ({l.name})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  placeholder="e.g. 'What is the architectural significance of the Brihadisvara Temple?', 'राजस्थान के प्रमुख किलों का इतिहास क्या है?'"
                  className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                />

                <button
                  type="submit"
                  disabled={aiLoading || !aiQuestion.trim()}
                  className="px-5 py-3 bg-[#C85A32] hover:bg-[#b54f2a] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{aiLoading ? 'Exploring…' : 'Ask'}</span>
                </button>
              </div>

              {/* Sample Questions */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <span className="text-stone-400">Sample Prompts:</span>
                {[
                  'What is the meaning of Hoysala soapstone architecture?',
                  'काशी विश्वनाथ मंदिर और गंगा आरती का क्या महत्व है?',
                  'तंजावூர் பெரிய கோயிலின் விமானம் எவ்வாறு கட்டப்பட்டது?',
                  'Why is Majuli island spiritually significant in Assam?',
                ].map((prompt, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setAiQuestion(prompt)}
                    className="px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded-md text-[11px] text-stone-700 transition-colors"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </form>

            {/* Answer Display */}
            {aiAnswer && (
              <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200/80 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#C85A32]" />
                    <span className="text-xs font-bold text-stone-900">
                      Authoritative Cultural Response
                    </span>
                  </div>

                  <button
                    onClick={() => speakText(aiAnswer, aiLanguage)}
                    className="p-1.5 rounded-md hover:bg-amber-100 text-[#C85A32] border border-amber-300 text-xs flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </button>
                </div>

                <div className="text-sm text-stone-800 leading-relaxed whitespace-pre-wrap">
                  {aiAnswer}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TAB 4: 36 STATES IN REGIONAL SCRIPTS */}
      {activeTab === 'state-names' && (
        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              All 36 States & Union Territories in Indian Typography
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Browse every Indian state with official languages, native script names, and one-click audio pronunciation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {statesSummary.map((state) => (
              <div
                key={state.slug}
                className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-3 hover:border-amber-300 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="text-[10px] uppercase font-semibold text-[#C85A32]">{state.region} India</span>
                    <span className="font-mono text-[10px] uppercase">{state.type}</span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-stone-900">
                    {state.name}
                  </h3>
                  <p className="text-sm font-serif text-stone-500">
                    {state.hindiName}
                  </p>

                  <p className="text-xs text-stone-600 line-clamp-1 italic">
                    "{state.tagline}"
                  </p>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                  <button
                    onClick={() => speakText(state.hindiName || state.name, 'hi')}
                    title="Pronounce state name"
                    className="p-1.5 rounded-md hover:bg-stone-100 text-stone-500 hover:text-stone-800 border border-stone-200"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigateToState(state.slug)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#C85A32] hover:underline"
                  >
                    <span>Explore Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
