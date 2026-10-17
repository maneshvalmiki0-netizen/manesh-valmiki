import React from 'react';
import { StateLandmarkConfig } from '../data/stateLandmarkBackdrops.ts';

export const LandmarkSilhouette: React.FC<{
  type: StateLandmarkConfig['silhouetteType'];
  color: string;
  className?: string;
}> = ({ type, color, className = 'w-full h-full' }) => {
  switch (type) {
    case 'taj-mahal':
      return (
        <svg viewBox="0 0 500 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Base Plinth */}
          <rect x="50" y="220" width="400" height="12" fill={color} fillOpacity="0.35" rx="2" />
          <rect x="70" y="210" width="360" height="10" fill={color} fillOpacity="0.4" rx="2" />

          {/* Left Minaret */}
          <rect x="68" y="70" width="12" height="140" fill={color} fillOpacity="0.5" />
          <polygon points="68,70 74,52 80,70" fill={color} fillOpacity="0.6" />
          <circle cx="74" cy="48" r="2.5" fill={color} />
          {/* Left Minaret Balconies */}
          <rect x="65" y="115" width="18" height="4" fill={color} fillOpacity="0.6" rx="1" />
          <rect x="65" y="160" width="18" height="4" fill={color} fillOpacity="0.6" rx="1" />

          {/* Right Minaret */}
          <rect x="420" y="70" width="12" height="140" fill={color} fillOpacity="0.5" />
          <polygon points="420,70 426,52 432,70" fill={color} fillOpacity="0.6" />
          <circle cx="426" cy="48" r="2.5" fill={color} />
          {/* Right Minaret Balconies */}
          <rect x="417" y="115" width="18" height="4" fill={color} fillOpacity="0.6" rx="1" />
          <rect x="417" y="160" width="18" height="4" fill={color} fillOpacity="0.6" rx="1" />

          {/* Main Central Block */}
          <path
            d="M 160 210 L 160 120 L 340 120 L 340 210 Z"
            fill={color}
            fillOpacity="0.4"
          />
          {/* Central Grand Iwan Arch */}
          <path
            d="M 215 210 L 215 155 Q 250 135 285 155 L 285 210 Z"
            fill={color}
            fillOpacity="0.25"
            stroke={color}
            strokeWidth="1.2"
          />
          {/* Side Arches */}
          <path d="M 175 160 L 175 135 Q 190 125 205 135 L 205 160 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="0.8" />
          <path d="M 175 205 L 175 175 Q 190 165 205 175 L 205 205 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="0.8" />
          <path d="M 295 160 L 295 135 Q 310 125 325 135 L 325 160 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="0.8" />
          <path d="M 295 205 L 295 175 Q 310 165 325 175 L 325 205 Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="0.8" />

          {/* Central Onion Dome Drum */}
          <rect x="220" y="100" width="60" height="20" fill={color} fillOpacity="0.5" />
          {/* Bulbous Onion Dome */}
          <path
            d="M 220 100 C 210 75, 230 45, 250 30 C 270 45, 290 75, 280 100 Z"
            fill={color}
            fillOpacity="0.55"
            stroke={color}
            strokeWidth="1.2"
          />
          {/* Finial / Kalash spire */}
          <line x1="250" y1="30" x2="250" y2="10" stroke={color} strokeWidth="1.5" />
          <circle cx="250" cy="12" r="3" fill={color} />
          <path d="M 248 10 Q 250 6 252 10" stroke={color} strokeWidth="1.5" fill="none" />

          {/* Left Chhatri Cupola */}
          <path d="M 185 120 L 185 105 Q 197 90 210 105 L 210 120 Z" fill={color} fillOpacity="0.45" />
          <line x1="197" y1="90" x2="197" y2="82" stroke={color} strokeWidth="1" />
          <circle cx="197" cy="82" r="1.5" fill={color} />

          {/* Right Chhatri Cupola */}
          <path d="M 290 120 L 290 105 Q 302 90 315 105 L 315 120 Z" fill={color} fillOpacity="0.45" />
          <line x1="302" y1="90" x2="302" y2="82" stroke={color} strokeWidth="1" />
          <circle cx="302" cy="82" r="1.5" fill={color} />
        </svg>
      );

    case 'hawa-mahal':
      return (
        <svg viewBox="0 0 460 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Base */}
          <rect x="40" y="240" width="380" height="12" fill={color} fillOpacity="0.4" rx="2" />
          {/* Pyramid Tiers of Jharokhas */}
          {/* Tier 1 (Base, 7 bays) */}
          <path d="M 60 240 L 80 190 L 380 190 L 400 240 Z" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="0.8" />
          {/* Tier 2 (5 bays) */}
          <path d="M 100 190 L 120 140 L 340 140 L 360 190 Z" fill={color} fillOpacity="0.38" stroke={color} strokeWidth="0.8" />
          {/* Tier 3 (3 bays) */}
          <path d="M 140 140 L 165 95 L 295 95 L 320 140 Z" fill={color} fillOpacity="0.45" stroke={color} strokeWidth="0.8" />
          {/* Tier 4 (Top Pavilion) */}
          <path d="M 185 95 L 205 55 L 255 55 L 275 95 Z" fill={color} fillOpacity="0.52" stroke={color} strokeWidth="0.8" />
          {/* Crown Chhatri Arch */}
          <path d="M 215 55 Q 230 35 245 55 Z" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1.2" />
          <line x1="230" y1="35" x2="230" y2="20" stroke={color} strokeWidth="1.5" />
          <circle cx="230" cy="20" r="2.5" fill={color} />

          {/* Jharokha Honeycomb Casement Arches */}
          {[120, 160, 200, 240, 280, 320].map((x, i) => (
            <g key={`bay-t1-${i}`}>
              <path d={`M ${x - 12} 230 L ${x - 12} 210 Q ${x} 200 ${x + 12} 210 L ${x + 12} 230 Z`} fill={color} fillOpacity="0.5" />
              <line x1={x} y1="205" x2={x} y2="230" stroke="#FFF" strokeWidth="0.5" strokeOpacity="0.4" />
            </g>
          ))}

          {[150, 190, 230, 270, 310].map((x, i) => (
            <g key={`bay-t2-${i}`}>
              <path d={`M ${x - 11} 180 L ${x - 11} 160 Q ${x} 150 ${x + 11} 160 L ${x + 11} 180 Z`} fill={color} fillOpacity="0.55" />
              <circle cx={x} cy="154" r="1.5" fill={color} />
            </g>
          ))}

          {[195, 230, 265].map((x, i) => (
            <g key={`bay-t3-${i}`}>
              <path d={`M ${x - 10} 132 L ${x - 10} 112 Q ${x} 104 ${x + 10} 112 L ${x + 10} 132 Z`} fill={color} fillOpacity="0.6" />
              <circle cx={x} cy="107" r="1.5" fill={color} />
            </g>
          ))}
        </svg>
      );

    case 'golden-temple':
      return (
        <svg viewBox="0 0 480 250" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Amrit Sarovar Water Mirror */}
          <rect x="20" y="200" width="440" height="40" fill={color} fillOpacity="0.15" />
          <line x1="20" y1="200" x2="460" y2="200" stroke={color} strokeWidth="1.5" strokeOpacity="0.5" />
          {/* Gentle water ripples */}
          <path d="M 60 215 Q 120 210 180 215 Q 240 220 300 215 Q 360 210 420 215" stroke={color} strokeWidth="0.8" strokeOpacity="0.3" fill="none" />
          <path d="M 90 228 Q 150 224 210 228 Q 270 232 330 228 Q 390 224 450 228" stroke={color} strokeWidth="0.6" strokeOpacity="0.25" fill="none" />

          {/* Central Cause-way / Platform */}
          <rect x="140" y="185" width="200" height="15" fill={color} fillOpacity="0.4" rx="2" />

          {/* Lower Marble Floor */}
          <rect x="160" y="140" width="160" height="45" fill={color} fillOpacity="0.45" />
          {/* 4 Open Entrances (symbolic) */}
          <path d="M 215 185 L 215 155 Q 240 145 265 155 L 265 185 Z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1" />
          <path d="M 175 185 L 175 162 Q 190 155 205 162 L 205 185 Z" fill={color} fillOpacity="0.2" />
          <path d="M 275 185 L 275 162 Q 290 155 305 162 L 305 185 Z" fill={color} fillOpacity="0.2" />

          {/* Upper Gilded Floor */}
          <rect x="175" y="105" width="130" height="35" fill={color} fillOpacity="0.6" />
          {/* Parapet & Chhatris */}
          <rect x="170" y="100" width="140" height="5" fill={color} fillOpacity="0.7" />
          {/* Corner Chhatris */}
          <path d="M 172 100 L 172 90 Q 180 82 188 90 L 188 100 Z" fill={color} fillOpacity="0.65" />
          <path d="M 292 100 L 292 90 Q 300 82 308 90 L 308 100 Z" fill={color} fillOpacity="0.65" />

          {/* Central Fluted Gold Dome */}
          <path
            d="M 205 100 C 205 65, 220 45, 240 35 C 260 45, 275 65, 275 100 Z"
            fill={color}
            fillOpacity="0.75"
            stroke={color}
            strokeWidth="1.2"
          />
          {/* Kalash & Inverted Lotus */}
          <circle cx="240" cy="35" r="4" fill={color} />
          <line x1="240" y1="35" x2="240" y2="18" stroke={color} strokeWidth="1.5" />
          <circle cx="240" cy="18" r="2.5" fill={color} />

          {/* Darsani Deori Gateway silhouette on left */}
          <path d="M 70 200 L 70 160 L 115 160 L 115 200 Z" fill={color} fillOpacity="0.3" />
          <path d="M 85 200 L 85 175 Q 92.5 170 100 175 L 100 200 Z" fill={color} fillOpacity="0.15" />
          <path d="M 70 160 Q 92.5 145 115 160 Z" fill={color} fillOpacity="0.35" />
        </svg>
      );

    case 'dravidian-gopuram':
      return (
        <svg viewBox="0 0 420 270" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Base Dravidian Mandapam */}
          <rect x="110" y="240" width="200" height="15" fill={color} fillOpacity="0.4" rx="1" />
          <rect x="125" y="220" width="170" height="20" fill={color} fillOpacity="0.45" />

          {/* Gateway Archway (Dwara) */}
          <path d="M 185 240 L 185 185 Q 210 170 235 185 L 235 240 Z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.2" />

          {/* Stepped Pyramidal Tiers (Talams) */}
          {[
            { y: 195, h: 25, w: 160, inset: 130 },
            { y: 170, h: 25, w: 145, inset: 137.5 },
            { y: 145, h: 25, w: 130, inset: 145 },
            { y: 120, h: 25, w: 115, inset: 152.5 },
            { y: 95, h: 25, w: 100, inset: 160 },
            { y: 72, h: 23, w: 85, inset: 167.5 },
          ].map((tier, i) => (
            <g key={`talam-${i}`}>
              <rect x={tier.inset} y={tier.y} width={tier.w} height={tier.h} fill={color} fillOpacity={0.4 + i * 0.05} stroke={color} strokeWidth="0.75" />
              {/* Miniature niche / Kudu windows */}
              <circle cx={210} cy={tier.y + 12} r={3} fill={color} fillOpacity="0.6" />
              <rect x={tier.inset - 3} y={tier.y + tier.h - 4} width={tier.w + 6} height="4" fill={color} fillOpacity="0.6" />
            </g>
          ))}

          {/* Barrel Vault Roof (Sala Shikhara) */}
          <path
            d="M 172 72 Q 210 40 248 72 Z"
            fill={color}
            fillOpacity="0.7"
            stroke={color}
            strokeWidth="1.2"
          />
          {/* 7 Golden Kalash Finials */}
          {[180, 190, 200, 210, 220, 230, 240].map((x, i) => (
            <g key={`kalash-${i}`}>
              <line x1={x} y1="52" x2={x} y2="40" stroke={color} strokeWidth="1.2" />
              <circle cx={x} cy="38" r="2" fill={color} />
            </g>
          ))}
        </svg>
      );

    case 'hampi-chariot':
      return (
        <svg viewBox="0 0 440 250" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Ground Platform */}
          <rect x="40" y="230" width="360" height="15" fill={color} fillOpacity="0.35" rx="2" />

          {/* Left Stone Wheel */}
          <g transform="translate(130, 200)">
            <circle cx="0" cy="0" r="32" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.2" />
            <circle cx="0" cy="0" r="10" fill={color} fillOpacity="0.6" />
            <circle cx="0" cy="0" r="4" fill="#FFF" fillOpacity="0.7" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line key={`spoke-l-${i}`} x1="0" y1="0" x2="28" y2="0" stroke={color} strokeWidth="1.5" transform={`rotate(${angle})`} />
            ))}
          </g>

          {/* Right Stone Wheel */}
          <g transform="translate(310, 200)">
            <circle cx="0" cy="0" r="32" stroke={color} strokeWidth="3" fill={color} fillOpacity="0.2" />
            <circle cx="0" cy="0" r="10" fill={color} fillOpacity="0.6" />
            <circle cx="0" cy="0" r="4" fill="#FFF" fillOpacity="0.7" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line key={`spoke-r-${i}`} x1="0" y1="0" x2="28" y2="0" stroke={color} strokeWidth="1.5" transform={`rotate(${angle})`} />
            ))}
          </g>

          {/* Stone Elephant Statues in front (silhouette) */}
          <path d="M 60 230 C 60 190, 80 180, 100 190 L 100 230 Z" fill={color} fillOpacity="0.4" />
          <path d="M 70 195 Q 60 210 65 225" stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Chariot Body / Mandapam */}
          <rect x="135" y="145" width="170" height="45" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="1" />
          {/* Carved corner pillars */}
          <rect x="145" y="115" width="10" height="30" fill={color} fillOpacity="0.6" />
          <rect x="285" y="115" width="10" height="30" fill={color} fillOpacity="0.6" />
          <rect x="215" y="115" width="10" height="30" fill={color} fillOpacity="0.5" />

          {/* Shikhara / Vimana Superstructure */}
          <path d="M 155 115 L 175 75 L 265 75 L 285 115 Z" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1" />
          <path d="M 185 75 L 205 45 L 235 45 L 255 75 Z" fill={color} fillOpacity="0.65" stroke={color} strokeWidth="1" />
          <circle cx="220" cy="38" r="7" fill={color} fillOpacity="0.75" />
          <line x1="220" y1="38" x2="220" y2="24" stroke={color} strokeWidth="1.5" />
          <circle cx="220" cy="24" r="2" fill={color} />
        </svg>
      );

    case 'kerala-backwater':
      return (
        <svg viewBox="0 0 460 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Water Surface */}
          <rect x="10" y="180" width="440" height="60" fill={color} fillOpacity="0.15" />
          <line x1="10" y1="180" x2="450" y2="180" stroke={color} strokeWidth="1.2" strokeOpacity="0.4" />

          {/* Coconut Palm Silhouettes */}
          <path d="M 40 180 Q 55 120 70 60" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
          {[0, 30, 60, -30, -60, -80, 80].map((angle, i) => (
            <path
              key={`frond-l-${i}`}
              d="M 70 60 Q 95 65 115 80"
              stroke={color}
              strokeWidth="2"
              fill="none"
              transform={`rotate(${angle} 70 60)`}
              opacity="0.6"
            />
          ))}

          {/* Traditional Kettuvallam Houseboat */}
          {/* Hull */}
          <path
            d="M 130 180 C 150 195, 330 195, 370 170 C 350 175, 170 175, 130 180 Z"
            fill={color}
            fillOpacity="0.7"
          />
          {/* Curved High Prow */}
          <path d="M 130 180 Q 115 165 120 155 Q 128 160 135 178" fill={color} fillOpacity="0.8" />
          {/* Thatched Coir Bamboo Roof Canopy */}
          <path
            d="M 160 175 Q 250 120 340 170 L 335 175 Q 250 130 165 175 Z"
            fill={color}
            fillOpacity="0.55"
            stroke={color}
            strokeWidth="1"
          />
          {/* Windows / Living Chamber */}
          <rect x="195" y="152" width="22" height="14" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="0.8" rx="1" />
          <rect x="235" y="150" width="22" height="14" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="0.8" rx="1" />
          <rect x="275" y="152" width="22" height="14" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="0.8" rx="1" />
          {/* Boatman with oar pole */}
          <circle cx="355" cy="155" r="3" fill={color} fillOpacity="0.6" />
          <line x1="355" y1="158" x2="355" y2="175" stroke={color} strokeWidth="1.5" />
          <line x1="352" y1="162" x2="368" y2="195" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      );

    case 'gateway-arch':
      return (
        <svg viewBox="0 0 440 250" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Plinth */}
          <rect x="80" y="225" width="280" height="15" fill={color} fillOpacity="0.4" rx="2" />
          <rect x="95" y="210" width="250" height="15" fill={color} fillOpacity="0.45" />

          {/* Central Monument Body */}
          <rect x="110" y="90" width="220" height="120" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />

          {/* Massive Central Triumphal Archway */}
          <path
            d="M 175 210 L 175 140 Q 220 100 265 140 L 265 210 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="1.5"
          />
          {/* Intricate Jali latticework in arch tympanum */}
          <circle cx="220" cy="132" r="14" stroke={color} strokeWidth="0.8" strokeDasharray="2 2" fill="none" />

          {/* Side Arcades */}
          <path d="M 125 210 L 125 155 Q 145 140 165 155 L 165 210 Z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="0.8" />
          <path d="M 275 210 L 275 155 Q 295 140 315 155 L 315 210 Z" fill={color} fillOpacity="0.25" stroke={color} strokeWidth="0.8" />

          {/* Parapet & 4 Corner Turrets */}
          <rect x="100" y="80" width="240" height="10" fill={color} fillOpacity="0.6" rx="1" />
          {/* 4 Corner Octagonal Domes */}
          <path d="M 105 80 L 105 60 Q 115 50 125 60 L 125 80 Z" fill={color} fillOpacity="0.6" />
          <path d="M 315 80 L 315 60 Q 325 50 335 60 L 335 80 Z" fill={color} fillOpacity="0.6" />
          <path d="M 160 80 L 160 65 Q 168 55 175 65 L 175 80 Z" fill={color} fillOpacity="0.5" />
          <path d="M 265 80 L 265 65 Q 272 55 280 65 L 280 80 Z" fill={color} fillOpacity="0.5" />

          {/* Central Dome Spire */}
          <path d="M 195 80 Q 220 50 245 80 Z" fill={color} fillOpacity="0.65" />
          <line x1="220" y1="55" x2="220" y2="35" stroke={color} strokeWidth="1.5" />
          <circle cx="220" cy="35" r="3" fill={color} />
        </svg>
      );

    case 'charminar':
      return (
        <svg viewBox="0 0 440 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Base */}
          <rect x="110" y="235" width="220" height="15" fill={color} fillOpacity="0.4" rx="2" />

          {/* Central Square Arcade Block */}
          <rect x="135" y="105" width="170" height="130" fill={color} fillOpacity="0.38" stroke={color} strokeWidth="1" />

          {/* Grand Triumphal Pointed Arch */}
          <path
            d="M 165 235 L 165 155 Q 220 115 275 155 L 275 235 Z"
            fill={color}
            fillOpacity="0.2"
            stroke={color}
            strokeWidth="1.5"
          />

          {/* Upper Gallery / Double Balcony */}
          <rect x="130" y="90" width="180" height="15" fill={color} fillOpacity="0.55" />
          <rect x="140" y="75" width="160" height="15" fill={color} fillOpacity="0.5" />
          {/* Arabesque crenellations */}
          {[145, 165, 185, 205, 225, 245, 265, 285].map((x, i) => (
            <circle key={`crenel-${i}`} cx={x} cy="72" r="2.5" fill={color} />
          ))}

          {/* Four Iconic Minarets (48m soaring towers) */}
          {/* Left Tower */}
          <rect x="118" y="35" width="18" height="200" fill={color} fillOpacity="0.6" />
          {/* Double Balconies on Left Tower */}
          <rect x="113" y="125" width="28" height="5" fill={color} fillOpacity="0.7" rx="1" />
          <rect x="113" y="70" width="28" height="5" fill={color} fillOpacity="0.7" rx="1" />
          {/* Left Minaret Bulbous Dome & Finial */}
          <path d="M 118 35 Q 127 15 136 35 Z" fill={color} fillOpacity="0.75" />
          <line x1="127" y1="20" x2="127" y2="8" stroke={color} strokeWidth="1.5" />
          <circle cx="127" cy="8" r="2" fill={color} />

          {/* Right Tower */}
          <rect x="304" y="35" width="18" height="200" fill={color} fillOpacity="0.6" />
          {/* Double Balconies on Right Tower */}
          <rect x="299" y="125" width="28" height="5" fill={color} fillOpacity="0.7" rx="1" />
          <rect x="299" y="70" width="28" height="5" fill={color} fillOpacity="0.7" rx="1" />
          {/* Right Minaret Bulbous Dome & Finial */}
          <path d="M 304 35 Q 313 15 322 35 Z" fill={color} fillOpacity="0.75" />
          <line x1="313" y1="20" x2="313" y2="8" stroke={color} strokeWidth="1.5" />
          <circle cx="313" cy="8" r="2" fill={color} />
        </svg>
      );

    case 'sun-temple-wheel':
      return (
        <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Konark 24-spoke Sun Chariot Wheel */}
          <circle cx="160" cy="160" r="145" stroke={color} strokeWidth="5" fill={color} fillOpacity="0.08" />
          <circle cx="160" cy="160" r="132" stroke={color} strokeWidth="2.5" strokeDasharray="3 3" />
          <circle cx="160" cy="160" r="122" stroke={color} strokeWidth="1.5" />

          {/* Central Hub */}
          <circle cx="160" cy="160" r="34" fill={color} fillOpacity="0.5" stroke={color} strokeWidth="2" />
          <circle cx="160" cy="160" r="18" fill={color} fillOpacity="0.8" />
          <circle cx="160" cy="160" r="6" fill="#FFF" fillOpacity="0.9" />

          {/* 8 Major Spokes (Broad Carved Spokes with Medallions) */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <g key={`major-spoke-${i}`} transform={`rotate(${angle} 160 160)`}>
              <line x1="160" y1="126" x2="160" y2="38" stroke={color} strokeWidth="4" />
              {/* Carved Medallion on Spoke */}
              <circle cx="160" cy="82" r="8" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1" />
              <circle cx="160" cy="82" r="3" fill="#FFF" fillOpacity="0.8" />
            </g>
          ))}

          {/* 16 Minor Filigree Spokes */}
          {[15, 30, 60, 75, 105, 120, 150, 165, 195, 210, 240, 255, 285, 300, 330, 345].map((angle, i) => (
            <line
              key={`minor-spoke-${i}`}
              x1="160"
              y1="130"
              x2="160"
              y2="38"
              stroke={color}
              strokeWidth="1.5"
              strokeDasharray="4 2"
              transform={`rotate(${angle} 160 160)`}
            />
          ))}

          {/* Outer Rim Carved Beads */}
          {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((angle, i) => (
            <circle
              key={`rim-bead-${i}`}
              cx="160"
              cy="22"
              r="2.5"
              fill={color}
              transform={`rotate(${angle} 160 160)`}
            />
          ))}
        </svg>
      );

    case 'buddhist-stupa-pagoda':
      return (
        <svg viewBox="0 0 420 270" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Base Terrace / Medhi */}
          <rect x="50" y="240" width="320" height="15" fill={color} fillOpacity="0.4" rx="2" />
          <rect x="80" y="220" width="260" height="20" fill={color} fillOpacity="0.45" rx="1" />

          {/* Great Hemispherical Dome (Anda) */}
          <path
            d="M 110 220 C 110 120, 310 120, 310 220 Z"
            fill={color}
            fillOpacity="0.4"
            stroke={color}
            strokeWidth="1.5"
          />

          {/* Harmika (Square Balcony atop Stupa) */}
          <rect x="185" y="90" width="50" height="25" fill={color} fillOpacity="0.6" stroke={color} strokeWidth="1" />
          <circle cx="210" cy="102" r="4" fill={color} />

          {/* Chattravali (Triple Umbrella Spire) */}
          <line x1="210" y1="90" x2="210" y2="25" stroke={color} strokeWidth="2" />
          <ellipse cx="210" cy="70" rx="25" ry="5" fill={color} fillOpacity="0.7" />
          <ellipse cx="210" cy="55" rx="20" ry="4" fill={color} fillOpacity="0.75" />
          <ellipse cx="210" cy="40" rx="14" ry="3" fill={color} fillOpacity="0.8" />
          <circle cx="210" cy="24" r="3" fill={color} />

          {/* Ashokan Torana Gateway Arch on Left */}
          <rect x="45" y="150" width="6" height="70" fill={color} fillOpacity="0.5" />
          <rect x="75" y="150" width="6" height="70" fill={color} fillOpacity="0.5" />
          <rect x="38" y="155" width="50" height="5" fill={color} fillOpacity="0.6" />
          <rect x="38" y="165" width="50" height="5" fill={color} fillOpacity="0.6" />
        </svg>
      );

    case 'himalayan-peak-monastery':
      return (
        <svg viewBox="0 0 460 250" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Snowy Himalayan Mountain Ridge */}
          <polygon points="20,240 110,120 180,180 280,60 360,150 440,240" fill={color} fillOpacity="0.25" />
          <polygon points="210,110 280,60 330,125" fill={color} fillOpacity="0.4" />
          {/* Snowcaps */}
          <polygon points="265,80 280,60 295,80 280,72" fill="#FFF" fillOpacity="0.6" />
          <polygon points="98,135 110,120 122,135 110,128" fill="#FFF" fillOpacity="0.6" />

          {/* Kedarnath Ancient Stone Temple (Foreground) */}
          <rect x="175" y="220" width="110" height="15" fill={color} fillOpacity="0.5" rx="1" />
          {/* Mandapa Hall */}
          <rect x="185" y="175" width="55" height="45" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1" />
          {/* Main Shikhara Spire */}
          <path
            d="M 235 220 L 235 150 Q 257 105 280 150 L 280 220 Z"
            fill={color}
            fillOpacity="0.65"
            stroke={color}
            strokeWidth="1.2"
          />
          {/* Amalaka & Kalash */}
          <ellipse cx="257" cy="105" rx="12" ry="4" fill={color} fillOpacity="0.8" />
          <line x1="257" y1="105" x2="257" y2="88" stroke={color} strokeWidth="1.5" />
          <circle cx="257" cy="88" r="2.5" fill={color} />
          {/* Red Flag (Dhwaja) fluttering */}
          <polygon points="257,88 275,82 257,76" fill="#EF4444" fillOpacity="0.85" />
        </svg>
      );

    case 'living-root-bridge-waterfall':
      return (
        <svg viewBox="0 0 460 250" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Waterfall Gorge & Cascades */}
          <path d="M 220 20 L 210 140 Q 200 200 170 240 L 270 240 Q 250 180 245 140 L 235 20 Z" fill={color} fillOpacity="0.18" />
          <line x1="225" y1="30" x2="220" y2="210" stroke="#FFF" strokeWidth="1.5" strokeDasharray="6 3" strokeOpacity="0.5" />
          <line x1="235" y1="50" x2="230" y2="200" stroke="#FFF" strokeWidth="1" strokeDasharray="4 2" strokeOpacity="0.4" />

          {/* Left Cliff & Rubber Tree Trunk */}
          <path d="M 20 240 L 20 60 Q 60 70 80 120 L 100 240 Z" fill={color} fillOpacity="0.4" />
          {/* Right Cliff */}
          <path d="M 360 240 L 370 100 Q 400 80 440 70 L 440 240 Z" fill={color} fillOpacity="0.4" />

          {/* Upper Living Root Bridge (Level 2) */}
          <path
            d="M 60 115 Q 230 145 390 105"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Entwined Vertical Aerial Vines */}
          {[120, 160, 200, 240, 280, 320].map((x, i) => (
            <path
              key={`vine-u-${i}`}
              d={`M ${x} 125 Q ${x + 5} 140 ${x - 2} 165`}
              stroke={color}
              strokeWidth="1.5"
              fill="none"
              opacity="0.6"
            />
          ))}

          {/* Lower Living Root Bridge (Level 1) */}
          <path
            d="M 80 175 Q 230 205 370 170"
            stroke={color}
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Natural Root Handrails */}
          <path d="M 85 160 Q 230 188 365 155" stroke={color} strokeWidth="2.5" fill="none" opacity="0.7" />
        </svg>
      );

    case 'colonial-monument':
      return (
        <svg viewBox="0 0 460 250" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Water Pool Reflection */}
          <rect x="20" y="215" width="420" height="25" fill={color} fillOpacity="0.15" />
          {/* Grand Marble Plinth */}
          <rect x="70" y="200" width="320" height="15" fill={color} fillOpacity="0.4" rx="2" />

          {/* Central Neoclassical Colonnade */}
          <rect x="140" y="110" width="180" height="90" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="1" />
          {/* Flanking Wings */}
          <rect x="85" y="140" width="65" height="60" fill={color} fillOpacity="0.35" />
          <rect x="310" y="140" width="65" height="60" fill={color} fillOpacity="0.35" />

          {/* Pediment & Columns */}
          <polygon points="170,110 230,85 290,110" fill={color} fillOpacity="0.55" stroke={color} strokeWidth="1" />
          {[180, 200, 220, 240, 260, 280].map((x, i) => (
            <line key={`col-${i}`} x1={x} y1="110" x2={x} y2="200" stroke={color} strokeWidth="1.8" opacity="0.6" />
          ))}

          {/* High Central White Marble Dome */}
          <path
            d="M 195 85 C 195 45, 265 45, 265 85 Z"
            fill={color}
            fillOpacity="0.6"
            stroke={color}
            strokeWidth="1.2"
          />
          {/* Angel of Victory / Finial Spire */}
          <line x1="230" y1="45" x2="230" y2="24" stroke={color} strokeWidth="1.5" />
          <circle cx="230" cy="24" r="3.5" fill={color} />
          {/* Angel wings */}
          <path d="M 226 24 Q 220 18 224 15 M 234 24 Q 240 18 236 15" stroke={color} strokeWidth="1.2" fill="none" />
        </svg>
      );

    case 'statue-stepwell':
    default:
      return (
        <svg viewBox="0 0 440 260" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
          {/* Narmada River Waters / Stepwell Basin */}
          <rect x="20" y="210" width="400" height="40" fill={color} fillOpacity="0.2" />

          {/* Inverted Stepwell Pavilions (Rani ki Vav tiers) */}
          <polygon points="30,210 70,160 190,160 210,210" fill={color} fillOpacity="0.3" stroke={color} strokeWidth="0.8" />
          <polygon points="60,160 90,120 170,120 190,160" fill={color} fillOpacity="0.35" stroke={color} strokeWidth="0.8" />
          <polygon points="85,120 110,80 150,80 170,120" fill={color} fillOpacity="0.4" stroke={color} strokeWidth="0.8" />

          {/* Monumental Colossus Silhouette (Statue of Unity) */}
          {/* Plinth */}
          <rect x="270" y="195" width="90" height="15" fill={color} fillOpacity="0.5" rx="2" />
          <rect x="285" y="180" width="60" height="15" fill={color} fillOpacity="0.55" />
          {/* Feet & Robe Draping */}
          <path
            d="M 292 180 L 290 90 Q 300 80 315 80 Q 330 80 340 90 L 338 180 Z"
            fill={color}
            fillOpacity="0.65"
            stroke={color}
            strokeWidth="1.2"
          />
          {/* Torso & Shawl (Kurta & Draped Shawl) */}
          <path
            d="M 290 90 L 285 45 Q 315 35 345 45 L 340 90 Z"
            fill={color}
            fillOpacity="0.7"
            stroke={color}
            strokeWidth="1.2"
          />
          {/* Head & Noble Posture */}
          <circle cx="315" cy="28" r="11" fill={color} fillOpacity="0.8" />
          {/* Walking stick / arm posture */}
          <line x1="315" y1="50" x2="315" y2="105" stroke="#FFF" strokeWidth="1" strokeOpacity="0.4" />
        </svg>
      );
  }
};
