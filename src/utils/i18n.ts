import type { SupportedLanguageCode, LanguageMetadata } from '../types/heritage.ts';

export const SUPPORTED_LANGUAGES: LanguageMetadata[] = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin', dir: 'ltr', isScheduled: false },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari', dir: 'ltr', isScheduled: true },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada', dir: 'ltr', isScheduled: true },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil', dir: 'ltr', isScheduled: true },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu', dir: 'ltr', isScheduled: true },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam', dir: 'ltr', isScheduled: true },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari', dir: 'ltr', isScheduled: true },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali', dir: 'ltr', isScheduled: true },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati', dir: 'ltr', isScheduled: true },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi', dir: 'ltr', isScheduled: true },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia', dir: 'ltr', isScheduled: true },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali-Assamese', dir: 'ltr', isScheduled: true },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Nastaliq / Arabic', dir: 'rtl', isScheduled: true },
  { code: 'sa', name: 'Sanskrit', nativeName: 'संस्कृतम्', script: 'Devanagari', dir: 'ltr', isScheduled: true },
  { code: 'ks', name: 'Kashmiri', nativeName: 'کٲشُر / कॉशुर', script: 'Perso-Arabic / Devanagari', dir: 'rtl', isScheduled: true },
  { code: 'kok', name: 'Konkani', nativeName: 'कोंकणी', script: 'Devanagari', dir: 'ltr', isScheduled: true },
  { code: 'mni', name: 'Manipuri (Meitei)', nativeName: 'মৈতৈলোন্', script: 'Meetei Mayek / Bengali', dir: 'ltr', isScheduled: true },
  { code: 'ne', name: 'Nepali', nativeName: 'नेपाली', script: 'Devanagari', dir: 'ltr', isScheduled: true },
  { code: 'brx', name: 'Bodo', nativeName: 'बड़ो', script: 'Devanagari', dir: 'ltr', isScheduled: true },
  { code: 'doi', name: 'Dogri', nativeName: 'डोगरी', script: 'Devanagari', dir: 'ltr', isScheduled: true },
  { code: 'mai', name: 'Maithili', nativeName: 'मैथिली', script: 'Devanagari', dir: 'ltr', isScheduled: true },
  { code: 'sat', name: 'Santali', nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ', script: 'Ol Chiki', dir: 'ltr', isScheduled: true },
];

export function getLanguageMetadata(code: SupportedLanguageCode): LanguageMetadata {
  return SUPPORTED_LANGUAGES.find(l => l.code === code) || SUPPORTED_LANGUAGES[0];
}

export function detectBrowserLanguage(): SupportedLanguageCode {
  if (typeof window === 'undefined' || !navigator) return 'en';

  const stored = localStorage.getItem('heritage_hub_user_lang') as SupportedLanguageCode | null;
  if (stored && SUPPORTED_LANGUAGES.some(l => l.code === stored)) {
    return stored;
  }

  const browserLanguages = navigator.languages || [navigator.language];
  for (const bl of browserLanguages) {
    const primary = bl.split('-')[0].toLowerCase();
    const matched = SUPPORTED_LANGUAGES.find(l => l.code === primary);
    if (matched) return matched.code;
  }

  return 'en';
}

export function saveUserLanguagePreference(code: SupportedLanguageCode): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('heritage_hub_user_lang', code);
  }
}

