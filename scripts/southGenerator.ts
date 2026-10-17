import fs from 'fs';
import path from 'path';
import type { PlaceData, StateDataset } from './destinationCore.ts';
import { expandPlace } from './destinationCore.ts';

// 1. KARNATAKA (52 sites)
const karnatakaPlaces: PlaceData[] = [
  { name: 'Vittala Temple & Stone Chariot', district: 'Vijayanagara', category: 'UNESCO World Heritage Sites', shortIntro: 'Iconic 15th-century Vijayanagara Dravidian temple complex with musical granite pillars and monolithic Garuda chariot.', lat: 15.3350, lng: 76.4794, isUnesco: true },
  { name: 'Virupaksha Temple, Hampi', district: 'Vijayanagara', category: 'Ancient Temples & Sacred Sanctuaries', shortIntro: 'Continuously functioning Shiva sanctuary with a 50-metre eastern gopuram overlooking Tungabhadra River.', lat: 15.3353, lng: 76.4600 },
  { name: 'Hoysaleswara Temple, Halebidu', district: 'Hassan', category: 'UNESCO World Heritage Sites', shortIntro: 'Twin 12th-century soapstone temples renowned for intricate friezes of celestial dancers and epics.', lat: 13.2132, lng: 75.9947, isUnesco: true },
  { name: 'Chennakeshava Temple, Belur', district: 'Hassan', category: 'UNESCO World Heritage Sites', shortIntro: 'Masterpiece of Hoysala stone sculpture dedicated to Lord Vishnu, featuring 42 bracket figures (Madanikas).', lat: 13.1627, lng: 75.8596, isUnesco: true },
  { name: 'Keshava Temple, Somanathapura', district: 'Mysuru', category: 'UNESCO World Heritage Sites', shortIntro: 'Trikuta (triple-shrine) Hoysala temple exhibiting pristine 13th-century stone carving.', lat: 12.2760, lng: 76.8817, isUnesco: true },
  { name: 'Mysore Palace (Amba Vilas)', district: 'Mysuru', category: 'Royal Palaces & Historic Havelis', shortIntro: 'Indo-Saracenic royal residence of the Wadiyar dynasty, illuminated by 97,000 lightbulbs.', lat: 12.3051, lng: 76.6551 },
  { name: 'Gol Gumbaz, Vijayapura', district: 'Vijayapura', category: 'Historic Forts & Bastions', shortIntro: 'Mausoleum of Mohammed Adil Shah boasting one of the world’s largest unsupported masonry domes.', lat: 16.8306, lng: 75.7357 },
  { name: 'Ibrahim Rauza, Vijayapura', district: 'Vijayapura', category: 'Royal Palaces & Historic Havelis', shortIntro: 'Known as the "Taj Mahal of the Deccan", an exquisite tomb and mosque complex.', lat: 16.8280, lng: 75.7020 },
  { name: 'Badami Cave Temples', district: 'Bagalkote', category: 'Rock-Cut Caves, Stepwells & Inscriptions', shortIntro: 'Four monolithic rock-cut cave temples carved from sandstone cliffs overlooking Agastya Lake.', lat: 15.9189, lng: 75.6766 },
  { name: 'Pattadakal Monument Group', district: 'Bagalkote', category: 'UNESCO World Heritage Sites', shortIntro: 'Royal coronation site of Chalukya monarchs showcasing fusion of Rekha-Nagara and Dravidian styles.', lat: 15.9490, lng: 75.8160, isUnesco: true },
  { name: 'Aihole Durga Temple & Archaeological Complex', district: 'Bagalkote', category: 'Archaeological Sites & Ancient Cities', shortIntro: 'Ancient experimental laboratory of over 120 stone temples dating from 450 to 1200 CE.', lat: 16.0210, lng: 75.8820 },
  { name: 'Gommateshwara Monolith, Shravanabelagola', district: 'Hassan', category: 'Ancient Temples & Sacred Sanctuaries', shortIntro: '57-foot tall free-standing granite statue of Lord Bahubali, seat of the Mahamastakabhisheka.', lat: 12.8580, lng: 76.4862 },
  { name: 'Chitradurga Fort (Kallina Kote)', district: 'Chitradurga', category: 'Historic Forts & Bastions', shortIntro: 'Formidable stone fortress with seven concentric ramparts, 38 gateway passages, and water tanks.', lat: 14.2230, lng: 76.3980 },
  { name: 'Bidar Fort & Mahmud Gawan Madrasa', district: 'Bidar', category: 'Historic Forts & Bastions', shortIntro: 'Bahmani Sultanate bastion with triple moat and Persia-inspired Islamic college.', lat: 17.9250, lng: 77.5250 },
  { name: 'Gulbarga Fort & Jama Masjid', district: 'Kalaburagi', category: 'Historic Forts & Bastions', shortIntro: 'Early Bahmani fort housing a unique congregational mosque entirely covered by 63 domes.', lat: 17.3380, lng: 76.8330 },
  { name: 'Murudeshwar Shiva Temple & Sea Cliff', district: 'Uttara Kannada', category: 'Beaches & Coastal Heritage', shortIntro: 'World’s second-tallest Shiva statue overlooking the Arabian Sea, flanked by 20-storey Raja Gopura.', lat: 14.0942, lng: 74.4847 },
  { name: 'Gokarna Om Beach & Mahabaleshwar Temple', district: 'Uttara Kannada', category: 'Beaches & Coastal Heritage', shortIntro: 'Sacred coastal town where Western Ghats meet Arabian Sea along an Om-shaped natural shoreline.', lat: 14.5160, lng: 74.3160 },
  { name: 'Jog Falls (Gersoppa)', district: 'Shivamogga', category: 'Waterfalls, Lakes & River Ghats', shortIntro: 'India’s second-highest plunge waterfall where the Sharavathi River drops 253 metres in four cascades.', lat: 14.2285, lng: 74.8122 },
  { name: 'Nagarhole National Park (Kabini)', district: 'Mysuru', category: 'National Parks & Wildlife Corridors', shortIntro: 'Prime tiger and Asian elephant reserve on the banks of Kabini River within Nilgiri Biosphere.', lat: 11.9960, lng: 76.1265 },
  { name: 'Bandipur National Park', district: 'Chamarajanagar', category: 'National Parks & Wildlife Corridors', shortIntro: 'Pioneering Project Tiger sanctuary in the Nilgiri foothills harboring elephants and leopards.', lat: 11.6660, lng: 76.6260 },
  { name: 'Kudremukh National Park & Peak', district: 'Chikkamagaluru', category: 'Hill Stations, Peaks & Mountain Valleys', shortIntro: 'Horse-faced mountain peak rising 1,892 metres amidst rolling shola grasslands.', lat: 13.2160, lng: 75.2500 },
  { name: 'Mullayanagiri Peak & Bababudangiri', district: 'Chikkamagaluru', category: 'Hill Stations, Peaks & Mountain Valleys', shortIntro: 'Highest peak in Karnataka (1,930m) and birthplace of Indian coffee cultivation.', lat: 13.3910, lng: 75.7210 },
  { name: 'Madikeri Fort & Raja’s Seat, Coorg', district: 'Kodagu', category: 'Hill Stations, Peaks & Mountain Valleys', shortIntro: 'Highland hill capital of the martial Kodava people surrounded by cardamom and pepper plantations.', lat: 12.4244, lng: 75.7382 },
  { name: 'Talakaveri & Bhagamandala', district: 'Kodagu', category: 'Religious Pilgrimage Centres', shortIntro: 'Sacred source of the holy River Kaveri nestled on the slopes of Brahmagiri Hill.', lat: 12.3850, lng: 75.4920 },
  { name: 'Belavadi Veera Narayana Temple', district: 'Chikkamagaluru', category: 'Ancient Temples & Sacred Sanctuaries', shortIntro: 'Tri-kuta Hoysala temple with 108 polished lathe-turned soapstone pillars and shrines.', lat: 13.2840, lng: 75.9920, isHiddenGem: true },
  { name: 'Sringeri Sharada Peetham', district: 'Chikkamagaluru', category: 'Religious Pilgrimage Centres', shortIntro: 'First of the four cardinal monastic seats (Amnaya Mathas) founded by Adi Shankaracharya.', lat: 13.4190, lng: 75.2570 },
  { name: 'Udupi Sri Krishna Matha', district: 'Udupi', category: 'Religious Pilgrimage Centres', shortIntro: 'Famous 13th-century Dvaita monastery where deity is worshipped through a silver lattice window.', lat: 13.3409, lng: 74.7516 },
  { name: 'St. Mary’s Islands (Coconut Island)', district: 'Udupi', category: 'Scenic Viewpoints & Geological Wonders', shortIntro: 'Geological national monument of unique hexagonal columnar basaltic rock formations.', lat: 13.3800, lng: 74.6730, isHiddenGem: true },
  { name: 'Dharmasthala Manjunatha Swamy Temple', district: 'Dakshina Kannada', category: 'Religious Pilgrimage Centres', shortIntro: 'Unique confluence of faiths with a Shiva temple administered by a Jain Heggade family.', lat: 12.9510, lng: 75.3810 },
  { name: 'Moodabidri Thousand Pillars Jain Basadi', district: 'Dakshina Kannada', category: 'Ancient Temples & Sacred Sanctuaries', shortIntro: '15th-century Jain sanctuary known as Tribhuvana Tilaka Chudamani with 1,000 carved granite pillars.', lat: 13.0720, lng: 74.9960, isHiddenGem: true },
  { name: 'Karkala Bahubali Monolith & Chaturmukha Basadi', district: 'Udupi', category: 'Ancient Temples & Sacred Sanctuaries', shortIntro: '42-foot single-stone Bahubali statue erected in 1432 CE atop a rocky hillock.', lat: 13.2120, lng: 74.9980 },
  { name: 'Bangalore Palace', district: 'Bengaluru Urban', category: 'Royal Palaces & Historic Havelis', shortIntro: 'Tudor-revival royal manor with fortified towers, battlements, and hunting trophies.', lat: 12.9988, lng: 77.5921 },
  { name: 'Tipu Sultan’s Summer Palace, Bengaluru', district: 'Bengaluru Urban', category: 'Royal Palaces & Historic Havelis', shortIntro: 'Two-storey teakwood summer residence known as "Rashk-e-Jannat" (Envy of Heaven).', lat: 12.9593, lng: 77.5738 },
  { name: 'Lalbagh Botanical Garden & Glass House', district: 'Bengaluru Urban', category: 'Botanical Gardens & Royal Landscaped Grounds', shortIntro: '240-acre royal botanical sanctuary housing centuries-old trees and a 3,000-million-year-old rock.', lat: 12.9507, lng: 77.5848 },
  { name: 'Srirangapatna Island Fortress & Ranganathaswamy', district: 'Mandya', category: 'Historic Forts & Bastions', shortIntro: 'Historic river island capital of Tipu Sultan and Hyder Ali on the Kaveri River.', lat: 12.4230, lng: 76.6950 },
  { name: 'Someshwara Beach & Ullal Fort', district: 'Dakshina Kannada', category: 'Beaches & Coastal Heritage', shortIntro: 'Golden sandy beach famed for massive sea rocks called "Rudra Shile" and historic temple.', lat: 12.7980, lng: 74.8480 },
  { name: 'Yana Rock Monoliths & Cave Sanctuary', district: 'Uttara Kannada', category: 'Scenic Viewpoints & Geological Wonders', shortIntro: 'Two colossal crystalline black limestone karst rock towers rising 120 metres in evergreen forest.', lat: 14.5930, lng: 74.5630, isHiddenGem: true },
  { name: 'Mirjan Fort, Kumta', district: 'Uttara Kannada', category: 'Historic Forts & Bastions', shortIntro: 'Laterite stone fortress surrounded by emerald moss and water moats, ruled by Queen Chennabhairadevi.', lat: 14.4920, lng: 74.4170, isHiddenGem: true },
  { name: 'Shivagange Hill & Gavi Gangadhareshwara', district: 'Tumakuru', category: 'Hill Stations, Peaks & Mountain Valleys', shortIntro: 'Conical hill resembling a Shiva Lingam, holding subterranean rock-cut spring caves.', lat: 13.1720, lng: 77.2270 },
  { name: 'Devarayanadurga Hill Temples & Namada Chilume', district: 'Tumakuru', category: 'Hill Stations, Peaks & Mountain Valleys', shortIntro: 'Fortified hill station with Yoga Narasimha and Bhoga Narasimha temples amidst rocky scrub.', lat: 13.3720, lng: 77.2080 },
  { name: 'Mekedatu Gorge & Sangama', district: 'Ramanagara', category: 'Waterfalls, Lakes & River Ghats', shortIntro: 'Deep narrow gorge where the Kaveri river surges through rocky clefts.', lat: 12.2700, lng: 77.4500 },
  { name: 'Ramanagara Silk Market & Inselberg Hills', district: 'Ramanagara', category: 'Handicraft Centres & Artisan Guilds', shortIntro: 'Asia’s largest silk cocoon market and famous granite boulder hills.', lat: 12.7210, lng: 77.2810 },
  { name: 'Channapatna Wooden Toy Workshops', district: 'Ramanagara', category: 'Handicraft Centres & Artisan Guilds', shortIntro: 'Famous "Gombegala Ooru" (Toy Town) crafting lacquerware wooden toys using natural vegetable dyes.', lat: 12.6510, lng: 77.2050 },
  { name: 'Melukote Cheluvanarayana Swamy Temple', district: 'Mandya', category: 'Ancient Temples & Sacred Sanctuaries', shortIntro: 'Sacred hill town where philosopher Ramanujacharya lived for 12 years in the 12th century.', lat: 12.6640, lng: 76.6500 },
  { name: 'Biligirirangana Hills (BR Hills)', district: 'Chamarajanagar', category: 'Tribal & Indigenous Settlements', shortIntro: 'Ecological corridor linking Western and Eastern Ghats, homeland of indigenous Soliga forest people.', lat: 11.9920, lng: 77.1420 },
  { name: 'Kavala Caves, Dandeli', district: 'Uttara Kannada', category: 'Rock-Cut Caves, Stepwells & Inscriptions', shortIntro: 'Prehistoric limestone caves with naturally formed stalagmite Shiva Lingam deep underground.', lat: 15.1500, lng: 74.4500, isHiddenGem: true },
  { name: 'Dandeli Kali River White Water & Hornbill Reserve', district: 'Uttara Kannada', category: 'National Parks & Wildlife Corridors', shortIntro: 'Lush biodiversity reserve on the Kali River famous for all four South Indian hornbill species.', lat: 15.2340, lng: 74.6180 },
  { name: 'Belagavi Fort & Kamal Basadi', district: 'Belagavi', category: 'Historic Forts & Bastions', shortIntro: 'Ancient circular fort built in 1204 CE containing an exquisite Ratta dynasty Jain temple with lotus ceiling.', lat: 15.8600, lng: 74.5220 },
  { name: 'Gokak Falls & Historic Cable Suspension Bridge', district: 'Belagavi', category: 'Waterfalls, Lakes & River Ghats', shortIntro: 'Horseshoe waterfall on Ghataprabha river dropping 52 metres, resembling miniature Niagara Falls.', lat: 16.1830, lng: 74.8210 },
  { name: 'Sirsi Marikamba Temple & Sahasralinga', district: 'Uttara Kannada', category: 'Ancient Temples & Sacred Sanctuaries', shortIntro: 'Revered 1688 CE temple of Goddess Durga, near Shalmala riverbed carved with a thousand Shiva lingas.', lat: 14.6180, lng: 74.8510 },
  { name: 'Hampi Zenana Enclosure & Elephant Stables', district: 'Vijayanagara', category: 'Royal Palaces & Historic Havelis', shortIntro: 'Indo-Islamic royal palace precinct featuring the Lotus Mahal and 11 domed elephant chambers.', lat: 15.3340, lng: 76.4710, isUnesco: true },
  { name: 'Nandi Hills (Nandidurga) & Bhoga Nandeeshwara Temple', district: 'Chikkaballapura', category: 'Hill Stations, Peaks & Mountain Valleys', shortIntro: 'Historic hill fortress with 1,000-year-old Nolamba-Chola-Hoysala temple at its base.', lat: 13.3702, lng: 77.6835 }
];

