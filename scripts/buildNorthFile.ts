import fs from 'fs';
import path from 'path';
import type { PlaceData, StateDataset } from './destinationCore.ts';
import { expandPlace } from './destinationCore.ts';
import { generateStatePlaces } from './southGenerator.ts';

const northData: StateDataset[] = [
  {
    state: 'Rajasthan',
    stateSlug: 'rajasthan',
    capital: 'Jaipur',
    region: 'North',
    type: 'state',
    airport: 'Jaipur International Airport (JAI) / Jodhpur Airport',
    railway: 'Jaipur Junction (JP) / Jodhpur (JU)',
    places: generateStatePlaces(
      'Rajasthan', 'rajasthan', 'Jaipur', 'North',
      'Jaipur International Airport (JAI)', 'Jaipur Junction (JP)',
      ['Jaipur', 'Jodhpur', 'Udaipur', 'Jaisalmer', 'Bikaner', 'Chittorgarh', 'Sawai Madhopur', 'Pushkar', 'Ajmer', 'Alwar', 'Dausa', 'Bharatpur', 'Bundi', 'Kota', 'Mount Abu', 'Barmer', 'Nagaur', 'Pali', 'Rajsamand', 'Sikar'],
      [
        { name: 'Amber Fort & Sheesh Mahal', district: 'Jaipur', category: 'UNESCO World Heritage Sites', intro: 'Opulent hilltop fortress overlooking Maota Lake with the world-famous mirror hall.', lat: 26.9855, lng: 75.8513, isUnesco: true },
        { name: 'Mehrangarh Fort & Museum', district: 'Jodhpur', category: 'Historic Forts & Bastions', intro: 'Colossal citadel perched 410 feet above Jodhpur’s blue-painted Brahmin quarters.', lat: 26.2978, lng: 73.0185 },
        { name: 'Jaisalmer Fort (Sonar Qila)', district: 'Jaisalmer', category: 'UNESCO World Heritage Sites', intro: 'Living golden sandstone desert fortress housing 3,000 residents and Jain temples.', lat: 26.9124, lng: 70.9126, isUnesco: true },
        { name: 'City Palace & Lake Pichola', district: 'Udaipur', category: 'Royal Palaces & Historic Havelis', intro: 'Granite and marble lakeside palace complex overlooking tranquil waters.', lat: 24.5764, lng: 73.6835 },
        { name: 'Chittorgarh Fort & Vijay Stambha', district: 'Chittorgarh', category: 'UNESCO World Heritage Sites', intro: 'India’s largest fort covering 700 acres, symbol of Mewar Rajput chivalry.', lat: 24.8879, lng: 74.6453, isUnesco: true },
        { name: 'Chand Baori Stepwell, Abhaneri', district: 'Dausa', category: 'Rock-Cut Caves, Stepwells & Inscriptions', intro: 'Ancient geometric marvel with 3,500 symmetrical narrow steps over 13 storeys.', lat: 27.0072, lng: 76.6064, isHiddenGem: true },
        { name: 'Ranthambore Fort & National Park', district: 'Sawai Madhopur', category: 'National Parks & Wildlife Corridors', intro: 'UNESCO hill fort surrounded by pristine dry deciduous tiger jungle.', lat: 26.0173, lng: 76.5026, isUnesco: true },
        { name: 'Brahma Temple & Sacred Lake, Pushkar', district: 'Ajmer', category: 'Religious Pilgrimage Centres', intro: 'Rare dedicated temple to Lord Brahma surrounded by 52 holy bathing ghats.', lat: 26.4880, lng: 74.5510 },
        { name: 'Dilwara Jain Temples, Mount Abu', district: 'Sirohi', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'World-renowned marble temples featuring translucent, filigree stone lace ceilings.', lat: 24.6030, lng: 72.7230 },
        { name: 'Junagarh Fort, Bikaner', district: 'Bikaner', category: 'Historic Forts & Bastions', intro: 'Unconquered desert fortress boasting Anup Mahal with gold leaf work.', lat: 28.0220, lng: 73.3190 },
        { name: 'Kumbhalgarh Fort & Great Wall of India', district: 'Rajsamand', category: 'UNESCO World Heritage Sites', intro: 'Birthplace of Maharana Pratap with the second-longest continuous wall in the world (36km).', lat: 25.1477, lng: 73.5872, isUnesco: true },
        { name: 'Keoladeo National Park (Bharatpur Bird Sanctuary)', district: 'Bharatpur', category: 'UNESCO World Heritage Sites', intro: 'World heritage wetland haven wintering thousands of migratory waterfowl.', lat: 27.1600, lng: 77.5200, isUnesco: true }
      ]
    )
  },
  {
    state: 'Uttar Pradesh',
    stateSlug: 'uttar-pradesh',
    capital: 'Lucknow',
    region: 'North',
    type: 'state',
    airport: 'Chhatrapati Shivaji / Chaudhary Charan Singh Airport (LKO) / Varanasi Airport (VNS)',
    railway: 'Varanasi Junction (BSB) / Agra Cantt (AGC) / Lucknow Charbagh (LKO)',
    places: generateStatePlaces(
      'Uttar Pradesh', 'uttar-pradesh', 'Lucknow', 'North',
      'Chaudhary Charan Singh International Airport, Lucknow (LKO)', 'Lucknow Charbagh (LKO)',
      ['Agra', 'Varanasi', 'Lucknow', 'Prayagraj', 'Ayodhya', 'Mathura', 'Vrindavan', 'Sarnath', 'Jhansi', 'Fatehpur Sikri', 'Kushinagar', 'Mirzapur', 'Chitrakoot', 'Gorakhpur', 'Aligarh', 'Bareilly', 'Jaunpur', 'Meerut', 'Banda', 'Kannauj'],
      [
        { name: 'Taj Mahal', district: 'Agra', category: 'UNESCO World Heritage Sites', intro: 'World wonder of white Makrana marble built by Mughal Emperor Shah Jahan for Mumtaz Mahal.', lat: 27.1751, lng: 78.0421, isUnesco: true },
        { name: 'Varanasi Ghats & Kashi Vishwanath Dham', district: 'Varanasi', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Sacred riverfront ghats and jyotirlinga shrine along the holy Ganges.', lat: 25.3109, lng: 83.0107 },
        { name: 'Fatehpur Sikri Imperial City & Buland Darwaza', district: 'Agra', category: 'UNESCO World Heritage Sites', intro: 'Akbar’s red sandstone capital preserving the world’s tallest gateway (54m Buland Darwaza).', lat: 27.0945, lng: 77.6677, isUnesco: true },
        { name: 'Agra Fort (Lal Qila)', district: 'Agra', category: 'UNESCO World Heritage Sites', intro: 'Vast red sandstone fortress of the Mughal dynasty with Sheesh Mahal and Jahangiri Mahal.', lat: 27.1795, lng: 78.0211, isUnesco: true },
        { name: 'Bara Imambara & Bhulbhulaiya', district: 'Lucknow', category: 'Historic Forts & Bastions', intro: 'Awadhi architectural wonder famed for its colossal unsupported arched hall and maze.', lat: 26.8689, lng: 80.9128 },
        { name: 'Sarnath Dhamek Stupa & Lion Capital', district: 'Varanasi', category: 'Archaeological Sites & Ancient Cities', intro: 'Sacred deer park where Buddha gave his first sermon; origin of India’s National Emblem.', lat: 25.3811, lng: 83.0247 },
        { name: 'Ram Janmabhoomi Mandir, Ayodhya', district: 'Ayodhya', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Sacred birthplace of Lord Rama built in classical Nagara sandstone style.', lat: 26.7956, lng: 82.1943 },
        { name: 'Triveni Sangam & Allahabad Fort', district: 'Prayagraj', category: 'Religious Pilgrimage Centres', intro: 'Confluence of Ganga, Yamuna, and Saraswati, host to the Maha Kumbh Mela.', lat: 25.4358, lng: 81.8463 },
        { name: 'Jhansi Fort & Rani Mahal', district: 'Jhansi', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: 'Historic hill fortress defended valiantly by Rani Lakshmibai during the 1857 war.', lat: 25.4578, lng: 78.5786 },
        { name: 'Mahaparinirvana Temple, Kushinagar', district: 'Kushinagar', category: 'Religious Pilgrimage Centres', intro: 'Sacred Buddhist pilgrimage site where Lord Buddha attained Mahaparinirvana under sal trees.', lat: 26.7410, lng: 83.8900 }
      ]
    )
  },
  {
    state: 'Punjab',
    stateSlug: 'punjab',
    capital: 'Chandigarh',
    region: 'North',
    type: 'state',
    airport: 'Sri Guru Ram Dass Jee International Airport, Amritsar (ATQ)',
    railway: 'Amritsar Junction (ASR) / Jalandhar City',
    places: generateStatePlaces(
      'Punjab', 'punjab', 'Chandigarh', 'North',
      'Sri Guru Ram Dass Jee International Airport, Amritsar (ATQ)', 'Amritsar Junction (ASR)',
      ['Amritsar', 'Patiala', 'Jalandhar', 'Ludhiana', 'Kapurthala', 'Bathinda', 'Fatehgarh Sahib', 'Anandpur Sahib', 'Hoshiarpur', 'Gurdaspur', 'Pathankot', 'Firozpur'],
      [
        { name: 'Sri Harmandir Sahib (Golden Temple)', district: 'Amritsar', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Holiest gurdwara of Sikhism surrounded by the sacred Amrit Sarovar holy pool.', lat: 31.6200, lng: 74.8765 },
        { name: 'Jallianwala Bagh National Memorial', district: 'Amritsar', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: 'Solemn national monument commemorating the martyrs of the 1919 massacre.', lat: 31.6208, lng: 74.8804 },
        { name: 'Virasat-e-Khalsa, Anandpur Sahib', district: 'Rupnagar', category: 'Museums & Cultural Archives', intro: 'Architectural masterpiece museum designed by Moshe Safdie narrating Sikh history.', lat: 31.2330, lng: 76.5010 },
        { name: 'Qila Mubarak, Bathinda', district: 'Bathinda', category: 'Historic Forts & Bastions', intro: 'Oldest surviving fort in India dating to 90–110 CE, where Empress Razia Sultana was imprisoned.', lat: 30.2110, lng: 74.9450 },
        { name: 'Qila Mubarak & Sheesh Mahal, Patiala', district: 'Patiala', category: 'Royal Palaces & Historic Havelis', intro: 'Rare Sikh palace architecture with miniature frescoes depicting the Gita Govinda.', lat: 30.3250, lng: 76.4010 },
        { name: 'Jagatjit Palace (Sainik School), Kapurthala', district: 'Kapurthala', category: 'Colonial Landmarks & Historic Railways', intro: 'Versailles-inspired palace of Maharaja Jagatjit Singh with French Renaissance grandeur.', lat: 31.3780, lng: 75.3850 },
        { name: 'Attari-Wagah Border Retreat Ceremony', district: 'Amritsar', category: 'Freedom Struggle Memorials & Reformer Landmarks', intro: 'Iconic military lowering of the flags ceremony along the Indo-Pak international border.', lat: 31.6040, lng: 74.5730 }
      ]
    )
  },
  {
    state: 'Haryana',
    stateSlug: 'haryana',
    capital: 'Chandigarh',
    region: 'North',
    type: 'state',
    airport: 'Indira Gandhi International Airport, Delhi (DEL)',
    railway: 'Ambala Cantt (UMB) / Kurukshetra Junction',
    places: generateStatePlaces(
      'Haryana', 'haryana', 'Chandigarh', 'North',
      'Indira Gandhi International Airport (DEL)', 'Ambala Cantt (UMB)',
      ['Kurukshetra', 'Panchkula', 'Faridabad', 'Gurugram', 'Hisar', 'Panipat', 'Rohtak', 'Karnal', 'Sirsa', 'Rewari', 'Yamunanagar', 'Bhiwani'],
      [
        { name: 'Brahma Sarovar & Jyotisar', district: 'Kurukshetra', category: 'Religious Pilgrimage Centres', intro: 'Sacred water tank and birthplace of the Bhagavad Gita under the holy Banyan tree.', lat: 29.9650, lng: 76.8330 },
        { name: 'Yadavindra Gardens (Pinjore Gardens)', district: 'Panchkula', category: 'Botanical Gardens & Royal Landscaped Grounds', intro: '17th-century Mughal terraced garden created by Nawab Fidai Khan on seven ascending levels.', lat: 30.7950, lng: 76.9150 },
        { name: 'Rakhigarhi Indus Valley Archaeological Site', district: 'Hisar', category: 'Archaeological Sites & Ancient Cities', intro: 'Largest site of the ancient Harappan Civilization spanning over 350 hectares.', lat: 29.2830, lng: 76.1170, isHiddenGem: true },
        { name: 'Surajkund Ancient Sun Reservoir', district: 'Faridabad', category: 'Rock-Cut Caves, Stepwells & Inscriptions', intro: '10th-century amphitheatre sun stepwell built by King Suraj Pal of the Tomar dynasty.', lat: 28.4870, lng: 77.2830 },
        { name: 'Sultanpur National Park & Bird Sanctuary', district: 'Gurugram', category: 'National Parks & Wildlife Corridors', intro: 'Renowned wetland birding haven hosting over 250 species of resident and migratory birds.', lat: 28.4610, lng: 76.8920 },
        { name: 'Firoz Shah Palace Complex & Lat ki Masjid', district: 'Hisar', category: 'Historic Forts & Bastions', intro: '14th-century Tughlaq palace fortress holding an ancient Ashokan pillar shaft.', lat: 29.1550, lng: 75.7220 }
      ]
    )
  },
  {
    state: 'Himachal Pradesh',
    stateSlug: 'himachal-pradesh',
    capital: 'Shimla',
    region: 'North',
    type: 'state',
    airport: 'Kullu-Manali Airport, Bhuntar (KUU) / Gaggal Airport, Kangra',
    railway: 'Kalka Railway Station (KLK) / Toy Train to Shimla',
    places: generateStatePlaces(
      'Himachal Pradesh', 'himachal-pradesh', 'Shimla', 'North',
      'Kullu-Manali Airport, Bhuntar (KUU)', 'Kalka Railway Station (KLK)',
      ['Shimla', 'Kullu', 'Mandi', 'Kangra', 'Lahaul and Spiti', 'Chamba', 'Solan', 'Sirmaur', 'Kinnaur', 'Bilaspur', 'Una', 'Hamirpur'],
      [
        { name: 'Kalka-Shimla Toy Train Railway', district: 'Shimla', category: 'UNESCO World Heritage Sites', intro: 'Historic 96-km mountain railway traversing 103 tunnels and 800 bridges into the Himalayas.', lat: 31.1048, lng: 77.1734, isUnesco: true },
        { name: 'Hadimba Devi Temple, Manali', district: 'Kullu', category: 'Ancient Temples & Sacred Sanctuaries', intro: '1553 CE four-tiered pagoda-style cedar wood temple dedicated to Goddess Hadimba.', lat: 32.2480, lng: 77.1810 },
        { name: 'Kangra Fort & Brajeshwari Devi', district: 'Kangra', category: 'Historic Forts & Bastions', intro: 'One of the oldest forts in India built by Katoch dynasty overlooking Banganga River.', lat: 32.1000, lng: 76.2550 },
        { name: 'Key Monastery & Spiti Valley', district: 'Lahaul and Spiti', category: 'Ancient Temples & Sacred Sanctuaries', intro: '1,000-year-old cliffside Tibetan Buddhist gompa perched at 4,166 metres above sea level.', lat: 32.2980, lng: 78.0120 },
        { name: 'Tsuglagkhang Complex & McLeod Ganj', district: 'Kangra', category: 'Religious Pilgrimage Centres', intro: 'Official residence of the 14th Dalai Lama and headquarters of Tibetan Buddhism.', lat: 32.2350, lng: 76.3260 },
        { name: 'Great Himalayan National Park', district: 'Kullu', category: 'UNESCO World Heritage Sites', intro: 'Pristine alpine ecosystem sheltering snow leopards, western tragopans, and musk deer.', lat: 31.8500, lng: 77.5500, isUnesco: true },
        { name: 'Tabo Monastery (Ajanta of the Himalayas)', district: 'Lahaul and Spiti', category: 'UNESCO World Heritage Sites', intro: 'Founded in 996 CE, preserving ancient stucco statues and Buddhist fresco murals.', lat: 32.0950, lng: 78.3800, isUnesco: true }
      ]
    )
  },
  {
    state: 'Uttarakhand',
    stateSlug: 'uttarakhand',
    capital: 'Dehradun',
    region: 'North',
    type: 'state',
    airport: 'Jolly Grant Airport, Dehradun (DED)',
    railway: 'Haridwar Junction (HW) / Dehradun (DDN) / Kathgodam',
    places: generateStatePlaces(
      'Uttarakhand', 'uttarakhand', 'Dehradun', 'North',
      'Jolly Grant Airport, Dehradun (DED)', 'Haridwar Junction (HW)',
      ['Rudraprayag', 'Chamoli', 'Uttarkashi', 'Haridwar', 'Dehradun', 'Nainital', 'Almora', 'Pithoragarh', 'Pauri Garhwal', 'Tehri Garhwal', 'Bageshwar', 'Champawat'],
      [
        { name: 'Kedarnath Jyotirlinga Temple', district: 'Rudraprayag', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Centuries-old stone temple dedicated to Lord Shiva set against snow-capped Kedarnath peak (3,584m).', lat: 30.7352, lng: 79.0669 },
        { name: 'Badrinath Temple & Tapt Kund', district: 'Chamoli', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Sacred Char Dham shrine dedicated to Lord Vishnu along the Alaknanda River.', lat: 30.7447, lng: 79.4912 },
        { name: 'Valley of Flowers & Nanda Devi National Park', district: 'Chamoli', category: 'UNESCO World Heritage Sites', intro: 'Breathtaking high-altitude valley carpeted in hundreds of endemic alpine wildflower species.', lat: 30.7280, lng: 79.6050, isUnesco: true },
        { name: 'Har Ki Pauri & Ganga Aarti, Haridwar', district: 'Haridwar', category: 'Religious Pilgrimage Centres', intro: 'Sacred river ghat where holy Ganga enters the plains, illuminated by evening lamp rituals.', lat: 29.9570, lng: 78.1710 },
        { name: 'Rishikesh Yoga Ashrams & Laxman Jhula', district: 'Dehradun', category: 'Religious Pilgrimage Centres', intro: 'World capital of yoga nestled at the Himalayan foothills along emerald Ganges waters.', lat: 30.1240, lng: 78.3180 },
        { name: 'Jim Corbett National Park', district: 'Nainital', category: 'National Parks & Wildlife Corridors', intro: 'India’s oldest national park established in 1936, premier Bengal tiger conservation reserve.', lat: 29.5300, lng: 78.7740 },
        { name: 'Jageshwar Dham Temple Cluster', district: 'Almora', category: 'Ancient Temples & Sacred Sanctuaries', intro: 'Cluster of 124 stone temples dating from 7th to 12th century CE surrounded by dense deodar forests.', lat: 29.6500, lng: 79.8500, isHiddenGem: true }
      ]
    )
  }
];

export function generateNorthFile() {
  const allNorthDestinations: any[] = [];
  northData.forEach(stateDataset => {
    stateDataset.places.forEach((p, idx) => {
      allNorthDestinations.push(expandPlace(p, stateDataset, idx));
    });
  });

  const outPath = path.resolve('src/data/destinations/north.ts');
  const content = `import type { DestinationDetail } from '../../types/heritage.ts';\n\nexport const northDestinations: DestinationDetail[] = ${JSON.stringify(allNorthDestinations, null, 2)};\n`;
  fs.writeFileSync(outPath, content, 'utf-8');
  console.log(`Generated North Destinations: ${allNorthDestinations.length} records in ${outPath}`);
}

generateNorthFile();
