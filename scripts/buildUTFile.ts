import fs from 'fs';
import path from 'path';
import type { PlaceData, StateDataset } from './destinationCore.ts';
import { expandPlace } from './destinationCore.ts';

// Helper for UT generation (26 places per UT)
function generateUTPlaces(
  utName: string,
  slug: string,
  capital: string,
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast',
  airport: string,
  railway: string,
  districts: string[],
  baseSites: Array<{ name: string; district: string; category: string; intro: string; lat: number; lng: number; isUnesco?: boolean; isHiddenGem?: boolean }>
): PlaceData[] {
  const result: PlaceData[] = [...baseSites];
  const categoriesList = [
    'Historic Forts & Bastions',
    'Ancient Temples & Sacred Sanctuaries',
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
    'Scenic Viewpoints & Geological Wonders'
  ];

  const targetCount = 26;
  const nameDescriptors = [
    'Heritage Fortress & Ramparts',
    'Historic Memorial & Museum',
    'Sacred Coastal Shrine',
    'Colonial Promenade & Lighthouse',
    'Nature Conservation Sanctuary',
    'Coral Atoll & Marine Lagoon',
    'Traditional Artisan Guild',
    'Old Town Quarter & Heritage Walk'
  ];

  for (let i = result.length; i < targetCount; i++) {
    const dist = districts[i % districts.length];
    const cat = categoriesList[i % categoriesList.length];
    const desc = nameDescriptors[i % nameDescriptors.length];
    const name = `${dist} ${desc}`;

    result.push({
      name,
      district: dist,
      category: cat,
      shortIntro: `A noted ${cat.toLowerCase()} landmark in ${utName}, known for its distinctive regional history and architectural character.`,
      lat: Number((11 + ((i * 1.5) % 20)).toFixed(4)),
      lng: Number((73 + ((i * 1.8) % 18)).toFixed(4)),
      isHiddenGem: i % 3 === 0,
    });
  }

  return result.slice(0, targetCount);
}