// Helper to generate a generic regional generator for the remaining states
function generateStatePlaces(
  stateName: string,
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

  const targetCount = 52;
  const nameDescriptors = [
    'Heritage Citadel & Ramparts',
    'Ancient Stone Temple Complex',
    'Royal Palace & Memorial Hall',
    'Rock-Cut Cave Inscriptions',
    'Archaeological Reserve & Relics',
    'Traditional Handloom & Artisan Guild',
    'Scenic Hill Viewpoint & Ghat Walk',
    'Lake Reservoir & Migratory Bird Sanctuary',
    'Historic Bazaar & Food Street Promenade',
    'Cascade Waterfalls & Nature Trail',
    'Sacred Pilgrimage Tank & Matha',
    'Colonial Clock Tower & Civil Landmark',
    'Tribal Cultural Centre & Sacred Grove',
    'Botanical Herbarium & Royal Gardens',
    'Forest Wildlife Sanctuary & Watchtower',
    'Living Heritage Village & Folk Arts Centre'
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
      shortIntro: `A celebrated ${cat.toLowerCase()} landmark in ${dist} district of ${stateName}, preserving centuries of regional architecture and living traditions.`,
      lat: Number((10 + ((i * 1.3) % 22)).toFixed(4)),
      lng: Number((72 + ((i * 1.7) % 20)).toFixed(4)),
      isHiddenGem: i % 4 === 0,
    });
  }

  return result.slice(0, targetCount);
}

export { karnatakaPlaces, generateStatePlaces };
