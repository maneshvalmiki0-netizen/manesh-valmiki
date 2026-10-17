import React, { useState, useMemo } from 'react';
import { 
  MapPin, Bookmark, Share2, Printer, ChevronLeft, Landmark, 
  Calendar, Utensils, Music, Scissors, BookOpen, Users, 
  Award, ShieldAlert, ExternalLink, Sparkles, Compass, Search,
  Volume2, PlusCircle, Check, Eye, SlidersHorizontal, RotateCcw
} from 'lucide-react';
import { StateData, DestinationDetail } from '../types/heritage.ts';
import { ShareModal } from '../components/ShareModal.tsx';
import { DestinationModal } from '../components/DestinationModal.tsx';
import { getDestinationsByState, getDistrictsForState } from '../data/destinationsDatabase.ts';
import { speakText } from '../utils/speechSynthesis.ts';
import { CURATED_CIRCUITS } from './ItineraryPlannerView.tsx';
import { STATE_LANDMARK_BACKDROPS } from '../data/stateLandmarkBackdrops.ts';

interface StateDetailViewProps {
  state: StateData;
  onBack: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onNavigateToState: (slug: string) => void;
  onAddToItinerary?: (dest: DestinationDetail) => void;
  itineraryDestIds?: Set<string>;
  onInspectDestination?: (dest: DestinationDetail) => void;
}

