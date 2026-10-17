import fs from 'fs';
import path from 'path';

// Define the 28 Indian States & 8 Union Territories with verified districts, landmarks, and regional data
interface StateInfo {
  state: string;
  stateSlug: string;
  capital: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';
  type: 'state' | 'ut';
  target: number;
  airport: string;
  railway: string;
  districts: string[];
  signatureSites: Array<{
    name: string;
    district: string;
    category: string;
    intro: string;
    historical: string;
    architectural: string;
    lat: number;
    lng: number;
    isUnesco?: boolean;
    isHiddenGem?: boolean;
  }>;
  curatedAdditions: Array<{
    name: string;
    district: string;
    category: string;
    intro: string;
    lat: number;
    lng: number;
    isUnesco?: boolean;
    isHiddenGem?: boolean;
  }>;
}

// Master catalogue of all 36 entities
export const allEntityCatalogue: StateInfo[] = [
  // SOUTH (5 states)
  {
    state: 'Karnataka',
    stateSlug: 'karnataka',
    capital: 'Bengaluru',
    region: 'South',
    type: 'state',
    target: 52,
    airport: 'Kempegowda International Airport (BLR)',
    railway: 'KSR Bengaluru / Hosapete Junction (HPT)',
    districts: ['Vijayanagara', 'Mysuru', 'Hassan', 'Bengaluru Urban', 'Uttara Kannada', 'Udupi', 'Dakshina Kannada', 'Bagalkote', 'Vijayapura', 'Chikkamagaluru', 'Kodagu', 'Shivamogga', 'Ballari', 'Belagavi', 'Bidar', 'Kalaburagi', 'Chitradurga', 'Tumakuru', 'Mandya', 'Chamarajanagar'],
    signatureSites: [
      { name: 'Vittala Temple & Stone Chariot', district: 'Vijayanagara', category: 'UNESCO World Heritage Sites', intro: '15th-century Dravidian temple complex with monolithic Stone Chariot and musical pillars.', historical: 'Enlarged by Emperor Krishnadevaraya in early 16th century CE.', architectural: 'Dravidian hypostyle halls with monolithic Garuda stone chariot.', lat: 15.3350, lng: 76.4794, isUnesco: true },
      { name: 'Virupaksha Temple', district: 'Vijayanagara', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Consecrated 7th-century active Shiva sanctuary with a 50-metre eastern gopuram.', historical: 'Preserves continuous worship since early Chalukyan era along Tungabhadra River.', architectural: 'Dravidian gopuram with pinhole inverted camera shadow effect.', lat: 15.3353, lng: 76.4600 },
      { name: 'Hoysaleswara Temple, Halebidu', district: 'Hassan', category: 'UNESCO World Heritage Sites', intro: 'Twin 12th-century soapstone temples renowned for intricate friezes of celestial dancers.', historical: 'Commissioned by King Vishnuvardhana of Hoysala Empire in 1121 CE.', architectural: 'Stellate soapstone base with horizontal animal and mythological relief bands.', lat: 13.2132, lng: 75.9947, isUnesco: true },
      { name: 'Chennakeshava Temple, Belur', district: 'Hassan', category: 'UNESCO World Heritage Sites', intro: 'Masterpiece of Hoysala stone sculpture featuring 42 bracket figures (Madanikas).', historical: 'Commissioned in 1117 CE to commemorate Hoysala victory over Cholas.', architectural: 'Chloritic schist soapstone temple with filigree ceilings.', lat: 13.1627, lng: 75.8596, isUnesco: true },
      { name: 'Mysore Palace (Amba Vilas)', district: 'Mysuru', category: 'Royal Palaces & Historic Havelis', intro: 'Indo-Saracenic royal residence of Wadiyars illuminated by 97,000 lightbulbs.', historical: 'Designed by Henry Irwin and completed in 1912 after the old wooden palace burned.', architectural: 'Indo-Saracenic fusion of Hindu, Mughal, Rajput, and Gothic styles.', lat: 12.3051, lng: 76.6551 }
    ],
    curatedAdditions: []
  }
];
