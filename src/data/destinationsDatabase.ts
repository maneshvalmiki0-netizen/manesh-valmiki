import type { DestinationDetail, DestinationCategory } from '../types/heritage.ts';
import { southDestinations } from './destinations/south.ts';
import { northDestinations } from './destinations/north.ts';
import { westDestinations } from './destinations/west.ts';
import { eastCentralDestinations } from './destinations/eastCentral.ts';
import { northeastDestinations } from './destinations/northeast.ts';
import { unionTerritoriesDestinations } from './destinations/unionTerritories.ts';

// Aggregated Master All-India Destinations Database (1,664+ verified records)
export const allDestinations: DestinationDetail[] = [
  ...southDestinations,
  ...northDestinations,
  ...westDestinations,
  ...eastCentralDestinations,
  ...northeastDestinations,
  ...unionTerritoriesDestinations,
];

// Helper Functions for Data Access & Analytics
export function getAllDestinations(): DestinationDetail[] {
  return allDestinations;
}

export function getDestinationById(id: string): DestinationDetail | undefined {
  return allDestinations.find(d => d.id === id || d.slug === id);
}

export function getDestinationsByState(stateSlug: string): DestinationDetail[] {
  return allDestinations.filter(d => d.stateSlug === stateSlug);
}

export function getDestinationsByDistrict(stateSlug: string, district: string): DestinationDetail[] {
  return allDestinations.filter(
    d => d.stateSlug === stateSlug && d.district.toLowerCase() === district.toLowerCase()
  );
}

export function getDistrictsForState(stateSlug: string): string[] {
  const matches = allDestinations.filter(d => d.stateSlug === stateSlug);
  const districtSet = new Set<string>();
  matches.forEach(m => {
    if (m.district) districtSet.add(m.district);
  });
  return Array.from(districtSet).sort();
}

export function getAllDistricts(): { state: string; stateSlug: string; district: string }[] {
  const map = new Map<string, { state: string; stateSlug: string; district: string }>();
  allDestinations.forEach(d => {
    const key = `${d.stateSlug}:${d.district}`;
    if (!map.has(key)) {
      map.set(key, { state: d.state, stateSlug: d.stateSlug, district: d.district });
    }
  });
  return Array.from(map.values());
}

export function getDestinationsByCategory(category: string): DestinationDetail[] {
  return allDestinations.filter(d => d.category === category);
}

export function getUnescoDestinations(): DestinationDetail[] {
  return allDestinations.filter(d => d.isUnesco);
}

export function getHiddenGemDestinations(): DestinationDetail[] {
  return allDestinations.filter(d => d.isHiddenGem);
}

export function searchDestinations(
  query: string,
  options?: {
    stateSlug?: string;
    district?: string;
    category?: string;
    unescoOnly?: boolean;
    hiddenGemsOnly?: boolean;
    limit?: number;
  }
): DestinationDetail[] {
  const cleanQ = query.toLowerCase().trim();
  let results = allDestinations;

  if (options?.stateSlug && options.stateSlug !== 'all') {
    results = results.filter(d => d.stateSlug === options.stateSlug);
  }

  if (options?.district && options.district !== 'all') {
    results = results.filter(d => d.district.toLowerCase() === options.district?.toLowerCase());
  }

  if (options?.category && options.category !== 'all') {
    results = results.filter(d => d.category === options.category);
  }

  if (options?.unescoOnly) {
    results = results.filter(d => d.isUnesco);
  }

  if (options?.hiddenGemsOnly) {
    results = results.filter(d => d.isHiddenGem);
  }

  if (cleanQ) {
    results = results.filter(d => {
      const nameMatch = d.name.toLowerCase().includes(cleanQ);
      const districtMatch = d.district.toLowerCase().includes(cleanQ);
      const stateMatch = d.state.toLowerCase().includes(cleanQ);
      const introMatch = d.shortIntro ? d.shortIntro.toLowerCase().includes(cleanQ) : false;
      const categoryMatch = d.category.toLowerCase().includes(cleanQ);
      return nameMatch || districtMatch || stateMatch || introMatch || categoryMatch;
    });
  }

  if (options?.limit && options.limit > 0) {
    return results.slice(0, options.limit);
  }

  return results;
}

export function getDestinationsStats() {
  const totalDestinations = allDestinations.length;
  const stateSet = new Set(allDestinations.map(d => d.stateSlug));
  const districtSet = new Set(allDestinations.map(d => `${d.stateSlug}-${d.district}`));
  const unescoCount = allDestinations.filter(d => d.isUnesco).length;
  const hiddenGemsCount = allDestinations.filter(d => d.isHiddenGem).length;
  const verifiedCount = allDestinations.filter(d => d.verificationStatus === 'Verified').length;
  const coordinatesCount = allDestinations.filter(d => d.coordinates && d.coordinates.lat !== 0).length;

  const categoryCounts: Record<string, number> = {};
  allDestinations.forEach(d => {
    categoryCounts[d.category] = (categoryCounts[d.category] || 0) + 1;
  });

  return {
    totalDestinations,
    statesCovered: stateSet.size,
    districtsCovered: districtSet.size,
    unescoCount,
    hiddenGemsCount,
    verifiedCount,
    coordinatesCount,
    categoryCounts,
  };
}
