import React, { createContext, useContext, useState, useEffect } from 'react';
import { STATE_LANDMARK_BACKDROPS, StateLandmarkConfig } from '../data/stateLandmarkBackdrops.ts';
import { LandmarkSilhouette } from './LandmarkSilhouettes.tsx';

export type CulturalTheme = 'jaipur-sandstone' | 'royal-peacock' | 'varanasi-saffron' | 'ajrakh-indigo';

export interface ThemeConfig {
  id: CulturalTheme;
  name: string;
  hindiName: string;
  subtitle: string;
  primaryColor: string;
  glow1: string;
  glow2: string;
  glow3: string;
  patternStroke: string;
  patternFill: string;
  friezeColor: string;
  accentBadge: string;
}

export const CULTURAL_THEMES: Record<CulturalTheme, ThemeConfig> = {
  'jaipur-sandstone': {
    id: 'jaipur-sandstone',
    name: 'Jaipur Sandstone & Jali',
    hindiName: 'जयपुर बलुआ पत्थर एवं जाली',
    subtitle: 'Warm golden sandstone & intricate Rajput lattice work',
    primaryColor: '#C85A32',
    glow1: 'rgba(235, 140, 75, 0.12)',
    glow2: 'rgba(217, 119, 6, 0.08)',
    glow3: 'rgba(165, 67, 30, 0.06)',
    patternStroke: 'rgba(180, 83, 9, 0.11)',
    patternFill: 'rgba(251, 191, 36, 0.03)',
    friezeColor: '#C85A32',
    accentBadge: 'bg-amber-100/90 text-amber-900 border-amber-300',
  },
  'royal-peacock': {
    id: 'royal-peacock',
    name: 'Royal Peacock & Mayura',
    hindiName: 'राजसी मयूर एवं नीलकमल',
    subtitle: 'Sacred river waters, peacock blues & temple emeralds',
    primaryColor: '#0D5C63',
    glow1: 'rgba(13, 92, 99, 0.13)',
    glow2: 'rgba(30, 58, 95, 0.10)',
    glow3: 'rgba(217, 119, 6, 0.06)',
    patternStroke: 'rgba(13, 92, 99, 0.11)',
    patternFill: 'rgba(20, 184, 166, 0.03)',
    friezeColor: '#0D5C63',
    accentBadge: 'bg-teal-100/90 text-teal-900 border-teal-300',
  },
  'varanasi-saffron': {
    id: 'varanasi-saffron',
    name: 'Varanasi Ghat Dawn & Saffron',
    hindiName: 'काशी प्रभात एवं पावन केसर',
    subtitle: 'Sacred Ganga morning light & temple diya illumination',
    primaryColor: '#D97706',
    glow1: 'rgba(245, 158, 11, 0.14)',
    glow2: 'rgba(220, 38, 38, 0.07)',
    glow3: 'rgba(251, 191, 36, 0.10)',
    patternStroke: 'rgba(217, 119, 6, 0.12)',
    patternFill: 'rgba(245, 158, 11, 0.04)',
    friezeColor: '#D97706',
    accentBadge: 'bg-orange-100/90 text-orange-900 border-orange-300',
  },
  'ajrakh-indigo': {
    id: 'ajrakh-indigo',
    name: 'Ajrakh Tapestry & Terracotta',
    hindiName: 'अजरक वस्त्र एवं मृत्तिका',
    subtitle: 'Ancient Indus geometric block-prints & natural indigo',
    primaryColor: '#1E3A5F',
    glow1: 'rgba(30, 58, 95, 0.12)',
    glow2: 'rgba(180, 83, 9, 0.09)',
    glow3: 'rgba(153, 27, 27, 0.06)',
    patternStroke: 'rgba(30, 58, 95, 0.12)',
    patternFill: 'rgba(194, 65, 12, 0.03)',
    friezeColor: '#1E3A5F',
    accentBadge: 'bg-indigo-100/90 text-indigo-900 border-indigo-300',
  },
};

interface CulturalBackgroundContextType {
  currentTheme: CulturalTheme;
  setTheme: (theme: CulturalTheme) => void;
  patternIntensity: 'subtle' | 'vibrant' | 'minimal';
  setPatternIntensity: (intensity: 'subtle' | 'vibrant' | 'minimal') => void;
  activeStateSlug: string | null;
  setActiveStateSlug: (slug: string | null) => void;
  activeLandmark: StateLandmarkConfig | null;
}

