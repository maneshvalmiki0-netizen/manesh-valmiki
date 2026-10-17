export const REGIONS = ['North', 'South', 'East', 'West', 'Central', 'Northeast'] as const;
export type Region = (typeof REGIONS)[number];

export type EntityType = 'state' | 'ut';

export const DESTINATION_CATEGORIES = [
  'Historic Forts & Bastions',
  'Ancient Temples & Sacred Sanctuaries',
  'UNESCO World Heritage Sites',
  'Royal Palaces & Historic Havelis',
  'Rock-Cut Caves, Stepwells & Inscriptions',
  'Archaeological Sites & Ancient Cities',
  'Museums & Cultural Archives',
  'Hill Stations, Peaks & Mountain Valleys',
  'Waterfalls, Lakes & River Ghats',
  'National Parks & Wildlife Corridors',
  'Beaches & Coastal Heritage',
  'Religious Pilgrimage Centres',
  'Tribal & Indigenous Settlements',
  'Traditional Villages & Rural Living Heritage',
  'Handicraft Centres & Artisan Guilds',
  'Historic Bazaars & Traditional Food Streets',
  'Botanical Gardens & Royal Landscaped Grounds',
  'Colonial Landmarks & Historic Railways',
  'Freedom Struggle Memorials & Reformer Landmarks',
  'Hidden Heritage Gems',
  'Scenic Viewpoints & Geological Wonders',
  'Art Galleries, Theatres & Cultural Centres',
] as const;

export type DestinationCategory = (typeof DESTINATION_CATEGORIES)[number];

export interface StateSymbols {
  animal?: string;
  bird?: string;
  tree?: string;
  flower?: string;
}

