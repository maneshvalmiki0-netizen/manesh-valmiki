import fs from 'fs';
import path from 'path';
import type { PlaceData, StateDataset } from './destinationCore.ts';
import { expandPlace } from './destinationCore.ts';
import { generateStatePlaces } from './southGenerator.ts';

const westData: StateDataset[] = [
  {
    state: 'Maharashtra',
    stateSlug: 'maharashtra',
    capital: 'Mumbai',
    region: 'West',
    type: 'state',
    airport: 'Chhatrapati Shivaji Maharaj International Airport (BOM) / Pune Airport',
    railway: 'Chhatrapati Shivaji Maharaj Terminus (CSMT) / Pune Junction (PUNE)',
    places: generateStatePlaces(
      'Maharashtra', 'maharashtra', 'Mumbai', 'West',
      'Chhatrapati Shivaji Maharaj International Airport (BOM)', 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
      ['Mumbai', 'Pune', 'Chhatrapati Sambhajinagar', 'Raigad', 'Satara', 'Kolhapur', 'Nashik', 'Ratnagiri', 'Sindhudurg', 'Thane', 'Nagpur', 'Amravati', 'Solapur', 'Ahmednagar', 'Nanded', 'Jalgaon', 'Wardha', 'Chandrapur', 'Bhandara', 'Osmanabad'],
      [
        { name: 'Ajanta Caves Buddhist Murals', district: 'Chhatrapati Sambhajinagar', category: 'UNESCO World Heritage Sites', intro: '30 rock-cut Buddhist cave sanctuaries preserving ancient Indian fresco paintings.', lat: 20.5519, lng: 75.7033, isUnesco: true },
        { name: 'Ellora Caves & Kailasa Temple (Cave 16)', district: 'Chhatrapati Sambhajinagar', category: 'UNESCO World Heritage Sites', intro: 'World’s largest monolithic rock excavation carved top-down from a single basalt cliff.', lat: 20.0268, lng: 75.1780, isUnesco: true },
        { name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)', district: 'Mumbai', category: 'UNESCO World Heritage Sites', intro: 'Victorian Gothic revival railway headquarters with Italian marble and stone gargoyles.', lat: 18.9400, lng: 72.8353, isUnesco: true },
        { name: 'Elephanta Caves & Trimurti Sculpture', district: 'Mumbai', category: 'UNESCO World Heritage Sites', intro: 'Island rock-cut cave temples dedicated to Shiva, famed for the colossal three-headed Sadashiva.', lat: 18.9633, lng: 72.9315, isUnesco: true },
        { name: 'Raigad Fort — Capital of Shivaji Maharaj', district: 'Raigad', category: 'Historic Forts & Bastions', intro: 'Impregnable Sahyadri hill fortress where Chhatrapati Shivaji Maharaj was crowned in 1674 CE.', lat: 18.2346, lng: 73.4414 },
        { name: 'Sindhudurg Ocean Fortress', district: 'Sindhudurg', category: 'Historic Forts & Bastions', intro: 'Formidable island sea citadel constructed on Kurte rock with molten lead foundations.', lat: 16.0450, lng: 73.4680 },
        { name: 'Tadoba-Andhari Tiger Reserve', district: 'Chandrapur', category: 'National Parks & Wildlife Corridors', intro: 'Oldest and largest national park in Maharashtra with high Bengal tiger density.', lat: 20.2450, lng: 79.3080 },
        { name: 'Trimbakeshwar Shiva Jyotirlinga', district: 'Nashik', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'One of the twelve sacred Jyotirlingas and origin point of the sacred Godavari River.', lat: 19.9320, lng: 73.5306 },
        { name: 'Shaniwar Wada Palace Fortress', district: 'Pune', category: 'Historic Forts & Bastions', intro: 'Seat of the Peshwa prime ministers of the Maratha Empire built in 1732 CE.', lat: 18.5196, lng: 73.8553 },
        { name: 'Mahalakshmi Temple & Rankala Lake, Kolhapur', district: 'Kolhapur', category: 'Ancient Temples & Sacred Sanctuaries', intro: '7th-century Chalukyan Shakti Peetha temple visited by royal Maratha dynasties.', lat: 16.6940, lng: 74.2230 },
        { name: 'Kaas Plateau (Valley of Flowers of Maharashtra)', district: 'Satara', category: 'UNESCO World Heritage Sites', intro: 'UNESCO volcanic laterite plateau blooming with 850 species of endemic wildflowers in monsoon.', lat: 17.7210, lng: 73.8180, isUnesco: true },
        { name: 'Lonar Crater Lake & Ancient Temples', district: 'Buldhana', category: 'Scenic Viewpoints & Geological Wonders', intro: 'World’s only hyper-velocity meteorite impact crater in basaltic rock formed 52,000 years ago.', lat: 19.9760, lng: 76.5070, isHiddenGem: true }
      ]
    )
  },
  {
    state: 'Gujarat',
    stateSlug: 'gujarat',
    capital: 'Gandhinagar',
    region: 'West',
    type: 'state',
    airport: 'Sardar Vallabhbhai Patel International Airport, Ahmedabad (AMD)',
    railway: 'Ahmedabad Junction (ADI) / Vadodara (BRC)',
    places: generateStatePlaces(
      'Gujarat', 'gujarat', 'Gandhinagar', 'West',
      'Sardar Vallabhbhai Patel International Airport, Ahmedabad (AMD)', 'Ahmedabad Junction (ADI)',
      ['Ahmedabad', 'Patan', 'Kutch', 'Gir Somnath', 'Vadodara', 'Junagadh', 'Narmada', 'Dwarka', 'Bhavnagar', 'Porbandar', 'Surat', 'Rajkot', 'Mehsana', 'Panchmahal', 'Banaskantha', 'Bharuch', 'Jamnagar', 'Amreli', 'Navsari', 'Valsad'],
      [
        { name: 'Rani ki Vav (The Queen’s Stepwell)', district: 'Patan', category: 'UNESCO World Heritage Sites', intro: 'Subterranean stepwell sanctuary designed as an inverted temple with seven subterranean levels.', lat: 23.8589, lng: 72.1014, isUnesco: true },
        { name: 'Sun Temple, Modhera', district: 'Mehsana', category: 'Archaeological Sites & Ancient Cities', intro: '11th-century solar sanctuary with Surya Kund stepwell pool, aligned to the equinox sunbeams.', lat: 23.5835, lng: 72.1330 },
        { name: 'Gir National Park — Asiatic Lion Sanctuary', district: 'Gir Somnath', category: 'National Parks & Wildlife Corridors', intro: 'Sole natural habitat on planet Earth of the endangered Asiatic Lion.', lat: 21.1243, lng: 70.8242 },
        { name: 'Dholavira — Harappan Indus Valley Metropolis', district: 'Kutch', category: 'UNESCO World Heritage Sites', intro: '5,000-year-old planned Bronze Age civilization city with monumental stone reservoirs.', lat: 23.8860, lng: 70.2160, isUnesco: true },
        { name: 'Statue of Unity & Sardar Sarovar Dam', district: 'Narmada', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: 'World’s tallest statue (182 metres) honoring Sardar Vallabhbhai Patel on the Narmada River.', lat: 21.8380, lng: 73.7191 },
        { name: 'Somnath Jyotirlinga Temple', district: 'Gir Somnath', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'First among the twelve sacred Jyotirlingas, rising directly on the shore of the Arabian Sea.', lat: 20.8880, lng: 70.4010 },
        { name: 'Dwarkadhish Temple (Jagat Mandir)', district: 'Devbhumi Dwarka', category: 'Religious Pilgrimage Centres', intro: 'Ancient Char Dham temple dedicated to Lord Krishna with a 72-pillar sanctum and 52-yard flag.', lat: 22.2370, lng: 68.9680 },
        { name: 'Great Rann of Kutch & White Salt Desert', district: 'Kutch', category: 'Scenic Viewpoints & Geological Wonders', intro: 'Vast white salt crystal desert shining under the moonlight, home to Rann Utsav.', lat: 23.7337, lng: 69.8597 },
        { name: 'Champaner-Pavagadh Archaeological Park', district: 'Panchmahal', category: 'UNESCO World Heritage Sites', intro: 'UNESCO historical site containing prehistoric sites, hill fortress, and 16th-century mosques.', lat: 22.4833, lng: 73.5333, isUnesco: true },
        { name: 'Laxmi Vilas Palace, Vadodara', district: 'Vadodara', category: 'Royal Palaces & Historic Havelis', intro: 'Extravagant royal palace of the Gaekwad dynasty four times the size of Buckingham Palace.', lat: 22.2930, lng: 73.1910 }
      ]
    )
  },
  {
    state: 'Goa',
    stateSlug: 'goa',
    capital: 'Panaji',
    region: 'West',
    type: 'state',
    airport: 'Goa Dabolim Airport (GOI) / Manohar International Airport, Mopa (GOX)',
    railway: 'Madgaon Junction (MAO) / Thivim',
    places: generateStatePlaces(
      'Goa', 'goa', 'Panaji', 'West',
      'Goa Dabolim Airport (GOI)', 'Madgaon Junction (MAO)',
      ['North Goa', 'South Goa'],
      [
        { name: 'Basilica of Bom Jesus', district: 'North Goa', category: 'UNESCO World Heritage Sites', intro: '1605 CE Baroque church holding the sacred relics of St. Francis Xavier in a silver casket.', lat: 15.5009, lng: 73.9116, isUnesco: true },
        { name: 'Se Cathedral (Sé Catedral de Santa Catarina)', district: 'North Goa', category: 'UNESCO World Heritage Sites', intro: 'One of the largest churches in Asia featuring the famous Golden Bell.', lat: 15.5030, lng: 73.9130, isUnesco: true },
        { name: 'Fort Aguada & 1864 Lighthouse', district: 'North Goa', category: 'Historic Forts & Bastions', intro: '17th-century Portuguese fortress overlooking Sinquerim Beach and Mandovi estuary.', lat: 15.4925, lng: 73.7736 },
        { name: 'Dudhsagar Waterfalls', district: 'South Goa', category: 'Waterfalls, Lakes & River Ghats', intro: 'Four-tiered sea of milk waterfall cascading 310 metres through Western Ghats forest.', lat: 15.3144, lng: 74.3144 },
        { name: 'Fontainhas Latin Quarter, Panaji', district: 'North Goa', category: 'Traditional Villages & Rural Living Heritage', intro: 'Heritage quarter with vibrant pastel-coloured Portuguese colonial houses and tiled roofs.', lat: 15.4980, lng: 73.8320 },
        { name: 'Mangueshi Temple, Priol', district: 'North Goa', category: 'Ancient Temples & Sacred Sanctuaries', intro: '450-year-old Hindu temple dedicated to Lord Shiva with an iconic seven-storey Deepstambha.', lat: 15.4320, lng: 73.9680 },
        { name: 'Cabo de Rama Fort & Beach', district: 'South Goa', category: 'Historic Forts & Bastions', intro: 'Ancient coastal promontory fortress associated with Lord Rama’s exile period.', lat: 15.0880, lng: 73.9210, isHiddenGem: true },
        { name: 'Palolem Beach & Butterfly Island', district: 'South Goa', category: 'Beaches & Coastal Heritage', intro: 'Crescent-shaped white sand bay backed by coconut palms and calm waters.', lat: 15.0100, lng: 74.0230 },
        { name: 'Bhagwan Mahavir Wildlife Sanctuary & Tambdi Surla', district: 'South Goa', category: 'Ancient Temples & Sacred Sanctuaries', intro: '12th-century Kadamba black basalt temple hidden inside deep Western Ghats jungle.', lat: 15.4410, lng: 74.2560, isHiddenGem: true }
      ]
    )
  }
];

export function generateWestFile() {
  const allWestDestinations: any[] = [];
  westData.forEach(stateDataset => {
    stateDataset.places.forEach((p, idx) => {
      allWestDestinations.push(expandPlace(p, stateDataset, idx));
    });
  });

  const outPath = path.resolve('src/data/destinations/west.ts');
  const content = `import type { DestinationDetail } from '../../types/heritage.ts';\n\nexport const westDestinations: DestinationDetail[] = ${JSON.stringify(allWestDestinations, null, 2)};\n`;
  fs.writeFileSync(outPath, content, 'utf-8');
  console.log(`Generated West Destinations: ${allWestDestinations.length} records in ${outPath}`);
}

generateWestFile();
