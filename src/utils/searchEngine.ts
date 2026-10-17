import { allStates, compactEntities } from '../data/statesData.ts';
import { thematicItems, culturalArticles } from '../data/categoriesData.ts';
import type { SearchResultItem, StateData, Region } from '../types/heritage.ts';

export interface SearchFilter {
  category?: string;
  region?: string;
}

export interface StateComparisonResult {
  stateA: {
    name: string;
    capital: string;
    region: Region;
    type: string;
    officialLanguages: string[];
    unescoDestinationsCount: number;
    totalDestinationsCount: number;
    festivalsCount: number;
    signatureDishes: string[];
    classicalDanceOrMusic: string[];
    majorTextiles: string[];
    symbols: {
      animal?: string;
      bird?: string;
      tree?: string;
      flower?: string;
    };
  };
  stateB: {
    name: string;
    capital: string;
    region: Region;
    type: string;
    officialLanguages: string[];
    unescoDestinationsCount: number;
    totalDestinationsCount: number;
    festivalsCount: number;
    signatureDishes: string[];
    classicalDanceOrMusic: string[];
    majorTextiles: string[];
    symbols: {
      animal?: string;
      bird?: string;
      tree?: string;
      flower?: string;
    };
  };
  commonPoints: string[];
  contrastPoints: string[];
}

// Global cached searchable items
let cachedSearchIndex: SearchResultItem[] | null = null;

export function getSearchIndex(): SearchResultItem[] {
  if (cachedSearchIndex) return cachedSearchIndex;

  const results: SearchResultItem[] = [];

  // Index detailed states
  allStates.forEach(s => {
    results.push({
      id: `state-${s.id}`,
      title: s.name,
      category: 'State / UT',
      stateName: s.name,
      stateSlug: s.slug,
      snippet: s.overview,
      region: s.region,
    });

    s.destinations.forEach(d => {
      results.push({
        id: `dest-${d.id}`,
        title: d.name,
        category: 'Destination',
        stateName: s.name,
        stateSlug: s.slug,
        snippet: `${d.category} in ${d.location}: ${d.description}`,
        region: s.region,
      });
    });

    s.festivals.forEach(f => {
      results.push({
        id: `fest-${f.id}`,
        title: f.name,
        category: 'Festival',
        stateName: s.name,
        stateSlug: s.slug,
        snippet: `${f.month}: ${f.description}`,
        region: s.region,
      });
    });

    s.cuisines.forEach(c => {
      results.push({
        id: `food-${c.id}`,
        title: c.name,
        category: 'Cuisine',
        stateName: s.name,
        stateSlug: s.slug,
        snippet: `${c.dietType} ${c.category}: ${c.description}`,
        region: s.region,
      });
    });

    s.performingArts.forEach(p => {
      results.push({
        id: `art-${p.id}`,
        title: p.name,
        category: 'Art & Dance',
        stateName: s.name,
        stateSlug: s.slug,
        snippet: `${p.type}: ${p.description}`,
        region: s.region,
      });
    });

    s.artsAndCrafts.forEach(cr => {
      results.push({
        id: `craft-${cr.id}`,
        title: cr.name,
        category: 'Craft',
        stateName: s.name,
        stateSlug: s.slug,
        snippet: `${cr.type}: ${cr.description}`,
        region: s.region,
      });
    });
  });

  // Index compact entities as well
  compactEntities.forEach(c => {
    results.push({
      id: `state-${c.id}`,
      title: c.name,
      category: 'State / UT',
      stateName: c.name,
      stateSlug: c.slug,
      snippet: `${c.tagline}. ${c.culturalHighlight}`,
      region: c.region,
    });

    c.keyMonuments.forEach((mon, i) => {
      results.push({
        id: `dest-${c.id}-${i}`,
        title: mon,
        category: 'Destination',
        stateName: c.name,
        stateSlug: c.slug,
        snippet: `Heritage landmark of ${c.name}`,
        region: c.region,
      });
    });

    results.push({
      id: `food-${c.id}`,
      title: c.signatureFood,
      category: 'Cuisine',
      stateName: c.name,
      stateSlug: c.slug,
      snippet: `Signature regional dish of ${c.name}`,
      region: c.region,
    });

    results.push({
      id: `art-${c.id}`,
      title: c.danceOrArt,
      category: 'Art & Dance',
      stateName: c.name,
      stateSlug: c.slug,
      snippet: `Cultural art form of ${c.name}`,
      region: c.region,
    });
  });

  // Index thematic items
  thematicItems.forEach(t => {
    results.push({
      id: `thematic-${t.id}`,
      title: t.title,
      category: t.category === 'Monuments' ? 'Destination' : t.category === 'Festivals' ? 'Festival' : t.category === 'Cuisines' ? 'Cuisine' : t.category === 'Performing Arts' ? 'Art & Dance' : t.category === 'Textiles & Crafts' ? 'Craft' : 'Language',
      stateName: t.state,
      stateSlug: t.stateSlug,
      snippet: `${t.tagline}. ${t.description}`,
      region: t.region,
    });
  });

  // Index articles
  culturalArticles.forEach(a => {
    results.push({
      id: `article-${a.id}`,
      title: a.title,
      category: 'Language',
      stateName: a.relatedStates[0] || 'India',
      stateSlug: (a.relatedStates[0] || 'rajasthan').toLowerCase().replace(/\s+/g, '-'),
      snippet: a.summary,
      region: 'North',
    });
  });

  cachedSearchIndex = results;
  return results;
}

