import fs from 'fs';
import path from 'path';

// Define the 22 Destination Categories
const CATEGORIES = [
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
  'Art Galleries, Theatres & Cultural Centres',
  'Scenic Viewpoints & Geological Wonders'
];

interface StateConfig {
  slug: string;
  name: string;
  nativeScript: string;
  capital: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'Northeast';
  targetCount: number;
  districts: string[];
  keySites: Array<{
    name: string;
    nativeName?: string;
    district: string;
    category: string;
    intro: string;
    historical: string;
    architectural: string;
    isUnesco?: boolean;
    isHiddenGem?: boolean;
    lat: number;
    lng: number;
  }>;
}

// State configurations with genuine landmarks across all districts
export const stateConfigs: Record<string, StateConfig> = {
  // SOUTH REGION
  karnataka: {
    slug: 'karnataka',
    name: 'Karnataka',
    nativeScript: 'ಕರ್ನಾಟಕ',
    capital: 'Bengaluru',
    region: 'South',
    targetCount: 52,
    districts: ['Vijayanagara', 'Mysuru', 'Hassan', 'Bengaluru Urban', 'Uttara Kannada', 'Udupi', 'Dakshina Kannada', 'Bagalkote', 'Vijayapura', 'Chikkamagaluru', 'Kodagu', 'Shivamogga', 'Ballari', 'Belagavi', 'Bidar', 'Kalaburagi', 'Chitradurga', 'Tumakuru', 'Mandya', 'Chamarajanagar'],
    keySites: [
      { name: 'Vittala Temple & Stone Chariot', district: 'Vijayanagara', category: 'UNESCO World Heritage Sites', intro: 'Iconic 15th-century Vijayanagara Dravidian temple complex with musical granite pillars.', historical: 'Enlarged by Emperor Krishnadevaraya in the early 16th century CE.', architectural: 'Dravidian hypostyle halls with monolithic Garuda stone chariot.', isUnesco: true, lat: 15.3350, lng: 76.4794 },
      { name: 'Virupaksha Temple', district: 'Vijayanagara', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Centuries-old active Shiva sanctuary with a 50-metre eastern gopuram beside Tungabhadra river.', historical: 'Consecrated during 7th century Chalukya rule, continuously worshipped to present day.', architectural: 'Dravidian pyramidal gopuram with pinhole camera inverted shadow phenomenon.', lat: 15.3353, lng: 76.4600 },
      { name: 'Hoysaleswara Temple, Halebidu', district: 'Hassan', category: 'UNESCO World Heritage Sites', intro: 'Twin 12th-century soapstone temples renowned for intricate friezes of celestial dancers and epics.', historical: 'Commissioned by King Vishnuvardhana of Hoysala Empire in 1121 CE.', architectural: 'Stellate (star-shaped) soapstone base with horizontal bands of elephants, lions, and makaras.', isUnesco: true, lat: 13.2132, lng: 75.9947 },
      { name: 'Chennakeshava Temple, Belur', district: 'Hassan', category: 'UNESCO World Heritage Sites', intro: 'Masterpiece of Hoysala stone sculpture dedicated to Lord Vishnu, featuring 42 bracket figures (Madanikas).', historical: 'Commissioned in 1117 CE to commemorate Hoysala victory over Cholas at Talakadu.', architectural: 'Chloritic schist soapstone temple adorned with lifelike dancers and filigree ceilings.', isUnesco: true, lat: 13.1627, lng: 75.8596 },
      { name: 'Mysore Palace (Amba Vilas)', district: 'Mysuru', category: 'Royal Palaces & Historic Havelis', intro: 'Indo-Saracenic royal residence of the Wadiyar dynasty, illuminated by 97,000 lightbulbs.', historical: 'Designed by Henry Irwin and completed in 1912 after the old wooden palace burned.', architectural: 'Indo-Saracenic fusion of Hindu, Mughal, Rajput, and Gothic architectural motifs.', lat: 12.3051, lng: 76.6551 },
      { name: 'Gol Gumbaz, Vijayapura', district: 'Vijayapura', category: 'Historic Forts & Bastions', intro: 'Mausoleum of Mohammed Adil Shah boasting one of the world’s largest unsupported masonry domes.', historical: 'Completed in 1656 CE by architect Yaqut of Dabul.', architectural: 'Deccan Sultanate architecture with acoustic whispering gallery echoing up to eleven times.', lat: 16.8306, lng: 75.7357 },
      { name: 'Badami Cave Temples', district: 'Bagalkote', category: 'Rock-Cut Caves, Stepwells & Inscriptions', intro: 'Four monolithic rock-cut cave temples carved from sandstone cliffs overlooking Agastya Lake.', historical: 'Carved by Early Chalukyas from the 6th century CE onwards under Pulakeshin I.', architectural: 'Rock-cut sanctuaries depicting Nataraja with 81 dancing postures and Jain Tirthankaras.', lat: 15.9189, lng: 75.6766 },
      { name: 'Pattadakal Monument Group', district: 'Bagalkote', category: 'UNESCO World Heritage Sites', intro: 'Royal coronation site of Chalukya monarchs showcasing fusion of Rekha-Nagara and Dravidian styles.', historical: 'Erected between 7th and 8th centuries CE along Malaprabha River.', architectural: 'Harmonious juxtaposition of northern curvilinear shikharas and southern stepped vimanas.', isUnesco: true, lat: 15.9490, lng: 75.8160 },
      { name: 'Gommateshwara Monolith, Shravanabelagola', district: 'Hassan', category: 'Ancient Temples & Sacred Sanctuaries', intro: '57-foot tall free-standing granite statue of Lord Bahubali, seat of the Mahamastakabhisheka festival.', historical: 'Carved in 981 CE by Chavundaraya, commander of the Western Ganga dynasty.', architectural: 'Carved from single granite hill outcrop in Kayotsarga standing meditative posture.', lat: 12.8580, lng: 76.4862 },
      { name: 'Chitradurga Fort (Kallina Kote)', district: 'Chitradurga', category: 'Historic Forts & Bastions', intro: 'Formidable stone fortress with seven concentric ramparts and 38 gateway passages.', historical: 'Strengthened by Nayaka palegars and Hyder Ali between 15th and 18th centuries.', architectural: 'Cyclopean granite masonry built into natural hill boulders with rainwater reservoirs.', lat: 14.2230, lng: 76.3980 },
      { name: 'Murudeshwar Shiva Temple & Sea Cliff', district: 'Uttara Kannada', category: 'Beaches & Coastal Heritage', intro: 'World’s second-tallest Shiva statue overlooking the Arabian Sea, flanked by 20-storey Raja Gopura.', historical: 'Ancient Pranalinga legend associated with Ravana and Gokarna coastal pilgrimage.', architectural: 'Modern Dravidian gopuram with high-speed elevator viewing gallery over the coastline.', lat: 14.0942, lng: 74.4847 },
      { name: 'Nagarhole National Park (Kabini)', district: 'Mysuru', category: 'National Parks & Wildlife Corridors', intro: 'Prime tiger and Asian elephant reserve on the banks of Kabini River within Nilgiri Biosphere.', historical: 'Former private hunting reserve of the Wadiyar Maharajas of Mysore.', architectural: 'Protected moist deciduous and teak forest biomes supporting apex predators.', lat: 11.9960, lng: 76.1265 },
      { name: 'Jog Falls (Gersoppa)', district: 'Shivamogga', category: 'Waterfalls, Lakes & River Ghats', intro: 'India’s second-highest plunge waterfall where the Sharavathi River drops 253 metres in four cascades.', historical: 'Mentioned in colonial geological surveys and power generation projects since 1940s.', architectural: 'Natural basalt fissure waterfall split into Raja, Roarer, Rocket, and Rani chutes.', lat: 14.2285, lng: 74.8122 },
      { name: 'Bidar Fort & Mahmud Gawan Madrasa', district: 'Bidar', category: 'Historic Forts & Bastions', intro: 'Bahmani Sultanate bastion with triple moat and Persia-inspired Islamic college.', historical: 'Founded by Ahmad Shah Wali Bahmani in 1427 CE as new imperial capital.', architectural: 'Persian ceramic mosaic tilework, subterranean Karez water qanats, and arched gateways.', lat: 17.9250, lng: 77.5250 },
      { name: 'Gokarna Om Beach & Mahabaleshwar Temple', district: 'Uttara Kannada', category: 'Beaches & Coastal Heritage', intro: 'Sacred coastal town where Western Ghats meet Arabian Sea along an Om-shaped natural shoreline.', historical: 'Preserves the Atmalinga venerated by sage Adi Shankaracharya.', architectural: 'Dravidian coastal laterite stone sanctum with natural pristine coves.', lat: 14.5160, lng: 74.3160 }
    ]
  },

  'tamil-nadu': {
    slug: 'tamil-nadu',
    name: 'Tamil Nadu',
    nativeScript: 'தமிழ்நாடு',
    capital: 'Chennai',
    region: 'South',
    targetCount: 52,
    districts: ['Thanjavur', 'Madurai', 'Kanchipuram', 'Chengalpattu', 'Chennai', 'Tiruchirappalli', 'Kanniyakumari', 'Nilgiris', 'Ramanathapuram', 'Coimbatore', 'Salem', 'Tirunelveli', 'Thiruvarur', 'Dindigul', 'Theni', 'Sivagangai', 'Cuddalore', 'Pudukkottai', 'Villupuram', 'Vellore'],
    keySites: [
      { name: 'Brihadisvara Temple (Peruvudaiyar Koyil)', district: 'Thanjavur', category: 'UNESCO World Heritage Sites', intro: 'Chola engineering marvel with an 80-tonne monolithic granite cupola atop a 66-metre vimana.', historical: 'Built by Rajaraja Chola I between 1003 and 1010 CE.', architectural: 'Pure Dravidian granite vimana, fresco murals, and world’s largest monolithic Nandi.', isUnesco: true, lat: 10.7828, lng: 79.1318 },
      { name: 'Meenakshi Sundareswarar Temple', district: 'Madurai', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Monumental 14-tower temple city celebrating Goddess Meenakshi and Lord Shiva.', historical: 'Ancient Pandyan foundation; rebuilt and expanded by Thirumalai Nayak in the 17th century.', architectural: 'Fourteen sculpted gopurams reaching 52 metres, Hall of Thousand Pillars, and Golden Lotus tank.', lat: 9.9195, lng: 78.1193 },
      { name: 'Shore Temple & Pancha Rathas', district: 'Chengalpattu', category: 'UNESCO World Heritage Sites', intro: '8th-century Pallava structural stone temples and monolithic rock-cut shrines along the Coromandel coast.', historical: 'Commissioned by Narasimhavarman II (Rajasimha) of the Pallava dynasty (700–728 CE).', architectural: 'Early Dravidian granite structural temples with pyramidal vimanas and monolithic animal sculptures.', isUnesco: true, lat: 12.6160, lng: 80.1990 },
      { name: 'Sri Ranganathaswamy Temple, Srirangam', district: 'Tiruchirappalli', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Largest functioning Hindu temple complex in the world covering 156 acres across seven concentric enclosures.', historical: 'Venerated by the 12 Alvars; patronized by Cholas, Pandyas, Hoysalas, and Vijayanagara kings.', architectural: '21 colossal gopurams including the 73-metre Rajagopuram, ornate pillared corridors.', lat: 10.8625, lng: 78.6903 },
      { name: 'Vivekananda Rock Memorial & Thiruvalluvar Statue', district: 'Kanniyakumari', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: 'Iconic offshore granite monument at the confluence of Indian Ocean, Arabian Sea, and Bay of Bengal.', historical: 'Erected in 1970 to honor Swami Vivekananda who meditated here in 1892.', architectural: 'Granite memorial mandapam blending Chola and Ajanta motifs, beside 133-ft Thiruvalluvar statue.', lat: 8.0780, lng: 77.5550 },
      { name: 'Nilgiri Mountain Railway', district: 'Nilgiris', category: 'UNESCO World Heritage Sites', intro: 'Historic 1,000 mm meter-gauge rack railway climbing from Mettupalayam to Ooty through 250 bridges.', historical: 'Engineered by Swiss engineer Riggenbach and British surveyors; completed in 1908.', architectural: 'Alternate biting tooth (ABT) rack system steam engine chugging through misty shola forests.', isUnesco: true, lat: 11.4102, lng: 76.6950 },
      { name: 'Ramanathaswamy Temple, Rameswaram', district: 'Ramanathapuram', category: 'Religious Pilgrimage Centres', intro: 'Sacred island jyotirlinga shrine famed for the longest temple corridor in India with 1,212 carved pillars.', historical: 'Expanded by Setupati rulers of Ramanathapuram in the 12th to 17th centuries CE.', architectural: 'Magnificent hypostyle corridor measuring 1,220 metres in length with sculpted limestone pillars.', lat: 9.2881, lng: 79.3174 },
      { name: 'Chettinad Heritage Mansions, Kanadukathan', district: 'Sivagangai', category: 'Traditional Villages & Rural Living Heritage', intro: 'Sprawling merchant palaces featuring Burmese teak pillars, Italian marble, and Athangudi tiles.', historical: 'Built by prosperous Nattukottai Chettiar financiers between late 19th and early 20th centuries.', architectural: 'Fortress-like courtyard residences with Belgian glass chandeliers and ornate lime-plaster egg polish.', isHiddenGem: true, lat: 10.1750, lng: 78.7830 },
      { name: 'Padmanabhapuram Palace', district: 'Kanniyakumari', category: 'Royal Palaces & Historic Havelis', intro: '16th-century wooden palace of the Venad kings set against the Velli Hills.', historical: 'Built by Iravi Varma Kulasekhara Perumal around 1601 CE; capital of Travancore till 1795.', architectural: 'Kerala-style teakwood architecture with rosewood ceilings, secret underground passages, and medicinal beds.', lat: 8.2514, lng: 77.3275 },
      { name: 'Kanchipuram Silk Weavers Guild & Ekambareswarar Temple', district: 'Kanchipuram', category: 'Handicraft Centres & Artisan Guilds', intro: 'Ancient city of thousand temples and home to handloom Kanchipuram mulberry silk weavers.', historical: 'Capital of Pallavas from 4th to 9th centuries CE; weaving guilds patronized by Krishna Deva Raya.', architectural: 'Dravidian temple with 59-metre gopuram alongside traditional pit-loom weaver workshops.', lat: 12.8460, lng: 79.7000 }
    ]
  },

  kerala: {
    slug: 'kerala',
    name: 'Kerala',
    nativeScript: 'കേരളം',
    capital: 'Thiruvananthapuram',
    region: 'South',
    targetCount: 52,
    districts: ['Alappuzha', 'Kottayam', 'Ernakulam', 'Idukki', 'Wayanad', 'Thiruvananthapuram', 'Kollam', 'Thrissur', 'Palakkad', 'Malappuram', 'Kozhikode', 'Kannur', 'Kasaragod', 'Pathanamthitta'],
    keySites: [
      { name: 'Vembanad Lake Backwaters & Kettuvallam Cruise', district: 'Alappuzha', category: 'Waterfalls, Lakes & River Ghats', intro: 'Serene network of interconnected brackish lagoons and canals explored on eco-friendly thatched houseboats.', historical: 'Traditional rice barges (kettuvallams) adapted into luxury heritage houseboats since 1990s.', architectural: 'Traditional wooden hull stitched with coir ropes without a single iron nail.', lat: 9.4981, lng: 76.3388 },
      { name: 'Fort Kochi Colonial Quarter & Chinese Fishing Nets', district: 'Ernakulam', category: 'Colonial Landmarks & Historic Railways', intro: 'Historic port settlement featuring Portuguese, Dutch, and British quarters and cantilevered fishing nets.', historical: 'First European settlement in India (1500 CE); resting place of explorer Vasco da Gama.', architectural: 'Indo-Portuguese churches, Mattancherry Jewish Synagogue with Chinese porcelain floor tiles.', lat: 9.9656, lng: 76.2421 },
      { name: 'Munnar Tea Plantations & Anamudi Peak', district: 'Idukki', category: 'Hill Stations, Peaks & Mountain Valleys', intro: 'Misty hill station at the confluence of three rivers, home to the highest peak in South India (2,695m).', historical: 'Developed as summer resort and tea planting center by British pioneers in the 1870s.', architectural: 'Terraced emerald tea estates, colonial stone cottages, and endangered Nilgiri Tahr habitat.', lat: 10.0889, lng: 77.0595 },
      { name: 'Edakkal Caves & Prehistoric Petroglyphs', district: 'Wayanad', category: 'Rock-Cut Caves, Stepwells & Inscriptions', intro: 'Neolithic rock shelters containing ancient pictographs dating back over 7,000 years to 5000 BCE.', historical: 'Discovered in 1890 by Fred Fawcett; sole verified prehistoric rock carvings in southern India.', architectural: 'Natural cleft between two colossal boulders bearing depictions of human figures, bows, and animals.', isHiddenGem: true, lat: 11.6280, lng: 76.2340 },
      { name: 'Padmanabhaswamy Temple', district: 'Thiruvananthapuram', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Sacred Maha Vishnu sanctuary in Ananthasayanam posture, famed for its ancient subterranean vaults.', historical: 'Mentioned in Sangam epics and Divya Prabandham; reconstructed by Maharaja Marthanda Varma in 1733.', architectural: 'Chera-Dravidian synthesis with 100-foot granite gopuram, Ottakkal Mandapam, and 365 carved pillars.', lat: 8.4830, lng: 76.9436 },
      { name: 'Bekal Fort & Coastal Citadel', district: 'Kasaragod', category: 'Historic Forts & Bastions', intro: 'Largest keyhole-shaped sea fort in Kerala rising directly from the Arabian Sea waves.', historical: 'Built by Shivappa Nayaka of Keladi in 1650 CE; later fortified by Tipu Sultan.', architectural: 'Laterite stone sea fortifications with observation tower, water tank, and zigzag entrance.', lat: 12.3925, lng: 75.0322 },
      { name: 'Periyar Tiger Reserve, Thekkady', district: 'Idukki', category: 'National Parks & Wildlife Corridors', intro: 'Scenic wildlife sanctuary nestled around an artificial lake created by the 1895 Mullaperiyar dam.', historical: 'Declared sanctuary by Maharaja of Travancore in 1934; Project Tiger sanctuary since 1978.', architectural: 'Tropical evergreen canopy with boat safaris spotting wild elephant herds and otters.', lat: 9.4679, lng: 77.1444 },
      { name: 'Thrissur Vadakkunnathan Temple', district: 'Thrissur', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Ancient Shiva temple nestled inside monumental koothambalam, epicenter of the Thrissur Pooram.', historical: 'Believed to be founded by sage Parashurama; documented in early medieval inscriptions.', architectural: 'Traditional Kerala timber architecture with steep multi-tiered copper-tiled gabled roofs.', lat: 10.5244, lng: 76.2144 }
    ]
  },

  // NORTH REGION
  rajasthan: {
    slug: 'rajasthan',
    name: 'Rajasthan',
    nativeScript: 'राजस्थान',
    capital: 'Jaipur',
    region: 'North',
    targetCount: 52,
    districts: ['Jaipur', 'Jodhpur', 'Udaipur', 'Jaisalmer', 'Bikaner', 'Chittorgarh', 'Sawai Madhopur', 'Pushkar', 'Ajmer', 'Alwar', 'Dausa', 'Bharatpur', 'Bundi', 'Kota', 'Mount Abu', 'Barmer', 'Nagaur', 'Pali', 'Rajsamand', 'Sikar'],
    keySites: [
      { name: 'Amber Fort & Sheesh Mahal', district: 'Jaipur', category: 'UNESCO World Heritage Sites', intro: 'Opulent hilltop fortress overlooking Maota Lake with the world-famous mirror hall.', historical: 'Constructed by Raja Man Singh I in 1592 CE; one of six UNESCO Hill Forts of Rajasthan.', architectural: 'Sandstone and marble blend of Rajput chivalric and Mughal court styles.', isUnesco: true, lat: 26.9855, lng: 75.8513 },
      { name: 'Mehrangarh Fort', district: 'Jodhpur', category: 'Historic Forts & Bastions', intro: 'Colossal citadel perched 410 feet above Jodhpur’s blue-painted Brahmin quarters.', historical: 'Founded by Rao Jodha in 1459 CE; successfully resisted numerous sieges.', architectural: 'Chiselled sandstone walls with intricately carved lattice balconies (jharokhas).', lat: 26.2978, lng: 73.0185 },
      { name: 'Jaisalmer Fort (Sonar Qila)', district: 'Jaisalmer', category: 'UNESCO World Heritage Sites', intro: 'Living golden sandstone desert fortress housing 3,000 residents, Jain temples, and havelis.', historical: 'Founded in 1156 CE by Rajput ruler Rawal Jaisal atop Trikuta Hill.', architectural: 'Triple-ring sandstone ramparts glowing golden in the Thar desert sun.', isUnesco: true, lat: 26.9124, lng: 70.9126 },
      { name: 'City Palace & Lake Pichola', district: 'Udaipur', category: 'Royal Palaces & Historic Havelis', intro: 'Granite and marble lakeside palace complex with towers and cupolas overlooking Lake Pichola.', historical: 'Begun in 1559 CE by Maharana Udai Singh II after shifting Mewar capital from Chittor.', architectural: 'Fusion of Rajasthani Mewari and European influences with hanging gardens and Peacock courtyard.', lat: 24.5764, lng: 73.6835 },
      { name: 'Chittorgarh Fort & Vijay Stambha', district: 'Chittorgarh', category: 'UNESCO World Heritage Sites', intro: 'India’s largest fort covering 700 acres, symbol of Mewar Rajput bravery and self-sacrifice.', historical: 'Capital of Mewar from 7th to 16th century CE; defended by Rani Padmini and Maharana Pratap.', architectural: 'Nine-storey 37-metre Victory Tower (Vijay Stambha) covered in Hindu cosmological reliefs.', isUnesco: true, lat: 24.8879, lng: 74.6453 },
      { name: 'Chand Baori Stepwell, Abhaneri', district: 'Dausa', category: 'Rock-Cut Caves, Stepwells & Inscriptions', intro: 'Ancient geometric marvel with 3,500 symmetrical narrow steps descending 13 storeys (30m).', historical: 'Commissioned by King Chanda of Nikumbha dynasty in the 9th century CE.', architectural: 'Masterpiece of subterranean water architecture with cooling stone pavilions.', isHiddenGem: true, lat: 27.0072, lng: 76.6064 },
      { name: 'Ranthambore Fort & National Park', district: 'Sawai Madhopur', category: 'National Parks & Wildlife Corridors', intro: 'UNESCO hill fort surrounded by pristine dry deciduous tiger jungle and lotus lakes.', historical: 'Fort built by Chauhan rulers in 10th century CE; historic royal hunting grounds.', architectural: 'Cyclopean masonry fortress surrounded by wild banyan trees, lakes, and wild Bengal tigers.', isUnesco: true, lat: 26.0173, lng: 76.5026 },
      { name: 'Brahma Temple & Sacred Lake, Pushkar', district: 'Pushkar', category: 'Religious Pilgrimage Centres', intro: 'One of the world’s very few dedicated temples to Lord Brahma, surrounded by 52 bathing ghats.', historical: 'Dated back to the 14th century CE; sacred pilgrimage hub since ancient Vedic era.', architectural: 'Red spire (shikhara) with swan (hamsa) motif overlooking holy desert lake.', lat: 26.4880, lng: 74.5510 }
    ]
  },

  'uttar-pradesh': {
    slug: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    nativeScript: 'उत्तर प्रदेश',
    capital: 'Lucknow',
    region: 'North',
    targetCount: 52,
    districts: ['Agra', 'Varanasi', 'Lucknow', 'Prayagraj', 'Ayodhya', 'Mathura', 'Vrindavan', 'Sarnath', 'Jhansi', 'Fatehpur Sikri', 'Kushinagar', 'Mirzapur', 'Chitrakoot', 'Gorakhpur', 'Aligarh', 'Bareilly', 'Jaunpur', 'Meerut', 'Banda', 'Kannauj'],
    keySites: [
      { name: 'Taj Mahal', district: 'Agra', category: 'UNESCO World Heritage Sites', intro: 'World wonder of white Makrana marble built by Mughal Emperor Shah Jahan for Mumtaz Mahal.', historical: 'Constructed between 1632 and 1653 CE employing 20,000 artisans under Ustad Ahmad Lahori.', architectural: 'Mughal symmetrical charbagh garden with pietra dura floral inlay and bulbous marble dome.', isUnesco: true, lat: 27.1751, lng: 78.0421 },
      { name: 'Varanasi Ghats & Kashi Vishwanath Dham', district: 'Varanasi', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Oldest continually inhabited city on earth with 84 sacred river ghats along the holy Ganges.', historical: 'Venerated in Rigveda and Puranas; modernized with the Kashi Vishwanath Corridor.', architectural: 'Tiered stone river steps, gold-plated temple spire, and nightly Ganga Aarti spectacle.', lat: 25.3109, lng: 83.0107 },
      { name: 'Fatehpur Sikri Imperial City & Buland Darwaza', district: 'Fatehpur Sikri', category: 'UNESCO World Heritage Sites', intro: 'Akbar’s red sandstone capital preserving the world’s tallest gateway (54m Buland Darwaza).', historical: 'Founded in 1571 CE to honor Sufi saint Sheikh Salim Chishti.', architectural: 'Synthesis of Persian, Hindu, and Gujarati red sandstone architecture with white marble Chishti tomb.', isUnesco: true, lat: 27.0945, lng: 77.6677 },
      { name: 'Bara Imambara & Bhulbhulaiya', district: 'Lucknow', category: 'Historic Forts & Bastions', intro: 'Awadhi architectural monument famed for its colossal unsupported arched hall and labyrinth.', historical: 'Commissioned in 1784 by Nawab Asaf-ud-Daula as a drought relief public works project.', architectural: 'Arched vaulted roof engineered without iron or wooden girders, with a 489-passage maze.', lat: 26.8689, lng: 80.9128 },
      { name: 'Sarnath Dhamek Stupa & Lion Capital Site', district: 'Sarnath', category: 'Archaeological Sites & Ancient Cities', intro: 'Sacred grove where Gautama Buddha gave his first sermon (Dhammacakkappavattana Sutta).', historical: 'Stupa built by Emperor Ashoka in 249 BCE; origin of India’s National Emblem.', architectural: 'Cylindrical stone stupa with delicate Gupta carved geometric and floral bands.', lat: 25.3811, lng: 83.0247 },
      { name: 'Ram Janmabhoomi Mandir', district: 'Ayodhya', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Sacred birthplace of Lord Rama on the banks of Sarayu river, rebuilt in classical Nagara style.', historical: 'Historic epic city celebrated in Valmiki Ramayana; consecrated in 2024.', architectural: 'Grand pink Bansi Paharpur sandstone temple built without structural steel.', lat: 26.7956, lng: 82.1943 },
      { name: 'Triveni Sangam & Allahabad Fort', district: 'Prayagraj', category: 'Religious Pilgrimage Centres', intro: 'Holy confluence of Ganga, Yamuna, and subterranean Saraswati, host to the Maha Kumbh Mela.', historical: 'Epicentre of the world’s largest gathering of humanity; fort built by Akbar in 1583 CE.', architectural: 'Akbar’s Yamuna riverside sandstone fortress housing the sacred Akshayavat tree.', lat: 25.4358, lng: 81.8463 },
      { name: 'Jhansi Fort & Rani Mahal', district: 'Jhansi', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: 'Historic hill fortress defended valiantly by Rani Lakshmibai during the 1857 First War of Independence.', historical: 'Built by Orchha Bundela ruler Raja Bir Singh Deo in 1613 CE.', architectural: 'Solid granite bastion atop Bagira hill with 10 gateways and Kal Kothari.', lat: 25.4578, lng: 78.5786 }
    ]
  },

  maharashtra: {
    slug: 'maharashtra',
    name: 'Maharashtra',
    nativeScript: 'महाराष्ट्र',
    capital: 'Mumbai',
    region: 'West',
    targetCount: 52,
    districts: ['Mumbai', 'Pune', 'Chhatrapati Sambhajinagar', 'Raigad', 'Satara', 'Kolhapur', 'Nashik', 'Ratnagiri', 'Sindhudurg', 'Thane', 'Nagpur', 'Amravati', 'Solapur', 'Ahmednagar', 'Nanded', 'Jalgaon', 'Wardha', 'Chandrapur', 'Bhandara', 'Osmanabad'],
    keySites: [
      { name: 'Ajanta Cave Paintings', district: 'Chhatrapati Sambhajinagar', category: 'UNESCO World Heritage Sites', intro: '30 rock-cut Buddhist cave monuments preserving the pinnacle of ancient Indian fresco mural painting.', historical: 'Excavated in two phases: 2nd century BCE (Satavahana) and 5th century CE (Vakataka).', architectural: 'Chaityas and viharas carved into horseshoe cliff, painted with Jataka tales using mineral pigments.', isUnesco: true, lat: 20.5519, lng: 75.7033 },
      { name: 'Ellora Caves & Kailasa Temple (Cave 16)', district: 'Chhatrapati Sambhajinagar', category: 'UNESCO World Heritage Sites', intro: 'World’s largest monolithic rock excavation: an entire multi-storey temple carved top-down from single basalt cliff.', historical: 'Commissioned by Rashtrakuta King Krishna I (756–773 CE).', architectural: 'Top-down trench excavation extracting 200,000 tonnes of basalt rock without scaffolding.', isUnesco: true, lat: 20.0268, lng: 75.1780 },
      { name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)', district: 'Mumbai', category: 'UNESCO World Heritage Sites', intro: 'Victorian Gothic railway terminal featuring Italian marble, stained glass, and stone gargoyles.', historical: 'Designed by F.W. Stevens; completed in 1887 to mark Queen Victoria’s Golden Jubilee.', architectural: 'Victorian Italianate Gothic revival fused with traditional Indian palace stone carving.', isUnesco: true, lat: 18.9400, lng: 72.8353 },
      { name: 'Raigad Fort — Capital of Shivaji Maharaj', district: 'Raigad', category: 'Historic Forts & Bastions', intro: 'Impregnable hill fortress where Chhatrapati Shivaji Maharaj was crowned Chhatrapati in 1674 CE.', historical: 'Selected by Shivaji Maharaj as the capital of the Maratha Empire in 1662.', architectural: 'Natural basalt plateau fortifications with Maha Darwaja, Nagarkhana, and coronation throne platform.', lat: 18.2346, lng: 73.4414 },
      { name: 'Sindhudurg Ocean Fortress', district: 'Sindhudurg', category: 'Historic Forts & Bastions', intro: 'Formidable island sea citadel constructed on Kurte rock to guard the Konkan coast against foreign fleets.', historical: 'Planned and built by Chhatrapati Shivaji Maharaj between 1664 and 1667 CE.', architectural: '42 basalt bastions anchored with molten lead foundations directly into Arabian Sea bedrock.', lat: 16.0450, lng: 73.4680 },
      { name: 'Tadoba-Andhari Tiger Reserve', district: 'Chandrapur', category: 'National Parks & Wildlife Corridors', intro: 'Maharashtra’s oldest and largest national park, world-renowned for high Bengal tiger density.', historical: 'Protected forest since 1955; designated Project Tiger sanctuary in 1993.', architectural: 'Southern tropical dry deciduous teak forests interspersed with bamboo thickets and Erai lake.', lat: 20.2450, lng: 79.3080 },
      { name: 'Trimbakeshwar Shiva Jyotirlinga', district: 'Nashik', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'One of the twelve sacred Jyotirlingas and origin point of the sacred Godavari River.', historical: 'Built by Peshwa Balaji Baji Rao (Nanasaheb) between 1755 and 1786 CE.', architectural: 'Hemadpanthi black basalt stone architecture adorned with sculptures of gods and celestial guardians.', lat: 19.9320, lng: 73.5306 }
    ]
  },

  gujarat: {
    slug: 'gujarat',
    name: 'Gujarat',
    nativeScript: 'ગુજરાત',
    capital: 'Gandhinagar',
    region: 'West',
    targetCount: 52,
    districts: ['Ahmedabad', 'Patan', 'Kutch', 'Gir Somnath', 'Vadodara', 'Junagadh', 'Narmada', 'Dwarka', 'Bhavnagar', 'Porbandar', 'Surat', 'Rajkot', 'Mehsana', 'Panchmahal', 'Banaskantha', 'Bharuch', 'Jamnagar', 'Amreli', 'Navsari', 'Valsad'],
    keySites: [
      { name: 'Rani ki Vav (The Queen’s Stepwell)', district: 'Patan', category: 'UNESCO World Heritage Sites', intro: 'Subterranean stepwell sanctuary designed as an inverted temple with seven subterranean levels.', historical: 'Commissioned by Queen Udayamati in memory of King Bhima I of Chaulukya dynasty (1063 CE).', architectural: 'Maru-Gurjara style containing over 500 principal sculptures depicting Dashavatara and Sheshashayi Vishnu.', isUnesco: true, lat: 23.8589, lng: 72.1014 },
      { name: 'Sun Temple, Modhera', district: 'Mehsana', category: 'Archaeological Sites & Ancient Cities', intro: '11th-century solar sanctuary with Surya Kund stepwell pool, aligned to the equinox sunbeams.', historical: 'Built in 1026–27 CE by King Bhima I of the Solanki dynasty.', architectural: 'Maru-Gurjara style with Sabha Mandapa resting on 52 sculpted pillars representing weeks of the solar year.', lat: 23.5835, lng: 72.1330 },
      { name: 'Gir National Park — Asiatic Lion Sanctuary', district: 'Gir Somnath', category: 'National Parks & Wildlife Corridors', intro: 'Sole natural habitat on planet Earth of the Asiatic Lion (Panthera leo persica).', historical: 'Protected by the Nawab of Junagadh in 1900; declared sanctuary in 1965.', architectural: 'Dry deciduous teak savannah ecosystem harboring over 674 wild Asiatic lions.', lat: 21.1243, lng: 70.8242 },
      { name: 'Dholavira — Harappan Indus Valley Metropolis', district: 'Kutch', category: 'UNESCO World Heritage Sites', intro: '5,000-year-old planned Bronze Age civilization city with monumental stone reservoirs and signboards.', historical: 'Thrived between 3000 BCE and 1500 BCE in the Rann of Kutch.', architectural: 'World’s most sophisticated prehistoric rainwater harvesting system with 16 stone-cut reservoirs.', isUnesco: true, lat: 23.8860, lng: 70.2160 },
      { name: 'Statue of Unity', district: 'Narmada', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: 'World’s tallest statue (182 metres) honoring Sardar Vallabhbhai Patel on the Narmada River.', historical: 'Inaugurated in 2018 to commemorate the Iron Man of India who united 562 princely states.', architectural: 'Engineered bronze cladding over dual concrete core designed by sculptor Ram V. Sutar.', lat: 21.8380, lng: 73.7191 },
      { name: 'Somnath Temple', district: 'Gir Somnath', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'The first of the twelve sacred Jyotirlingas, rising directly on the shore of the Arabian Sea.', historical: 'Ancient foundation; reconstructed after historic invasions, most recently by Sardar Patel in 1951.', architectural: 'Chaulukya style Kailas Mahameru Prasad with 150-foot shikhara and Baan Stambh arrow pillar.', lat: 20.8880, lng: 70.4010 },
      { name: 'Great Rann of Kutch & White Desert', district: 'Kutch', category: 'Scenic Viewpoints & Geological Wonders', intro: 'World’s largest salt desert spanning 7,500 sq km, shimmering under moonlight during Rann Utsav.', historical: 'Ancient maritime channel dried into vast salt marshes; home to Kutchi artisan communities.', architectural: 'White salt crystal flats inhabited by Rogan art masters, Kutchi embroiderers, and wild asses.', lat: 23.7337, lng: 69.8597 }
    ]
  }
};

console.log('State config script prepared.');
