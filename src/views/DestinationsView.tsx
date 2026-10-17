import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, MapPin, Award, Sparkles, PlusCircle, Check, 
  Bookmark, ChevronLeft, ChevronRight, Layers, SlidersHorizontal, RotateCcw, 
  Eye, Volume2
} from 'lucide-react';
import { 
  allDestinations, getDistrictsForState, getDestinationsStats 
} from '../data/destinationsDatabase.ts';
import { getAllEntitiesSummary } from '../data/statesData.ts';
import { DESTINATION_CATEGORIES, DestinationDetail } from '../types/heritage.ts';
import { DestinationModal } from '../components/DestinationModal.tsx';
import { speakText } from '../utils/speechSynthesis.ts';

interface DestinationsViewProps {
  onAddToItinerary: (destination: DestinationDetail) => void;
  itineraryDestIds: Set<string>;
  bookmarks: string[];
  onToggleBookmark: (destination: DestinationDetail) => void;
  onNavigateToState: (slug: string) => void;
  initialStateFilter?: string;
}

export const DestinationsView: React.FC<DestinationsViewProps> = ({
  onAddToItinerary,
  itineraryDestIds,
  bookmarks,
  onToggleBookmark,
  onNavigateToState,
  initialStateFilter = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState(initialStateFilter);
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [unescoOnly, setUnescoOnly] = useState(false);
  const [hiddenGemsOnly, setHiddenGemsOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [inspectDestination, setInspectDestination] = useState<DestinationDetail | null>(null);

  const PAGE_SIZE = 24;

  const stats = useMemo(() => getDestinationsStats(), []);
  const allStatesSummary = useMemo(() => getAllEntitiesSummary(), []);

  // Available districts for the selected state
  const availableDistricts = useMemo(() => {
    if (selectedState === 'all') return [];
    return getDistrictsForState(selectedState);
  }, [selectedState]);

  // Handle state filter change
  const handleStateChange = (stateSlug: string) => {
    setSelectedState(stateSlug);
    setSelectedDistrict('all');
    setCurrentPage(1);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedState('all');
    setSelectedDistrict('all');
    setSelectedCategory('all');
    setUnescoOnly(false);
    setHiddenGemsOnly(false);
    setCurrentPage(1);
  };

  // Filtered destinations
  const filteredDestinations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return allDestinations.filter(d => {
      if (selectedState !== 'all' && d.stateSlug !== selectedState) return false;
      if (selectedDistrict !== 'all' && d.district.toLowerCase() !== selectedDistrict.toLowerCase()) return false;
      if (selectedCategory !== 'all' && d.category !== selectedCategory) return false;
      if (unescoOnly && !d.isUnesco) return false;
      if (hiddenGemsOnly && !d.isHiddenGem) return false;

      if (q) {
        const matchName = d.name.toLowerCase().includes(q);
        const matchNative = d.nativeName?.toLowerCase().includes(q);
        const matchDistrict = d.district.toLowerCase().includes(q);
        const matchState = d.state.toLowerCase().includes(q);
        const matchCat = d.category.toLowerCase().includes(q);
        const matchIntro = d.shortIntro ? d.shortIntro.toLowerCase().includes(q) : false;
        if (!matchName && !matchNative && !matchDistrict && !matchState && !matchCat && !matchIntro) {
          return false;
        }
      }
      return true;
    });
  }, [searchQuery, selectedState, selectedDistrict, selectedCategory, unescoOnly, hiddenGemsOnly]);

  // Paginated slice
  const totalPages = Math.ceil(filteredDestinations.length / PAGE_SIZE) || 1;
  const paginatedDestinations = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredDestinations.slice(start, start + PAGE_SIZE);
  }, [filteredDestinations, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-stone-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#C85A32]/20 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-[#C85A32]" />
            All-India Centralized Tourism Database
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Comprehensive Heritage Directory
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Search, filter, and discover over 1,664 verified forts, ancient temples, UNESCO world heritage sites, palaces, waterfalls, wildlife sanctuaries, and off-beat cultural treasures across all 36 Indian states and union territories.
          </p>

          {/* Key Metrics */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="block text-stone-400 font-medium">Destinations</span>
              <strong className="text-lg font-serif text-white">{stats.totalDestinations.toLocaleString()}</strong>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="block text-stone-400 font-medium">States & UTs</span>
              <strong className="text-lg font-serif text-white">{stats.statesCovered}</strong>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="block text-stone-400 font-medium">Districts Covered</span>
              <strong className="text-lg font-serif text-white">{stats.districtsCovered}</strong>
            </div>
            <div className="bg-white/5 backdrop-blur-xs p-3 rounded-xl border border-white/10">
              <span className="block text-stone-400 font-medium">UNESCO Properties</span>
              <strong className="text-lg font-serif text-amber-300">{stats.unescoCount}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Control Panel */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by monument name, district, keyword (e.g. 'Ajanta', 'Stepwell', 'Tiger', 'Chola', 'Gopuram')…"
            className="w-full pl-11 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder:text-stone-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#C85A32] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Dropdowns & Checkbox Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* State Filter */}
          <div className="space-y-1">
            <label className="font-semibold text-stone-700">State / Territory</label>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-800 text-xs focus:ring-2 focus:ring-[#C85A32] focus:outline-hidden"
            >
              <option value="all">All States & Territories (36)</option>
              {allStatesSummary.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name} ({s.region})
                </option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div className="space-y-1">
            <label className="font-semibold text-stone-700">
              District {selectedState !== 'all' && `(${availableDistricts.length})`}
            </label>
            <select
              value={selectedDistrict}
              disabled={selectedState === 'all'}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-800 text-xs disabled:bg-stone-100 disabled:text-stone-400 focus:ring-2 focus:ring-[#C85A32] focus:outline-hidden"
            >
              <option value="all">
                {selectedState === 'all' ? 'Select a state first' : 'All Districts'}
              </option>
              {availableDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div className="space-y-1">
            <label className="font-semibold text-stone-700">Heritage Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full p-2.5 bg-white border border-stone-200 rounded-lg text-stone-800 text-xs focus:ring-2 focus:ring-[#C85A32] focus:outline-hidden"
            >
              <option value="all">All 22 Categories</option>
              {DESTINATION_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Toggles & Reset */}
          <div className="flex flex-col justify-end space-y-2">
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-1.5 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={unescoOnly}
                  onChange={(e) => {
                    setUnescoOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded border-stone-300 text-[#C85A32] focus:ring-[#C85A32]"
                />
                <span className="font-medium text-[11px]">UNESCO Only</span>
              </label>

              <label className="inline-flex items-center gap-1.5 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={hiddenGemsOnly}
                  onChange={(e) => {
                    setHiddenGemsOnly(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="rounded border-stone-300 text-[#C85A32] focus:ring-[#C85A32]"
                />
                <span className="font-medium text-[11px]">Hidden Gems</span>
              </label>

              <button
                onClick={handleResetFilters}
                className="ml-auto inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-900"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-200">
        <p>
          Showing <strong>{filteredDestinations.length.toLocaleString()}</strong> verified destinations
          {selectedState !== 'all' && ` in ${selectedState}`}
        </p>

        <span className="text-stone-400">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Destination Grid */}
      {paginatedDestinations.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
          <SlidersHorizontal className="w-8 h-8 text-stone-300 mx-auto" />
          <h3 className="text-xl font-serif font-bold text-stone-800">No destinations match your filters</h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto">
            Try resetting your search query, or selecting "All States" and "All Categories".
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-[#C85A32] text-white rounded-lg text-xs font-medium hover:bg-[#b54f2a]"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedDestinations.map((dest) => {
            const isBookmarked = bookmarks.includes(dest.id);
            const isInItinerary = itineraryDestIds.has(dest.id);

            return (
              <div
                key={dest.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow group"
              >
                <div className="space-y-2.5">
                  {/* Category Ribbon */}
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-stone-100 text-[#C85A32] border border-stone-200 truncate">
                      {dest.category}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {dest.isUnesco && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          UNESCO
                        </span>
                      )}
                      {dest.isHiddenGem && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          Hidden Gem
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <h3 className="text-lg font-serif font-bold text-stone-900 group-hover:text-[#C85A32] transition-colors line-clamp-1">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-stone-400 font-serif">
                      {dest.nativeName}
                    </p>
                  </div>

                  {/* Geo Context */}
                  <div className="flex items-center gap-1 text-xs text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                    <span className="font-medium text-stone-700">{dest.district}</span>
                    <span>•</span>
                    <button
                      onClick={() => onNavigateToState(dest.stateSlug)}
                      className="hover:underline text-stone-600 hover:text-stone-900"
                    >
                      {dest.state}
                    </button>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {dest.shortIntro}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setInspectDestination(dest)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-800 hover:text-[#C85A32] transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Details</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => speakText(dest.nativeName || dest.name, 'hi')}
                      title="Pronounce name"
                      className="p-1.5 rounded-md hover:bg-stone-100 text-stone-400 hover:text-stone-700 border border-stone-200"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onToggleBookmark(dest)}
                      title={isBookmarked ? 'Saved' : 'Bookmark'}
                      className={`p-1.5 rounded-md border transition-colors ${
                        isBookmarked 
                          ? 'bg-[#C85A32] text-white border-[#C85A32]' 
                          : 'hover:bg-stone-100 border-stone-200 text-stone-600'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                    </button>

                    <button
                      onClick={() => onAddToItinerary(dest)}
                      title={isInItinerary ? 'In Itinerary' : 'Add to Trip'}
                      className={`px-2.5 py-1 rounded-md text-xs font-medium border flex items-center gap-1 transition-colors ${
                        isInItinerary
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-stone-900 text-white hover:bg-stone-800 border-stone-900'
                      }`}
                    >
                      {isInItinerary ? <Check className="w-3 h-3" /> : <PlusCircle className="w-3 h-3" />}
                      <span>{isInItinerary ? 'Added' : 'Trip'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-6">
          <button
            onClick={() => {
              setCurrentPage(p => Math.max(1, p - 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-stone-200 disabled:opacity-40 hover:bg-stone-50 text-stone-700"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="px-4 py-2 text-xs font-medium text-stone-700 bg-white border border-stone-200 rounded-lg">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => {
              setCurrentPage(p => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 300, behavior: 'smooth' });
            }}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-stone-200 disabled:opacity-40 hover:bg-stone-50 text-stone-700"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Detailed Destination Modal */}
      <DestinationModal
        destination={inspectDestination}
        isOpen={Boolean(inspectDestination)}
        onClose={() => setInspectDestination(null)}
        isBookmarked={inspectDestination ? bookmarks.includes(inspectDestination.id) : false}
        onToggleBookmark={() => inspectDestination && onToggleBookmark(inspectDestination)}
        onAddToItinerary={onAddToItinerary}
        isInItinerary={inspectDestination ? itineraryDestIds.has(inspectDestination.id) : false}
      />
    </div>
  );
};
