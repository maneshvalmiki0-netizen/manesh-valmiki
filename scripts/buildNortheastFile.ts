import fs from 'fs';
import path from 'path';
import type { PlaceData, StateDataset } from './destinationCore.ts';
import { expandPlace } from './destinationCore.ts';
import { generateStatePlaces } from './southGenerator.ts';

const northeastData: StateDataset[] = [
  {
    state: 'Assam',
    stateSlug: 'assam',
    capital: 'Dispur (Guwahati)',
    region: 'Northeast',
    type: 'state',
    airport: 'Lokpriya Gopinath Bordoloi International Airport, Guwahati (GAU)',
    railway: 'Guwahati (GHY) / Dibrugarh (DBRG)',
    places: generateStatePlaces(
      'Assam', 'assam', 'Guwahati', 'Northeast',
      'Lokpriya Gopinath Bordoloi International Airport, Guwahati (GAU)', 'Guwahati (GHY)',
      ['Kamrup Metropolitan', 'Golaghat', 'Majuli', 'Sivasagar', 'Barpeta', 'Jorhat', 'Sonitpur', 'Dima Hasao', 'Darrang', 'Cachar', 'Nagaon', 'Tinsukia'],
      [
        { name: 'Kaziranga National Park — One-Horned Rhino Sanctuary', district: 'Golaghat', category: 'UNESCO World Heritage Sites', intro: 'World’s premier sanctuary for the great Indian one-horned rhinoceros, harboring two-thirds of global population.', lat: 26.5775, lng: 93.1711, isUnesco: true },
        { name: 'Kamakhya Temple atop Nilachal Hill', district: 'Kamrup Metropolitan', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Venerated Tantric Shakti Peetha celebrating the creative feminine power and the Ambubachi Mela.', lat: 26.1664, lng: 91.7054 },
        { name: 'Majuli — World’s Largest River Island', district: 'Majuli', category: 'Traditional Villages & Rural Living Heritage', intro: 'Brahmaputra river island and epicenter of Neo-Vaishnavite Satra monastic culture founded by Srimanta Sankardev.', lat: 26.9500, lng: 94.2167 },
        { name: 'Sivasagar Rang Ghar & Talatal Ghar', district: 'Sivasagar', category: 'Historic Forts & Bastions', intro: 'Historic capital of the Ahom Kingdom that resisted Mughal expansion for 600 years, featuring Asia’s first royal amphitheatre.', lat: 26.9730, lng: 94.6320 },
        { name: 'Manas National Park & Tiger Reserve', district: 'Baksa', category: 'UNESCO World Heritage Sites', intro: 'UNESCO biosphere reserve bordering Bhutan, home to rare pygmy hogs, golden langurs, and wild water buffalo.', lat: 26.6590, lng: 91.0010, isUnesco: true },
        { name: 'Sualkuchi Silk Weaving Village', district: 'Kamrup', category: 'Handicraft Centres & Artisan Guilds', intro: 'The "Manchester of Assam" where master weavers craft golden Muga silk and Pat silk mekhala chadors.', lat: 26.1700, lng: 91.5700 }
      ]
    )
  },
  {
    state: 'Meghalaya',
    stateSlug: 'meghalaya',
    capital: 'Shillong',
    region: 'Northeast',
    type: 'state',
    airport: 'Umroi Airport, Shillong (SHL) / Guwahati Airport (GAU)',
    railway: 'Guwahati (GHY) - 100 km highway drive',
    places: generateStatePlaces(
      'Meghalaya', 'meghalaya', 'Shillong', 'Northeast',
      'Umroi Airport, Shillong (SHL)', 'Guwahati Railway Station (GHY)',
      ['East Khasi Hills', 'West Jaintia Hills', 'West Garo Hills', 'South West Khasi Hills', 'Ri-Bhoi', 'East Garo Hills'],
      [
        { name: 'Cherrapunji (Sohra) Living Root Bridges', district: 'East Khasi Hills', category: 'Scenic Viewpoints & Geological Wonders', intro: 'Bio-engineering marvels where indigenous Khasi villagers train Ficus elastica aerial tree roots across raging torrents.', lat: 25.2750, lng: 91.7320, isHiddenGem: true },
        { name: 'Nohkalikai Falls — India’s Tallest Plunge Waterfall', district: 'East Khasi Hills', category: 'Waterfalls, Lakes & River Ghats', intro: 'Spectacular 1,115-foot plunge waterfall fed by monsoon clouds dropping into an emerald water pool.', lat: 25.2770, lng: 91.6850 },
        { name: 'Dawki Umngot River Glass Waters', district: 'West Jaintia Hills', category: 'Waterfalls, Lakes & River Ghats', intro: 'Crystal-clear river along the Bangladesh border where boats appear to float on pure air.', lat: 25.1830, lng: 92.0170 },
        { name: 'Mawlynnong — Asia’s Cleanest Village', district: 'East Khasi Hills', category: 'Traditional Villages & Rural Living Heritage', intro: 'Eco-friendly Khasi settlement renowned for community-driven cleanliness, bamboo dustbins, and living root bridge.', lat: 25.2010, lng: 91.9160 },
        { name: 'Mawsmai & Krem Liat Prah Caves', district: 'East Khasi Hills', category: 'Rock-Cut Caves, Stepwells & Inscriptions', intro: 'Illuminated limestone cave system holding stalactites, stalagmites, and deep subterranean chambers.', lat: 25.2440, lng: 91.7180 },
        { name: 'Umiam Lake (Barapani)', district: 'Ri-Bhoi', category: 'Waterfalls, Lakes & River Ghats', intro: 'Picturesque highland reservoir surrounded by pine forests, popular for watersports and sunset views.', lat: 25.6670, lng: 91.8830 }
      ]
    )
  },
  {
    state: 'Arunachal Pradesh',
    stateSlug: 'arunachal-pradesh',
    capital: 'Itanagar',
    region: 'Northeast',
    type: 'state',
    airport: 'Donyi Polo Airport, Itanagar (HGI) / Tezpur Airport',
    railway: 'Naharlagun Railway Station (NHLN)',
    places: generateStatePlaces(
      'Arunachal Pradesh', 'arunachal-pradesh', 'Itanagar', 'Northeast',
      'Donyi Polo Airport, Itanagar (HGI)', 'Naharlagun Railway Station (NHLN)',
      ['Tawang', 'Papum Pare', 'West Kameng', 'Lower Subansiri', 'East Siang', 'Changlang', 'Dibang Valley', 'Upper Subansiri', 'Tirap', 'Anjaw'],
      [
        { name: 'Tawang Monastery (Galden Namgey Lhatse)', district: 'Tawang', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Largest Tibetan Buddhist monastery in India founded in 1680 CE perched at 3,048m in the Himalayas.', lat: 27.5861, lng: 91.8594 },
        { name: 'Sela Pass & Sela Lake', district: 'Tawang', category: 'Hill Stations, Peaks & Mountain Valleys', intro: 'High-altitude mountain pass at 4,170 metres (13,700 ft) connecting Tawang with frozen winter lake.', lat: 27.5050, lng: 92.1030 },
        { name: 'Ziro Valley & Apatani Tribal Homeland', district: 'Lower Subansiri', category: 'Traditional Villages & Rural Living Heritage', intro: 'UNESCO-tentative pine-clad valley inhabited by Apatani people famous for sustainable wet-rice paddy fish cultivation.', lat: 27.5950, lng: 93.8350, isHiddenGem: true },
        { name: 'Namdapha National Park & Tiger Reserve', district: 'Changlang', category: 'National Parks & Wildlife Corridors', intro: 'Third-largest national park in India harboring four wild cat species (tiger, leopard, snow leopard, clouded leopard).', lat: 27.4910, lng: 96.3860 },
        { name: 'Ita Fort (Fort of Bricks), Itanagar', district: 'Papum Pare', category: 'Historic Forts & Bastions', intro: '14th-century Chutiya dynasty fortress built of 8 million irregular bricks on a hilltop.', lat: 27.0980, lng: 93.6260 }
      ]
    )
  },
  {
    state: 'Nagaland',
    stateSlug: 'nagaland',
    capital: 'Kohima',
    region: 'Northeast',
    type: 'state',
    airport: 'Dimapur Airport (DMU)',
    railway: 'Dimapur Railway Station (DMV)',
    places: generateStatePlaces(
      'Nagaland', 'nagaland', 'Kohima', 'Northeast',
      'Dimapur Airport (DMU)', 'Dimapur Railway Station (DMV)',
      ['Kohima', 'Dimapur', 'Mokokchung', 'Mon', 'Wokha', 'Phek', 'Tuensang', 'Zunheboto', 'Kiphire', 'Peren'],
      [
        { name: 'Kisama Heritage Village (Hornbill Festival)', district: 'Kohima', category: 'Tribal & Indigenous Settlements', intro: 'Cultural village showcasing traditional morungs (dormitories) of all 16 major Naga tribes.', lat: 25.6020, lng: 94.1130 },
        { name: 'Kohima War Cemetery & Battle of Kohima Ridge', district: 'Kohima', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: 'Historic WWII memorial site commemorating Allied and Commonwealth soldiers who halted Japanese invasion in 1944.', lat: 25.6690, lng: 94.1060 },
        { name: 'Dzukou Valley & Lily Meadows', district: 'Kohima', category: 'Hill Stations, Peaks & Mountain Valleys', intro: 'Breathtaking high-altitude valley on Nagaland-Manipur border famous for the rare Dzukou Lily.', lat: 25.5500, lng: 94.0700 },
        { name: 'Khonoma Green Village — Asia’s First Green Village', district: 'Kohima', category: 'Traditional Villages & Rural Living Heritage', intro: 'Historic Angami village famous for community-led biodiversity conservation and resistance against British forces in 1879.', lat: 25.6500, lng: 94.0200, isHiddenGem: true },
        { name: 'Longwa Border Village & Konyak Headhunter Heritage', district: 'Mon', category: 'Tribal & Indigenous Settlements', intro: 'Fascinating village straddling the India-Myanmar international border, home to tattooed Konyak elders.', lat: 26.8300, lng: 95.1200 }
      ]
    )
  },
  {
    state: 'Manipur',
    stateSlug: 'manipur',
    capital: 'Imphal',
    region: 'Northeast',
    type: 'state',
    airport: 'Bir Tikendrajit International Airport, Imphal (IMF)',
    railway: 'Jiribam / Dimapur (connecting road)',
    places: generateStatePlaces(
      'Manipur', 'manipur', 'Imphal', 'Northeast',
      'Bir Tikendrajit International Airport, Imphal (IMF)', 'Jiribam Railway Station',
      ['Imphal West', 'Imphal East', 'Bishnupur', 'Ukhrul', 'Churachandpur', 'Thoubal', 'Senapati', 'Tamenglong', 'Chandel'],
      [
        { name: 'Loktak Lake & Keibul Lamjao Floating National Park', district: 'Bishnupur', category: 'UNESCO World Heritage Sites', intro: 'World’s only floating national park on heterogeneous masses of vegetation (phumdis), sole home of the dancing Sangai deer.', lat: 24.5500, lng: 93.8000, isUnesco: true },
        { name: 'Kangla Fort — Ancient Seat of Meitei Kings', district: 'Imphal West', category: 'Historic Forts & Bastions', intro: 'Sacred royal palace and political capital of the Manipur Kingdom with the revered dragon-lion Kangla Sha.', lat: 24.8100, lng: 93.9400 },
        { name: 'Ima Keithel (Mother’s Market) — All-Women Bazaar', district: 'Imphal West', category: 'Historic Bazaars & Traditional Food Streets', intro: 'Asia’s largest all-women market run exclusively by over 5,000 matriarchal traders since the 16th century.', lat: 24.8050, lng: 93.9350 },
        { name: 'Shirui Kashong Peak & Shirui Lily Sanctuary', district: 'Ukhrul', category: 'Hill Stations, Peaks & Mountain Valleys', intro: 'Misty mountain peak where the rare, endemic pink Shirui Lily (Lilium mackliniae) blooms.', lat: 25.1200, lng: 94.4400, isHiddenGem: true },
        { name: 'INA War Museum & Moirang Memorial', district: 'Bishnupur', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: 'Historic site where Netaji Subhas Chandra Bose’s Indian National Army first hoisted the Indian tricolor in 1944.', lat: 24.5000, lng: 93.7700 }
      ]
    )
  },
  {
    state: 'Mizoram',
    stateSlug: 'mizoram',
    capital: 'Aizawl',
    region: 'Northeast',
    type: 'state',
    airport: 'Lengpui Airport, Aizawl (AJL)',
    railway: 'Bairabi Railway Station / Silchar',
    places: generateStatePlaces(
      'Mizoram', 'mizoram', 'Aizawl', 'Northeast',
      'Lengpui Airport, Aizawl (AJL)', 'Bairabi Railway Station',
      ['Aizawl', 'Champhai', 'Lunglei', 'Serchhip', 'Kolasib', 'Mamit', 'Lawngtlai', 'Siaha'],
      [
        { name: 'Reiek Tlang Peak & Heritage Model Village', district: 'Mamit', category: 'Hill Stations, Peaks & Mountain Valleys', intro: 'Spectacular mountain ridge rising 1,548m overlooking Bangladesh plains, with a preserved Mizo tribal village.', lat: 23.6800, lng: 92.6000 },
        { name: 'Phawngpui (Blue Mountain) National Park', district: 'Lawngtlai', category: 'National Parks & Wildlife Corridors', intro: 'Highest mountain peak in Mizoram (2,157m) revered as the abode of the gods, filled with rhododendrons.', lat: 22.6300, lng: 93.0500 },
        { name: 'Vantawng Falls — Highest Waterfall in Mizoram', district: 'Serchhip', category: 'Waterfalls, Lakes & River Ghats', intro: 'Majestic two-tiered waterfall plunging 750 feet amidst thick bamboo groves on the Vanva river.', lat: 23.2800, lng: 92.8300 },
        { name: 'Champhai Rice Bowl & Indo-Myanmar Border', district: 'Champhai', category: 'Scenic Viewpoints & Geological Wonders', intro: 'Scenic valley known as the "Rice Bowl of Mizoram" surrounded by hills and Rih Dil lake.', lat: 23.4700, lng: 93.3300 },
        { name: 'Solomon’s Temple, Aizawl', district: 'Aizawl', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Architecturally grand white marble church sanctuary constructed by the Kohhran Thianghlim fellowship.', lat: 23.7500, lng: 92.7300 }
      ]
    )
  },
  {
    state: 'Tripura',
    stateSlug: 'tripura',
    capital: 'Agartala',
    region: 'Northeast',
    type: 'state',
    airport: 'Maharaja Bir Bikram Airport, Agartala (IXA)',
    railway: 'Agartala Railway Station (AGTL)',
    places: generateStatePlaces(
      'Tripura', 'tripura', 'Agartala', 'Northeast',
      'Maharaja Bir Bikram Airport, Agartala (IXA)', 'Agartala Railway Station (AGTL)',
      ['West Tripura', 'Unakoti', 'Gomati', 'South Tripura', 'Dhalai', 'North Tripura', 'Khowai', 'Sepahijala'],
      [
        { name: 'Unakoti Colossal Rock-Cut Bas Reliefs', district: 'Unakoti', category: 'UNESCO World Heritage Sites', intro: '7th-9th century CE Shaivite rock-cut bas-relief carvings of Lord Shiva carved into a forested ravine.', lat: 24.3167, lng: 92.0667, isUnesco: true },
        { name: 'Neermahal Water Palace, Rudrasagar Lake', district: 'Sepahijala', category: 'Royal Palaces & Historic Havelis', intro: 'Eastern India’s only lake palace built by Maharaja Bir Bikram Kishore Manikya in 1930 CE.', lat: 23.4900, lng: 91.3200 },
        { name: 'Ujjayanta Palace & State Museum, Agartala', district: 'West Tripura', category: 'Royal Palaces & Historic Havelis', intro: 'Grand neoclassical royal palace with tiled floors and Mughal-inspired fountains named by Tagore.', lat: 23.8360, lng: 91.2820 },
        { name: 'Tripura Sundari (Matabari) Temple, Udaipur', district: 'Gomati', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'One of the 51 sacred Shakti Peethas built in 1501 CE atop a tortoise-shaped hillock beside Kalyan Sagar.', lat: 23.5100, lng: 91.5000 },
        { name: 'Pilak Buddhist & Hindu Archaeological Site', district: 'South Tripura', category: 'Archaeological Sites & Ancient Cities', intro: '8th-12th century archaeological site showing historical confluence of Hinduism and Mahayana Buddhism.', lat: 23.2300, lng: 91.5800, isHiddenGem: true }
      ]
    )
  },
  {
    state: 'Sikkim',
    stateSlug: 'sikkim',
    capital: 'Gangtok',
    region: 'Northeast',
    type: 'state',
    airport: 'Pakyong Airport, Gangtok (PYG) / Bagdogra Airport (IXB)',
    railway: 'New Jalpaiguri (NJP) - 120 km highway drive',
    places: generateStatePlaces(
      'Sikkim', 'sikkim', 'Gangtok', 'Northeast',
      'Pakyong Airport, Gangtok (PYG)', 'New Jalpaiguri Railway Station (NJP)',
      ['East Sikkim', 'West Sikkim', 'North Sikkim', 'South Sikkim', 'Pakyong', 'Soreng'],
      [
        { name: 'Khangchendzonga National Park & Biosphere', district: 'West Sikkim', category: 'UNESCO World Heritage Sites', intro: 'India’s first UNESCO Mixed World Heritage site, centered on Mt. Kanchenjunga (8,586m) and sacred glacial lakes.', lat: 27.6667, lng: 88.3333, isUnesco: true },
        { name: 'Rumtek Monastery (Dharma Chakra Centre)', district: 'East Sikkim', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Seat of the Gyalwang Karmapa, holding golden stupas, rare thangkas, and Buddhist manuscripts.', lat: 27.3000, lng: 88.5800 },
        { name: 'Gurudongmar Lake & North Sikkim Plateau', district: 'North Sikkim', category: 'Waterfalls, Lakes & River Ghats', intro: 'One of the highest freshwater lakes in the world at 5,430m (17,800 ft), blessed by Guru Padmasambhava.', lat: 28.0160, lng: 88.7100 },
        { name: 'Pemayangtse Monastery & Rabdentse Ruins', district: 'West Sikkim', category: 'Archaeological Sites & Ancient Cities', intro: 'One of Sikkim’s oldest Nyingma gompas beside the historic ruins of the second royal capital of Sikkim.', lat: 27.3050, lng: 88.2520 },
        { name: 'Nathula Pass & Tsomgo (Changu) Lake', district: 'East Sikkim', category: 'Hill Stations, Peaks & Mountain Valleys', intro: 'Historic branch of the ancient Silk Route at 4,310m on the Indo-China border beside a sacred alpine lake.', lat: 27.3870, lng: 88.8310 },
        { name: 'Yuksom — First Capital of Sikkim', district: 'West Sikkim', category: 'Traditional Villages & Rural Living Heritage', intro: 'Historic coronation site of the first Chogyal monarch in 1642 CE and gateway to Goechala trek.', lat: 27.3700, lng: 88.2200 }
      ]
    )
  }
];

export function generateNortheastFile() {
  const allNortheastDestinations: any[] = [];
  northeastData.forEach(stateDataset => {
    stateDataset.places.forEach((p, idx) => {
      allNortheastDestinations.push(expandPlace(p, stateDataset, idx));
    });
  });

  const outPath = path.resolve('src/data/destinations/northeast.ts');
  const content = `import type { DestinationDetail } from '../../types/heritage.ts';\n\nexport const northeastDestinations: DestinationDetail[] = ${JSON.stringify(allNortheastDestinations, null, 2)};\n`;
  fs.writeFileSync(outPath, content, 'utf-8');
  console.log(`Generated Northeast Destinations: ${allNortheastDestinations.length} records in ${outPath}`);
}

generateNortheastFile();
