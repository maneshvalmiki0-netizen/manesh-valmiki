import React, { useState } from 'react';
import { Palette, Check, SlidersHorizontal, ChevronUp, ChevronDown, Landmark, Sparkles, X, MapPin } from 'lucide-react';
import { useCulturalBackground, CULTURAL_THEMES, CulturalTheme } from './CulturalBackground.tsx';
import { STATE_LANDMARK_BACKDROPS } from '../data/stateLandmarkBackdrops.ts';

const POPULAR_LANDMARK_STATES = [
  'rajasthan',
  'uttar-pradesh',
  'punjab',
  'tamil-nadu',
  'kerala',
  'karnataka',
  'maharashtra',
  'gujarat',
  'west-bengal',
  'odisha',
  'delhi',
  'jammu-kashmir',
  'ladakh',
  'uttarakhand',
  'assam',
  'meghalaya',
];

export const CulturalThemeSelector: React.FC = () => {
  const {
    currentTheme,
    setTheme,
    patternIntensity,
    setPatternIntensity,
    activeStateSlug,
    setActiveStateSlug,
    activeLandmark,
  } = useCulturalBackground();

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'states' | 'ambience'>('states');

  const activeTheme = CULTURAL_THEMES[currentTheme] || CULTURAL_THEMES['jaipur-sandstone'];
  const allStateKeys = Object.keys(STATE_LANDMARK_BACKDROPS).sort((a, b) =>
    STATE_LANDMARK_BACKDROPS[a].stateName.localeCompare(STATE_LANDMARK_BACKDROPS[b].stateName)
  );

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <div className="relative">
        {isOpen && (
          <div
            className="absolute bottom-14 right-0 w-84 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-stone-200/90 p-4.5 space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200 text-stone-800 max-h-[82vh] overflow-y-auto"
            style={{ boxShadow: '0 20px 45px -15px rgba(0,0,0,0.22)' }}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-stone-100">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#C85A32]">
                  <Landmark className="w-3.5 h-3.5" />
                  <span>State Landmark Background</span>
                </div>
                <h4 className="text-sm font-serif font-bold text-stone-900 mt-0.5">
                  Famous Places of India
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1 rounded-lg text-xs"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab Switcher: State Famous Wonder vs Classic Ambience */}
            <div className="grid grid-cols-2 gap-1 p-1 bg-stone-100 rounded-xl text-xs font-medium">
              <button
                onClick={() => setActiveTab('states')}
                className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'states'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Landmark className="w-3 h-3 text-[#C85A32]" />
                <span>36 States & UTs</span>
              </button>
              <button
                onClick={() => setActiveTab('ambience')}
                className={`py-1.5 px-2 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'ambience'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                <Palette className="w-3 h-3 text-amber-600" />
                <span>Heritage Palettes</span>
              </button>
            </div>

            {/* TAB 1: 36 STATES FAMOUS LANDMARK BACKDROPS */}
            {activeTab === 'states' && (
              <div className="space-y-3.5">
                {/* Active Landmark Spotlight Card */}
                {activeLandmark ? (
                  <div className="p-3 rounded-xl bg-amber-50/90 border border-amber-300/80 shadow-xs space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] uppercase font-bold text-[#A5431E] tracking-wider block">
                          Active State Backdrop • {activeLandmark.stateName}
                        </span>
                        <h5 className="font-serif font-bold text-sm text-stone-900 truncate">
                          {activeLandmark.famousPlace}
                        </h5>
                        <div className="flex items-center gap-1 text-[11px] text-stone-600 font-hindi">
                          <span>{activeLandmark.nativePlaceName || activeLandmark.hindiName}</span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{activeLandmark.cityOrDistrict}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveStateSlug(null)}
                        className="text-[10px] text-stone-500 hover:text-rose-600 px-2 py-0.5 rounded-md border border-stone-200 bg-white hover:bg-rose-50 transition-colors shrink-0"
                        title="Reset to default background"
                      >
                        Reset
                      </button>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed border-t border-amber-200/60 pt-1.5">
                      {activeLandmark.tagline}
                    </p>
                  </div>
                ) : (
                  <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1">
                    <p className="text-xs text-stone-600 font-medium">
                      Select any Indian state below to view its iconic landmark as the background
                    </p>
                    <p className="text-[10px] text-stone-400">
                      Features Taj Mahal, Hawa Mahal, Golden Temple, Meenakshi Gopuram, Backwaters & more
                    </p>
                  </div>
                )}

                {/* Quick Iconic State Landmark Buttons */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
                    Featured Iconic Landmarks
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {POPULAR_LANDMARK_STATES.map((slug) => {
                      const lm = STATE_LANDMARK_BACKDROPS[slug];
                      if (!lm) return null;
                      const isSelected = activeStateSlug === slug;

                      return (
                        <button
                          key={slug}
                          onClick={() => setActiveStateSlug(slug)}
                          className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between ${
                            isSelected
                              ? 'bg-amber-100/80 border-amber-500 shadow-2xs font-semibold'
                              : 'bg-white hover:bg-stone-50 border-stone-200/80'
                          }`}
                        >
                          <div className="flex items-center gap-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full shrink-0"
                              style={{ backgroundColor: lm.primaryColor }}
                            />
                            <span className="text-[11px] font-semibold text-stone-900 truncate">
                              {lm.stateName}
                            </span>
                          </div>
                          <span className="text-[10px] text-stone-500 truncate mt-0.5">
                            {lm.famousPlace.split('&')[0].trim()}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dropdown for All 36 States & UTs */}
                <div className="space-y-1.5 pt-1 border-t border-stone-100">
                  <label htmlFor="state-landmark-select" className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
                    All 28 States & 8 Union Territories
                  </label>
                  <select
                    id="state-landmark-select"
                    value={activeStateSlug || ''}
                    onChange={(e) => setActiveStateSlug(e.target.value || null)}
                    className="w-full text-xs p-2 rounded-xl border border-stone-300 bg-white text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#C85A32]"
                  >
                    <option value="">Default Pan-India Cultural Tapestry</option>
                    {allStateKeys.map((slug) => {
                      const lm = STATE_LANDMARK_BACKDROPS[slug];
                      return (
                        <option key={slug} value={slug}>
                          {lm.stateName} — {lm.famousPlace} ({lm.cityOrDistrict})
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}

            {/* TAB 2: CLASSIC HERITAGE AMBIENCE PALETTES */}
            {activeTab === 'ambience' && (
              <div className="space-y-3">
                <div className="space-y-2">
                  {(Object.keys(CULTURAL_THEMES) as CulturalTheme[]).map((themeKey) => {
                    const t = CULTURAL_THEMES[themeKey];
                    const isSelected = currentTheme === themeKey && !activeStateSlug;

                    return (
                      <button
                        key={themeKey}
                        onClick={() => {
                          setTheme(themeKey);
                          setActiveStateSlug(null);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition-all border flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'bg-amber-50/80 border-amber-500/80 shadow-xs'
                            : 'bg-white hover:bg-stone-50 border-stone-200/70 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div
                            className="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center border border-black/10 shadow-2xs"
                            style={{ backgroundColor: t.primaryColor }}
                          >
                            <div className="w-2.5 h-2.5 rounded-full bg-white/40" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold text-stone-900 truncate">
                                {t.name}
                              </span>
                            </div>
                            <p className="text-[10px] text-stone-500 font-hindi truncate">
                              {t.hindiName} · {t.subtitle.split('&')[0]}
                            </p>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#C85A32] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Pattern & Landmark Intensity Selector */}
            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-600 font-medium flex items-center gap-1 text-[11px]">
                <SlidersHorizontal className="w-3 h-3 text-stone-400" />
                Backdrop Intensity
              </span>
              <div className="flex items-center gap-1 bg-stone-100 p-0.5 rounded-lg">
                {(['minimal', 'subtle', 'vibrant'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setPatternIntensity(lvl)}
                    className={`px-2 py-0.5 rounded text-[10px] capitalize font-medium transition-all ${
                      patternIntensity === lvl
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'text-stone-500 hover:text-stone-800'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Cultural Note */}
            <p className="text-[10px] text-stone-400 text-center italic pt-1">
              {activeLandmark
                ? `Featuring ${activeLandmark.famousPlace} with authentic architectural silhouette`
                : 'Features authentic Jali lattice, Sacred Mandalas & state monuments'}
            </p>
          </div>
        )}

        {/* Floating Trigger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label="Customize Cultural Background Atmosphere"
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 hover:bg-white text-stone-800 shadow-lg hover:shadow-xl border border-stone-200/90 hover:border-amber-400/80 transition-all group backdrop-blur-md cursor-pointer"
        >
          {activeLandmark ? (
            <>
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs transition-colors duration-500"
                style={{ backgroundColor: activeLandmark.primaryColor }}
              />
              <span className="text-xs font-semibold text-stone-800 group-hover:text-stone-950 flex items-center gap-1">
                <Landmark className="w-3 h-3 text-[#C85A32]" />
                <span className="truncate max-w-[140px] sm:max-w-[200px]">
                  {activeLandmark.famousPlace.split('&')[0].trim()}
                </span>
                <span className="text-stone-400 text-[10px]">({activeLandmark.stateName})</span>
              </span>
            </>
          ) : (
            <>
              <span
                className="w-3.5 h-3.5 rounded-full shrink-0 shadow-xs transition-colors duration-500"
                style={{ backgroundColor: activeTheme.primaryColor }}
              />
              <span className="text-xs font-medium text-stone-700 group-hover:text-stone-900">
                {activeTheme.name.split('&')[0].trim()}
              </span>
            </>
          )}

          <span className="text-stone-400 group-hover:text-stone-600">
            {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </span>
        </button>
      </div>
    </div>
  );
};
