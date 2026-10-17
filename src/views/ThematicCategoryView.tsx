import React, { useState } from 'react';
import { Search, MapPin, ArrowRight, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { thematicItems, ThematicItem } from '../data/categoriesData.ts';
import { Region } from '../types/heritage.ts';

interface ThematicCategoryViewProps {
  initialCategory?: 'Monuments' | 'Festivals' | 'Cuisines' | 'Performing Arts' | 'Textiles & Crafts' | 'Languages';
  onNavigateToState: (slug: string) => void;
}

const CATEGORIES: ('Monuments' | 'Festivals' | 'Cuisines' | 'Performing Arts' | 'Textiles & Crafts' | 'Languages')[] = [
  'Monuments',
  'Festivals',
  'Cuisines',
  'Performing Arts',
  'Textiles & Crafts',
  'Languages',
];

const REGIONS: (Region | 'All')[] = ['All', 'North', 'South', 'East', 'West', 'Central', 'Northeast'];

export const ThematicCategoryView: React.FC<ThematicCategoryViewProps> = ({
  initialCategory = 'Monuments',
  onNavigateToState,
}) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedRegion, setSelectedRegion] = useState<Region | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = thematicItems.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesRegion = selectedRegion === 'All' || item.region === selectedRegion;
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesRegion && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">Pan-Indian Heritage Archives</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          Thematic Cultural Explorer
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Cross state boundaries to discover India’s architectural marvels, culinary traditions, sacred festivals, performing arts, and linguistic treasures.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-1.5 p-1.5 bg-stone-100 rounded-2xl max-w-3xl mx-auto overflow-x-auto no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
              activeCategory === cat
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search & Region Filters */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={`Search ${activeCategory}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-hidden"
          />
        </div>

        {/* Region filter pills */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-stone-400 ml-1 mr-1 shrink-0" />
          {REGIONS.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedRegion === reg
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-50 text-stone-600 hover:bg-stone-100 border border-stone-200/80'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigateToState(item.stateSlug)}
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between space-y-4 hover:border-stone-400 transition-all cursor-pointer group shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span className="font-medium text-stone-800">{item.state}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.region}</span>
                  </div>
                  {item.unescoOrGI && (
                    <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md text-[10px] uppercase font-bold tracking-wider border border-amber-200">
                      UNESCO / GI
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors">
                    {item.title}
                  </h3>
                  {item.hindiTitle && (
                    <p className="text-xs font-serif text-stone-400 mt-0.5">{item.hindiTitle}</p>
                  )}
                </div>

                <p className="text-xs font-medium text-[#C85A32] italic">
                  "{item.tagline}"
                </p>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 space-y-3">
                <p className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                  <strong>Significance:</strong> {item.significance}
                </p>

                <div className="flex items-center justify-between text-xs font-medium text-stone-700 group-hover:text-[#C85A32] transition-colors">
                  <span>Explore in {item.state}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 space-y-3">
            <Sparkles className="w-8 h-8 mx-auto text-stone-300" />
            <p className="text-base font-serif font-semibold text-stone-800">No items match your criteria</p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Try adjusting the regional filter or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