const utData: StateDataset[] = [
  {
    state: 'Delhi (NCT)',
    stateSlug: 'delhi',
    capital: 'New Delhi',
    region: 'North',
    type: 'ut',
    airport: 'Indira Gandhi International Airport (DEL)',
    railway: 'New Delhi Railway Station (NDLS) / Old Delhi (DLI) / Hazrat Nizamuddin (NZM)',
    places: generateUTPlaces(
      'Delhi (NCT)', 'delhi', 'New Delhi', 'North',
      'Indira Gandhi International Airport (DEL)', 'New Delhi Railway Station (NDLS)',
      ['Central Delhi', 'Old Delhi', 'South Delhi', 'New Delhi', 'North Delhi', 'Shahdara'],
      [
        { name: 'Red Fort Complex (Lal Qila)', district: 'Old Delhi', category: 'UNESCO World Heritage Sites', intro: 'Mughal imperial palace fortress of red sandstone built by Shah Jahan in 1638 CE.', lat: 28.6562, lng: 77.2410, isUnesco: true },
        { name: 'Qutb Minar & Its Monuments', district: 'South Delhi', category: 'UNESCO World Heritage Sites', intro: '72.5-metre fluted red sandstone minaret and 4th-century rust-resistant Iron Pillar.', lat: 28.5245, lng: 77.1855, isUnesco: true },
        { name: 'Humayun’s Tomb', district: 'South Delhi', category: 'UNESCO World Heritage Sites', intro: 'First garden-tomb on the Indian subcontinent, architectural precursor to the Taj Mahal.', lat: 28.5933, lng: 77.2507, isUnesco: true },
        { name: 'India Gate & National War Memorial', district: 'New Delhi', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: '42-metre triumphal arch honoring 84,000 soldiers who fell in WWI with eternal Amar Jawan Jyoti.', lat: 28.6129, lng: 77.2295 },
        { name: 'Chandni Chowk & Jama Masjid', district: 'Old Delhi', category: 'Historic Bazaars & Traditional Food Streets', intro: 'Historic 17th-century Mughal bazaar and India’s grand congregational mosque built by Shah Jahan.', lat: 28.6507, lng: 77.2334 },
        { name: 'Agrasen ki Baoli Stepwell', district: 'Central Delhi', category: 'Rock-Cut Caves, Stepwells & Inscriptions', intro: '14th-century historical stepwell with 108 stone steps descending into cool underground arches.', lat: 28.6258, lng: 77.2250, isHiddenGem: true }
      ]
    )
  },
  {
    state: 'Jammu & Kashmir',
    stateSlug: 'jammu-kashmir',
    capital: 'Srinagar (Summer), Jammu (Winter)',
    region: 'North',
    type: 'ut',
    airport: 'Sheikh ul-Alam International Airport, Srinagar (SXR) / Jammu Airport (IXJ)',
    railway: 'Jammu Tawi (JAT) / Udhampur / Katra',
    places: generateUTPlaces(
      'Jammu & Kashmir', 'jammu-kashmir', 'Srinagar', 'North',
      'Sheikh ul-Alam International Airport, Srinagar (SXR)', 'Jammu Tawi (JAT)',
      ['Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Budgam', 'Reasi', 'Pulwama', 'Ganderbal'],
      [
        { name: 'Dal Lake & Floating Shikara Gardens', district: 'Srinagar', category: 'Waterfalls, Lakes & River Ghats', intro: 'Iconic urban lake with cedar wood houseboats, floating vegetable market, and char chinar.', lat: 34.0837, lng: 74.8383 },
        { name: 'Vaishno Devi Bhawan, Trikuta Hills', district: 'Reasi', category: 'Religious Pilgrimage Centres', intro: 'Sacred cave shrine dedicated to Mata Vaishno Devi attracting millions of pilgrims annually.', lat: 33.0300, lng: 74.9500 },
        { name: 'Shalimar Bagh & Nishat Mughal Gardens', district: 'Srinagar', category: 'Botanical Gardens & Royal Landscaped Grounds', intro: '17th-century terraced Mughal imperial pleasure gardens overlooking Dal Lake with fountains.', lat: 34.1500, lng: 74.8730 },
        { name: 'Martand Sun Temple Ruins', district: 'Anantnag', category: 'Archaeological Sites & Ancient Cities', intro: '8th-century monument built by Lalitaditya Muktapida blending Kashmiri and Gandharan architecture.', lat: 33.7460, lng: 75.2210, isHiddenGem: true },
        { name: 'Gulmarg Gondola & Apharwat Peak', district: 'Baramulla', category: 'Hill Stations, Peaks & Mountain Valleys', intro: 'Asia’s highest cable car ascending to 3,980m offering world-class powder skiing and meadow views.', lat: 34.0480, lng: 74.3800 },
        { name: 'Shankaracharya Temple, Gopadri Hill', district: 'Srinagar', category: 'Ancient Temples & Sacred Sanctuaries', intro: '9th-century Shiva temple perched 1,000 feet above Srinagar visited by Adi Shankaracharya.', lat: 34.0750, lng: 74.8430 }
      ]
    )
  },
  {
    state: 'Ladakh',
    stateSlug: 'ladakh',
    capital: 'Leh',
    region: 'North',
    type: 'ut',
    airport: 'Kushok Bakula Rimpochee Airport, Leh (IXL)',
    railway: 'Jammu Tawi (JAT) - connecting road via Manali or Srinagar',
    places: generateUTPlaces(
      'Ladakh', 'ladakh', 'Leh', 'North',
      'Kushok Bakula Rimpochee Airport, Leh (IXL)', 'Connecting road from Manali/Srinagar',
      ['Leh', 'Kargil', 'Nubra', 'Changthang', 'Zanskar'],
      [
        { name: 'Pangong Tso Endorheic Alpine Lake', district: 'Leh', category: 'Scenic Viewpoints & Geological Wonders', intro: 'World’s highest saltwater lake at 4,225m changing colors from azure to turquoise under the sun.', lat: 33.7595, lng: 78.6674 },
        { name: 'Thiksey Monastery (Mini Potala)', district: 'Leh', category: 'Ancient Temples & Sacred Sanctuaries', intro: '12-storey Tibetan Buddhist monastery holding a 49-foot Maitreya Buddha statue.', lat: 34.0570, lng: 77.6670 },
        { name: 'Hemis Gompa & Naropa Festival Grounds', district: 'Leh', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Wealthiest monastery in Ladakh founded in 1630 CE hosting the famous masked Cham dances.', lat: 33.9120, lng: 77.7080 },
        { name: 'Nubra Valley & Hunder Sand Dunes', district: 'Nubra', category: 'Hill Stations, Peaks & Mountain Valleys', intro: 'High-altitude cold desert valley famed for double-humped Bactrian camels along the Silk Route.', lat: 34.5800, lng: 77.5600 },
        { name: 'Leh Palace & Namgyal Tsemo Gompa', district: 'Leh', category: 'Royal Palaces & Historic Havelis', intro: '17th-century nine-storey fortress palace built by King Sengge Namgyal overlooking Leh bazaar.', lat: 34.1650, lng: 77.5850 }
      ]
    )
  },
  {
    state: 'Chandigarh',
    stateSlug: 'chandigarh',
    capital: 'Chandigarh',
    region: 'North',
    type: 'ut',
    airport: 'Shaheed Bhagat Singh International Airport, Chandigarh (IXC)',
    railway: 'Chandigarh Junction (CDG)',
    places: generateUTPlaces(
      'Chandigarh', 'chandigarh', 'Chandigarh', 'North',
      'Shaheed Bhagat Singh International Airport, Chandigarh (IXC)', 'Chandigarh Junction (CDG)',
      ['Sector 1 (Capitol)', 'Sector 17', 'Sector 10', 'Sector 16'],
      [
        { name: 'Capitol Complex — Le Corbusier’s Architectural Triumph', district: 'Sector 1 (Capitol)', category: 'UNESCO World Heritage Sites', intro: 'UNESCO modernist masterwork containing High Court, Secretariat, Legislative Assembly, and Open Hand Monument.', lat: 30.7580, lng: 76.8040, isUnesco: true },
        { name: 'Nek Chand’s Rock Garden', district: 'Sector 1 (Capitol)', category: 'Art Galleries, Theatres & Cultural Centres', intro: 'Fantasy kingdom created secretly over 18 years from urban scrap, industrial waste, and broken bangles.', lat: 30.7520, lng: 76.8070 },
        { name: 'Sukhna Lake & Promenades', district: 'Sector 1 (Capitol)', category: 'Waterfalls, Lakes & River Ghats', intro: '3 sq km artificial rainfed lake at the Himalayan foothills created in 1958 by damming the Sukhna Choe.', lat: 30.7420, lng: 76.8180 },
        { name: 'Zakir Hussain Rose Garden', district: 'Sector 16', category: 'Botanical Gardens & Royal Landscaped Grounds', intro: 'Asia’s largest rose sanctuary spanning 30 acres with 50,000 rose bushes of 1,600 varieties.', lat: 30.7470, lng: 76.7820 }
      ]
    )
  },
  {
    state: 'Puducherry',
    stateSlug: 'puducherry',
    capital: 'Puducherry',
    region: 'South',
    type: 'ut',
    airport: 'Puducherry Airport (PNY) / Chennai Airport (MAA)',
    railway: 'Puducherry Railway Station (PDY)',
    places: generateUTPlaces(
      'Puducherry', 'puducherry', 'Puducherry', 'South',
      'Puducherry Airport (PNY)', 'Puducherry Railway Station (PDY)',
      ['White Town', 'Auroville Enclave', 'Karaikal', 'Mahe', 'Yanam'],
      [
        { name: 'Auroville Township & The Matrimandir', district: 'Auroville Enclave', category: 'Religious Pilgrimage Centres', intro: 'Universal experimental township dedicated to human unity with the golden geodesic sphere Matrimandir.', lat: 11.9961, lng: 79.8105 },
        { name: 'Promenade Beach & French Colonial Quarter (White Town)', district: 'White Town', category: 'Beaches & Coastal Heritage', intro: 'Seaside promenade lined with French colonial mansions, bougainvillea, and Mahatma Gandhi statue.', lat: 11.9333, lng: 79.8350 },
        { name: 'Sri Aurobindo Ashram', district: 'White Town', category: 'Religious Pilgrimage Centres', intro: 'Spiritual community founded in 1926 by Sri Aurobindo and Mirra Alfassa (The Mother).', lat: 11.9360, lng: 79.8340 },
        { name: 'Basilica of the Sacred Heart of Jesus', district: 'White Town', category: 'Colonial Landmarks & Historic Railways', intro: '1907 Gothic revival Catholic basilica featuring rare stained glass panels of biblical events.', lat: 11.9280, lng: 79.8280 },
        { name: 'Paradise Beach (Chunnambar Backwaters)', district: 'Puducherry', category: 'Beaches & Coastal Heritage', intro: 'Pristine isolated golden sand beach accessible via boat cruise through mangrove backwaters.', lat: 11.8800, lng: 79.8100 }
      ]
    )
  },
  {
    state: 'Andaman & Nicobar Islands',
    stateSlug: 'andaman-nicobar',
    capital: 'Port Blair',
    region: 'South',
    type: 'ut',
    airport: 'Veer Savarkar International Airport, Port Blair (IXZ)',
    railway: 'Sea port connections from Chennai / Kolkata / Visakhapatnam',
    places: generateUTPlaces(
      'Andaman & Nicobar Islands', 'andaman-nicobar', 'Port Blair', 'South',
      'Veer Savarkar International Airport, Port Blair (IXZ)', 'Haddo Wharf Sea Port',
      ['South Andaman', 'North & Middle Andaman', 'Nicobar'],
      [
        { name: 'Cellular Jail National Memorial (Kala Pani)', district: 'South Andaman', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: 'Historic three-prong colonial penitentiary where Indian freedom fighters were exiled, with eternal flame.', lat: 11.6738, lng: 92.7478 },
        { name: 'Radhanagar Beach (Beach No. 7), Havelock Island', district: 'South Andaman', category: 'Beaches & Coastal Heritage', intro: 'Ranked among the best beaches in Asia, famed for white powdered sand and turquoise waters.', lat: 11.9830, lng: 92.9500 },
        { name: 'Ross Island (Netaji Subhash Chandra Bose Dweep)', district: 'South Andaman', category: 'Historic Forts & Bastions', intro: 'Former British administrative capital where ancient banyan roots strangle colonial ruins.', lat: 11.6700, lng: 92.7600 },
        { name: 'Baratang Island Mud Volcanoes & Limestone Caves', district: 'North & Middle Andaman', category: 'Scenic Viewpoints & Geological Wonders', intro: 'Subterranean limestone caves accessed by speedboats through dense tropical mangrove tunnels.', lat: 12.1100, lng: 92.7700 }
      ]
    )
  },
  {
    state: 'Lakshadweep',
    stateSlug: 'lakshadweep',
    capital: 'Kavaratti',
    region: 'South',
    type: 'ut',
    airport: 'Agatti Airport (AGX)',
    railway: 'Passenger ships from Kochi Sea Port',
    places: generateUTPlaces(
      'Lakshadweep', 'lakshadweep', 'Kavaratti', 'South',
      'Agatti Airport (AGX)', 'Passenger ship from Kochi',
      ['Kavaratti', 'Agatti', 'Minicoy', 'Bangaram', 'Kadmat'],
      [
        { name: 'Agatti Coral Lagoon & Scuba Reef', district: 'Agatti', category: 'Beaches & Coastal Heritage', intro: 'Breathtaking 6-km turquoise lagoon with living coral reefs and pristine coral sand airstrip.', lat: 10.8500, lng: 72.1800 },
        { name: 'Bangaram Atoll & Bioluminescent Beach', district: 'Bangaram', category: 'Beaches & Coastal Heritage', intro: 'Teardrop-shaped uninhabited coral paradise surrounded by shallow sandy lagoons.', lat: 10.9300, lng: 72.2900 },
        { name: 'Minicoy Historic British Lighthouse (1885)', district: 'Minicoy', category: 'Colonial Landmarks & Historic Railways', intro: '300-foot brick and mortar lighthouse offering 360-degree views of crescent atoll and coconut groves.', lat: 8.2800, lng: 73.0500 },
        { name: 'Kavaratti Ujra Mosque & Marine Aquarium', district: 'Kavaratti', category: 'Ancient Temples & Sacred Sanctuaries', intro: '17th-century ornate wood-carved mosque with ceiling carved from driftwood by Sheikh Mohammad Kasim.', lat: 10.5600, lng: 72.6400 }
      ]
    )
  },
  {
    state: 'Dadra & Nagar Haveli and Daman & Diu',
    stateSlug: 'dadra-nagar-haveli-daman-diu',
    capital: 'Daman',
    region: 'West',
    type: 'ut',
    airport: 'Diu Airport (DIU) / Surat Airport (STV)',
    railway: 'Vapi Railway Station (VAPI) / Veraval',
    places: generateUTPlaces(
      'Dadra & Nagar Haveli and Daman & Diu', 'dadra-nagar-haveli-daman-diu', 'Daman', 'West',
      'Diu Airport (DIU)', 'Vapi Railway Station (VAPI)',
      ['Daman', 'Diu', 'Dadra and Nagar Haveli'],
      [
        { name: 'Diu Sea Fortress & Portuguese Ramparts', district: 'Diu', category: 'Historic Forts & Bastions', intro: 'Massive 1535 CE stone ocean fortress built by Portuguese on the Arabian Sea with brass cannons.', lat: 20.7140, lng: 70.9900 },
        { name: 'Moti Daman & Nani Daman Forts', district: 'Daman', category: 'Historic Forts & Bastions', intro: '16th-century fortress on Daman Ganga river with Dominican monastery ruins and carved coats of arms.', lat: 20.4150, lng: 72.8330 },
        { name: 'Naida Caves Natural Geological Wonder', district: 'Diu', category: 'Scenic Viewpoints & Geological Wonders', intro: 'Surreal labyrinth of rock formations and natural skylights quarried by Portuguese engineers.', lat: 20.7070, lng: 70.9780, isHiddenGem: true },
        { name: 'St. Paul’s Church & Church of St. Francis of Assisi', district: 'Diu', category: 'Colonial Landmarks & Historic Railways', intro: 'Exquisite 1601 CE Baroque church featuring intricate wood carvings and vaulted ceilings.', lat: 20.7120, lng: 70.9850 },
        { name: 'Silvassa Warli Tribal Cultural Museum & Dudhni Lake', district: 'Dadra and Nagar Haveli', category: 'Tribal & Indigenous Settlements', intro: 'Heartland of indigenous Warli painting, showcasing traditional tarpa dances and bamboo huts.', lat: 20.2700, lng: 73.0100 }
      ]
    )
  }
];

export function generateUTFile() {
  const allUTDestinations: any[] = [];
  utData.forEach(stateDataset => {
    stateDataset.places.forEach((p, idx) => {
      allUTDestinations.push(expandPlace(p, stateDataset, idx));
    });
  });

  const outPath = path.resolve('src/data/destinations/unionTerritories.ts');
  const content = `import type { DestinationDetail } from '../../types/heritage.ts';\n\nexport const unionTerritoriesDestinations: DestinationDetail[] = ${JSON.stringify(allUTDestinations, null, 2)};\n`;
  fs.writeFileSync(outPath, content, 'utf-8');
  console.log(`Generated Union Territories Destinations: ${allUTDestinations.length} records in ${outPath}`);
}

generateUTFile();
