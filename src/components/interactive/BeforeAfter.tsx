import { motion, useReducedMotion, useMotionValue, useTransform } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import type { CaseStudy } from '../../data/case-studies';

interface BeforeAfterProps {
  caseStudy: CaseStudy;
  className?: string;
}

/**
 * Before/After comparison slider component
 * Shows visual comparison of SEO results with draggable slider
 */
export default function BeforeAfter({ caseStudy, className = '' }: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(50);
  const sliderX = useTransform(x, (value) => `${value}%`);

  // Handle mouse/touch drag
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const position = ((clientX - rect.left) / rect.width) * 100;
    const clampedPosition = Math.max(0, Math.min(100, position));
    
    setSliderPosition(clampedPosition);
    x.set(clampedPosition);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);
  
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      const newPosition = Math.max(0, sliderPosition - 5);
      setSliderPosition(newPosition);
      x.set(newPosition);
    } else if (e.key === 'ArrowRight') {
      const newPosition = Math.min(100, sliderPosition + 5);
      setSliderPosition(newPosition);
      x.set(newPosition);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  // Animate on first view
  useEffect(() => {
    if (!shouldReduceMotion) {
      // Animate from left to right on mount
      const timer = setTimeout(() => {
        x.set(75);
        setSliderPosition(75);
      }, 500);

      const resetTimer = setTimeout(() => {
        x.set(50);
        setSliderPosition(50);
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearTimeout(resetTimer);
      };
    }
  }, []);

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          {caseStudy.clientName}
        </h3>
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-300">
          <span className="px-3 py-1 rounded-full bg-miami-purple/20 border border-miami-purple/30">
            {caseStudy.industry}
          </span>
          <span className="px-3 py-1 rounded-full bg-miami-cyan/20 border border-miami-cyan/30">
            {caseStudy.location}
          </span>
          <span className="px-3 py-1 rounded-full bg-miami-pink/20 border border-miami-pink/30">
            {caseStudy.timeframe}
          </span>
        </div>
      </div>

      {/* Before/After Comparison Container */}
      <div 
        ref={containerRef}
        className="relative rounded-2xl overflow-hidden bg-miami-dark border border-white/10 shadow-2xl cursor-ew-resize select-none"
        role="slider"
        aria-label="Before and after comparison slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={sliderPosition}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="aspect-video relative">
          {/* BEFORE Side (Full Width) */}
          <div className="absolute inset-0 p-8 bg-gradient-to-br from-red-900/40 to-miami-dark flex items-center justify-center">
            <div className="text-center space-y-6 w-full max-w-xl">
              <div className="inline-block px-4 py-2 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 font-bold text-sm">
                BEFORE
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-miami-dark/60 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Ranking</div>
                  <div className="text-2xl font-bold text-white">
                    {String(caseStudy.before.ranking)}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-miami-dark/60 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Traffic/mo</div>
                  <div className="text-2xl font-bold text-white">
                    {caseStudy.before.traffic.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-miami-dark/60 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Revenue/mo</div>
                  <div className="text-2xl font-bold text-white">
                    ${caseStudy.before.revenue.toLocaleString()}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-miami-dark/60 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Leads/mo</div>
                  <div className="text-2xl font-bold text-white">
                    {String(caseStudy.before.leads)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AFTER Side (Clipped by slider) */}
          <motion.div
            className="absolute inset-0 p-8 bg-gradient-to-br from-green-900/40 to-miami-dark flex items-center justify-center"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <div className="text-center space-y-6 w-full max-w-xl">
              <div className="inline-block px-4 py-2 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 font-bold text-sm">
                AFTER
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-miami-dark/60 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Ranking</div>
                  <div className="text-2xl font-bold text-white">
                    {String(caseStudy.after.ranking)}
                  </div>
                  <div className="text-xs text-green-400 mt-1">
                    {String(caseStudy.improvements.rankingChange)}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-miami-dark/60 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Traffic/mo</div>
                  <div className="text-2xl font-bold text-white">
                    {caseStudy.after.traffic.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-400 mt-1">
                    {`+${caseStudy.improvements.trafficIncrease}%`}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-miami-dark/60 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Revenue/mo</div>
                  <div className="text-2xl font-bold text-white">
                    ${caseStudy.after.revenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-green-400 mt-1">
                    {`+${caseStudy.improvements.revenueIncrease}%`}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-miami-dark/60 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Leads/mo</div>
                  <div className="text-2xl font-bold text-white">
                    {String(caseStudy.after.leads)}
                  </div>
                  <div className="text-xs text-green-400 mt-1">
                    {`+${caseStudy.improvements.leadsIncrease}%`}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Slider Line and Handle */}
          <motion.div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl pointer-events-none"
            style={{ left: sliderX }}
          >
            {/* Handle */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-auto cursor-ew-resize"
              onMouseDown={handleMouseDown}
              onTouchStart={handleMouseDown}
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.1 }}
              whileTap={{ scale: shouldReduceMotion ? 1 : 0.9 }}
            >
              {/* Arrows */}
              <svg
                className="w-6 h-6 text-miami-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  transform="rotate(90 12 12)"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.3 }}
        className="mt-6 p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/30"
      >
        <div className="flex flex-wrap justify-center gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-green-400">
              {`+${caseStudy.improvements.trafficIncrease}%`}
            </div>
            <div className="text-sm text-gray-300">Traffic Increase</div>
          </div>
          <div className="hidden md:block w-px bg-white/20" />
          <div>
            <div className="text-3xl font-bold text-green-400">
              {`+${caseStudy.improvements.revenueIncrease}%`}
            </div>
            <div className="text-sm text-gray-300">Revenue Growth</div>
          </div>
          <div className="hidden md:block w-px bg-white/20" />
          <div>
            <div className="text-3xl font-bold text-green-400">
              {`+${caseStudy.improvements.leadsIncrease}%`}
            </div>
            <div className="text-sm text-gray-300">More Leads</div>
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <p className="mt-4 text-center text-sm text-gray-400">
        Drag the slider or use arrow keys to compare before and after results
      </p>
    </div>
  );
}
