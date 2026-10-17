import React, { useState } from 'react';
import { ArrowLeftRight, Landmark, Utensils, Music, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { allStates, compactEntities, getStateBySlug } from '../data/statesData.ts';
import { compareTwoStates } from '../utils/searchEngine.ts';

interface CompareViewProps {
  onNavigateToState: (slug: string) => void;
}

export const CompareView: React.FC<CompareViewProps> = ({ onNavigateToState }) => {
  const [slugA, setSlugA] = useState('rajasthan');
  const [slugB, setSlugB] = useState('kerala');

  const stateA = getStateBySlug(slugA);
  const stateB = getStateBySlug(slugB);

  const allAvailable = [
    ...allStates.map(s => ({ slug: s.slug, name: s.name, region: s.region })),
    ...compactEntities.map(c => ({ slug: c.slug, name: c.name, region: c.region })),
  ].sort((a, b) => a.name.localeCompare(b.name));

  const comparison = stateA && stateB ? compareTwoStates(stateA, stateB) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-wider">Comparative Cultural Analytics</span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
          Compare Indian States & Territories
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Select any two regions to examine their distinct linguistic foundations, architectural heritage, culinary traditions, and shared civilizational threads.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="w-full sm:w-1/2 space-y-2">
          <label className="text-xs font-semibold text-stone-700 block">Select First Region (A)</label>
          <select
            value={slugA}
            onChange={(e) => setSlugA(e.target.value)}
            className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden"
          >
            {allAvailable.map((item) => (
              <option key={item.slug} value={item.slug} disabled={item.slug === slugB}>
                {item.name} ({item.region})
              </option>
            ))}
          </select>
        </div>

        <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 shrink-0">
          <ArrowLeftRight className="w-5 h-5" />
        </div>

        <div className="w-full sm:w-1/2 space-y-2">
          <label className="text-xs font-semibold text-stone-700 block">Select Second Region (B)</label>
          <select
            value={slugB}
            onChange={(e) => setSlugB(e.target.value)}
            className="w-full p-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-hidden"
          >
            {allAvailable.map((item) => (
              <option key={item.slug} value={item.slug} disabled={item.slug === slugA}>
                {item.name} ({item.region})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Matrix */}
      {comparison && stateA && stateB && (
        <div className="space-y-8 animate-in fade-in">
          {/* Curatorial Insights: Common vs Contrast */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/70 p-6 rounded-2xl border border-emerald-200/80 space-y-3">
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">Shared Cultural Harmony</span>
              <h3 className="font-serif font-bold text-lg text-emerald-950">Common Ground & Parallels</h3>
              <ul className="space-y-2 text-xs text-emerald-900">
                {comparison.commonPoints.length > 0 ? (
                  comparison.commonPoints.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))
                ) : (
                  <li>Each region preserves unique regional nuances within the broader Indian civilizational umbrella.</li>
                )}
              </ul>
            </div>

            <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200/80 space-y-3">
              <span className="text-xs font-semibold text-amber-800 uppercase tracking-wider">Regional Distinctiveness</span>
              <h3 className="font-serif font-bold text-lg text-amber-950">Contrasts & Diversity</h3>
              <ul className="space-y-2 text-xs text-amber-900">
                {comparison.contrastPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-1.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Side-by-Side Detailed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Column A */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-xs">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs uppercase text-[#C85A32] font-semibold">{comparison.stateA.region} India</span>
                <h2 className="text-3xl font-serif font-bold text-stone-900 mt-0.5">{comparison.stateA.name}</h2>
                <p className="text-xs text-stone-500 mt-1">Capital: <strong>{comparison.stateA.capital}</strong></p>
                <button
                  onClick={() => onNavigateToState(stateA.slug)}
                  className="mt-3 text-xs font-semibold text-[#C85A32] hover:underline"
                >
                  View Full {comparison.stateA.name} Monograph →
                </button>
              </div>

              {/* Attributes */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-semibold text-stone-800 block">Languages:</span>
                  <p className="text-stone-600">{comparison.stateA.officialLanguages.join(', ')}</p>
                </div>

                <div>
                  <span className="font-semibold text-stone-800 block">Heritage Monuments:</span>
                  <p className="text-stone-600">
                    {comparison.stateA.totalDestinationsCount} documented sites ({comparison.stateA.unescoDestinationsCount} UNESCO properties)
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-stone-800 block">Signature Cuisines:</span>
                  <p className="text-stone-600">{comparison.stateA.signatureDishes.join(', ') || 'Regional specialties'}</p>
                </div>

                <div>
                  <span className="font-semibold text-stone-800 block">Performing Arts:</span>
                  <p className="text-stone-600">{comparison.stateA.classicalDanceOrMusic.join(', ') || 'Traditional folk arts'}</p>
                </div>

                <div>
                  <span className="font-semibold text-stone-800 block">State Animal:</span>
                  <p className="text-stone-600">{comparison.stateA.symbols.animal || 'Protected native fauna'}</p>
                </div>
              </div>
            </div>

            {/* Column B */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-xs">
              <div className="border-b border-stone-200 pb-4">
                <span className="text-xs uppercase text-[#1E3A5F] font-semibold">{comparison.stateB.region} India</span>
                <h2 className="text-3xl font-serif font-bold text-stone-900 mt-0.5">{comparison.stateB.name}</h2>
                <p className="text-xs text-stone-500 mt-1">Capital: <strong>{comparison.stateB.capital}</strong></p>
                <button
                  onClick={() => onNavigateToState(stateB.slug)}
                  className="mt-3 text-xs font-semibold text-[#1E3A5F] hover:underline"
                >
                  View Full {comparison.stateB.name} Monograph →
                </button>
              </div>

              {/* Attributes */}
              <div className="space-y-4 text-xs">
                <div>
                  <span className="font-semibold text-stone-800 block">Languages:</span>
                  <p className="text-stone-600">{comparison.stateB.officialLanguages.join(', ')}</p>
                </div>

                <div>
                  <span className="font-semibold text-stone-800 block">Heritage Monuments:</span>
                  <p className="text-stone-600">
                    {comparison.stateB.totalDestinationsCount} documented sites ({comparison.stateB.unescoDestinationsCount} UNESCO properties)
                  </p>
                </div>

                <div>
                  <span className="font-semibold text-stone-800 block">Signature Cuisines:</span>
                  <p className="text-stone-600">{comparison.stateB.signatureDishes.join(', ') || 'Regional specialties'}</p>
                </div>

                <div>
                  <span className="font-semibold text-stone-800 block">Performing Arts:</span>
                  <p className="text-stone-600">{comparison.stateB.classicalDanceOrMusic.join(', ') || 'Traditional folk arts'}</p>
                </div>

                <div>
                  <span className="font-semibold text-stone-800 block">State Animal:</span>
                  <p className="text-stone-600">{comparison.stateB.symbols.animal || 'Protected native fauna'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
