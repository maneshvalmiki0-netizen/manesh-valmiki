import fs from 'fs';
import path from 'path';

// Helper to slugify
function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

interface RawDestination {
  name: string;
  nativeName?: string;
  state: string;
  stateSlug: string;
  district: string;
  cityOrTown: string;
  category: string;
  shortIntro: string;
  description: string;
  historicalBackground: string;
  culturalSignificance: string;
  architecturalCharacteristics: string;
  keyAttractions: string[];
  nearbyPlaces: { name: string; distance: string }[];
  visitorExperiences: string[];
  recommendedDuration: string;
  bestTimeToVisit: string;
  openingHours?: string;
  entryFees?: string;
  lat: number;
  lng: number;
  nearestAirport: string;
  nearestRailway: string;
  isUnesco?: boolean;
  isHiddenGem?: boolean;
  sourceAuthority: string;
}

// Write a modular TS file
export function writeDestinationFile(filePath: string, varName: string, items: any[]) {
  const code = `import type { DestinationDetail } from '../../types/heritage.ts';\n\nexport const ${varName}: DestinationDetail[] = ${JSON.stringify(items, null, 2)};\n`;
  fs.writeFileSync(filePath, code, 'utf-8');
  console.log(`Saved ${items.length} destinations to ${filePath}`);
}
