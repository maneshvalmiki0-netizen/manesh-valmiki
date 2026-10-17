import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Sparkles, ArrowRight } from 'lucide-react';
import { searchHeritage } from '../utils/searchEngine.ts';
import { SearchResultItem } from '../types/heritage.ts';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (stateSlug: string, category?: string) => void;
}

const CATEGORIES = ['All', 'State / UT', 'Destination', 'Festival', 'Cuisine', 'Art & Dance', 'Craft'];

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onSelectResult }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setResults(searchHeritage('', { category: selectedCategory === 'All' ? undefined : selectedCategory }));
    } else {
      setQuery('');
    }
  }, [isOpen, selectedCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isOpen && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        // opened from parent via shortcut
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSearchChange = (val: string) => {
    setQuery(val);
    const res = searchHeritage(val, {
      category: selectedCategory === 'All' ? undefined : selectedCategory,
    });
    setResults(res);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/40 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search any state, monument, temple, festival, dish, or craft..."
            className="w-full text-base bg-transparent focus:outline-hidden placeholder:text-stone-400 text-stone-900"
          />
          {query && (
            <button
              onClick={() => handleSearchChange('')}
              className="p-1 text-stone-400 hover:text-stone-600 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md border border-stone-200">
            ESC
          </kbd>
        </div>

        {/* Filter Pills (Interactive Filter Controls as functional buttons) */}
        <div className="px-4 py-2 bg-stone-50 border-b border-stone-200 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-stone-200/60 border border-stone-200/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Stream */}
        <div className="overflow-y-auto p-3 divide-y divide-stone-100 flex-1">
          {results.length > 0 ? (
            results.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSelectResult(item.stateSlug, item.category);
                  onClose();
                }}
                className="w-full text-left p-3 rounded-xl hover:bg-stone-50 transition-colors flex items-start justify-between gap-4 group"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="font-medium text-[#C85A32]">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {item.stateName}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{item.region}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-stone-900 group-hover:text-[#C85A32] transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {item.snippet}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-700 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </button>
            ))
          ) : (
            <div className="text-center py-12 space-y-3">
              <Sparkles className="w-8 h-8 mx-auto text-stone-300" />
              <p className="text-sm font-medium text-stone-700">No matching cultural records found</p>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Try searching for "Taj Mahal", "Biryani", "Kathakali", "Rajasthan", or "Hampi".
              </p>
            </div>
          )}
        </div>

        {/* Footer guidance */}
        <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
          <span>Search across 28 states, 8 union territories & 100+ cultural topics</span>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
};
