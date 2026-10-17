import React, { useState } from 'react';
import { 
  X, MapPin, Clock, Calendar, Ticket, Compass, Volume2, 
  Bookmark, PlusCircle, Check, ShieldCheck, ExternalLink, 
  Plane, Train, Car, Award, Sparkles, AlertCircle 
} from 'lucide-react';
import { DestinationDetail } from '../types/heritage.ts';
import { speakText } from '../utils/speechSynthesis.ts';

interface DestinationModalProps {
  destination: DestinationDetail | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onAddToItinerary: (destination: DestinationDetail) => void;
  isInItinerary?: boolean;
}

export const DestinationModal: React.FC<DestinationModalProps> = ({
  destination,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onAddToItinerary,
  isInItinerary = false,
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  if (!isOpen || !destination) return null;

  const handlePronounce = () => {
    setIsPlayingAudio(true);
    speakText(destination.nativeName || destination.name, 'hi');
    setTimeout(() => setIsPlayingAudio(false), 2000);
  };

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#destinations?id=${destination.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div 
        className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-stone-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Ribbon */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-amber-50 text-[#C85A32] text-xs font-semibold rounded-md border border-amber-200">
              {destination.category}
            </span>
            {destination.isUnesco && (
              <span className="px-2.5 py-1 bg-amber-100/70 text-amber-900 text-xs font-bold rounded-md flex items-center gap-1 border border-amber-300">
                <Award className="w-3.5 h-3.5" />
                UNESCO World Heritage
              </span>
            )}
            {destination.isHiddenGem && (
              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-md flex items-center gap-1 border border-emerald-200">
                <Sparkles className="w-3.5 h-3.5" />
                Hidden Gem
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePronounce}
              title="Listen to regional pronunciation"
              className={`p-2 rounded-lg border text-stone-700 transition-colors ${
                isPlayingAudio ? 'bg-amber-100 border-[#C85A32] text-[#C85A32]' : 'hover:bg-stone-100 border-stone-200'
              }`}
            >
              <Volume2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onAddToItinerary(destination)}
              title="Add destination to your travel itinerary"
              className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isInItinerary 
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-stone-900 text-white hover:bg-stone-800 border-stone-900'
              }`}
            >
              {isInItinerary ? <Check className="w-3.5 h-3.5" /> : <PlusCircle className="w-3.5 h-3.5" />}
              <span>{isInItinerary ? 'In Itinerary' : 'Add to Trip'}</span>
            </button>

            <button
              onClick={onToggleBookmark}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark destination'}
              className={`p-2 rounded-lg border transition-colors ${
                isBookmarked 
                  ? 'bg-[#C85A32] text-white border-[#C85A32]'
                  : 'hover:bg-stone-100 border-stone-200 text-stone-700'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-900 border border-stone-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8">
          {/* Title and Geo Context */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-baseline gap-3">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                {destination.name}
              </h2>
              {destination.nativeName && (
                <span className="text-lg sm:text-xl font-serif text-stone-500">
                  {destination.nativeName}
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-stone-600">
              <span className="flex items-center gap-1 font-medium text-stone-800">
                <MapPin className="w-4 h-4 text-[#C85A32]" />
                {destination.district}, {destination.state}
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1">
                <Compass className="w-4 h-4 text-stone-400" />
                {destination.coordinates.lat.toFixed(4)}° N, {destination.coordinates.lng.toFixed(4)}° E
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1 text-emerald-700 font-medium">
                <ShieldCheck className="w-4 h-4" />
                {destination.verificationStatus}
              </span>
            </div>
          </div>

          {/* Short Intro Callout */}
          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200/80 text-stone-800 text-sm leading-relaxed">
            {destination.shortIntro}
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500">
                <Calendar className="w-3.5 h-3.5 text-[#C85A32]" />
                <span className="font-medium">Best Season</span>
              </div>
              <p className="font-semibold text-stone-900">{destination.bestTimeToVisit}</p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500">
                <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
                <span className="font-medium">Suggested Time</span>
              </div>
              <p className="font-semibold text-stone-900">{destination.recommendedDuration}</p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500">
                <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
                <span className="font-medium">Visiting Hours</span>
              </div>
              <p className="font-semibold text-stone-900">{destination.openingHours || '09:00 AM – 05:30 PM'}</p>
            </div>

            <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200 space-y-1">
              <div className="flex items-center gap-1.5 text-stone-500">
                <Ticket className="w-3.5 h-3.5 text-[#C85A32]" />
                <span className="font-medium">Entry Ticket</span>
              </div>
              <p className="font-semibold text-stone-900 truncate" title={destination.entryFees}>
                {destination.entryFees || 'Standard ASI Rates'}
              </p>
            </div>
          </div>

          {/* Comprehensive Narrative */}
          <div className="space-y-6 text-sm text-stone-700 leading-relaxed border-t border-stone-200 pt-6">
            <div>
              <h3 className="text-base font-serif font-bold text-stone-900 mb-2">Historical Background & Dynasties</h3>
              <p>{destination.historicalBackground}</p>
            </div>

            <div>
              <h3 className="text-base font-serif font-bold text-stone-900 mb-2">Cultural & Religious Significance</h3>
              <p>{destination.culturalSignificance}</p>
            </div>

            <div>
              <h3 className="text-base font-serif font-bold text-stone-900 mb-2">Architectural Style & Craftsmanship</h3>
              <p>{destination.architecturalCharacteristics}</p>
            </div>

            {/* Key Attractions */}
            {destination.keyAttractions && destination.keyAttractions.length > 0 && (
              <div>
                <h3 className="text-base font-serif font-bold text-stone-900 mb-2">Key Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {destination.keyAttractions.map((attraction, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-stone-50 rounded-lg border border-stone-200 text-xs font-medium text-stone-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32]" />
                      <span>{attraction}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Sites */}
            {destination.nearbyPlaces && destination.nearbyPlaces.length > 0 && (
              <div>
                <h3 className="text-base font-serif font-bold text-stone-900 mb-2">Nearby Heritage Sights</h3>
                <div className="flex flex-wrap gap-2">
                  {destination.nearbyPlaces.map((place, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-stone-100 rounded-lg text-xs text-stone-700 border border-stone-200">
                      <strong>{place.name}</strong> ({place.distance})
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Transport & Access */}
            <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
              <h3 className="text-base font-serif font-bold text-stone-900">How to Reach & Transport Connectivity</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <Plane className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-stone-900">Nearest Airport</strong>
                    <span className="text-stone-600">{destination.transportGuidance.nearestAirport || 'Regional Airport'}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Train className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-stone-900">Nearest Railway</strong>
                    <span className="text-stone-600">{destination.transportGuidance.nearestRailway || 'Main Junction'}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Car className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="block text-stone-900">Road Connectivity</strong>
                    <span className="text-stone-600">{destination.transportGuidance.roadAccess || 'National Highway'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Visitor Rules & Conservation */}
            {destination.visitorRules && (
              <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-200/60 text-xs text-stone-700 space-y-1.5">
                <div className="flex items-center gap-1.5 font-semibold text-amber-900">
                  <AlertCircle className="w-4 h-4 text-[#C85A32]" />
                  <span>Visitor Guidelines & Cultural Etiquette</span>
                </div>
                <ul className="list-disc pl-5 space-y-1 text-stone-600">
                  {destination.visitorRules.map((rule, idx) => (
                    <li key={idx}>{rule}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Verification Sources */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  Source: {destination.sources?.[0]?.authority || 'Archaeological Survey of India (ASI)'}
                </span>
              </div>
              <button
                onClick={handleCopyLink}
                className="text-[#C85A32] hover:underline flex items-center gap-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Link Copied!' : 'Share Direct Link'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