export interface HistoricalEra {
  era: string;
  period: string;
  description: string;
  keyEvents: string[];
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface TransportGuidance {
  nearestAirport?: string;
  nearestRailway?: string;
  roadAccess?: string;
  localTransit?: string;
}

export interface DestinationDetail {
  id: string;
  slug: string;
  name: string;
  nativeName?: string;
  scriptName?: string;
  transliteration?: string;
  state: string;
  stateSlug: string;
  district: string;
  cityOrTown: string;
  category: DestinationCategory;
  shortIntro?: string;
  description: string;
  historicalBackground: string;
  culturalSignificance: string;
  architecturalCharacteristics: string;
  keyAttractions: string[];
  nearbyPlaces: { name: string; distance: string; destinationId?: string }[];
  visitorExperiences: string[];
  recommendedDuration: string;
  bestTimeToVisit: string;
  openingHours?: string;
  weeklyClosure?: string;
  entryFees?: string;
  coordinates: Coordinates;
  transportGuidance: TransportGuidance;
  visitorRules?: string[];
  conservationNotes?: string;
  foodAndStayGuidance?: string;
  isUnesco?: boolean;
  isHiddenGem?: boolean;
  verificationStatus: 'Verified' | 'Under Review';
  lastReviewed: string;
  sources: { title: string; authority: string; url?: string }[];
  imageCaption?: string;
}

export interface Destination {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  historicalSignificance: string;
  bestTimeToVisit: string;
  visitorTips: string;
  isUnesco?: boolean;
  isHiddenGem?: boolean;
}

export interface Festival {
  id: string;
  name: string;
  regionalName?: string;
  month: string;
  description: string;
  culturalSignificance: string;
  ritualsAndPractices: string;
  specialFoods: string[];
}

export interface Dish {
  id: string;
  name: string;
  category: 'Breakfast' | 'Main Course' | 'Sweet / Dessert' | 'Snack' | 'Beverage';
  dietType: 'Vegetarian' | 'Vegan' | 'Non-Vegetarian';
  description: string;
  ingredients: string[];
  culturalContext: string;
}

export interface PerformingArt {
  id: string;
  name: string;
  type: 'Classical Dance' | 'Folk Dance' | 'Traditional Music' | 'Puppetry / Theatre';
  origin: string;
  description: string;
  instrumentsUsed?: string[];
  attire?: string;
}

export interface CraftAndTextile {
  id: string;
  name: string;
  type: 'Textile / Weaving' | 'Handicraft' | 'Painting / Folk Art' | 'Metal / Woodwork';
  materials: string[];
  description: string;
  geographicalIndication?: boolean;
}

export interface Personality {
  name: string;
  role: string;
  era: string;
  contribution: string;
}

export interface StateData {
  id: string;
  slug: string;
  name: string;
  hindiName?: string;
  type: EntityType;
  region: Region;
  capital: string;
  largestCity?: string;
  districtsCount?: number;
  majorDistricts?: string[];
  officialLanguages: string[];
  spokenLanguages: string[];
  tagline: string;
  overview: string;
  geography: string;
  climate: string;
  symbols: StateSymbols;
  historyTimeline: HistoricalEra[];
  destinations: Destination[];
  festivals: Festival[];
  cuisines: Dish[];
  textilesAndAttire: {
    overview: string;
    items: string[];
    weavingTraditions: string[];
  };
  performingArts: PerformingArt[];
  artsAndCrafts: CraftAndTextile[];
  languagesAndLiterature: {
    overview: string;
    classicalStatus?: boolean;
    notableAuthors: string[];
    famousEpicsOrFolklore: string[];
    usefulPhrases: { phrase: string; meaning: string }[];
  };
  customsAndTraditions: {
    hospitality: string;
    rituals: string;
    communityCelebrations: string;
  };
  indigenousCommunities: string[];
  famousPersonalities: Personality[];
  travelGuidance: {
    bestOverallSeason: string;
    connectivity: string;
    localEtiquette: string[];
    safetyAndEcoTips: string[];
  };
  heritagePreservation?: {
    initiatives: string[];
    endangeredTraditions: string[];
    visitorContributionGuidance: string;
  };
  references: { title: string; authority: string; url?: string }[];
}

export interface SearchResultItem {
  id: string;
  title: string;
  nativeTitle?: string;
  category: 'State / UT' | 'Destination' | 'Festival' | 'Cuisine' | 'Art & Dance' | 'Craft' | 'Language' | 'District';
  stateName: string;
  stateSlug: string;
  district?: string;
  snippet: string;
  region: Region;
  destinationSlug?: string;
}

export interface CulturalArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  author: string;
  date: string;
  summary: string;
  content: string[];
  relatedStates: string[];
}

// Language and Localization Models
export type SupportedLanguageCode = 
  | 'en' | 'hi' | 'kn' | 'ta' | 'te' | 'ml' | 'mr' | 'bn' | 'gu' | 'pa' 
  | 'or' | 'as' | 'ur' | 'sa' | 'ks' | 'kok' | 'mni' | 'ne' | 'brx' | 'doi' | 'mai' | 'sat';

export interface LanguageMetadata {
  code: SupportedLanguageCode;
  name: string;
  nativeName: string;
  script: string;
  dir: 'ltr' | 'rtl';
  isScheduled: boolean;
}

// Itinerary Models
export interface ItineraryStop {
  destinationId?: string;
  name: string;
  district?: string;
  duration: string;
  category: string;
  notes: string;
  timeSlot: 'Morning' | 'Afternoon' | 'Evening';
}

export interface ItineraryDay {
  dayNumber: number;
  themeTitle: string;
  stops: ItineraryStop[];
  culturalHighlight: string;
  regionalDishSuggestion: string;
  visitorTips: string;
}

export interface TravelItinerary {
  id: string;
  title: string;
  stateSlug: string;
  stateName: string;
  durationDays: number;
  travelStyle: 'Heritage & History' | 'Temples & Spirituality' | 'Nature & Wildlife' | 'Culinary & Culture' | 'Relaxed Explorer';
  summary: string;
  days: ItineraryDay[];
  createdDate: string;
}