const CulturalBackgroundContext = createContext<CulturalBackgroundContextType>({
  currentTheme: 'jaipur-sandstone',
  setTheme: () => {},
  patternIntensity: 'subtle',
  setPatternIntensity: () => {},
  activeStateSlug: null,
  setActiveStateSlug: () => {},
  activeLandmark: null,
});

export const useCulturalBackground = () => useContext(CulturalBackgroundContext);

export const CulturalBackgroundProvider: React.FC<{
  children: React.ReactNode;
  activeStateSlugProp?: string | null;
}> = ({ children, activeStateSlugProp = null }) => {
  const [currentTheme, setCurrentTheme] = useState<CulturalTheme>('jaipur-sandstone');
  const [patternIntensity, setPatternIntensity] = useState<'subtle' | 'vibrant' | 'minimal'>('subtle');
  const [activeStateSlug, setActiveStateSlugState] = useState<string | null>(activeStateSlugProp);

  // Sync state when parent passes new state (e.g. router opens state detail)
  useEffect(() => {
    if (activeStateSlugProp !== undefined) {
      setActiveStateSlugState(activeStateSlugProp);
    }
  }, [activeStateSlugProp]);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('heritage_hub_cultural_theme') as CulturalTheme;
      if (savedTheme && CULTURAL_THEMES[savedTheme]) {
        setCurrentTheme(savedTheme);
      }
      const savedIntensity = localStorage.getItem('heritage_hub_pattern_intensity') as 'subtle' | 'vibrant' | 'minimal';
      if (savedIntensity) {
        setPatternIntensity(savedIntensity);
      }
      const savedState = localStorage.getItem('heritage_hub_active_state_backdrop');
      if (savedState && STATE_LANDMARK_BACKDROPS[savedState] && !activeStateSlugProp) {
        setActiveStateSlugState(savedState);
      }
    } catch (e) {
      // Storage unavailable
    }
  }, [activeStateSlugProp]);

  const handleSetTheme = (theme: CulturalTheme) => {
    setCurrentTheme(theme);
    try {
      localStorage.setItem('heritage_hub_cultural_theme', theme);
    } catch (e) {}
  };

  const handleSetIntensity = (intensity: 'subtle' | 'vibrant' | 'minimal') => {
    setPatternIntensity(intensity);
    try {
      localStorage.setItem('heritage_hub_pattern_intensity', intensity);
    } catch (e) {}
  };

  const handleSetActiveStateSlug = (slug: string | null) => {
    setActiveStateSlugState(slug);
    try {
      if (slug) {
        localStorage.setItem('heritage_hub_active_state_backdrop', slug);
      } else {
        localStorage.removeItem('heritage_hub_active_state_backdrop');
      }
    } catch (e) {}
  };

  const activeLandmark = activeStateSlug ? STATE_LANDMARK_BACKDROPS[activeStateSlug] || null : null;

  return (
    <CulturalBackgroundContext.Provider
      value={{
        currentTheme,
        setTheme: handleSetTheme,
        patternIntensity,
        setPatternIntensity: handleSetIntensity,
        activeStateSlug,
        setActiveStateSlug: handleSetActiveStateSlug,
        activeLandmark,
      }}
    >
      <div className="relative min-h-screen">
        <CulturalBackdrop
          theme={currentTheme}
          intensity={patternIntensity}
          activeLandmark={activeLandmark}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </CulturalBackgroundContext.Provider>
  );
};