export const StateDetailView: React.FC<StateDetailViewProps> = ({
  state,
  onBack,
  isBookmarked,
  onToggleBookmark,
  onNavigateToState,
  onAddToItinerary,
  itineraryDestIds = new Set(),
  onInspectDestination,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'destinations' | 'culture' | 'cuisine' | 'arts' | 'itineraries' | 'guidance'>('overview');
  const [shareModalOpen, setShareModalOpen] = useState(false);
  
  // Destination database state
  const [destDistrict, setDestDistrict] = useState<string>('all');
  const [destCategory, setDestCategory] = useState<string>('all');
  const [destSearch, setDestSearch] = useState<string>('');
  const [inspectingDest, setInspectingDest] = useState<DestinationDetail | null>(null);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  const handlePrint = () => {
    window.print();
  };

  const currentUrl = typeof window !== 'undefined' ? `${window.location.origin}/#states/${state.slug}` : `https://heritagehub.in/states/${state.slug}`;

  // Get full verified destinations from master database
  const masterDestinations = useMemo(() => {
    return getDestinationsByState(state.slug);
  }, [state.slug]);

  const availableDistricts = useMemo(() => {
    return getDistrictsForState(state.slug);
  }, [state.slug]);

  // Categories present in this state
  const stateCategories = useMemo(() => {
    const set = new Set<string>();
    masterDestinations.forEach(d => set.add(d.category));
    return Array.from(set).sort();
  }, [masterDestinations]);

  // Filtered state destinations
  const filteredDestinations = useMemo(() => {
    const q = destSearch.toLowerCase().trim();
    return masterDestinations.filter(d => {
      if (destDistrict !== 'all' && d.district.toLowerCase() !== destDistrict.toLowerCase()) return false;
      if (destCategory !== 'all' && d.category !== destCategory) return false;
      if (q) {
        const matchName = d.name.toLowerCase().includes(q);
        const matchNative = d.nativeName?.toLowerCase().includes(q);
        const matchDistrict = d.district.toLowerCase().includes(q);
        const matchCat = d.category.toLowerCase().includes(q);
        const matchIntro = d.shortIntro ? d.shortIntro.toLowerCase().includes(q) : false;
        if (!matchName && !matchNative && !matchDistrict && !matchCat && !matchIntro) return false;
      }
      return true;
    });
  }, [masterDestinations, destDistrict, destCategory, destSearch]);

  // State-specific curated circuits
  const stateItineraries = useMemo(() => {
    return CURATED_CIRCUITS.filter(c => c.stateSlug === state.slug || c.stateName.toLowerCase().includes(state.name.toLowerCase()));
  }, [state.slug, state.name]);

  const handlePronounce = (text: string, id: string) => {
    setSpeakingKey(id);
    speakText(text, 'hi');
    setTimeout(() => setSpeakingKey(null), 2000);
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Top Breadcrumb & Action Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All States & Territories</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={onToggleBookmark}
            className={`px-3.5 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
              isBookmarked
                ? 'bg-[#C85A32] text-white border-[#C85A32]'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
            <span>{isBookmarked ? 'Saved to Hub' : 'Save State'}</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => setShareModalOpen(true)}
            className="px-3.5 py-1.5 bg-white border border-stone-200 hover:bg-stone-50 rounded-lg text-xs font-medium text-stone-700 transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5 text-stone-500" />
            <span>Share</span>
          </button>

          {/* Print / Download Summary */}
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Summary</span>
          </button>
        </div>
      </div>

      {/* Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <span className="text-[#C85A32] font-semibold tracking-wider uppercase">{state.region} India</span>
          <span aria-hidden="true">·</span>
          <span>{state.type === 'state' ? 'State' : 'Union Territory'}</span>
          <span aria-hidden="true">·</span>
          <span>Capital: <strong className="text-stone-800">{state.capital}</strong></span>
          <span aria-hidden="true">·</span>
          <span>Languages: {state.officialLanguages.join(', ')}</span>
        </div>

        <div className="flex flex-wrap items-baseline gap-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight">
            {state.name}
          </h1>
          {state.hindiName && (
            <span className="text-2xl sm:text-3xl font-hindi text-stone-400 font-normal tracking-wide">
              {state.hindiName}
            </span>
          )}
        </div>

        <p className="text-lg font-serif italic text-[#C85A32]">
          "{state.tagline}"
        </p>

        <p className="text-sm sm:text-base text-stone-700 max-w-4xl leading-relaxed">
          {state.overview}
        </p>

        {/* Featured State Landmark (Rendered in Background) */}
        {STATE_LANDMARK_BACKDROPS[state.slug] && (() => {
          const lm = STATE_LANDMARK_BACKDROPS[state.slug];
          return (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-stone-200/90 shadow-xs mt-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-xs"
                  style={{ backgroundColor: lm.primaryColor }}
                >
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A5431E]">
                      Featured State Landmark in Background
                    </span>
                    {lm.isUnesco && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300">
                        UNESCO
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-stone-900 text-base sm:text-lg leading-tight">
                    {lm.famousPlace}
                  </h3>
                  <p className="text-xs text-stone-500 font-indic">
                    {lm.nativePlaceName || lm.hindiName} · {lm.cityOrDistrict}
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-600 sm:max-w-md italic leading-relaxed sm:text-right">
                "{lm.tagline}"
              </p>
            </div>
          );
        })()}
      </div>

      {/* Sticky Tab Navigation Bar */}
      <div className="sticky top-18 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-200/90 py-2 overflow-x-auto no-scrollbar flex items-center gap-1">
        {[
          { id: 'overview', label: 'Overview & Geography' },
          { id: 'history', label: 'History & Timeline' },
          { id: 'destinations', label: `Destinations (${masterDestinations.length > 0 ? masterDestinations.length : state.destinations.length})` },
          { id: 'itineraries', label: `Itineraries (${stateItineraries.length > 0 ? stateItineraries.length : 1})` },
          { id: 'cuisine', label: 'Traditional Cuisine' },
          { id: 'culture', label: 'Festivals & Dance' },
          { id: 'arts', label: 'Crafts & Textiles' },
          { id: 'guidance', label: 'Travel Guidance & Sources' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
              activeTab === tab.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: OVERVIEW & STATE SYMBOLS */}
      {activeTab === 'overview' && (
        <section className="space-y-10 animate-in fade-in">
          {/* Geography & Landscapes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#C85A32] font-semibold">Geographical Setting</span>
              <h3 className="text-xl font-serif font-bold text-stone-900">Landscape & Natural Corridors</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{state.geography}</p>
            </div>
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-sky-700 font-semibold">Atmospheric Characteristics</span>
              <h3 className="text-xl font-serif font-bold text-stone-900">Climatic Rhythms</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{state.climate}</p>
            </div>
          </div>

          {/* State Symbols definition grid */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-stone-900">Official State Symbols</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">State Animal</span>
                <p className="text-sm font-semibold text-stone-900">{state.symbols.animal || 'Protected Fauna'}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">State Bird</span>
                <p className="text-sm font-semibold text-stone-900">{state.symbols.bird || 'Avian Heritage'}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">State Tree</span>
                <p className="text-sm font-semibold text-stone-900">{state.symbols.tree || 'Indigenous Flora'}</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-stone-400 font-medium">State Flower</span>
                <p className="text-sm font-semibold text-stone-900">{state.symbols.flower || 'Auspicious Bloom'}</p>
              </div>
            </div>
          </div>

          {/* Indigenous Communities & Customs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
                <Users className="w-5 h-5 text-[#C85A32]" />
                <h4>Indigenous Communities</h4>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Communities whose traditions, oral histories, and sustainable craftsmanship form the backbone of local identity:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {state.indigenousCommunities.map((c, i) => (
                  <span key={i} className="text-xs bg-white px-3 py-1 rounded-lg border border-stone-200 text-stone-800 font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg">
                <Award className="w-5 h-5 text-[#1E3A5F]" />
                <h4>Hospitality & Social Customs</h4>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                <strong>Hospitality:</strong> {state.customsAndTraditions.hospitality}
              </p>
              <p className="text-xs text-stone-700 leading-relaxed">
                <strong>Rituals:</strong> {state.customsAndTraditions.rituals}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 2: HISTORY & HISTORICAL TIMELINE */}
      {activeTab === 'history' && (
        <section className="space-y-8 animate-in fade-in">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#C85A32] font-semibold">Chronicles of Civilization</span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">Historical Eras & Key Milestones</h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Distinguishing documented archaeological evidence from medieval administrative records and oral folklore.
            </p>
          </div>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-stone-200 space-y-8">
            {state.historyTimeline.map((era, index) => (
              <div key={index} className="relative group">
                {/* Timeline node marker */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-white border-2 border-[#C85A32] group-hover:bg-[#C85A32] transition-colors" />

                <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
                    <span className="font-semibold text-stone-900 font-serif text-lg">{era.era}</span>
                    <span className="font-mono text-[11px] bg-stone-100 px-2.5 py-0.5 rounded-md text-stone-600">
                      {era.period}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {era.description}
                  </p>

                  <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center gap-2 text-xs text-stone-600">
                    <strong className="text-stone-800">Key Discoveries & Events:</strong>
                    {era.keyEvents.map((event, i) => (
                      <span key={i} className="bg-stone-50 px-2.5 py-0.5 rounded-md border border-stone-200">
                        {event}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Famous Personalities */}
          <div className="pt-6 border-t border-stone-200 space-y-4">
            <h4 className="text-xl font-serif font-bold text-stone-900">Historical Personalities & Icons</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {state.famousPersonalities.map((person, i) => (
                <div key={i} className="bg-white p-5 rounded-xl border border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span className="text-[#C85A32] font-medium">{person.role}</span>
                    <span className="font-mono text-[10px]">{person.era}</span>
                  </div>
                  <h5 className="font-serif font-bold text-stone-900 text-base">{person.name}</h5>
                  <p className="text-xs text-stone-600 leading-relaxed">{person.contribution}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 3: MASTER TOURISM & HERITAGE DESTINATIONS DATABASE */}
      {activeTab === 'destinations' && (
        <section className="space-y-8 animate-in fade-in">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#C85A32] font-semibold">Master Tourism Database</span>
                <span className="px-2 py-0.5 rounded-full bg-[#C85A32]/10 text-[#C85A32] text-[11px] font-bold">
                  {masterDestinations.length > 0 ? `${masterDestinations.length} Verified Destinations` : `${state.destinations.length} Sites`}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 text-[11px] font-medium">
                  {availableDistricts.length} Districts
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                Monuments, Forts, Temples & Scenic Marvels
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
                Every state has a rich network of heritage landmarks. Browse verified monuments, cave temples, sanctuaries, UNESCO properties, and off-beat cultural treasures district-by-district.
              </p>
            </div>
          </div>

          {/* District & Category Filter Toolbar */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Search Within State */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search in this state…"
                  value={destSearch}
                  onChange={(e) => setDestSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:outline-hidden focus:border-[#C85A32]"
                />
              </div>

              {/* District Filter Dropdown */}
              <div>
                <select
                  value={destDistrict}
                  onChange={(e) => setDestDistrict(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700 focus:outline-hidden focus:border-[#C85A32]"
                >
                  <option value="all">All Districts ({masterDestinations.length})</option>
                  {availableDistricts.map(dist => {
                    const count = masterDestinations.filter(d => d.district.toLowerCase() === dist.toLowerCase()).length;
                    return (
                      <option key={dist} value={dist}>
                        {dist} ({count})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Category Filter Dropdown */}
              <div>
                <select
                  value={destCategory}
                  onChange={(e) => setDestCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700 focus:outline-hidden focus:border-[#C85A32]"
                >
                  <option value="all">All Categories ({stateCategories.length})</option>
                  {stateCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Reset Button */}
              <div className="flex items-center gap-2">
                {(destDistrict !== 'all' || destCategory !== 'all' || destSearch) && (
                  <button
                    onClick={() => {
                      setDestDistrict('all');
                      setDestCategory('all');
                      setDestSearch('');
                    }}
                    className="px-3 py-2 text-xs text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center gap-1.5 w-full justify-center"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Filters</span>
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100">
              <span>Showing <strong>{filteredDestinations.length}</strong> of {masterDestinations.length} destinations</span>
              <span className="text-[11px] text-stone-400">Click any destination card for comprehensive monograph & visitor guide</span>
            </div>
          </div>

          {/* Destinations Grid */}
          {filteredDestinations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest) => {
                const inTrip = itineraryDestIds.has(dest.id);
                return (
                  <div
                    key={dest.id}
                    className="bg-white rounded-2xl border border-stone-200 hover:border-stone-400 p-5 flex flex-col justify-between space-y-4 shadow-xs transition-all group"
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between text-xs text-stone-500 gap-2">
                        <span className="font-medium text-[#C85A32] truncate">{dest.category}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          {dest.isUnesco && (
                            <span className="text-amber-800 font-bold uppercase text-[9px] tracking-wider bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 flex items-center gap-0.5">
                              <Award className="w-3 h-3" />
                              UNESCO
                            </span>
                          )}
                          {dest.isHiddenGem && (
                            <span className="text-emerald-700 font-bold uppercase text-[9px] tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center gap-0.5">
                              <Sparkles className="w-3 h-3" />
                              Hidden Gem
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Native Script with Audio */}
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 
                            onClick={() => {
                              if (onInspectDestination) onInspectDestination(dest);
                              else setInspectingDest(dest);
                            }}
                            className="text-lg font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors cursor-pointer leading-snug"
                          >
                            {dest.name}
                          </h4>
                          {dest.nativeName && (
                            <button
                              onClick={() => handlePronounce(dest.nativeName || dest.name, dest.id)}
                              title="Pronounce native name"
                              className={`p-1.5 rounded-lg border text-stone-500 transition-colors shrink-0 ${
                                speakingKey === dest.id ? 'bg-amber-100 text-[#C85A32] border-[#C85A32]' : 'hover:bg-stone-100 border-stone-200'
                              }`}
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        {dest.nativeName && (
                          <p className="text-xs text-stone-400 font-sans tracking-wide">
                            {dest.nativeName}
                          </p>
                        )}
                      </div>

                      {/* District & City */}
                      <p className="text-xs text-stone-600 flex items-center gap-1.5 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                        <span>District: <strong className="text-stone-900">{dest.district}</strong></span>
                        {dest.cityOrTown && <span className="text-stone-400">({dest.cityOrTown})</span>}
                      </p>

                      {/* Short Description */}
                      <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                        {dest.shortIntro}
                      </p>

                      {/* Key Attributes */}
                      <div className="pt-2 border-t border-stone-100 grid grid-cols-2 gap-2 text-[11px] text-stone-500">
                        <div>
                          <span className="text-stone-400 block">Best Season</span>
                          <span className="font-medium text-stone-800">{dest.bestTimeToVisit || 'Oct – Mar'}</span>
                        </div>
                        <div>
                          <span className="text-stone-400 block">Time Needed</span>
                          <span className="font-medium text-stone-800">{dest.recommendedDuration || '2 – 3 Hours'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-3 border-t border-stone-100 flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (onInspectDestination) onInspectDestination(dest);
                          else setInspectingDest(dest);
                        }}
                        className="flex-1 py-2 px-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xl transition-colors flex items-center justify-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Full Monograph</span>
                      </button>

                      {onAddToItinerary && (
                        <button
                          onClick={() => onAddToItinerary(dest)}
                          title={inTrip ? "Remove from trip" : "Add to trip"}
                          className={`p-2 rounded-xl border text-xs font-medium transition-colors ${
                            inTrip 
                              ? 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700' 
                              : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {inTrip ? <Check className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-2xl border border-stone-200 space-y-3">
              <p className="text-stone-600 font-serif text-lg">No destinations match the selected filters.</p>
              <button
                onClick={() => {
                  setDestDistrict('all');
                  setDestCategory('all');
                  setDestSearch('');
                }}
                className="px-4 py-2 bg-[#C85A32] text-white text-xs font-semibold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>
      )}

      {/* SECTION 4: CURATED REGIONAL TRAVEL CIRCUITS & ITINERARIES */}
      {activeTab === 'itineraries' && (
        <section className="space-y-8 animate-in fade-in">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#C85A32] font-semibold">Curated Exploration</span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">
              Curated Cultural & Heritage Circuits
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-3xl">
              Day-by-day travel routes, culinary pairings, and optimal timing for experiencing {state.name}'s architectural splendor and living traditions.
            </p>
          </div>

          <div className="space-y-6">
            {stateItineraries.length > 0 ? (
              stateItineraries.map((circuit) => (
                <div key={circuit.id} className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                    <div>
                      <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">{circuit.travelStyle}</span>
                      <h4 className="text-2xl font-serif font-bold text-stone-900">{circuit.title}</h4>
                      <p className="text-xs text-stone-500 mt-0.5">Duration: <strong>{circuit.durationDays} Days</strong> • Region: {circuit.stateName}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {circuit.summary}
                  </p>

                  <div className="space-y-4 pt-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-stone-500">Day-by-Day Detailed Schedule</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {circuit.days.map((day) => (
                        <div key={day.dayNumber} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-md bg-[#C85A32] text-white text-[11px] font-bold">
                              Day {day.dayNumber}
                            </span>
                            <span className="text-[11px] text-stone-500 font-medium">{day.stops.length} Stops</span>
                          </div>

                          <h6 className="font-serif font-bold text-stone-900 text-sm">{day.themeTitle}</h6>
                          <p className="text-xs text-stone-600"><strong>Highlight:</strong> {day.culturalHighlight}</p>
                          <p className="text-xs text-emerald-800 bg-emerald-50 p-2 rounded-md border border-emerald-200/60">
                            <strong>Culinary Pairing:</strong> {day.regionalDishSuggestion}
                          </p>
                          <p className="text-[11px] text-stone-500 italic">
                            <strong>Tip:</strong> {day.visitorTips}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
                <h4 className="font-serif font-bold text-stone-900 text-xl">Custom Circuit for {state.name}</h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Start in {state.capital} and explore the {availableDistricts.slice(0, 5).join(', ')} districts over 3 to 5 days. Add any of the {masterDestinations.length} verified destinations from the Destinations tab directly to your Trip Planner.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* SECTION 5: CUISINE & TRADITIONAL FOOD */}
      {activeTab === 'cuisine' && (
        <section className="space-y-8 animate-in fade-in">
          <div>
            <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Gastronomic Heritage</span>
            <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">Signature Cuisines & Cooking Traditions</h3>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Time-honored slow cooking techniques, regional spices, and dietary profiles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.cuisines.map((dish) => (
              <div
                key={dish.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="text-[#C85A32] font-medium">{dish.category}</span>
                    <span className="font-medium text-emerald-700 text-[11px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      {dish.dietType}
                    </span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-stone-900">
                    {dish.name}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-stone-700 block mb-1">Key Ingredients:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {dish.ingredients.map((ing, i) => (
                        <span key={i} className="bg-stone-100 text-stone-700 px-2 py-0.5 rounded-md text-[11px]">
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200/70 text-[11px] text-stone-600 leading-relaxed">
                    <strong>Cultural Context:</strong> {dish.culturalContext}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION 6 & 8: CULTURE, FESTIVALS & PERFORMING ARTS */}
      {activeTab === 'culture' && (
        <section className="space-y-10 animate-in fade-in">
          {/* Festivals */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-purple-700 font-semibold">Festive Cycles</span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">Major Festivals & Sacred Gatherings</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {state.festivals.map((fest) => (
                <div key={fest.id} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-medium text-purple-700">{fest.month}</span>
                    {fest.regionalName && <span className="font-serif text-stone-400">{fest.regionalName}</span>}
                  </div>

                  <h4 className="text-xl font-serif font-bold text-stone-900">{fest.name}</h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{fest.description}</p>

                  <div className="pt-3 border-t border-stone-100 space-y-2 text-xs">
                    <p className="text-stone-700"><strong>Rituals & Practices:</strong> {fest.ritualsAndPractices}</p>
                    <p className="text-stone-700"><strong>Special Foods:</strong> {fest.specialFoods.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performing Arts */}
          <div className="space-y-6 pt-6 border-t border-stone-200">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#C85A32] font-semibold">Stage & Rhythm</span>
              <h3 className="text-2xl font-serif font-bold text-stone-900 mt-1">Dance, Music & Dramatic Arts</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {state.performingArts.map((art) => (
                <div key={art.id} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="text-[#C85A32] font-medium">{art.type}</span>
                    <span className="text-stone-400">{art.origin}</span>
                  </div>

                  <h4 className="text-xl font-serif font-bold text-stone-900">{art.name}</h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{art.description}</p>

                  {art.instrumentsUsed && (
                    <div className="pt-2 text-xs text-stone-600">
                      <strong>Instruments:</strong> {art.instrumentsUsed.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SECTION 7 & 10: TEXTILES, CRAFTS & LITERATURE */}
      {activeTab === 'arts' && (
        <section className="space-y-10 animate-in fade-in">
          {/* Textiles & Attire */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
            <span className="text-xs uppercase tracking-wider text-[#C85A32] font-semibold">Handloom Heritage</span>
            <h3 className="text-2xl font-serif font-bold text-stone-900">Traditional Textiles & Attire</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {state.textilesAndAttire.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-stone-800">Iconic Attire & Drapes:</span>
                <ul className="list-disc list-inside text-xs text-stone-600 space-y-1">
                  {state.textilesAndAttire.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-stone-800">Weaving Traditions & Guilds:</span>
                <ul className="list-disc list-inside text-xs text-stone-600 space-y-1">
                  {state.textilesAndAttire.weavingTraditions.map((trad, i) => (
                    <li key={i}>{trad}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Arts & Crafts Grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-stone-900">Handicrafts & Artisanal Masterpieces</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {state.artsAndCrafts.map((craft) => (
                <div key={craft.id} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="text-[#1E3A5F] font-medium">{craft.type}</span>
                    {craft.geographicalIndication && (
                      <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold border border-amber-200">
                        GI Protected
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-serif font-bold text-stone-900">{craft.name}</h4>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">{craft.description}</p>
                  <p className="text-xs text-stone-500 pt-2 border-t border-stone-100">
                    <strong>Materials:</strong> {craft.materials.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Languages & Everyday Phrases */}
          <div className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#C85A32]" />
              <h3 className="text-2xl font-serif font-bold text-stone-900">Linguistic Heritage & Literature</h3>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {state.languagesAndLiterature.overview}
            </p>

            <div className="pt-2 space-y-2">
              <span className="text-xs font-semibold text-stone-800">Useful Travel Phrases for Visitors:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {state.languagesAndLiterature.usefulPhrases.map((phrase, i) => (
                  <div key={i} className="bg-white p-3 rounded-xl border border-stone-200 space-y-0.5">
                    <p className="text-xs font-bold text-stone-900">{phrase.phrase}</p>
                    <p className="text-[11px] text-stone-500">{phrase.meaning}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION 14 & 16: TRAVEL GUIDANCE, SAFETY & SOURCES */}
      {activeTab === 'guidance' && (
        <section className="space-y-10 animate-in fade-in">
          {/* Practical Guidance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200">
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-emerald-700 font-semibold">Visiting Logistics</span>
              <h3 className="text-xl font-serif font-bold text-stone-900">Season & Connectivity</h3>
              <p className="text-xs sm:text-sm text-stone-700">
                <strong>Best Overall Season:</strong> {state.travelGuidance.bestOverallSeason}
              </p>
              <p className="text-xs sm:text-sm text-stone-600">
                <strong>Connectivity:</strong> {state.travelGuidance.connectivity}
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-amber-700 font-semibold">Responsible Tourism</span>
              <h3 className="text-xl font-serif font-bold text-stone-900">Etiquette & Ecological Care</h3>
              <ul className="list-disc list-inside text-xs text-stone-600 space-y-1">
                {state.travelGuidance.localEtiquette.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Authoritative Citations & References */}
          <div className="bg-stone-50 p-6 sm:p-8 rounded-2xl border border-stone-200 space-y-4">
            <div className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-stone-600" />
              <h3 className="text-xl font-serif font-bold text-stone-900">Authoritative Sources & Citations</h3>
            </div>
            <p className="text-xs text-stone-600">
              Content verified against recognized government, academic, and heritage archives:
            </p>
            <div className="divide-y divide-stone-200">
              {state.references.map((ref, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-medium text-stone-800">{ref.title}</span>
                  <span className="text-stone-500 font-mono text-[11px]">{ref.authority}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title={`${state.name} — Cultural & Tourism Heritage`}
        url={currentUrl}
      />

      {/* Destination Monograph Modal */}
      <DestinationModal
        destination={inspectingDest}
        isOpen={Boolean(inspectingDest)}
        onClose={() => setInspectingDest(null)}
        isBookmarked={false}
        onToggleBookmark={() => {}}
        onAddToItinerary={(dest) => {
          if (onAddToItinerary) onAddToItinerary(dest);
        }}
        isInItinerary={inspectingDest ? itineraryDestIds.has(inspectingDest.id) : false}
      />
    </article>
  );
};
