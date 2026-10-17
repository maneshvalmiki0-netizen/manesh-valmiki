import React from 'react';
import { ShieldCheck, BookOpen, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C85A32] flex items-center justify-center text-white shadow-xs shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
              </div>
              <span className="font-serif text-xl font-bold text-white tracking-wide">
                Heritage Hub of India
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Discover India's Roots, Celebrate Its Diversity. A non-commercial digital encyclopedia organizing the architectural monuments, classical arts, cuisines, languages, and living traditions across all 28 states and 8 Union Territories.
            </p>
            <div className="flex items-center gap-3 text-xs text-stone-400 pt-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Research
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                ASI & UNESCO Aligned
              </span>
            </div>
          </div>

          {/* Quick Nav Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Explore Heritage</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('states')} className="hover:text-white transition-colors">
                  All 36 States & UTs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('heritage')} className="hover:text-white transition-colors">
                  UNESCO World Heritage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('culture')} className="hover:text-white transition-colors">
                  Performing Arts & Dance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('festivals')} className="hover:text-white transition-colors">
                  Festivals of India
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('food')} className="hover:text-white transition-colors">
                  Regional Cuisines
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('compare')} className="hover:text-white transition-colors">
                  Compare States
                </button>
              </li>
            </ul>
          </div>

          {/* Institutional & Editorial Col */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Editorial Standards</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About the Project
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Authoritative Sources
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Editorial Corrections Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Report Inaccuracy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Accessibility Statement
                </button>
              </li>
            </ul>
          </div>

          {/* Curator Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">Governance</h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-white transition-colors">
                  Curator & Admin Portal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('articles')} className="hover:text-white transition-colors">
                  Cultural Research Papers
                </button>
              </li>
              <li>
                <span className="text-stone-500">Ministry of Culture Citations</span>
              </li>
              <li>
                <span className="text-stone-500">Non-commercial Academic Use</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Heritage Hub of India. Dedicated to the celebration of Indian civilizational heritage.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-stone-400">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for cultural preservation
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
