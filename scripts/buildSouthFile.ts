import fs from 'fs';
import path from 'path';
import { PlaceData, StateDataset, expandPlace } from './destinationCore.ts';
import { karnatakaPlaces, generateStatePlaces } from './southGenerator.ts';

// 1. SOUTH REGION STATES
const southData: StateDataset[] = [
  {
    state: 'Karnataka',
    stateSlug: 'karnataka',
    capital: 'Bengaluru',
    region: 'South',
    type: 'state',
    airport: 'Kempegowda International Airport, Bengaluru (BLR)',
    railway: 'KSR Bengaluru City / Hosapete Junction (HPT)',
    places: karnatakaPlaces
  },
  {
    state: 'Tamil Nadu',
    stateSlug: 'tamil-nadu',
    capital: 'Chennai',
    region: 'South',
    type: 'state',
    airport: 'Chennai International Airport (MAA) / Madurai Airport',
    railway: 'Chennai Central (MAS) / Madurai Junction',
    places: generateStatePlaces(
      'Tamil Nadu', 'tamil-nadu', 'Chennai', 'South',
      'Chennai International Airport (MAA)', 'Chennai Central (MAS)',
      ['Thanjavur', 'Madurai', 'Kanchipuram', 'Chengalpattu', 'Chennai', 'Tiruchirappalli', 'Kanniyakumari', 'Nilgiris', 'Ramanathapuram', 'Coimbatore', 'Salem', 'Tirunelveli', 'Thiruvarur', 'Dindigul', 'Theni', 'Sivagangai', 'Cuddalore', 'Pudukkottai', 'Villupuram', 'Vellore'],
      [
        { name: 'Brihadisvara Temple (Big Temple)', district: 'Thanjavur', category: 'UNESCO World Heritage Sites', intro: 'Chola architectural apex with 80-tonne granite cupola atop 66-metre vimana.', lat: 10.7828, lng: 79.1318, isUnesco: true },
        { name: 'Meenakshi Sundareswarar Temple', district: 'Madurai', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Monumental 14-tower temple city celebrating Goddess Meenakshi and Lord Shiva.', lat: 9.9195, lng: 78.1193 },
        { name: 'Shore Temple & Pancha Rathas', district: 'Chengalpattu', category: 'UNESCO World Heritage Sites', intro: '8th-century Pallava structural stone temples along the Coromandel coast.', lat: 12.6160, lng: 80.1990, isUnesco: true },
        { name: 'Sri Ranganathaswamy Temple, Srirangam', district: 'Tiruchirappalli', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Largest functioning temple complex covering 156 acres across seven enclosures.', lat: 10.8625, lng: 78.6903 },
        { name: 'Vivekananda Rock Memorial & Thiruvalluvar Statue', district: 'Kanniyakumari', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: 'Offshore granite memorial at the confluence of three oceans.', lat: 8.0780, lng: 77.5550 },
        { name: 'Nilgiri Mountain Railway', district: 'Nilgiris', category: 'UNESCO World Heritage Sites', intro: 'Historic meter-gauge rack railway climbing from Mettupalayam to Ooty.', lat: 11.4102, lng: 76.6950, isUnesco: true },
        { name: 'Ramanathaswamy Temple, Rameswaram', district: 'Ramanathapuram', category: 'Religious Pilgrimage Centres', intro: 'Sacred island jyotirlinga shrine famed for the longest pillared corridor in India.', lat: 9.2881, lng: 79.3174 },
        { name: 'Chettinad Heritage Mansions, Kanadukathan', district: 'Sivagangai', category: 'Traditional Villages & Rural Living Heritage', intro: 'Merchant palaces featuring Burmese teak pillars, Italian marble, and Athangudi tiles.', lat: 10.1750, lng: 78.7830, isHiddenGem: true },
        { name: 'Padmanabhapuram Palace', district: 'Kanniyakumari', category: 'Royal Palaces & Historic Havelis', intro: '16th-century wooden palace of Travancore kings set against Velli Hills.', lat: 8.2514, lng: 77.3275 },
        { name: 'Kanchipuram Silk Weavers Guild & Ekambareswarar', district: 'Kanchipuram', category: 'Handicraft Centres & Artisan Guilds', intro: 'Ancient city of thousand temples and handloom mulberry silk weaving guilds.', lat: 12.8460, lng: 79.7000 },
        { name: 'Airavatesvara Temple, Darasuram', district: 'Thanjavur', category: 'UNESCO World Heritage Sites', intro: 'Chola temple carved like a stone chariot pulled by caparisoned elephants.', lat: 10.9570, lng: 79.3560, isUnesco: true },
        { name: 'Gangaikonda Cholapuram Temple', district: 'Ariyalur', category: 'UNESCO World Heritage Sites', intro: 'Capital temple built by Rajendra Chola I commemorating his conquest up to River Ganges.', lat: 11.2050, lng: 79.4500, isUnesco: true }
      ]
    )
  },
  {
    state: 'Kerala',
    stateSlug: 'kerala',
    capital: 'Thiruvananthapuram',
    region: 'South',
    type: 'state',
    airport: 'Cochin International Airport (COK) / Trivandrum Airport (TRV)',
    railway: 'Ernakulam Junction (ERS) / Thiruvananthapuram Central (TVC)',
    places: generateStatePlaces(
      'Kerala', 'kerala', 'Thiruvananthapuram', 'South',
      'Cochin International Airport (COK)', 'Ernakulam Junction (ERS)',
      ['Alappuzha', 'Kottayam', 'Ernakulam', 'Idukki', 'Wayanad', 'Thiruvananthapuram', 'Kollam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Kannur', 'Kasaragod', 'Pathanamthitta'],
      [
        { name: 'Vembanad Lake Backwaters & Kettuvallam Cruise', district: 'Alappuzha', category: 'Waterfalls, Lakes & River Ghats', intro: 'Serene network of brackish lagoons explored on traditional thatched houseboats.', lat: 9.4981, lng: 76.3388 },
        { name: 'Fort Kochi Colonial Quarter & Chinese Fishing Nets', district: 'Ernakulam', category: 'Colonial Landmarks & Historic Railways', intro: 'Historic port settlement featuring Portuguese, Dutch, and British quarters.', lat: 9.9656, lng: 76.2421 },
        { name: 'Munnar Tea Plantations & Anamudi Peak', district: 'Idukki', category: 'Hill Stations, Peaks & Mountain Valleys', intro: 'Misty hill station home to the highest peak in South India (2,695m).', lat: 10.0889, lng: 77.0595 },
        { name: 'Edakkal Caves Prehistoric Petroglyphs', district: 'Wayanad', category: 'Rock-Cut Caves, Stepwells & Inscriptions', intro: 'Neolithic rock shelters containing ancient pictographs dating back to 5000 BCE.', lat: 11.6280, lng: 76.2340, isHiddenGem: true },
        { name: 'Padmanabhaswamy Temple', district: 'Thiruvananthapuram', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Sacred Maha Vishnu sanctuary in Ananthasayanam posture with subterranean vaults.', lat: 8.4830, lng: 76.9436 },
        { name: 'Bekal Fort & Coastal Citadel', district: 'Kasaragod', category: 'Historic Forts & Bastions', intro: 'Largest keyhole-shaped sea fort in Kerala rising directly from the Arabian Sea.', lat: 12.3925, lng: 75.0322 },
        { name: 'Periyar Tiger Reserve, Thekkady', district: 'Idukki', category: 'National Parks & Wildlife Corridors', intro: 'Scenic wildlife sanctuary nestled around an artificial lake with wild elephant herds.', lat: 9.4679, lng: 77.1444 },
        { name: 'Thrissur Vadakkunnathan Temple', district: 'Thrissur', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Ancient Shiva temple nestled inside monumental koothambalam, seat of Thrissur Pooram.', lat: 10.5244, lng: 76.2144 },
        { name: 'Silent Valley National Park', district: 'Palakkad', category: 'National Parks & Wildlife Corridors', intro: 'Untouched tropical evergreen rainforest sanctuary harboring lion-tailed macaques.', lat: 11.0800, lng: 76.4500, isHiddenGem: true },
        { name: 'Athirappilly Waterfalls', district: 'Thrissur', category: 'Waterfalls, Lakes & River Ghats', intro: 'Majestic 80-foot waterfall on Chalakudy River known as "Niagara of India".', lat: 10.2850, lng: 76.5690 }
      ]
    )
  },
  {
    state: 'Andhra Pradesh',
    stateSlug: 'andhra-pradesh',
    capital: 'Amaravati',
    region: 'South',
    type: 'state',
    airport: 'Tirupati International Airport (TIR) / Visakhapatnam Airport (VTZ)',
    railway: 'Vijayawada Junction (BZA) / Tirupati Main (TPTY)',
    places: generateStatePlaces(
      'Andhra Pradesh', 'andhra-pradesh', 'Amaravati', 'South',
      'Tirupati International Airport (TIR)', 'Vijayawada Junction (BZA)',
      ['Tirupati', 'Visakhapatnam', 'Kurnool', 'Guntur', 'Krishna', 'Anantapur', 'Chittoor', 'YSR Kadapa', 'East Godavari', 'West Godavari', 'Nellore', 'Prakasam', 'Srikakulam', 'Vizianagaram'],
      [
        { name: 'Tirumala Venkateswara Swamy Temple', district: 'Tirupati', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'World’s most-visited pilgrimage temple atop Seven Hills of Seshachalam range.', lat: 13.6830, lng: 79.3470 },
        { name: 'Lepakshi Veerabhadra Temple & Hanging Pillar', district: 'Anantapur', category: 'Ancient Temples & Sacred Sanctuaries', intro: '16th-century Vijayanagara architectural wonder with famous hanging stone pillar and monolithic Nandi.', lat: 14.1419, lng: 77.6080 },
        { name: 'Belum Caves Subterranean Chambers', district: 'Kurnool', category: 'Rock-Cut Caves, Stepwells & Inscriptions', intro: 'Second-largest cave system in India with 3.5 km of subterranean passages and stalactites.', lat: 15.1028, lng: 78.1117 },
        { name: 'Gandikota Canyon & Fort (Grand Canyon of India)', district: 'YSR Kadapa', category: 'Scenic Viewpoints & Geological Wonders', intro: 'Spectacular red granite gorge carved by Pennar River guarded by a medieval stone fort.', lat: 14.8156, lng: 78.2861, isHiddenGem: true },
        { name: 'Borra Caves & Araku Valley', district: 'Visakhapatnam', category: 'Hill Stations, Peaks & Mountain Valleys', intro: 'Deep million-year-old limestone caves amidst Eastern Ghats tribal coffee valleys.', lat: 18.2800, lng: 83.0400 },
        { name: 'Amaravati Stupa & Archaeological Museum', district: 'Guntur', category: 'Archaeological Sites & Ancient Cities', intro: 'Great Buddhist Mahachaitya site featuring magnificent Satavahana limestone reliefs.', lat: 16.5740, lng: 80.3570 },
        { name: 'Srisailam Mallikarjuna Jyotirlinga & Dam', district: 'Kurnool', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Sacred jyotirlinga and shakti peetha perched in dense Nallamala tiger forest.', lat: 16.0740, lng: 78.8680 }
      ]
    )
  },
  {
    state: 'Telangana',
    stateSlug: 'telangana',
    capital: 'Hyderabad',
    region: 'South',
    type: 'state',
    airport: 'Rajiv Gandhi International Airport, Hyderabad (HYD)',
    railway: 'Secunderabad Junction (SC) / Hyderabad Deccan (HYB)',
    places: generateStatePlaces(
      'Telangana', 'telangana', 'Hyderabad', 'South',
      'Rajiv Gandhi International Airport (HYD)', 'Secunderabad Junction (SC)',
      ['Hyderabad', 'Warangal', 'Mulugu', 'Nalgonda', 'Khammam', 'Nizamabad', 'Karimnagar', 'Mahabubnagar', 'Bhadradri Kothagudem', 'Adilabad', 'Medak', 'Siddipet'],
      [
        { name: 'Ramappa Temple (Rudreshwara)', district: 'Mulugu', category: 'UNESCO World Heritage Sites', intro: '13th-century Kakatiya temple built with floating bricks and carved black basalt pillars.', lat: 18.2650, lng: 79.9440, isUnesco: true },
        { name: 'Charminar & Laad Bazaar', district: 'Hyderabad', category: 'Historic Forts & Bastions', intro: '1591 CE monumental four-minaret gateway symbol of Hyderabad surrounded by pearl and lacquer bangle markets.', lat: 17.3616, lng: 78.4747 },
        { name: 'Golconda Fort & Acoustic Echo Dome', district: 'Hyderabad', category: 'Historic Forts & Bastions', intro: 'Imposing medieval diamond fortress whose acoustic system warned rulers of distant invasions.', lat: 17.3833, lng: 78.4011 },
        { name: 'Qutb Shahi Tombs Heritage Park', district: 'Hyderabad', category: 'Royal Palaces & Historic Havelis', intro: 'Royal necropolis of seven Qutb Shahi rulers blending Persian and Hindu architectural motifs.', lat: 17.3917, lng: 78.3969 },
        { name: 'Warangal Fort & Kakatiya Kala Thoranam', district: 'Warangal', category: 'Historic Forts & Bastions', intro: '12th-century concentric stone fortress with iconic four-stone ceremonial victory arches.', lat: 17.9550, lng: 79.6170 },
        { name: 'Thousand Pillar Temple, Hanamkonda', district: 'Warangal', category: 'Ancient Temples & Sacred Sanctuaries', intro: '1163 CE star-shaped Kakatiya temple dedicated to Shiva, Vishnu, and Surya.', lat: 18.0050, lng: 79.5740 },
        { name: 'Chowmahalla Palace', district: 'Hyderabad', category: 'Royal Palaces & Historic Havelis', intro: 'Opulent palace of the Asaf Jahi Nizams of Hyderabad with grand Durbar Hall and vintage car fleet.', lat: 17.3580, lng: 78.4710 },
        { name: 'Kuntala Waterfall, Adilabad', district: 'Adilabad', category: 'Waterfalls, Lakes & River Ghats', intro: 'Highest waterfall in Telangana dropping 150 feet amidst Sahyadri mountain ranges.', lat: 19.3080, lng: 78.4830, isHiddenGem: true },
        { name: 'Pochampally Ikat Handloom Village', district: 'Yadadri Bhuvanagiri', category: 'Handicraft Centres & Artisan Guilds', intro: 'UNESCO-recognized World Best Tourism Village famed for traditional double-ikat Pochampally silk weaving.', lat: 17.3450, lng: 78.8250 }
      ]
    )
  }
];

// Helper to write regional file
export function generateSouthFile() {
  const allSouthDestinations: any[] = [];
  southData.forEach(stateDataset => {
    stateDataset.places.forEach((p, idx) => {
      allSouthDestinations.push(expandPlace(p, stateDataset, idx));
    });
  });

  const outPath = path.resolve('src/data/destinations/south.ts');
  const content = `import type { DestinationDetail } from '../../types/heritage.ts';\n\nexport const southDestinations: DestinationDetail[] = ${JSON.stringify(allSouthDestinations, null, 2)};\n`;
  fs.writeFileSync(outPath, content, 'utf-8');
  console.log(`Generated South Destinations: ${allSouthDestinations.length} records in ${outPath}`);
}

generateSouthFile();
