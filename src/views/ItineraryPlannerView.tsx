import React, { useState } from 'react';
import { 
  Calendar, MapPin, Clock, Trash2, ArrowUp, ArrowDown, 
  Printer, Share2, Compass, Sparkles, CheckCircle2, 
  ChevronRight, Utensils, AlertCircle 
} from 'lucide-react';
import { DestinationDetail, TravelItinerary } from '../types/heritage.ts';

interface ItineraryPlannerViewProps {
  customStops: DestinationDetail[];
  onRemoveStop: (id: string) => void;
  onClearItinerary: () => void;
  onNavigateToState: (slug: string) => void;
}

export const CURATED_CIRCUITS: TravelItinerary[] = [
  {
    id: 'golden-triangle',
    title: 'The Imperial Golden Triangle',
    stateSlug: 'delhi',
    stateName: 'Delhi • Uttar Pradesh • Rajasthan',
    durationDays: 5,
    travelStyle: 'Heritage & History',
    summary: 'The world’s classic introduction to India’s imperial history spanning Mughal monuments, the Taj Mahal, and Rajput hill forts.',
    createdDate: '2026-03-01',
    days: [
      {
        dayNumber: 1,
        themeTitle: 'The Seven Cities of Delhi',
        culturalHighlight: 'Red Fort & Qutb Minar Complex (UNESCO)',
        regionalDishSuggestion: 'Old Delhi Chaat & Paranthas in Chandni Chowk',
        visitorTips: 'Start early morning at Qutb Minar before tour crowds arrive.',
        stops: [
          { name: 'Red Fort Complex (Lal Qila)', duration: '2.5 hours', category: 'UNESCO World Heritage Sites', notes: 'Explore Diwan-i-Khas and Naubat Khana', timeSlot: 'Morning' },
          { name: 'Humayun’s Tomb Garden', duration: '2 hours', category: 'UNESCO World Heritage Sites', notes: 'Precursor to Taj Mahal architecture', timeSlot: 'Afternoon' },
          { name: 'Qutb Minar & Iron Pillar', duration: '2 hours', category: 'UNESCO World Heritage Sites', notes: 'Marvel at 4th-century metallurgy', timeSlot: 'Evening' },
        ]
      },
      {
        dayNumber: 2,
        themeTitle: 'Marble Splendor of the Mughals',
        culturalHighlight: 'Sunrise at Taj Mahal & Agra Fort (UNESCO)',
        regionalDishSuggestion: 'Agra Petha & Mughlai Shahi Paneer',
        visitorTips: 'Book morning 06:00 AM sunrise slot for Taj Mahal.',
        stops: [
          { name: 'Taj Mahal Sunrise Visit', duration: '3.5 hours', category: 'UNESCO World Heritage Sites', notes: 'Watch morning light illuminate Makrana marble', timeSlot: 'Morning' },
          { name: 'Agra Fort & Sheesh Mahal', duration: '2.5 hours', category: 'UNESCO World Heritage Sites', notes: 'View Taj Mahal across Yamuna from Musamman Burj', timeSlot: 'Afternoon' },
          { name: 'Mehtab Bagh Sunset Reflection', duration: '1.5 hours', category: 'Botanical Gardens & Royal Landscaped Grounds', notes: 'Sunset photography over the river', timeSlot: 'Evening' },
        ]
      },
      {
        dayNumber: 3,
        themeTitle: 'The Abandoned Sandstone City',
        culturalHighlight: 'Fatehpur Sikri Imperial Capital (UNESCO)',
        regionalDishSuggestion: 'Dal Baati Churma upon arrival in Rajasthan',
        visitorTips: 'Hire authorized guide for Salim Chishti dargah history.',
        stops: [
          { name: 'Fatehpur Sikri & Buland Darwaza', duration: '3 hours', category: 'UNESCO World Heritage Sites', notes: '54-metre world’s tallest stone gateway', timeSlot: 'Morning' },
          { name: 'Chand Baori Stepwell, Abhaneri', duration: '2 hours', category: 'Rock-Cut Caves, Stepwells & Inscriptions', notes: 'En route stopover to Jaipur', timeSlot: 'Afternoon' },
          { name: 'Jaipur Johari Bazaar Walk', duration: '2 hours', category: 'Historic Bazaars & Traditional Food Streets', notes: 'Gemstones, blue pottery, and textiles', timeSlot: 'Evening' },
        ]
      },
      {
        dayNumber: 4,
        themeTitle: 'The Pink City of Rajput Valor',
        culturalHighlight: 'Amber Fort & Hawa Mahal',
        regionalDishSuggestion: 'Pyaaz Kachori & Ghevar',
        visitorTips: 'Take electric golf carts up to Amber Fort courtyard.',
        stops: [
          { name: 'Amber Fort & Palace', duration: '3.5 hours', category: 'UNESCO World Heritage Sites', notes: 'Sheesh Mahal mirror hall and Maota lake', timeSlot: 'Morning' },
          { name: 'Hawa Mahal (Palace of Winds)', duration: '1.5 hours', category: 'Royal Palaces & Historic Havelis', notes: '953 jharokha lattice stone windows', timeSlot: 'Afternoon' },
          { name: 'Jantar Mantar Royal Observatory', duration: '1.5 hours', category: 'UNESCO World Heritage Sites', notes: 'World’s largest stone sundial', timeSlot: 'Evening' },
        ]
      },
      {
        dayNumber: 5,
        themeTitle: 'Artisan Guilds & Modern Delhi Return',
        culturalHighlight: 'City Palace of Jaipur & Sanganer Block Printing',
        regionalDishSuggestion: 'Laal Maas or Ker Sangri with bajra roti',
        visitorTips: 'Direct train/expressway return to Delhi in 3.5 hours.',
        stops: [
          { name: 'City Palace Museum Jaipur', duration: '2.5 hours', category: 'Royal Palaces & Historic Havelis', notes: 'Pritam Niwas Peacock courtyard', timeSlot: 'Morning' },
          { name: 'Sanganer Hand-Block Print Workshops', duration: '2 hours', category: 'Handicraft Centres & Artisan Guilds', notes: 'Witness master block-carvers at work', timeSlot: 'Afternoon' },
        ]
      }
    ]
  },
  {
    id: 'hoysala-vijayanagara',
    title: 'Hoysala & Vijayanagara Heritage Trail',
    stateSlug: 'karnataka',
    stateName: 'Karnataka',
    durationDays: 6,
    travelStyle: 'Temples & Spirituality',
    summary: 'A journey through southern stone carving pinnacles: Halebidu, Belur, Shravanabelagola, and the imperial ruins of Hampi.',
    createdDate: '2026-03-01',
    days: [
      {
        dayNumber: 1,
        themeTitle: 'Monolithic Saint & Hoysala Stellate Shrines',
        culturalHighlight: 'Shravanabelagola & Belur Chennakeshava (UNESCO)',
        regionalDishSuggestion: 'Mysore Masala Dosa & Filter Coffee',
        visitorTips: 'Climb Vindhyagiri hill barefoot early morning.',
        stops: [
          { name: 'Gommateshwara Monolith, Shravanabelagola', duration: '2.5 hours', category: 'Ancient Temples & Sacred Sanctuaries', notes: '57-ft granite monolith', timeSlot: 'Morning' },
          { name: 'Chennakeshava Temple, Belur', duration: '3 hours', category: 'UNESCO World Heritage Sites', notes: '42 Madanika bracket sculptures', timeSlot: 'Afternoon' },
        ]
      },
      {
        dayNumber: 2,
        themeTitle: 'The Climax of Soapstone Sculpture',
        culturalHighlight: 'Hoysaleswara Temple, Halebidu (UNESCO)',
        regionalDishSuggestion: 'Akki Roti & Ennegayi (stuffed brinjal)',
        visitorTips: 'Pair with quiet Kedareshwara temple nearby.',
        stops: [
          { name: 'Hoysaleswara Temple, Halebidu', duration: '3.5 hours', category: 'UNESCO World Heritage Sites', notes: 'Stellate base and celestial friezes', timeSlot: 'Morning' },
          { name: 'Belavadi Veera Narayana Temple', duration: '2 hours', category: 'Ancient Temples & Sacred Sanctuaries', notes: 'Tri-kuta 108 lathe-turned pillars', timeSlot: 'Afternoon' },
        ]
      },
      {
        dayNumber: 3,
        themeTitle: 'The Seven-Rampart Rock Fortress',
        culturalHighlight: 'Chitradurga Fort (Kallina Kote)',
        regionalDishSuggestion: 'Benne Dosa of Davanagere',
        visitorTips: 'Wear sturdy footwear for granite boulder stairways.',
        stops: [
          { name: 'Chitradurga Fort (Kallina Kote)', duration: '4 hours', category: 'Historic Forts & Bastions', notes: 'Explore Obavvana Kindi and 38 gateway passages', timeSlot: 'Morning' },
          { name: 'Transfer to Hampi / Hosapete', duration: '3 hours', category: 'Scenic Viewpoints & Geological Wonders', notes: 'Drive along Tungabhadra basin', timeSlot: 'Afternoon' },
        ]
      },
      {
        dayNumber: 4,
        themeTitle: 'Sacred Centre of Hampi',
        culturalHighlight: 'Virupaksha Temple & Matanga Hill',
        regionalDishSuggestion: 'Traditional South Indian Thali on banana leaf',
        visitorTips: 'Matanga Hill offers the ultimate 360-degree sunrise view over Hampi ruins.',
        stops: [
          { name: 'Virupaksha Temple Complex', duration: '2.5 hours', category: 'Ancient Temples & Sacred Sanctuaries', notes: '50-metre eastern gopuram and Lakshmi temple elephant', timeSlot: 'Morning' },
          { name: 'Hemakuta Hill Monolithic Ganesha Shrines', duration: '2 hours', category: 'Archaeological Sites & Ancient Cities', notes: 'Sasivekalu and Kadalekalu Ganeshas', timeSlot: 'Afternoon' },
          { name: 'Sunset at Matanga Hill', duration: '2 hours', category: 'Scenic Viewpoints & Geological Wonders', notes: 'Panorama of boulder landscape and Tungabhadra', timeSlot: 'Evening' },
        ]
      },
      {
        dayNumber: 5,
        themeTitle: 'The Royal Centre & Musical Wonders',
        culturalHighlight: 'Vittala Temple Stone Chariot (UNESCO)',
        regionalDishSuggestion: 'Jolada Roti Oota with spicy chutneys',
        visitorTips: 'Electric buggies available between Hampi bazaar and Vittala temple.',
        stops: [
          { name: 'Vittala Temple & Stone Chariot', duration: '3.5 hours', category: 'UNESCO World Heritage Sites', notes: 'Iconic stone chariot and 56 musical pillars', timeSlot: 'Morning' },
          { name: 'Zenana Enclosure & Lotus Mahal', duration: '2 hours', category: 'Royal Palaces & Historic Havelis', notes: 'Elephant stables with 11 domed chambers', timeSlot: 'Afternoon' },
          { name: 'Tungabhadra Coracle Boat Ride', duration: '1.5 hours', category: 'Waterfalls, Lakes & River Ghats', notes: 'Circular reed boat on the sacred river', timeSlot: 'Evening' },
        ]
      },
      {
        dayNumber: 6,
        themeTitle: 'Cradle of Chalukya Architecture',
        culturalHighlight: 'Badami Cave Temples & Pattadakal (UNESCO)',
        regionalDishSuggestion: 'Dharwad Peda & Girmit',
        visitorTips: 'Visit Bhutanatha temple across Agastya Lake at twilight.',
        stops: [
          { name: 'Badami Cave Temples', duration: '3 hours', category: 'Rock-Cut Caves, Stepwells & Inscriptions', notes: 'Four rock-cut caves and 81 Nataraja poses', timeSlot: 'Morning' },
          { name: 'Pattadakal Monument Group', duration: '2.5 hours', category: 'UNESCO World Heritage Sites', notes: 'Fusion of Dravidian and Nagara styles', timeSlot: 'Afternoon' },
        ]
      }
    ]
  }
];

