import React, { useState } from 'react';
import { Search, Bookmark, Globe, Menu, X, Compass, ChevronDown, Check } from 'lucide-react';
import { SUPPORTED_LANGUAGES, UI_TRANSLATIONS } from '../data/multilingualData.ts';
import { SupportedLanguageCode } from '../types/heritage.ts';

interface NavbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
  itineraryCount: number;
  currentLanguage: string;
  onLanguageChange: (lang: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenSearch,
  onOpenBookmarks,
  bookmarkCount,
  itineraryCount,
  currentLanguage,
  onLanguageChange,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const langCode = (currentLanguage in UI_TRANSLATIONS ? currentLanguage : 'en') as SupportedLanguageCode;
  const t: Record<string, string> = UI_TRANSLATIONS[langCode] || UI_TRANSLATIONS.en || {};

  const navLinks = [
    { id: 'home', label: t.navHome || 'Home' },
    { id: 'destinations', label: t.navDestinations || 'Destinations (1,664+)' },
    { id: 'multilingual', label: t.navMultilingual || 'Multilingual Explorer' },
    { id: 'itinerary', label: t.navItinerary || 'Trip Planner', badge: itineraryCount },
    { id: 'categories', label: t.navCulture || 'Culture & Arts' },
    { id: 'compare', label: 'Compare States' },
  ];

  const handleLinkClick = (route: string) => {
    onNavigate(route);
    setMobileMenuOpen(false);
  };

  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-200/80 transition-shadow">
      {/* Delicate Heritage Frieze Accent Bar */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#D97706] via-[#C85A32] to-[#0D5C63] opacity-85" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-18">
          {/* ZONE 1: Brand Wordmark */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 text-left text-lg lg:text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 group focus:outline-hidden"
          >
            <div className="w-8 h-8 rounded-full bg-[#C85A32] flex items-center justify-center text-white shadow-xs shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-stone-900 group-hover:text-[#C85A32] transition-colors leading-tight">
                Heritage Hub of India
              </span>
              <span className="text-[10px] text-stone-500 font-sans tracking-normal hidden sm:block">
                Cultural Encyclopedia & Tourism Explorer
              </span>
            </div>
          </button>

          {/* ZONE 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-stone-700">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 relative flex items-center gap-1.5 ${
                    isActive
                      ? 'text-[#C85A32] font-bold'
                      : 'hover:text-stone-950 text-stone-600'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge !== undefined && link.badge > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-[#C85A32] text-white text-[10px] font-bold">
                      {link.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C85A32] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ZONE 3: Right Controls (Search, Language, Itinerary, Bookmarks) */}
          <div className="flex items-center gap-2">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors flex items-center gap-2"
              title="Search destinations, states, festivals (Press / or Ctrl+K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-xs text-stone-500 font-mono bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200">
                /
              </span>
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="px-2.5 py-1.5 bg-white border border-stone-200 rounded-lg text-xs font-medium text-stone-800 hover:bg-stone-50 transition-colors flex items-center gap-1.5 shadow-2xs"
                title="Select Indian Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#C85A32]" />
                <span className="font-serif">{currentLangObj.nativeName}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {langDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-stone-200 py-2 z-50 animate-in fade-in max-h-80 overflow-y-auto"
                  onClick={() => setLangDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400 border-b border-stone-100">
                    Select Language / भाषा चुनें
                  </div>
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => onLanguageChange(lang.code)}
                      className="w-full px-3.5 py-2 text-left text-xs hover:bg-amber-50/80 flex items-center justify-between text-stone-800 transition-colors"
                    >
                      <div className="flex flex-col">
                        <span className="font-serif font-bold text-stone-900">{lang.nativeName}</span>
                        <span className="text-[10px] text-stone-500">{lang.name} ({lang.script})</span>
                      </div>
                      {currentLanguage === lang.code && (
                        <Check className="w-4 h-4 text-[#C85A32]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bookmarks Drawer Trigger */}
            <button
              onClick={onOpenBookmarks}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 rounded-lg transition-colors relative"
              title="Saved Items"
              aria-label="Bookmarks"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C85A32] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-200/60"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  currentRoute === link.id
                    ? 'bg-amber-50 text-[#C85A32] font-semibold'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
              >
                <span>{link.label}</span>
                {link.badge !== undefined && link.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-[#C85A32] text-white text-xs font-bold">
                    {link.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
