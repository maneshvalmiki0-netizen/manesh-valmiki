import React, { useState } from 'react';
import { Search, Compass, Sparkles, MapPin, ArrowRight, ShieldCheck, Landmark, Utensils, Music, BookOpen, Layers, Globe, Calendar, Award } from 'lucide-react';
import { getAllEntitiesSummary } from '../data/statesData.ts';
import { thematicItems, culturalArticles } from '../data/categoriesData.ts';
import { InteractiveMap } from '../components/InteractiveMap.tsx';
import { Region } from '../types/heritage.ts';
import { STATE_LANDMARK_BACKDROPS } from '../data/stateLandmarkBackdrops.ts';

interface HomeViewProps {
  onSelectState: (slug: string) => void;
  onOpenSearch: () => void;
  onNavigate: (route: string) => void;
}

const REGIONS: (Region | 'All')[] = ['All', 'North', 'South', 'East', 'West', 'Central', 'Northeast'];

export const HomeView: React.FC<HomeViewProps> = ({ onSelectState, onOpenSearch, onNavigate }) => {
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [stateSearchFilter, setStateSearchFilter] = useState('');
  const allSummaries = getAllEntitiesSummary();

  const filteredStates = allSummaries.filter(item => {
    const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;
    const matchesSearch = !stateSearchFilter || item.name.toLowerCase().includes(stateSearchFilter.toLowerCase()) || item.capital.toLowerCase().includes(stateSearchFilter.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const featuredMonuments = thematicItems.filter(t => t.category === 'Monuments').slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* A. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-amber-900/[0.04] via-transparent to-transparent">
        {/* Cultural Heritage Toran / Arch Accent */}
        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Sacred Sanskrit Invocation & Pan-India Cultural Emblem */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#A5431E] font-hindi text-xs sm:text-sm tracking-wider shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] animate-pulse" />
              <span>॥ सर्वे भवन्तु सुखिनः · वसुधैव कुटुम्बकम् · अतिथिदेवो भव ॥</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32] animate-pulse" />
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-stone-600 pt-1">
              <span className="text-[#C85A32] font-serif tracking-widest uppercase">Cultural Archive of the Republic of India</span>
              <span aria-hidden="true">·</span>
              <span>28 States</span>
              <span aria-hidden="true">·</span>
              <span>8 Union Territories</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-800 font-hindi">अनेकता में एकता</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.15] text-balance">
            Every State Has a Story. <br className="hidden sm:inline" />
            <span className="text-[#C85A32] italic font-normal">Discover India's Heritage.</span>
          </h1>

          {/* Supporting Text */}
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-600 leading-relaxed font-sans">
            Explore thousands of years of history, incredible destinations, vibrant cultures, ancient temples, traditional cuisines, festivals, languages, and the stories that make India extraordinary.
          </p>

          {/* Prominent Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div
              onClick={onOpenSearch}
              className="w-full p-2.5 sm:p-3 bg-white rounded-2xl shadow-lg border border-stone-200/90 flex items-center gap-3 cursor-pointer hover:border-[#C85A32] transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-500 group-hover:text-[#C85A32] group-hover:bg-[#C85A32]/10 transition-colors shrink-0">
                <Search className="w-5 h-5" />
              </div>
              <span className="text-sm sm:text-base text-stone-400 font-sans text-left flex-1 truncate">
                Search any state, monument, temple, festival, food, language or hidden gem…
              </span>
              <button
                type="button"
                className="px-5 py-2.5 bg-[#C85A32] text-white text-xs sm:text-sm font-medium rounded-xl hover:bg-[#A5431E] transition-colors shrink-0 font-sans"
              >
                Search Hub
              </button>
            </div>
          </div>

          {/* Three Functional Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('destinations')}
              className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#A5431E] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Explore 1,664+ Destinations</span>
            </button>
            <button
              onClick={() => onNavigate('multilingual')}
              className="px-5 py-2.5 bg-[#1E3A5F] hover:bg-[#162C49] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-md flex items-center gap-2"
            >
              <Globe className="w-4 h-4" />
              <span>Multilingual Explorer (12+ Languages)</span>
            </button>
            <button
              onClick={() => onNavigate('itinerary')}
              className="px-5 py-2.5 bg-white hover:bg-stone-50 text-stone-800 border border-stone-200 text-xs sm:text-sm font-medium rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>Curated Circuits & Trip Planner</span>
            </button>
          </div>

          {/* Three Pillar Cards Highlighting Key Database Upgrades */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 text-left max-w-5xl mx-auto">
            <div 
              onClick={() => onNavigate('destinations')}
              className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-stone-200/80 hover:border-[#C85A32] transition-all cursor-pointer group shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#C85A32] tracking-wider bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                  50+ Per State • 25+ Per UT
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#C85A32] group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors text-base">
                Pan-India Tourism Database
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                1,664+ verified destinations categorized into forts, rock-cut caves, ancient temples, stepwells, national parks, and artisan villages with district-level drilldown.
              </p>
            </div>

            <div 
              onClick={() => onNavigate('multilingual')}
              className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-stone-200/80 hover:border-[#1E3A5F] transition-all cursor-pointer group shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-sky-800 tracking-wider bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                  Bhasha Sangam • AI Localization
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-[#1E3A5F] group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 group-hover:text-[#1E3A5F] transition-colors text-base">
                Multilingual Cultural Explorer
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Browse Indian cultural wisdom, state names, and monuments in 12+ Indian scripts with authentic audio pronunciation and live AI Cultural Intelligence.
              </p>
            </div>

            <div 
              onClick={() => onNavigate('itinerary')}
              className="bg-white/90 backdrop-blur-xs p-5 rounded-2xl border border-stone-200/80 hover:border-emerald-700 transition-all cursor-pointer group shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Iconic Circuits & Day Trails
                </span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-serif font-bold text-stone-900 group-hover:text-emerald-700 transition-colors text-base">
                Curated Circuits & Trip Planner
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Golden Triangle, Hoysala Trail, Konkan Odyssey, and Buddhist routes with dish pairings and custom itinerary builder with print & PDF export.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* B. INTERACTIVE MAP SECTION */}
      <section id="interactive-map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">Spatial Heritage Navigation</span>
              <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">Interactive Map of India</h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Hover and select any state or territory node to launch its dedicated monograph
              </p>
            </div>

            {/* Region Filter Segmented Tabs */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl overflow-x-auto no-scrollbar">
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                    selectedRegion === region
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <InteractiveMap onSelectState={onSelectState} selectedRegion={selectedRegion} />
        </div>
      </section>

      {/* C. EXPLORE BY STATE & UNION TERRITORY GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-5">
          <div>
            <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">Comprehensive Directory</span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">All 28 States & 8 Union Territories</h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Select any region to explore its historical timeline, architecture, festivals, and culinary profile
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter states or capitals..."
                value={stateSearchFilter}
                onChange={(e) => setStateSearchFilter(e.target.value)}
                className="pl-9 pr-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden w-48 sm:w-60"
              />
            </div>
          </div>
        </div>

        {/* State Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStates.map((state) => (
            <div
              key={state.id}
              onClick={() => onSelectState(state.slug)}
              className="group bg-white rounded-2xl border border-stone-200/90 hover:border-stone-400 p-5 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Clean unboxed metadata with typographic separator */}
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#C85A32] font-medium">{state.region}</span>
                    <span aria-hidden="true">·</span>
                    <span className="uppercase text-[10px] text-stone-400">{state.type}</span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">
                    {state.languages.slice(0, 1)[0]}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors flex items-center justify-between">
                    <span>{state.name}</span>
                    <span className="text-xs font-serif text-stone-400 font-normal">{state.hindiName}</span>
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">Capital: {state.capital}</p>
                </div>

                {/* State Famous Wonder / Landmark */}
                {STATE_LANDMARK_BACKDROPS[state.slug] && (
                  <div className="flex items-center gap-1.5 text-[11px] text-[#A5431E] font-medium bg-amber-500/10 px-2 py-1 rounded-lg border border-amber-500/20">
                    <Landmark className="w-3 h-3 text-[#C85A32] shrink-0" />
                    <span className="truncate">
                      Wonder: <strong className="font-semibold text-stone-800">{STATE_LANDMARK_BACKDROPS[state.slug].famousPlace.split('&')[0].trim()}</strong>
                    </span>
                  </div>
                )}

                <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {state.tagline}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-700 group-hover:text-[#C85A32] transition-colors">
                <span>Explore Heritage Monograph</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* D. DISCOVER INDIA'S DIVERSITY THEMATIC SECTIONS */}
      <section className="bg-stone-100/70 py-16 border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">Living Civilizational Threads</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
              Discover India's Endless Diversity
            </h2>
            <p className="text-sm text-stone-600">
              Explore interconnected facets of culture spanning monumental architecture, performing arts, handloom weaving, sacred rituals, and regional culinary wisdom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              onClick={() => onNavigate('heritage')}
              className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-stone-400 transition-all cursor-pointer group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors">
                Monuments & UNESCO Sites
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                From ancient rock-cut cave temples of Ajanta to majestic Rajput fortresses and Chola granite vimanas.
              </p>
            </div>

            <div
              onClick={() => onNavigate('culture')}
              className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-stone-400 transition-all cursor-pointer group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors">
                Dance, Music & Theatre
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Bharatanatyam, Kathakali, Kathak, Odissi, Sattriya, and energetic folk traditions like Bhangra and Garba.
              </p>
            </div>

            <div
              onClick={() => onNavigate('food')}
              className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-stone-400 transition-all cursor-pointer group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors">
                Regional Traditional Cuisines
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Ayurvedic Kerala Sadyas, desert Dal Baati Churma, Hyderabadi Dum Biryani, and winter Sarson da Saag.
              </p>
            </div>

            <div
              onClick={() => onNavigate('festivals')}
              className="bg-white p-6 rounded-2xl border border-stone-200 hover:border-stone-400 transition-all cursor-pointer group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors">
                Festivals & Celebrations
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Kolkata’s UNESCO Durga Puja, desert camel fairs of Pushkar, harvest Onam boat races, and harvest Baisakhi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* E. FEATURED HERITAGE MONUMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-5">
          <div>
            <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">Curated Destinations</span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">Icons of Architectural Genius</h2>
          </div>
          <button
            onClick={() => onNavigate('heritage')}
            className="text-xs font-semibold text-[#C85A32] hover:text-[#A5431E] flex items-center gap-1"
          >
            <span>View all monuments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMonuments.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectState(item.stateSlug)}
              className="bg-white rounded-2xl border border-stone-200/90 overflow-hidden hover:border-stone-400 transition-all cursor-pointer group flex flex-col justify-between"
            >
              {/* Fallback Graphic Header */}
              <div className="h-40 bg-gradient-to-br from-stone-800 to-stone-900 p-5 flex flex-col justify-between text-white relative">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C85A32]" />
                    {item.state}
                  </span>
                  {item.unescoOrGI && (
                    <span className="text-amber-400 text-[10px] uppercase font-bold tracking-wider">UNESCO</span>
                  )}
                </div>
                <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#FDE68A] transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-[#C85A32]">
                  <span>Explore in {item.state}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* F. CULTURAL STORIES & ARTICLES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-stone-200 pb-5">
          <div>
            <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">Research & Monographic Essays</span>
            <h2 className="text-3xl font-serif font-bold text-stone-900 mt-1">Cultural Stories & Traditions</h2>
          </div>
          <button
            onClick={() => onNavigate('articles')}
            className="text-xs font-semibold text-[#C85A32] hover:text-[#A5431E] flex items-center gap-1"
          >
            <span>Read all articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {culturalArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onNavigate('articles')}
              className="bg-white rounded-2xl border border-stone-200 p-6 space-y-4 hover:border-stone-400 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="text-[#C85A32] font-medium">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>By {article.author}</span>
                <span className="font-medium text-[#C85A32] flex items-center gap-1">
                  Read Essay <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