// Multi-language dictionary for essential UI labels & keys
const UI_DICTIONARY: Record<string, Partial<Record<SupportedLanguageCode, string>>> = {
  appName: {
    en: 'Heritage Hub of India',
    hi: 'भारत का धरोहर केंद्र',
    kn: 'ಭಾರತದ ಪಾರಂಪರಿಕ ಕೇಂದ್ರ',
    ta: 'இந்திய பாரம்பரிய மையம்',
    te: 'భారతీయ వారసత్వ కేంద్రం',
    ml: 'ഭാരതീയ പൈതൃക കേന്ദ്രം',
    mr: 'भारताचे वारसा केंद्र',
    bn: 'ভারতের ঐতিহ্য কেন্দ্র',
    gu: 'ભારતનું હેરિટેજ હબ',
    pa: 'ਭਾਰਤ ਦਾ ਵਿਰਾਸਤੀ ਕੇਂਦਰ',
    ur: 'ہندوستان کا ثقافتی ورثہ مرکز',
    sa: 'भारतस्य सांस्कृतिक-धरोहर-केन्द्रम्',
  },
  tagline: {
    en: "Discover India's Roots, Celebrate Its Diversity",
    hi: 'भारत की जड़ों को जानें, इसकी विविधता का उत्सव मनाएं',
    kn: 'ಭಾರತದ ಬೇರುಗಳನ್ನು ಅರಿಯಿರಿ, ವೈವಿಧ್ಯತೆಯನ್ನು ಆಚರಿಸಿ',
    ta: 'இந்தியாவின் வேர்களைக் கண்டறியுங்கள், அதன் பன்முகத்தன்மையைக் கொண்டாடுங்கள்',
    te: 'భారతదేశ మూలాలను కనుగొనండి, దాని వైవిధ్యాన్ని జరుపుకోండి',
    ml: 'ഭാരതത്തിന്റെ വേരുകൾ അറിയുക, വൈവിധ്യത്തെ ആഘോഷിക്കുക',
    mr: 'भारताची मुळे शोधा, तिच्या विविधतेचा उत्सव साजरा करा',
    bn: 'ভারতের শিকড় আবিষ্কার করুন, বৈচিত্র্য উদযাপন করুন',
    gu: 'ભારતના મૂળ શોધો, તેની વિવિધતાની ઉજવણી કરો',
    pa: 'ਭਾਰਤ ਦੀਆਂ ਜੜ੍ਹਾਂ ਲੱਭੋ, ਇਸਦੀ ਵਿਭਿੰਨਤਾ ਦਾ ਜਸ਼ਨ ਮਨਾਓ',
    ur: 'ہندوستان کی جڑوں کو دریافت کریں، اس کے تنوع کا جشن منائیں',
    sa: 'भारतस्य मूलानि अन्विष्यन्तु, विविधतां च अभिनन्दन्तु',
  },
  home: {
    en: 'Home',
    hi: 'मुख्य पृष्ठ',
    kn: 'ಮುಖಪುಟ',
    ta: 'முகப்பு',
    te: 'హోమ్',
    ml: 'ഹോം',
    mr: 'मुख्यपृष्ठ',
    bn: 'হোম',
    gu: 'હોમ',
    pa: 'ਮੁੱਖ ਸਫ਼ਾ',
    ur: 'صفحۂ اول',
    sa: 'गृहम्',
  },
  states: {
    en: 'States & UTs',
    hi: 'राज्य और केंद्र शासित प्रदेश',
    kn: 'ರಾಜ್ಯಗಳು ಮತ್ತು ಕೇಂದ್ರಾಡಳಿತ ಪ್ರದೇಶಗಳು',
    ta: 'மாநிலங்கள் & யூனியன் பிரதேசங்கள்',
    te: 'రాష్ట్రాలు & కేంద్రపాలిత ప్రాంతాలు',
    ml: 'സംസ്ഥാനങ്ങളും കേന്ദ്രഭരണ പ്രദേശങ്ങളും',
    mr: 'राज्ये व केंद्रशासित प्रदेश',
    bn: 'রাজ্য ও কেন্দ্রশাসিত অঞ্চল',
    gu: 'રાજ્યો અને કેન્દ્રશાસિત પ્રદેશો',
    pa: 'ਰਾਜ ਅਤੇ ਕੇਂਦਰ ਸ਼ਾਸਤ ਪ੍ਰਦੇਸ਼',
    ur: 'ریاستیں اور یونین علاقے',
    sa: 'राज्यानि केन्द्रशासितप्रदेशाः च',
  },
  destinations: {
    en: 'Destinations',
    hi: 'पर्यटन स्थल',
    kn: 'ಪ್ರವಾಸಿ ತಾಣಗಳು',
    ta: 'சுற்றுலா தலங்கள்',
    te: 'పర్యాటక ప్రదేశాలు',
    ml: 'സഞ്ചാര കേന്ദ്രങ്ങൾ',
    mr: 'पर्यटन स्थळे',
    bn: 'পর্যটন কেন্দ্র',
    gu: 'પ્રવાસન સ્થળો',
    pa: 'ਸੈਰ-ਸਪਾਟਾ ਸਥਾਨ',
    ur: 'سیاحتی مقامات',
    sa: 'पर्यटनस्थानानि',
  },
  monuments: {
    en: 'Monuments & UNESCO',
    hi: 'स्मारक एवं यूनेस्को',
    kn: 'ಸ್ಮಾರಕಗಳು ಮತ್ತು ಯುನೆಸ್ಕೋ',
    ta: 'நினைவுச்சின்னங்கள் & யுனெஸ்கோ',
    te: 'స్మారక చిహ్నాలు & యునెస్కో',
    ml: 'സ്മാരകങ്ങളും യുനെസ്കോയും',
    mr: 'स्मारके व युनेस्को',
    bn: 'স্মৃতিস্তম্ভ ও ইউনেস্কো',
    gu: 'સ્મારકો અને યુનેસ્કો',
    pa: 'ਯਾਦਗਾਰਾਂ ਅਤੇ ਯੂਨੈਸਕੋ',
    ur: 'یادگاریں اور یونیسکو',
  },
  itinerary: {
    en: 'Trip Planner',
    hi: 'यात्रा योजनाकार',
    kn: 'ಪ್ರವಾಸ ಯೋಜಕ',
    ta: 'பயண திட்டமிடுபவர்',
    te: 'ట్రిప్ ప్లానర్',
    ml: 'യാത്രാ പ്ലാനർ',
    mr: 'प्रवास नियोजक',
    bn: 'ভ্রমণ পরিকল্পনাকারী',
    gu: 'પ્રવાસ આયોજક',
    pa: 'ਯਾਤਰਾ ਯੋਜਨਾਕਾਰ',
    ur: 'سفر کا منصوبہ ساز',
    sa: 'यात्रा-योजकः',
  },
  askAi: {
    en: 'Ask Heritage AI',
    hi: 'हेरिटेज एआई से पूछें',
    kn: 'ಪಾರಂಪರಿಕ ಎಐ ಜೊತೆ ಸಂವಾದ',
    ta: 'ஹெரிட்டேஜ் ஏஐயிடம் கேளுங்கள்',
    te: 'హెరిటేజ్ ఏఐ ని అడగండి',
    ml: 'പൈതൃക എഐയോട് ചോദിക്കൂ',
    mr: 'हेरिटेज एआय ला विचारा',
    bn: 'ঐতিহ্য এআই-কে জিজ্ঞাসা করুন',
    gu: 'હેરિટેજ એઆઈને પૂછો',
    pa: 'ਹੈਰੀਟੇਜ ਏਆਈ ਨੂੰ ਪੁੱਛੋ',
    ur: 'ورثہ اے آئی سے پوچھیں',
  },
  compare: {
    en: 'Compare',
    hi: 'तुलना करें',
    kn: 'ಹೋಲಿಕೆ',
    ta: 'ஒப்பீடு',
    te: 'పోల్చండి',
    ml: 'താരതമ്യം ചെയ്യുക',
    mr: 'तुलना करा',
    bn: 'তুলনা করুন',
    gu: 'સરખામણી',
    pa: 'ਤੁਲਨਾ ਕਰੋ',
    ur: 'موازنہ کریں',
  },
  searchPlaceholder: {
    en: 'Search states, districts, monuments, temples, festivals, cuisines, languages...',
    hi: 'राज्य, जिले, स्मारक, मंदिर, उत्सव, व्यंजन, भाषाएँ खोजें...',
    kn: 'ರಾಜ್ಯಗಳು, ಜಿಲ್ಲೆಗಳು, ಸ್ಮಾರಕಗಳು, ದೇವಾಲಯಗಳು, ಹಬ್ಬಗಳು, ತಿನಿಸುಗಳನ್ನು ಹುಡುಕಿ...',
    ta: 'மாநிலங்கள், மாவட்டங்கள், கோவில்கள், திருவிழாக்கள், உணவுகளைத் தேடுங்கள்...',
    te: 'రాష్ట్రాలు, జిల్లాలు, స్మారకాలు, దేవాలయాలు, పండుగలు, వంటకాలను శోధించండి...',
    ml: 'സംസ്ഥാനങ്ങൾ, ജില്ലകൾ, സ്മാരകങ്ങൾ, ക്ഷേത്രങ്ങൾ, ഉത്സവങ്ങൾ തിരയുക...',
    mr: 'राज्ये, जिल्हे, स्मारके, मंदिरे, सण, खाद्यसंस्कृती शोधा...',
    bn: 'রাজ্য, জেলা, স্মৃতিস্তম্ভ, মন্দির, উৎসব, ঐতিহ্যবাহী খাবার খুঁজুন...',
    gu: 'રાજ્યો, જિલ્લાઓ, સ્મારકો, મંદિરો, ઉત્સવો, વાનગીઓ શોધો...',
    pa: 'ਰਾਜ, ਜ਼ਿਲ੍ਹੇ, ਯਾਦਗਾਰਾਂ, ਮੰਦਰ, ਤਿਉਹਾਰ, ਪਕਵਾਨ ਖੋਜੋ...',
    ur: 'ریاستیں، اضلاع، یادگاریں، مندر، تہوار، پکوان تلاش کریں...',
  },
  verifiedByASI: {
    en: 'Verified Cultural Research · ASI & UNESCO Aligned',
    hi: 'प्रमाणित सांस्कृतिक शोध · एएसआई और यूनेस्को संदर्भ',
    kn: 'ದೃಢೀಕೃತ ಸಾಂಸ್ಕೃತಿಕ ಸಂಶೋಧನೆ · ಎಎಸ್‌ಐ ಮತ್ತು ಯುನೆಸ್ಕೋ ಉಲ್ಲೇಖಗಳು',
    ta: 'சரிபார்க்கப்பட்ட கலாச்சார ஆராய்ச்சி · ஏஎஸ்ஐ & யுனெஸ்கோ ஆதாரங்கள்',
    te: 'ధృవీకరించబడిన సాంస్కృతిక పరిశోధన · ASI & UNESCO ఆధారాలు',
    ml: 'സ്ഥിരീകരിച്ച സാംസ്കാരിക ഗവേഷണം · ASI & UNESCO അടിസ്ഥാനമാക്കിയത്',
    mr: 'प्रमाणित सांस्कृतिक संशोधन · ASI आणि युनेस्को संदर्भ',
    bn: 'যাচাইকৃত সাংস্কৃতিক গবেষণা · ASI ও ইউনেস্কো রেফারেন্স',
    gu: 'ચકાસાયેલ સાંસ્કૃતિક સંશોધન · ASI અને યુનેસ્કો સંદર્ભો',
    pa: 'ਪ੍ਰਮਾਣਿਤ ਸੱਭਿਆਚਾਰਕ ਖੋਜ · ASI ਅਤੇ ਯੂਨੈਸਕੋ ਹਵਾਲੇ',
    ur: 'تصدیق شدہ ثقافتی تحقیق · اے ایس آئی اور یونیسکو حوالہ جات',
  },
  saveToTrip: {
    en: 'Save Destination',
    hi: 'स्थल सुरक्षित करें',
    kn: 'ತಾಣವನ್ನು ಉಳಿಸಿ',
    ta: 'தலத்தை சேமிக்கவும்',
    te: 'ప్రదేశాన్ని భద్రపరచండి',
    ml: 'സഞ്ചാരകേന്ദ്രം സൂക്ഷിക്കുക',
    mr: 'ठिकाण जतन करा',
    bn: 'স্থান সংরক্ষণ করুন',
    gu: 'સ્થળ સાચવો',
    pa: 'ਸਥਾਨ ਸੰਭਾਲੋ',
    ur: 'مقام محفوظ کریں',
  },
  printSummary: {
    en: 'Print Guide',
    hi: 'मार्गदर्शिका प्रिंट करें',
    kn: 'ಮಾರ್ಗದರ್ಶಿ ಮುದ್ರಿಸಿ',
    ta: 'வழிகாட்டியை அச்சிடுக',
    te: 'గైడ్‌ను ప్రింట్ చేయండి',
    ml: 'ഗൈഡ് പ്രിന്റ് ചെയ്യുക',
    mr: 'मार्गदर्शिका मुद्रित करा',
    bn: 'গাইড প্রিন্ট করুন',
    gu: 'માર્ગદર્શિકા પ્રિન્ટ કરો',
    pa: 'ਗਾਈਡ ਪ੍ਰਿੰਟ ਕਰੋ',
    ur: 'رہنما پرنٹ کریں',
  },
  exploreDistricts: {
    en: 'Explore by District',
    hi: 'जिलेवार अन्वेषण करें',
    kn: 'ಜಿಲ್ಲಾವಾರು ಅನ್ವೇಷಿಸಿ',
    ta: 'மாவட்ட வாரியாக ஆராயுங்கள்',
    te: 'జిల్లాల వారీగా అన్వేషించండి',
    ml: 'ജില്ലാടിസ്ഥാനത്തിൽ കണ്ടെത്തുക',
    mr: 'जिल्हानिहाय शोधा',
    bn: 'জেলা অনুযায়ী অন্বেষণ করুন',
    gu: 'જિલ્લા મુજબ અન્વેષણ કરો',
    pa: 'ਜ਼ਿਲ੍ਹੇ ਅਨੁਸਾਰ ਪੜਚੋਲ ਕਰੋ',
    ur: 'ضلع وار تلاش کریں',
  },
  openInMaps: {
    en: 'Open in Google Maps',
    hi: 'गूगल मैप्स में खोलें',
    kn: 'ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ವೀಕ್ಷಿಸಿ',
    ta: 'கூகிள் மேப்ஸில் காண்க',
    te: 'గూగుల్ మ్యాప్స్‌లో తెరవండి',
    ml: 'ഗൂഗിൾ മാപ്സിൽ തുറക്കുക',
    mr: 'गूगल मॅप्सवर पहा',
    bn: 'গুগল ম্যাপে দেখুন',
    gu: 'ગૂગલ મેપ્સમાં જુઓ',
    pa: 'ਗੂਗਲ ਮੈਪਸ ਵਿੱਚ ਖੋਲ੍ਹੋ',
    ur: 'گوگل میپس میں کھولیں',
  },
};