export const CulturalBackdrop: React.FC<{
  theme: CulturalTheme;
  intensity: 'subtle' | 'vibrant' | 'minimal';
  activeLandmark: StateLandmarkConfig | null;
}> = ({ theme, intensity, activeLandmark }) => {
  const baseCfg = CULTURAL_THEMES[theme] || CULTURAL_THEMES['jaipur-sandstone'];

  // If a state's famous landmark is active, adapt the background palette to that landmark's iconic ambiance!
  const effectivePrimaryColor = activeLandmark ? activeLandmark.primaryColor : baseCfg.primaryColor;
  const effectiveGlow1 = activeLandmark ? activeLandmark.glow1 : baseCfg.glow1;
  const effectiveGlow2 = activeLandmark ? activeLandmark.glow2 : baseCfg.glow2;
  const effectiveGlow3 = activeLandmark ? activeLandmark.glow3 : baseCfg.glow3;
  const effectiveStroke = activeLandmark ? activeLandmark.patternStroke : baseCfg.patternStroke;
  const effectiveFill = activeLandmark ? activeLandmark.patternFill : baseCfg.patternFill;
  const effectiveFrieze = activeLandmark ? activeLandmark.primaryColor : baseCfg.friezeColor;

  // Opacity multiplier based on selected intensity
  const opacityClass =
    intensity === 'minimal'
      ? 'opacity-35'
      : intensity === 'vibrant'
      ? 'opacity-100'
      : 'opacity-70';

  const silhouetteOpacity =
    intensity === 'minimal'
      ? 'opacity-10'
      : intensity === 'vibrant'
      ? 'opacity-30'
      : 'opacity-20';

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0 transition-colors duration-700"
    >
      {/* 1. Base Warm Parchment & Silk Canvas Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF7F2] via-[#F6F0E6] to-[#FBF8F3]" />

      {/* 2. Atmospheric Cultural Light Blooms (Glow Orbs) customized to landmark */}
      <div
        className="absolute -top-32 -left-32 w-140 h-140 rounded-full blur-3xl transition-all duration-1000 ease-in-out"
        style={{ background: effectiveGlow1 }}
      />
      <div
        className="absolute top-1/4 -right-40 w-160 h-160 rounded-full blur-3xl transition-all duration-1000 ease-in-out"
        style={{ background: effectiveGlow2 }}
      />
      <div
        className="absolute bottom-10 left-1/3 w-120 h-120 rounded-full blur-3xl transition-all duration-1000 ease-in-out"
        style={{ background: effectiveGlow3 }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-128 h-128 rounded-full blur-3xl transition-all duration-1000 ease-in-out"
        style={{ background: effectiveGlow1 }}
      />

      {/* 3. FAMOUS STATE LANDMARK ARCHITECTURAL SILHOUETTE (Featured State Wonder) */}
      {activeLandmark && (
        <div
          className={`absolute top-16 right-0 sm:right-6 lg:right-12 w-[340px] sm:w-[520px] lg:w-[680px] h-[220px] sm:h-[340px] lg:h-[420px] pointer-events-none ${silhouetteOpacity} transition-all duration-700 ease-out`}
          style={{
            filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.06))',
          }}
        >
          <LandmarkSilhouette
            type={activeLandmark.silhouetteType}
            color={effectivePrimaryColor}
          />
        </div>
      )}

      {/* 4. Authentic Indian Decorative Patterns Canvas */}
      <div className={`absolute inset-0 ${opacityClass} transition-opacity duration-500`}>
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            {/* Pattern A: Intricate Mughal & Rajput Jali (Lattice Screen) */}
            <pattern
              id="cultural-jali-pattern"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              {/* Outer octagonal interlock lines */}
              <path
                d="M 20 0 L 40 20 L 60 0 M 0 20 L 20 40 L 0 60 M 80 20 L 60 40 L 80 60 M 20 80 L 40 60 L 60 80"
                fill="none"
                stroke={effectiveStroke}
                strokeWidth="0.85"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Central 8-pointed star rosette */}
              <polygon
                points="40,24 44,36 56,40 44,44 40,56 36,44 24,40 36,36"
                fill={effectiveFill}
                stroke={effectiveStroke}
                strokeWidth="0.75"
              />
              {/* Four petal floral accents around corners */}
              <circle cx="0" cy="0" r="3" fill={effectiveFill} stroke={effectiveStroke} strokeWidth="0.6" />
              <circle cx="80" cy="0" r="3" fill={effectiveFill} stroke={effectiveStroke} strokeWidth="0.6" />
              <circle cx="0" cy="80" r="3" fill={effectiveFill} stroke={effectiveStroke} strokeWidth="0.6" />
              <circle cx="80" cy="80" r="3" fill={effectiveFill} stroke={effectiveStroke} strokeWidth="0.6" />
              {/* Delicate cusped arch connection */}
              <path
                d="M 24 40 C 24 30, 40 30, 40 40 C 40 30, 56 30, 56 40 C 56 50, 40 50, 40 40 C 40 50, 24 50, 24 40 Z"
                fill="none"
                stroke={effectiveStroke}
                strokeWidth="0.4"
                strokeDasharray="1.5 2"
              />
            </pattern>

            {/* Pattern B: Traditional Toran / Temple Arch Frieze Border */}
            <pattern
              id="cultural-frieze-pattern"
              width="48"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              {/* Scalloped Cusped Arch (Mehrab / Chhatri) */}
              <path
                d="M 0 0 L 48 0 M 0 0 C 12 14, 36 14, 48 0 M 24 7 L 24 16 M 21 16 L 27 16"
                fill="none"
                stroke={effectiveFrieze}
                strokeWidth="0.8"
                opacity="0.3"
              />
              <circle cx="24" cy="5" r="1.5" fill={effectiveFrieze} opacity="0.35" />
            </pattern>
          </defs>

          {/* Full Screen Repeating Jali Grid */}
          <rect width="100%" height="100%" fill="url(#cultural-jali-pattern)" />

          {/* Decorative Toran / Frieze line at top and bottom */}
          <rect x="0" y="0" width="100%" height="20" fill="url(#cultural-frieze-pattern)" />
        </svg>
      </div>

      {/* 5. Authentic Ornamental Corner Mandalas */}
      <div className="absolute -top-28 -right-28 w-96 h-96 opacity-12 pointer-events-none transform rotate-12">
        <MandalaSVG color={effectivePrimaryColor} />
      </div>
      <div className="absolute top-1/2 -left-48 w-112 h-112 opacity-8 pointer-events-none transform -rotate-45">
        <MandalaSVG color={effectivePrimaryColor} />
      </div>
      <div className="absolute -bottom-36 right-1/4 w-96 h-96 opacity-10 pointer-events-none transform rotate-45">
        <MandalaSVG color={effectivePrimaryColor} />
      </div>

      {/* 6. Subtle Heritage Grain / Paper Weave Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(${effectivePrimaryColor} 1px, transparent 1px)`,
          backgroundSize: '16px 16px',
        }}
      />
    </div>
  );
};

/**
 * High-definition authentic 16-fold Indian Mandala vector emblem
 */
export const MandalaSVG: React.FC<{ color: string; className?: string }> = ({ color, className = 'w-full h-full' }) => {
  return (
    <svg viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Center Bindu */}
      <circle cx="100" cy="100" r="4" fill={color} />
      <circle cx="100" cy="100" r="10" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="100" cy="100" r="20" stroke={color} strokeWidth="1.2" />

      {/* Inner 8 Lotus Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <path
          key={`inner-petal-${i}`}
          d="M 100 80 Q 94 92 100 100 Q 106 92 100 80 Z"
          transform={`rotate(${angle} 100 100)`}
          fill={color}
          fillOpacity="0.18"
          stroke={color}
          strokeWidth="0.8"
        />
      ))}

      {/* Middle Ring & Geometric Rays */}
      <circle cx="100" cy="100" r="38" stroke={color} strokeWidth="0.9" />
      <circle cx="100" cy="100" r="42" stroke={color} strokeWidth="0.6" strokeDasharray="1 3" />

      {/* 16 Radiating Lotus Petals */}
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, i) => (
        <g key={`petal-16-${i}`} transform={`rotate(${angle} 100 100)`}>
          <path
            d="M 100 58 C 92 72, 95 86, 100 90 C 105 86, 108 72, 100 58 Z"
            fill={color}
            fillOpacity="0.08"
            stroke={color}
            strokeWidth="0.75"
          />
          <circle cx="100" cy="54" r="1.5" fill={color} />
        </g>
      ))}

      {/* Outer Ring & Kalash Arch Fluting */}
      <circle cx="100" cy="100" r="66" stroke={color} strokeWidth="1" />
      <circle cx="100" cy="100" r="74" stroke={color} strokeWidth="1.2" strokeDasharray="3 2" />
      <circle cx="100" cy="100" r="86" stroke={color} strokeWidth="0.75" />

      {/* Outer 16 Scalloped Sunburst Flames */}
      {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, i) => (
        <path
          key={`sunburst-${i}`}
          d="M 94 14 Q 100 6 106 14 Q 100 24 94 14 Z"
          transform={`rotate(${angle} 100 100)`}
          fill={color}
          fillOpacity="0.22"
          stroke={color}
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
};
