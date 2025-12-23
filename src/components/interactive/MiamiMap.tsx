import { motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { miamiNeighborhoods, coverageDensityLevels, type Neighborhood } from '../../data/miami-neighborhoods';

/**
 * Interactive Miami-Dade County coverage map component
 * Shows service areas with hover interactions and neighborhood stats
 */
export default function MiamiMap() {
  const [hoveredNeighborhood, setHoveredNeighborhood] = useState<Neighborhood | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Map Container */}
      <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-miami-purple/10 to-miami-pink/10 backdrop-blur-sm border border-white/10">
        {/* SVG Map */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Interactive map of Miami-Dade County service areas"
        >
          {/* Background Grid */}
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="0.5"
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
            className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-64 p-4 rounded-xl bg-miami-dark/90 backdrop-blur-md border border-white/20 shadow-2xl"
            role="tooltip"
            aria-live="polite"
          >
            <h3 className="text-lg font-bold text-white mb-2">
              {hoveredNeighborhood.name}
            </h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Active Clients:</span>
                <span className="font-bold text-miami-cyan">
                  {hoveredNeighborhood.activeClients}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Avg. Improvement:</span>
                <span className="font-bold text-miami-pink">
                  {`+${hoveredNeighborhood.avgRankingImprovement}%`}
                </span>
              </div>
            </div>
            
            {/* Color indicator */}
            <div
              className="absolute top-4 right-4 w-3 h-3 rounded-full"
              style={{ backgroundColor: hoveredNeighborhood.color }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 p-4 rounded-xl bg-miami-dark/40 backdrop-blur-sm border border-white/10">
        <h4 className="text-sm font-semibold text-white mb-3">Coverage Density</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {coverageDensityLevels.map((level) => (
            <div key={level.label} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: level.color }}
                aria-hidden="true"
              />
              <div className="flex-1">
                <div className="text-xs text-white font-medium">{level.label}</div>
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