export function t(key: string, lang: SupportedLanguageCode = 'en'): string {
  const entry = UI_DICTIONARY[key];
  if (!entry) return key;
  return entry[lang] || entry['en'] || key;
}

// In-memory and local storage cache for on-demand generated translations
const TRANSLATION_CACHE_KEY = 'heritage_hub_translations_v1';

function getStoredTranslationCache(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(TRANSLATION_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function storeTranslationInCache(cacheKey: string, translatedText: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredTranslationCache();
    current[cacheKey] = translatedText;
    localStorage.setItem(TRANSLATION_CACHE_KEY, JSON.stringify(current));
  } catch (e) {
    console.warn('Could not cache translation', e);
  }
}

export async function requestDynamicTranslation(
  text: string,
  targetLang: SupportedLanguageCode,
  context: 'destination' | 'history' | 'cuisine' | 'general' = 'general'
): Promise<{ text: string; status: 'Human Reviewed' | 'Machine Translated' | 'Original Source' }> {
  if (targetLang === 'en' || !text.trim()) {
    return { text, status: 'Original Source' };
  }

  const cacheKey = `${targetLang}:${text.slice(0, 100)}:${text.length}`;
  const cached = getStoredTranslationCache()[cacheKey];
  if (cached) {
    return { text: cached, status: 'Machine Translated' };
  }

  // Attempt backend translation proxy if available
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang, context }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.translatedText) {
        storeTranslationInCache(cacheKey, data.translatedText);
        return { text: data.translatedText, status: 'Machine Translated' };
      }
    }
  } catch {
    // Graceful fallback to original content as required by guidelines
  }

  return { text, status: 'Original Source' };
}