export const ItineraryPlannerView: React.FC<ItineraryPlannerViewProps> = ({
  customStops,
  onRemoveStop,
  onClearItinerary,
  onNavigateToState,
}) => {
  const [activeTab, setActiveTab] = useState<'custom' | 'curated'>('custom');
  const [selectedCurated, setSelectedCurated] = useState<TravelItinerary>(CURATED_CIRCUITS[0]);
  const [customDaysCount, setCustomDaysCount] = useState(3);

  const handlePrint = () => {
    window.print();
  };

  // Group custom stops into days
  const stopsPerDay = Math.max(1, Math.ceil(customStops.length / customDaysCount));
  const groupedDays = Array.from({ length: customDaysCount }, (_, dayIdx) => {
    const start = dayIdx * stopsPerDay;
    return {
      dayNumber: dayIdx + 1,
      stops: customStops.slice(start, start + stopsPerDay),
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl border border-stone-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-[#C85A32]/25 to-transparent pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#C85A32]" />
            Cultural Discovery & Route Architect
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
            Smart Trip & Itinerary Planner
          </h1>
          <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
            Craft your personalized Indian cultural journey. Organize your saved destinations day by day, calculate travel pacing, discover curated regional heritage circuits, and export complete printable travel blueprints.
          </p>
        </div>
      </div>

      {/* Tab Selector */}
      <div className="flex items-center justify-between border-b border-stone-200">
        <div className="flex gap-4 sm:gap-8 text-sm font-medium">
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'custom'
                ? 'border-[#C85A32] text-[#C85A32] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <span>My Custom Itinerary</span>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 text-[11px] font-bold text-stone-700">
              {customStops.length} stops
            </span>
          </button>

          <button
            onClick={() => setActiveTab('curated')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'curated'
                ? 'border-[#C85A32] text-[#C85A32] font-semibold'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Curated Heritage Circuits</span>
          </button>
        </div>

        <button
          onClick={handlePrint}
          className="px-3.5 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* TAB 1: CUSTOM ITINERARY BUILDER */}
      {activeTab === 'custom' && (
        <div className="space-y-6">
          {customStops.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 p-8 space-y-4">
              <Compass className="w-10 h-10 text-stone-300 mx-auto" />
              <h3 className="text-xl font-serif font-bold text-stone-900">Your trip is currently empty</h3>
              <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
                Explore our 1,664+ destinations across India and click <strong>"Add to Trip"</strong> on any monument or heritage gem to build your route here.
              </p>
              <div className="pt-2">
                <a
                  href="#destinations"
                  className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#b54f2a] text-white rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Browse Destination Database</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Controls Bar */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-semibold text-stone-700">Trip Duration:</span>
                  <select
                    value={customDaysCount}
                    onChange={(e) => setCustomDaysCount(Number(e.target.value))}
                    className="p-1.5 bg-stone-50 border border-stone-200 rounded-md text-stone-800 text-xs font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 10, 14].map((d) => (
                      <option key={d} value={d}>
                        {d} {d === 1 ? 'Day' : 'Days'}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={onClearItinerary}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Stops</span>
                </button>
              </div>

              {/* Grouped Day Breakdown */}
              <div className="space-y-6">
                {groupedDays.map((dayGroup) => (
                  <div
                    key={dayGroup.dayNumber}
                    className="bg-white rounded-2xl border border-stone-200 p-6 shadow-xs space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-[#C85A32] text-white text-xs font-bold flex items-center justify-center">
                          {dayGroup.dayNumber}
                        </span>
                        <h3 className="text-lg font-serif font-bold text-stone-900">
                          Day {dayGroup.dayNumber} Itinerary
                        </h3>
                      </div>
                      <span className="text-xs text-stone-500 font-medium">
                        {dayGroup.stops.length} {dayGroup.stops.length === 1 ? 'Destination' : 'Destinations'}
                      </span>
                    </div>

                    {dayGroup.stops.length === 0 ? (
                      <p className="text-xs text-stone-400 italic">No destinations assigned to this day.</p>
                    ) : (
                      <div className="space-y-3">
                        {dayGroup.stops.map((stop, idx) => (
                          <div
                            key={stop.id}
                            className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-stone-900 text-sm">
                                  {stop.name}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-white border border-stone-200 text-[10px] text-stone-600">
                                  {stop.category}
                                </span>
                              </div>
                              <p className="text-stone-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#C85A32]" />
                                <span>{stop.district}, {stop.state}</span>
                                <span>•</span>
                                <span>Suggested Time: {stop.recommendedDuration}</span>
                              </p>
                            </div>

                            <button
                              onClick={() => onRemoveStop(stop.id)}
                              className="text-stone-400 hover:text-rose-600 p-1.5 rounded-md hover:bg-white transition-colors"
                              title="Remove from itinerary"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CURATED HERITAGE CIRCUITS */}
      {activeTab === 'curated' && (
        <div className="space-y-8">
          {/* Circuit Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CURATED_CIRCUITS.map((circuit) => (
              <button
                key={circuit.id}
                onClick={() => setSelectedCurated(circuit)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all whitespace-nowrap ${
                  selectedCurated.id === circuit.id
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                }`}
              >
                <span>{circuit.title}</span>
                <span className="ml-2 text-[10px] text-stone-400">({circuit.durationDays} Days)</span>
              </button>
            ))}
          </div>

          {/* Curated Circuit Detail Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-[#C85A32] font-semibold border border-amber-200">
                  {selectedCurated.travelStyle}
                </span>
                <span className="text-stone-400">•</span>
                <span className="font-medium text-stone-700">{selectedCurated.durationDays} Days Circuit</span>
                <span className="text-stone-400">•</span>
                <span className="text-stone-500">{selectedCurated.stateName}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {selectedCurated.title}
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-3xl">
                {selectedCurated.summary}
              </p>
            </div>

            {/* Day-by-Day Timeline */}
            <div className="relative pl-6 sm:pl-8 border-l-2 border-stone-200 space-y-8">
              {selectedCurated.days.map((day) => (
                <div key={day.dayNumber} className="relative group space-y-3">
                  {/* Timeline Node */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-[#C85A32] group-hover:bg-[#C85A32] transition-colors" />

                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider">
                          Day {day.dayNumber}
                        </span>
                        <h4 className="text-base font-serif font-bold text-stone-900">
                          {day.themeTitle}
                        </h4>
                      </div>
                      <span className="text-xs text-stone-500 font-medium">
                        Highlight: {day.culturalHighlight}
                      </span>
                    </div>

                    {/* Stops List */}
                    <div className="space-y-2 pt-2">
                      {day.stops.map((stop, sIdx) => (
                        <div
                          key={sIdx}
                          className="bg-white p-3 rounded-lg border border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs"
                        >
                          <div>
                            <strong className="text-stone-900">{stop.name}</strong>
                            <span className="text-stone-400 ml-2">({stop.duration})</span>
                            <p className="text-[11px] text-stone-500">{stop.notes}</p>
                          </div>
                          <span className="px-2 py-0.5 rounded bg-stone-100 text-[10px] text-stone-600 font-medium">
                            {stop.timeSlot}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Regional Food & Guidance */}
                    <div className="pt-2 border-t border-stone-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-stone-700">
                        <Utensils className="w-3.5 h-3.5 text-[#C85A32]" />
                        <span><strong>Taste Heritage:</strong> {day.regionalDishSuggestion}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-500">
                        <AlertCircle className="w-3.5 h-3.5 text-stone-400" />
                        <span>{day.visitorTips}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