export function searchHeritage(query: string, filters?: SearchFilter): SearchResultItem[] {
  const q = query.trim().toLowerCase();
  const allItems = getSearchIndex();

  if (!q && (!filters || (!filters.category && !filters.region))) {
    return allItems.slice(0, 20);
  }

  const terms = q.split(/\s+/).filter(Boolean);

  // Score and filter
  const scored = allItems.map(item => {
    // Check filters first
    if (filters?.category && filters.category !== 'All' && item.category !== filters.category) {
      return { item, score: -1 };
    }
    if (filters?.region && filters.region !== 'All' && item.region !== filters.region) {
      return { item, score: -1 };
    }

    if (!terms.length) {
      return { item, score: 1 };
    }

    let score = 0;
    const titleLower = item.title.toLowerCase();
    const stateLower = item.stateName.toLowerCase();
    const snippetLower = item.snippet.toLowerCase();

    for (const term of terms) {
      if (titleLower === term) {
        score += 50; // exact match
      } else if (titleLower.startsWith(term)) {
        score += 30; // prefix match
      } else if (titleLower.includes(term)) {
        score += 20; // substring match
      }

      if (stateLower === term) {
        score += 25;
      } else if (stateLower.includes(term)) {
        score += 15;
      }

      if (snippetLower.includes(term)) {
        score += 5;
      }
    }

    return { item, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.item);
}

export function compareTwoStates(stateA: StateData, stateB: StateData): StateComparisonResult {
  const commonPoints: string[] = [];
  const contrastPoints: string[] = [];

  if (stateA.region === stateB.region) {
    commonPoints.push(`Both states are part of the vibrant ${stateA.region} regional zone.`);
  } else {
    contrastPoints.push(`${stateA.name} is located in the ${stateA.region} zone, whereas ${stateB.name} is in the ${stateB.region} zone.`);
  }

  // Check language commonality
  const commonLangs = stateA.officialLanguages.filter(lang => stateB.officialLanguages.includes(lang));
  if (commonLangs.length > 0) {
    commonPoints.push(`Share official/administrative language usage: ${commonLangs.join(', ')}.`);
  } else {
    contrastPoints.push(`Distinct primary official languages: ${stateA.officialLanguages.join(', ')} (${stateA.name}) vs. ${stateB.officialLanguages.join(', ')} (${stateB.name}).`);
  }

  // Compare UNESCO sites
  const unescoA = stateA.destinations.filter(d => d.isUnesco).length;
  const unescoB = stateB.destinations.filter(d => d.isUnesco).length;
  if (unescoA > 0 && unescoB > 0) {
    commonPoints.push(`Both host UNESCO World Heritage properties (${unescoA} in ${stateA.name}, ${unescoB} in ${stateB.name}).`);
  }

  return {
    stateA: {
      name: stateA.name,
      capital: stateA.capital,
      region: stateA.region,
      type: stateA.type === 'state' ? 'State' : 'Union Territory',
      officialLanguages: stateA.officialLanguages,
      unescoDestinationsCount: unescoA,
      totalDestinationsCount: stateA.destinations.length,
      festivalsCount: stateA.festivals.length,
      signatureDishes: stateA.cuisines.map(c => c.name),
      classicalDanceOrMusic: stateA.performingArts.map(p => p.name),
      majorTextiles: stateA.textilesAndAttire.items,
      symbols: stateA.symbols,
    },
    stateB: {
      name: stateB.name,
      capital: stateB.capital,
      region: stateB.region,
      type: stateB.type === 'state' ? 'State' : 'Union Territory',
      officialLanguages: stateB.officialLanguages,
      unescoDestinationsCount: unescoB,
      totalDestinationsCount: stateB.destinations.length,
      festivalsCount: stateB.festivals.length,
      signatureDishes: stateB.cuisines.map(c => c.name),
      classicalDanceOrMusic: stateB.performingArts.map(p => p.name),
      majorTextiles: stateB.textilesAndAttire.items,
      symbols: stateB.symbols,
    },
    commonPoints,
    contrastPoints,
  };
}
