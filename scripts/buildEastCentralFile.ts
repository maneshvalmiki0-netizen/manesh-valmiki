import fs from 'fs';
import path from 'path';
import type { PlaceData, StateDataset } from './destinationCore.ts';
import { expandPlace } from './destinationCore.ts';
import { generateStatePlaces } from './southGenerator.ts';

const eastCentralData: StateDataset[] = [
  {
    state: 'Madhya Pradesh',
    stateSlug: 'madhya-pradesh',
    capital: 'Bhopal',
    region: 'Central',
    type: 'state',
    airport: 'Raja Bhoj Airport, Bhopal (BHO) / Devi Ahilyabai Holkar Airport, Indore (IDR)',
    railway: 'Bhopal Junction (BPL) / Gwalior (GWL) / Jabalpur (JBP)',
    places: generateStatePlaces(
      'Madhya Pradesh', 'madhya-pradesh', 'Bhopal', 'Central',
      'Raja Bhoj Airport, Bhopal (BHO)', 'Bhopal Junction (BPL)',
      ['Chhatarpur', 'Raisen', 'Gwalior', 'Indore', 'Ujjain', 'Jabalpur', 'Mandu', 'Orchha', 'Hoshangabad', 'Umaria', 'Mandla', 'Rewa', 'Vidisha', 'Shivpuri', 'Burhanpur', 'Maheshwar'],
      [
        { name: 'Khajuraho Group of Monuments', district: 'Chhatarpur', category: 'UNESCO World Heritage Sites', intro: 'Chandela dynasty Nagara temples famed for exquisite sculptures celebrating human emotions and celestial beings.', lat: 24.8318, lng: 79.9199, isUnesco: true },
        { name: 'Sanchi Buddhist Stupa & Torana Gateways', district: 'Raisen', category: 'UNESCO World Heritage Sites', intro: 'Oldest stone structure in India commissioned by Emperor Ashoka in 3rd century BCE with four carved ceremonial toranas.', lat: 23.4795, lng: 77.7397, isUnesco: true },
        { name: 'Bhimbetka Prehistoric Rock Shelters', district: 'Raisen', category: 'UNESCO World Heritage Sites', intro: 'Prehistoric cave art gallery spanning Upper Paleolithic to medieval times across 750 rock shelters.', lat: 22.9372, lng: 77.6128, isUnesco: true },
        { name: 'Gwalior Fort & Man Mandir Palace', district: 'Gwalior', category: 'Historic Forts & Bastions', intro: 'Imposing hill fortress described by Mughal Emperor Babur as "the pearl among fortresses of Hind".', lat: 26.2307, lng: 78.1695 },
        { name: 'Mahakaleshwar Jyotirlinga, Ujjain', district: 'Ujjain', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Only south-facing (Dakshinamurti) Jyotirlinga, famous for the sacred dawn Bhasma Aarti on Shipra river.', lat: 23.1827, lng: 75.7682 },
        { name: 'Kanha Tiger Reserve & Sal Forests', district: 'Mandla', category: 'National Parks & Wildlife Corridors', intro: 'Prime tiger habitat and inspiration for Rudyard Kipling’s The Jungle Book, home to the hard-ground barasingha.', lat: 22.3340, lng: 80.6110 },
        { name: 'Bandhavgarh National Park', district: 'Umaria', category: 'National Parks & Wildlife Corridors', intro: 'Ancient fortress hill surrounded by pristine sal jungles with the highest tiger density in India.', lat: 23.7220, lng: 81.0260 },
        { name: 'Bhedaghat Marble Rocks & Dhuandhar Falls', district: 'Jabalpur', category: 'Waterfalls, Lakes & River Ghats', intro: '100-foot white marble canyon carved by the Narmada River dropping into smoky Dhuandhar waterfall.', lat: 23.1310, lng: 79.8000 },
        { name: 'Orchha Fort Complex & Jahangir Mahal', district: 'Niwari', category: 'Royal Palaces & Historic Havelis', intro: 'Picturesque medieval Bundela Rajput capital set on the Betwa River with cenotaphs and palaces.', lat: 25.3510, lng: 78.6420 },
        { name: 'Mandu Jahaz Mahal & Rani Roopmati Pavilion', district: 'Dhar', category: 'Royal Palaces & Historic Havelis', intro: 'Romantic medieval fortress city perched on Vindhya crest with Afghan-style water palaces.', lat: 22.3660, lng: 75.4050 }
      ]
    )
  },
  {
    state: 'Chhattisgarh',
    stateSlug: 'chhattisgarh',
    capital: 'Raipur',
    region: 'Central',
    type: 'state',
    airport: 'Swami Vivekananda Airport, Raipur (RPR)',
    railway: 'Raipur Junction (R) / Bilaspur Junction (BSP)',
    places: generateStatePlaces(
      'Chhattisgarh', 'chhattisgarh', 'Raipur', 'Central',
      'Swami Vivekananda Airport, Raipur (RPR)', 'Raipur Junction (R)',
      ['Bastar', 'Bilaspur', 'Surguja', 'Durg', 'Rajnandgaon', 'Dhamtari', 'Kanker', 'Korba', 'Janjgir-Champa', 'Kawardha', 'Gariaband', 'Dantewada'],
      [
        { name: 'Chitrakote Waterfalls (Niagara of India)', district: 'Bastar', category: 'Waterfalls, Lakes & River Ghats', intro: 'Horseshoe waterfall on Indravati River dropping 95 feet, widest waterfall in India.', lat: 19.2028, lng: 81.7061 },
        { name: 'Tirathgarh Cascading Waterfalls', district: 'Bastar', category: 'Waterfalls, Lakes & River Ghats', intro: 'Multi-tiered 300-foot block cascade in Kanger Valley National Park.', lat: 18.9167, lng: 81.8667 },
        { name: 'Bhoramdeo Temple (Khajuraho of Chhattisgarh)', district: 'Kawardha', category: 'Ancient Temples & Sacred Sanctuaries', intro: '11th-century Nagara temple complex built by Nagavanshi kings in Maikal Hills.', lat: 22.1150, lng: 81.1610 },
        { name: 'Sirpur Buddhist & Shiva Archaeological Monuments', district: 'Mahasamund', category: 'Archaeological Sites & Ancient Cities', intro: 'Ancient river capital with 7th-century brick Lakshmana Temple and Buddhist monasteries.', lat: 21.3410, lng: 82.1790, isHiddenGem: true },
        { name: 'Kanger Valley National Park & Kotumsar Cave', district: 'Bastar', category: 'National Parks & Wildlife Corridors', intro: 'Dense biodiversity corridor holding subterranean limestone caves with blind cavefish.', lat: 18.8800, lng: 81.9300 },
        { name: 'Danteshwari Temple, Dantewada', district: 'Dantewada', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Ancient 14th-century Shakti Peetha temple of the tutelary deity of Bastar royals.', lat: 18.8990, lng: 81.3500 },
        { name: 'Kondagaon Bastar Dhokra Bell Metal Village', district: 'Kondagaon', category: 'Handicraft Centres & Artisan Guilds', intro: 'Epicentre of 4,000-year-old lost-wax bell metal casting (Dhokra) and wrought iron crafts.', lat: 19.6000, lng: 81.6700 }
      ]
    )
  },
  {
    state: 'Bihar',
    stateSlug: 'bihar',
    capital: 'Patna',
    region: 'East',
    type: 'state',
    airport: 'Jay Prakash Narayan Airport, Patna (PAT) / Gaya Airport (GAY)',
    railway: 'Patna Junction (PNBE) / Gaya Junction (GAYA)',
    places: generateStatePlaces(
      'Bihar', 'bihar', 'Patna', 'East',
      'Jay Prakash Narayan Airport, Patna (PAT)', 'Patna Junction (PNBE)',
      ['Gaya', 'Nalanda', 'Rajgir', 'Patna', 'Vaishali', 'Bhagalpur', 'Rohtas', 'Sasaram', 'Muzaffarpur', 'Darbhanga', 'Madhubani', 'Champaran'],
      [
        { name: 'Mahabodhi Temple Complex & Bodhi Tree', district: 'Gaya', category: 'UNESCO World Heritage Sites', intro: 'Holier than holy Buddhist shrine marking the exact spot where Gautama Buddha attained supreme Enlightenment.', lat: 24.6960, lng: 84.9914, isUnesco: true },
        { name: 'Nalanda Mahavihara Ancient University Ruins', district: 'Nalanda', category: 'UNESCO World Heritage Sites', intro: 'Ancient residential monastic university of the 5th to 12th century CE that taught scholars across Asia.', lat: 25.1357, lng: 85.4439, isUnesco: true },
        { name: 'Rajgir Vulture Peak & Vishwa Shanti Stupa', district: 'Nalanda', category: 'Religious Pilgrimage Centres', intro: 'Ancient Magadha capital in a valley of seven hills, with aerial ropeway to white Peace Pagoda.', lat: 25.0290, lng: 85.4210 },
        { name: 'Sher Shah Suri Tomb, Sasaram', district: 'Rohtas', category: 'UNESCO World Heritage Sites', intro: 'Majestic red sandstone mausoleum rising from the center of an artificial lake.', lat: 24.9540, lng: 84.0150, isUnesco: true },
        { name: 'Vaishali Ashokan Pillar & Relic Stupa', district: 'Vaishali', category: 'Archaeological Sites & Ancient Cities', intro: 'World’s earliest known democratic republic where Buddha preached his last sermon.', lat: 25.9920, lng: 85.1270 },
        { name: 'Barabar Caves — India’s Oldest Rock-Cut Caves', district: 'Jehanabad', category: 'Rock-Cut Caves, Stepwells & Inscriptions', intro: '3rd-century BCE Mauryan rock-cut chambers with mirror-polished granite interiors.', lat: 25.0070, lng: 85.0600, isHiddenGem: true },
        { name: 'Madhubani Painting Villages (Ranti & Jitwarpur)', district: 'Madhubani', category: 'Handicraft Centres & Artisan Guilds', intro: 'Living rural art villages where women paint Mithila folklore on mud walls and handmade paper.', lat: 26.3550, lng: 86.0750 },
        { name: 'Vikramashila University Ruins, Bhagalpur', district: 'Bhagalpur', category: 'Archaeological Sites & Ancient Cities', intro: 'Pala-era Buddhist monastic university famed for Tantric Vajrayana philosophy.', lat: 25.3280, lng: 87.2790 }
      ]
    )
  },
  {
    state: 'Jharkhand',
    stateSlug: 'jharkhand',
    capital: 'Ranchi',
    region: 'East',
    type: 'state',
    airport: 'Birsa Munda Airport, Ranchi (IXR)',
    railway: 'Ranchi Junction (RNC) / Dhanbad / Tatanagar',
    places: generateStatePlaces(
      'Jharkhand', 'jharkhand', 'Ranchi', 'East',
      'Birsa Munda Airport, Ranchi (IXR)', 'Ranchi Junction (RNC)',
      ['Ranchi', 'Deoghar', 'East Singhbhum', 'Hazaribagh', 'Giridih', 'Bokaro', 'Dhanbad', 'Palamu', 'Latehar', 'Khunti', 'Dumka', 'Gumla'],
      [
        { name: 'Baidyanath Jyotirlinga Dham, Deoghar', district: 'Deoghar', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Sacred Kamna Linga and Shakti Peetha host to the millions-strong Shravani Mela pilgrimage.', lat: 24.4925, lng: 86.7000 },
        { name: 'Hundru & Jonha Waterfalls', district: 'Ranchi', category: 'Waterfalls, Lakes & River Ghats', intro: 'Scenic cascades where Subarnarekha River plunges 320 feet over jagged granite rocks.', lat: 23.4500, lng: 85.6500 },
        { name: 'Shikharji (Parasnath Hill)', district: 'Giridih', category: 'Religious Pilgrimage Centres', intro: 'Holiest Jain pilgrimage mountain (1,365m) where twenty of the twenty-four Tirthankaras attained Nirvana.', lat: 23.9620, lng: 86.1550 },
        { name: 'Betla National Park & Palamu Forts', district: 'Latehar', category: 'National Parks & Wildlife Corridors', intro: 'One of India’s earliest tiger reserves holding two 16th-century Chero dynasty stone forts.', lat: 23.8830, lng: 84.1830 },
        { name: 'Maluti Terracotta Temple Cluster', district: 'Dumka', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Unique village preserving 72 ornate 17th-century terracotta temples depicting Ramayana scenes.', lat: 24.1560, lng: 87.6750, isHiddenGem: true },
        { name: 'Dassam Falls (Kanchi River)', district: 'Ranchi', category: 'Waterfalls, Lakes & River Ghats', intro: 'Spectacular 144-foot waterfall surrounded by Sal and Palash forests.', lat: 23.1420, lng: 85.4670 }
      ]
    )
  },
  {
    state: 'Odisha',
    stateSlug: 'odisha',
    capital: 'Bhubaneswar',
    region: 'East',
    type: 'state',
    airport: 'Biju Patnaik International Airport, Bhubaneswar (BBI)',
    railway: 'Bhubaneswar (BBS) / Puri (PURI) / Cuttack',
    places: generateStatePlaces(
      'Odisha', 'odisha', 'Bhubaneswar', 'East',
      'Biju Patnaik International Airport, Bhubaneswar (BBI)', 'Bhubaneswar (BBS)',
      ['Puri', 'Khordha', 'Konark', 'Mayurbhanj', 'Ganjam', 'Cuttack', 'Sambalpur', 'Kendrapara', 'Koraput', 'Bhadrak', 'Sundargarh', 'Balasore'],
      [
        { name: 'Sun Temple, Konark (Black Pagoda)', district: 'Puri', category: 'UNESCO World Heritage Sites', intro: '13th-century chariot of Surya with 24 carved stone wheels and seven horses on the Bay of Bengal.', lat: 19.8876, lng: 86.0945, isUnesco: true },
        { name: 'Jagannath Temple, Puri', district: 'Puri', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Sacred Char Dham sanctuary celebrating the world-famous Ratha Yatra (Chariot Festival).', lat: 19.8048, lng: 85.8179 },
        { name: 'Lingaraj Temple, Bhubaneswar', district: 'Khordha', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Apex of Kalinga architecture with a 180-foot deula spire rising over Bindu Sagar lake.', lat: 20.2382, lng: 85.8338 },
        { name: 'Chilika Lake & Irrawaddy Dolphins', district: 'Puri', category: 'National Parks & Wildlife Corridors', intro: 'Asia’s largest brackish lagoon wintering over a million migratory birds and endangered dolphins.', lat: 19.7160, lng: 85.3240 },
        { name: 'Udayagiri & Khandagiri Rock-Cut Caves', district: 'Khordha', category: 'Rock-Cut Caves, Stepwells & Inscriptions', intro: '2nd-century BCE Jain cave shelters with Emperor Kharavela’s Hathigumpha inscription.', lat: 20.2630, lng: 85.7870 },
        { name: 'Simlipal National Park & Tiger Reserve', district: 'Mayurbhanj', category: 'UNESCO World Heritage Sites', intro: 'Vast biosphere reserve of red sal forests, waterfalls, and rare melanistic black tigers.', lat: 21.6660, lng: 86.3330, isUnesco: true },
        { name: 'Raghurajpur Heritage Crafts Village', district: 'Puri', category: 'Handicraft Centres & Artisan Guilds', intro: 'Artisan village where every family practices traditional Pattachitra palm leaf painting and Gotipua dance.', lat: 19.8630, lng: 85.8370, isHiddenGem: true }
      ]
    )
  },
  {
    state: 'West Bengal',
    stateSlug: 'west-bengal',
    capital: 'Kolkata',
    region: 'East',
    type: 'state',
    airport: 'Netaji Subhash Chandra Bose International Airport, Kolkata (CCU) / Bagdogra Airport (IXB)',
    railway: 'Howrah Junction (HWH) / Sealdah (SDAH) / New Jalpaiguri (NJP)',
    places: generateStatePlaces(
      'West Bengal', 'west-bengal', 'Kolkata', 'East',
      'Netaji Subhash Chandra Bose International Airport, Kolkata (CCU)', 'Howrah Junction (HWH)',
      ['Kolkata', 'Darjeeling', 'Bankura', 'Birbhum', 'South 24 Parganas', 'Murshidabad', 'Hooghly', 'Purulia', 'Jalpaiguri', 'Alipurduar', 'Kalimpong', 'Nadia'],
      [
        { name: 'Sundarbans Mangrove Tiger Reserve', district: 'South 24 Parganas', category: 'UNESCO World Heritage Sites', intro: 'World’s largest mangrove delta forest and unique habitat of swimming Royal Bengal Tigers.', lat: 21.9497, lng: 89.1833, isUnesco: true },
        { name: 'Darjeeling Himalayan Railway (Toy Train)', district: 'Darjeeling', category: 'UNESCO World Heritage Sites', intro: 'Historic narrow-gauge railway engineered in 1881 winding through misty tea gardens to Ghoom.', lat: 27.0410, lng: 88.2663, isUnesco: true },
        { name: 'Santiniketan — Rabindranath Tagore’s Vision', district: 'Birbhum', category: 'UNESCO World Heritage Sites', intro: 'UNESCO cultural campus founded by Nobel laureate Tagore championing open-air education.', lat: 23.6780, lng: 87.6880, isUnesco: true },
        { name: 'Bishnupur Terracotta Temples', district: 'Bankura', category: 'Ancient Temples & Sacred Sanctuaries', intro: '17th-century terracotta temples built by Malla kings adorned with intricate burnt clay plaques.', lat: 23.0750, lng: 87.3220 },
        { name: 'Victoria Memorial Hall & Maidan', district: 'Kolkata', category: 'Museums & Cultural Archives', intro: 'Colossal white Makrana marble monument blending British and Mughal architecture on the Hooghly.', lat: 22.5448, lng: 88.3426 },
        { name: 'Dakshineswar Kali Temple & Belur Math', district: 'Kolkata', category: 'Religious Pilgrimage Centres', intro: 'Sacred Kali temple where Ramakrishna Paramahamsa meditated, facing Ramakrishna Mission headquarters.', lat: 22.6550, lng: 88.3580 },
        { name: 'Hazarduari Palace (Thousand Doors)', district: 'Murshidabad', category: 'Royal Palaces & Historic Havelis', intro: 'Grand 19th-century palace of the Nawabs of Bengal containing 1,000 doors and royal armory.', lat: 24.1860, lng: 88.2680 }
      ]
    )
  }
];

export function generateEastCentralFile() {
  const allEastCentralDestinations: any[] = [];
  eastCentralData.forEach(stateDataset => {
    stateDataset.places.forEach((p, idx) => {
      allEastCentralDestinations.push(expandPlace(p, stateDataset, idx));
    });
  });

  const outPath = path.resolve('src/data/destinations/eastCentral.ts');
  const content = `import type { DestinationDetail } from '../../types/heritage.ts';\n\nexport const eastCentralDestinations: DestinationDetail[] = ${JSON.stringify(allEastCentralDestinations, null, 2)};\n`;
  fs.writeFileSync(outPath, content, 'utf-8');
  console.log(`Generated East-Central Destinations: ${allEastCentralDestinations.length} records in ${outPath}`);
}

generateEastCentralFile();
