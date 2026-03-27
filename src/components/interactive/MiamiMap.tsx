import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import {
  miamiNeighborhoods,
  coverageDensityLevels,
  type Neighborhood,
} from '../../data/miami-neighborhoods';

/**
 * Interactive Miami-Dade County coverage map component
 * Shows service areas with hover interactions and neighborhood stats
 */
export default function MiamiMap() {
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<Neighborhood | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const googleMapsApiKey = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;

  const mapBackgroundStyle = googleMapsApiKey
    ? {
        backgroundImage: `url(https://maps.googleapis.com/maps/api/staticmap?center=25.7617,-80.1918&zoom=11&size=800x800&scale=2&style=feature:all|element:geometry|color:0x1a1a2e&style=feature:all|element:labels.text.fill|color:0x6b7280&style=feature:all|element:labels.text.stroke|color:0x1a1a2e&style=feature:water|element:geometry|color:0x0f172a&style=feature:road|element:geometry|color:0x1e293b&style=feature:road|element:geometry.stroke|color:0x334155&style=feature:poi|element:geometry|color:0x1e293b&style=feature:transit|element:geometry|color:0x1e293b&style=feature:administrative|element:geometry|color:0x334155&style=feature:administrative|element:geometry.stroke|color:0x475569&key=${googleMapsApiKey})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : undefined;

  return (
    <div className="relative mx-auto w-full max-w-4xl">
      {/* Map Container */}
      <div
        className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-miami-purple/10 to-miami-pink/10 backdrop-blur-sm md:aspect-video"
        style={mapBackgroundStyle}
      >
        {/* SVG Map */}
        <svg
          viewBox="0 0 100 100"
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Interactive map of Miami-Dade County service areas"
        >
          {/* Background Grid */}
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="rgba(255, 255, 255, 0.03)"
                strokeWidth="0.3"
              />
            </pattern>

            {/* Glow filter for hover effect */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="100" height="100" fill="url(#grid)" />
          <rect
            width="100"
            height="100"
            fill={googleMapsApiKey ? 'rgba(15, 23, 42, 0.4)' : 'rgba(15, 23, 42, 0.85)'}
          />

          {/* Neighborhood Markers */}
          {miamiNeighborhoods.map((neighborhood) => {
            const isHovered = hoveredNeighborhood?.id === neighborhood.id;
            const size = neighborhood.activeClients / 2; // Scale based on clients

            return (
              <g key={neighborhood.id}>
                {/* Pulse animation circle (background) */}
                {isHovered && !shouldReduceMotion && (
                  <circle
                    cx={neighborhood.coordinates.x}
                    cy={neighborhood.coordinates.y}
                    r={size}
                    fill={neighborhood.color}
                    opacity="0.2"
                  >
                    <animate
                      attributeName="r"
                      from={size}
                      to={size + 5}
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="opacity"
                      from="0.3"
                      to="0"
                      dur="1.5s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Main marker circle */}
                <circle
                  cx={neighborhood.coordinates.x}
                  cy={neighborhood.coordinates.y}
                  r={isHovered ? size * 1.3 : size}
                  fill={neighborhood.color}
                  opacity={isHovered ? 0.8 : 0.6}
                  filter={isHovered ? 'url(#glow)' : undefined}
                  className="cursor-pointer transition-all duration-300"
                  onMouseEnter={() => setHoveredNeighborhood(neighborhood)}
                  onMouseLeave={() => setHoveredNeighborhood(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={`${neighborhood.name}: ${neighborhood.activeClients} active clients, ${neighborhood.avgRankingImprovement}% average ranking improvement`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setHoveredNeighborhood(
                        hoveredNeighborhood?.id === neighborhood.id ? null : neighborhood
                      );
                    }
                  }}
                />

                {/* Neighborhood label (visible on hover) */}
                {isHovered && (
                  <text
                    x={neighborhood.coordinates.x}
                    y={neighborhood.coordinates.y - size - 2}
                    textAnchor="middle"
                    className="fill-white text-[2px] font-semibold"
                    opacity="0.9"
                  >
                    {neighborhood.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Tooltip on hover */}
        {hoveredNeighborhood && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            className="bg-miami-dark/90 absolute left-4 right-4 top-4 rounded-xl border border-white/20 p-4 shadow-2xl backdrop-blur-md md:left-auto md:right-4 md:w-64"
            role="tooltip"
            aria-live="polite"
          >
            <h3 className="mb-2 text-lg font-bold text-white">{hoveredNeighborhood.name}</h3>
            <div className="space-y-1 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Active Clients:</span>
                <span className="font-bold text-miami-cyan">
                  {hoveredNeighborhood.activeClients}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Avg. Improvement:</span>
                <span className="font-bold text-miami-pink">
                  {`+${hoveredNeighborhood.avgRankingImprovement}%`}
                </span>
              </div>
            </div>

            {/* Color indicator */}
            <div
              className="absolute right-4 top-4 h-3 w-3 rounded-full"
              style={{ backgroundColor: hoveredNeighborhood.color }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-miami-dark/40 mt-6 rounded-xl border border-white/10 p-4 backdrop-blur-sm">
        <h4 className="mb-3 text-sm font-semibold text-white">Coverage Density</h4>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {coverageDensityLevels.map((level) => (
            <div key={level.label} className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full"
                style={{ backgroundColor: level.color }}
                aria-hidden="true"
              />
              <div className="flex-1">
                <div className="text-xs font-medium text-white">{level.label}</div>
                <div className="text-xs text-gray-400">{`${level.minClients}+ clients`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <p className="mt-4 text-center text-sm text-gray-400">
        Hover over neighborhoods to see detailed coverage statistics
      </p>
    </div>
  );
}
