import React, { useState } from 'react';
import { MapPin, Compass, ArrowRight, Layers, Sparkles } from 'lucide-react';
import { getAllEntitiesSummary } from '../data/statesData.ts';
import { Region } from '../types/heritage.ts';
import { STATE_LANDMARK_BACKDROPS } from '../data/stateLandmarkBackdrops.ts';

interface InteractiveMapProps {
  onSelectState: (slug: string) => void;
  selectedRegion?: Region | 'All';
}

// Representative SVG coordinate nodes for India's 36 states and UTs arranged in geographical layout
interface StateNode {
  slug: string;
  name: string;
  region: Region;
  type: 'state' | 'ut';
  x: number;
  y: number;
  r?: number;
}

const stateNodes: StateNode[] = [
  // North
  { slug: 'ladakh', name: 'Ladakh', region: 'North', type: 'ut', x: 200, y: 55, r: 24 },
  { slug: 'jammu-kashmir', name: 'Jammu & Kashmir', region: 'North', type: 'ut', x: 155, y: 80, r: 20 },
  { slug: 'himachal-pradesh', name: 'Himachal Pradesh', region: 'North', type: 'state', x: 205, y: 110, r: 18 },
  { slug: 'punjab', name: 'Punjab', region: 'North', type: 'state', x: 165, y: 135, r: 18 },
  { slug: 'chandigarh', name: 'Chandigarh', region: 'North', type: 'ut', x: 190, y: 135, r: 8 },
  { slug: 'uttarakhand', name: 'Uttarakhand', region: 'North', type: 'state', x: 245, y: 140, r: 18 },
  { slug: 'haryana', name: 'Haryana', region: 'North', type: 'state', x: 190, y: 165, r: 18 },
  { slug: 'delhi', name: 'Delhi', region: 'North', type: 'ut', x: 215, y: 175, r: 10 },
  { slug: 'rajasthan', name: 'Rajasthan', region: 'North', type: 'state', x: 130, y: 220, r: 35 },
  { slug: 'uttar-pradesh', name: 'Uttar Pradesh', region: 'North', type: 'state', x: 275, y: 215, r: 34 },

  // Central
  { slug: 'madhya-pradesh', name: 'Madhya Pradesh', region: 'Central', type: 'state', x: 235, y: 285, r: 34 },
  { slug: 'chhattisgarh', name: 'Chhattisgarh', region: 'Central', type: 'state', x: 300, y: 320, r: 24 },

  // West
  { slug: 'gujarat', name: 'Gujarat', region: 'West', type: 'state', x: 80, y: 275, r: 30 },
  { slug: 'dadra-nagar-haveli-daman-diu', name: 'Daman & Diu', region: 'West', type: 'ut', x: 110, y: 330, r: 9 },
  { slug: 'maharashtra', name: 'Maharashtra', region: 'West', type: 'state', x: 175, y: 375, r: 36 },
  { slug: 'goa', name: 'Goa', region: 'West', type: 'state', x: 145, y: 460, r: 10 },

  // East
  { slug: 'bihar', name: 'Bihar', region: 'East', type: 'state', x: 355, y: 210, r: 22 },
  { slug: 'jharkhand', name: 'Jharkhand', region: 'East', type: 'state', x: 360, y: 260, r: 20 },
  { slug: 'west-bengal', name: 'West Bengal', region: 'East', type: 'state', x: 400, y: 275, r: 22 },
  { slug: 'odisha', name: 'Odisha', region: 'East', type: 'state', x: 350, y: 340, r: 26 },

  // Northeast
  { slug: 'sikkim', name: 'Sikkim', region: 'Northeast', type: 'state', x: 405, y: 175, r: 11 },
  { slug: 'assam', name: 'Assam', region: 'Northeast', type: 'state', x: 480, y: 195, r: 25 },
  { slug: 'arunachal-pradesh', name: 'Arunachal Pradesh', region: 'Northeast', type: 'state', x: 535, y: 160, r: 22 },
  { slug: 'meghalaya', name: 'Meghalaya', region: 'Northeast', type: 'state', x: 465, y: 225, r: 14 },
  { slug: 'nagaland', name: 'Nagaland', region: 'Northeast', type: 'state', x: 540, y: 205, r: 13 },
  { slug: 'manipur', name: 'Manipur', region: 'Northeast', type: 'state', x: 530, y: 235, r: 13 },
  { slug: 'mizoram', name: 'Mizoram', region: 'Northeast', type: 'state', x: 505, y: 275, r: 13 },
  { slug: 'tripura', name: 'Tripura', region: 'Northeast', type: 'state', x: 470, y: 260, r: 11 },

  // South
  { slug: 'telangana', name: 'Telangana', region: 'South', type: 'state', x: 235, y: 390, r: 23 },
  { slug: 'andhra-pradesh', name: 'Andhra Pradesh', region: 'South', type: 'state', x: 260, y: 440, r: 27 },
  { slug: 'karnataka', name: 'Karnataka', region: 'South', type: 'state', x: 185, y: 460, r: 28 },
  { slug: 'puducherry', name: 'Puducherry', region: 'South', type: 'ut', x: 245, y: 495, r: 8 },
  { slug: 'tamil-nadu', name: 'Tamil Nadu', region: 'South', type: 'state', x: 215, y: 530, r: 28 },
  { slug: 'kerala', name: 'Kerala', region: 'South', type: 'state', x: 170, y: 540, r: 20 },

  // Islands
  { slug: 'lakshadweep', name: 'Lakshadweep', region: 'South', type: 'ut', x: 115, y: 550, r: 10 },
  { slug: 'andaman-nicobar', name: 'Andaman & Nicobar', region: 'South', type: 'ut', x: 500, y: 490, r: 14 },
];

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectState, selectedRegion = 'All' }) => {
  const [hoveredState, setHoveredState] = useState<StateNode | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'directory'>('map');
  const allSummaries = getAllEntitiesSummary();

  const filteredNodes = selectedRegion === 'All' 
    ? stateNodes 
    : stateNodes.filter(n => n.region === selectedRegion);

  const regionColorMap: Record<Region, { fill: string; stroke: string; glow: string }> = {
    North: { fill: '#FDE68A', stroke: '#D97706', glow: 'rgba(217, 119, 6, 0.2)' },
    South: { fill: '#BAE6FD', stroke: '#0284C7', glow: 'rgba(2, 132, 199, 0.2)' },
    East: { fill: '#FED7AA', stroke: '#EA580C', glow: 'rgba(234, 88, 12, 0.2)' },
    West: { fill: '#E9D5FF', stroke: '#9333EA', glow: 'rgba(147, 51, 234, 0.2)' },
    Central: { fill: '#FBCFE8', stroke: '#DB2777', glow: 'rgba(219, 39, 119, 0.2)' },
    Northeast: { fill: '#BBF7D0', stroke: '#16A34A', glow: 'rgba(22, 163, 74, 0.2)' },
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
      {/* Top Header of Map Component */}
      <div className="px-6 py-4 border-b border-stone-200 flex flex-wrap items-center justify-between gap-4 bg-stone-50/50">
        <div className="flex items-center gap-3">
          <Compass className="w-5 h-5 text-[#C85A32]" />
          <div>
            <h3 className="text-base font-semibold text-stone-900">Interactive Cartographic Explorer</h3>
            <p className="text-xs text-stone-500">Select any region or state node to view its full heritage monograph</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('map')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === 'map'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900'
            }`}
          >
            Interactive Map
          </button>
          <button
            onClick={() => setViewMode('directory')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              viewMode === 'directory'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:text-stone-900'
            }`}
          >
            Accessible Directory ({allSummaries.length})
          </button>
        </div>
      </div>

      {viewMode === 'map' ? (
        <div className="relative p-6 flex flex-col lg:flex-row items-center justify-center gap-8 min-h-[560px] bg-radial from-stone-50 to-white">
          {/* SVG Map Container */}
          <div className="relative w-full max-w-[580px] aspect-[580/620]">
            <svg
              viewBox="40 20 540 580"
              className="w-full h-full select-none"
              aria-label="Map of Indian States and Union Territories"
            >
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.12" />
                </filter>
              </defs>

              {/* Decorative geographical coast / boundary hint */}
              <path
                d="M140,70 L210,50 L270,120 L370,190 L420,170 L530,150 L560,200 L490,280 L420,290 L370,360 L280,470 L240,560 L180,560 L140,460 L160,370 L80,280 L140,210 Z"
                fill="#FAF8F5"
                stroke="#E7DDD0"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="pointer-events-none opacity-80"
              />

              {/* State Nodes */}
              {filteredNodes.map(node => {
                const color = regionColorMap[node.region];
                const isHovered = hoveredState?.slug === node.slug;
                const r = node.r || 20;

                return (
                  <g
                    key={node.slug}
                    className="cursor-pointer transition-transform duration-200"
                    onMouseEnter={() => setHoveredState(node)}
                    onMouseLeave={() => setHoveredState(null)}
                    onClick={() => onSelectState(node.slug)}
                    tabIndex={0}
                    role="button"
                    aria-label={`Explore ${node.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        onSelectState(node.slug);
                      }
                    }}
                  >
                    {/* Pulsing ring on hover */}
                    {isHovered && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r + 8}
                        fill={color.glow}
                        className="animate-pulse"
                      />
                    )}

                    {/* Main Node Bubble */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={isHovered ? r + 3 : r}
                      fill={isHovered ? color.stroke : color.fill}
                      stroke={color.stroke}
                      strokeWidth={isHovered ? '2.5' : '1.5'}
                      filter="url(#shadow)"
                      className="transition-all duration-200"
                    />

                    {/* Label */}
                    <text
                      x={node.x}
                      y={node.y + 4}
                      textAnchor="middle"
                      className={`text-[10px] font-medium pointer-events-none select-none transition-colors ${
                        isHovered ? 'fill-white font-bold' : 'fill-stone-800'
                      }`}
                    >
                      {node.name.length > 9 ? node.name.slice(0, 8) + '..' : node.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Quick legend on the map */}
            <div className="absolute bottom-2 left-2 p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-stone-200/70 text-[11px] shadow-xs space-y-1">
              <span className="font-semibold text-stone-700 block mb-1">Geographic Zones</span>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-stone-600">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FDE68A] border border-[#D97706]" /> North</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#BAE6FD] border border-[#0284C7]" /> South</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FED7AA] border border-[#EA580C]" /> East</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#E9D5FF] border border-[#9333EA]" /> West</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FBCFE8] border border-[#DB2777]" /> Central</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#BBF7D0] border border-[#16A34A]" /> Northeast</span>
              </div>
            </div>
          </div>

          {/* Interactive Inspection Card */}
          <div className="w-full lg:w-72 bg-stone-50 p-5 rounded-xl border border-stone-200/80 shrink-0">
            {hoveredState ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-stone-400 font-medium">
                    {hoveredState.region} Zone · {hoveredState.type === 'state' ? 'State' : 'Union Territory'}
                  </span>
                  <MapPin className="w-4 h-4 text-[#C85A32]" />
                </div>
                <h4 className="text-xl font-bold font-serif text-stone-900">{hoveredState.name}</h4>

                {/* State Famous Landmark */}
                {STATE_LANDMARK_BACKDROPS[hoveredState.slug] && (
                  <div className="p-2.5 rounded-xl bg-amber-100/70 border border-amber-300/80 text-xs space-y-0.5">
                    <span className="text-[10px] font-bold text-[#A5431E] uppercase tracking-wider block">
                      Famous Place in Background:
                    </span>
                    <strong className="text-stone-900 block font-serif text-sm">
                      {STATE_LANDMARK_BACKDROPS[hoveredState.slug].famousPlace}
                    </strong>
                    <span className="text-[10px] text-stone-600 block">
                      {STATE_LANDMARK_BACKDROPS[hoveredState.slug].cityOrDistrict}
                    </span>
                  </div>
                )}

                <p className="text-xs text-stone-600 leading-relaxed">
                  Click to open the comprehensive monograph featuring historical timeline, architectural monuments, signature cuisine, classical dances, and local travel guidance.
                </p>
                <button
                  onClick={() => onSelectState(hoveredState.slug)}
                  className="w-full py-2 px-3 bg-[#1E3A5F] text-white text-xs font-medium rounded-lg hover:bg-[#162C49] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Explore {hoveredState.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="text-center py-8 space-y-2 text-stone-400">
                <Sparkles className="w-6 h-6 mx-auto text-amber-500/60" />
                <p className="text-xs font-medium text-stone-700">Hover Over Any Region</p>
                <p className="text-[11px] text-stone-500">
                  Inspect regional identity, capital, monuments, festivals, and culinary profile
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Accessible State Directory List */
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {allSummaries.map(entity => (
              <button
                key={entity.id}
                onClick={() => onSelectState(entity.slug)}
                className="text-left p-3.5 rounded-xl border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1">
                    <span>{entity.region}</span>
                    <span className="text-stone-400 uppercase text-[10px]">{entity.type}</span>
                  </div>
                  <h4 className="font-semibold text-stone-900 group-hover:text-[#C85A32] transition-colors">
                    {entity.name}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">Capital: {entity.capital}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="truncate max-w-[140px]">{entity.languages.slice(0, 2).join(', ')}</span>
                  <ArrowRight className="w-3 h-3 text-stone-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
