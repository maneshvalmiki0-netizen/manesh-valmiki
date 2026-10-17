/**
 * Text-to-Speech audio pronunciation helper for Indian languages
 * Uses browser window.speechSynthesis with Indian voice locale matching
 */

export function speakText(text: string, languageCode: string = 'hi') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser environment');
    return false;
  }

  try {
    // Cancel any active utterance
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Map language code to BCP 47 locale
    const localeMap: Record<string, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      kn: 'kn-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      gu: 'gu-IN',
      ml: 'ml-IN',
      or: 'or-IN',
      pa: 'pa-IN',
      as: 'as-IN',
      ur: 'ur-IN',
      sa: 'hi-IN', // Sanskrit voice fallback
    };

    const targetLocale = localeMap[languageCode] || 'hi-IN';
    utterance.lang = targetLocale;
    utterance.rate = 0.9; // Slightly slower for cultural pronunciation clarity
    utterance.pitch = 1.0;

    // Pick an Indian accent voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(
      v => v.lang.startsWith(targetLocale.slice(0, 2)) || v.lang.includes('IN')
    );
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.error('Speech synthesis error:', error);
    return false;
  }
}
