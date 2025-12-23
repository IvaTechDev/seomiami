import { motion, useReducedMotion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';

/**
 * Animated number counter component
 */
function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    // Simple animated counter
    const startValue = displayValue;
    const endValue = value;
    const duration = 1000;
    const startTime = Date.now();

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentValue = startValue + (endValue - startValue) * easeOutQuad(progress);

      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, displayValue]);

  const formattedValue = displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return <span>{prefix}{formattedValue}{suffix}</span>;
}

/**
 * Interactive ROI Calculator component
 * Calculates potential returns from SEO investment
 */
export default function ROICalculator() {
  const [currentRevenue, setCurrentRevenue] = useState(50000);
  const [currentTraffic, setCurrentTraffic] = useState(5000);
  const [targetGrowth, setTargetGrowth] = useState(100);
  const shouldReduceMotion = useReducedMotion();

  // Calculate ROI metrics
  const calculations = useMemo(() => {
    // Traffic needed based on revenue growth
    const trafficMultiplier = 1 + (targetGrowth / 100);
    const estimatedTrafficNeeded = Math.round(currentTraffic * trafficMultiplier);
    
    // Potential revenue increase
    const potentialRevenueIncrease = Math.round(currentRevenue * (targetGrowth / 100));
    
    // SEO investment recommendation (typically 10-15% of desired growth)
    const monthlyInvestment = Math.round(
      Math.max(1500, Math.min(potentialRevenueIncrease * 0.12, 25000))
    );
    
    // ROI calculation (revenue increase / investment * 100)
    const roiPercentage = Math.round((potentialRevenueIncrease / monthlyInvestment) * 100);
    
    // Timeline based on competitiveness (6-12 months)
    const timeline = targetGrowth <= 50 ? '6-8' : targetGrowth <= 100 ? '8-10' : '10-12';
    
    return {
      estimatedTrafficNeeded,
      trafficIncrease: estimatedTrafficNeeded - currentTraffic,
      potentialRevenueIncrease,
      monthlyInvestment,
      roiPercentage,
      timeline,
      annualROI: roiPercentage * 12
    };
  }, [currentRevenue, currentTraffic, targetGrowth]);

  // Format currency
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    return `$${value.toLocaleString()}`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-miami-dark/80 to-miami-dark/60 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Calculate Your SEO ROI
          </h3>
          <p className="text-gray-300">
            See how much revenue growth you can achieve with strategic SEO
          </p>
        </div>

        {/* Input Controls */}
        <div className="space-y-6 mb-8">
          {/* Current Monthly Revenue */}
          <div>
            <label 
              htmlFor="revenue-slider"
              className="flex justify-between items-center mb-3"
            >
              <span className="text-sm font-medium text-gray-200">
                Current Monthly Revenue
              </span>
              <span className="text-lg font-bold text-miami-cyan">
                {formatCurrency(currentRevenue)}
              </span>
            </label>
            <input
              id="revenue-slider"
              type="range"
              min="1000"
              max="1000000"
              step="1000"
              value={currentRevenue}
              onChange={(e) => setCurrentRevenue(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer
                bg-gradient-to-r from-miami-purple via-miami-pink to-miami-cyan
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-transform
                [&::-webkit-slider-thumb]:hover:scale-110
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow-lg
                [&::-moz-range-thumb]:cursor-pointer"
              aria-label="Current monthly revenue"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$1k</span>
              <span>$1M</span>
            </div>
          </div>

          {/* Current Monthly Traffic */}
          <div>
            <label 
              htmlFor="traffic-slider"
              className="flex justify-between items-center mb-3"
            >
              <span className="text-sm font-medium text-gray-200">
                Current Website Traffic
              </span>
              <span className="text-lg font-bold text-miami-pink">
                {currentTraffic.toLocaleString()} visits/mo
              </span>
            </label>
            <input
              id="traffic-slider"
              type="range"
              min="100"
              max="100000"
              step="100"
              value={currentTraffic}
              onChange={(e) => setCurrentTraffic(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer
                bg-gradient-to-r from-miami-purple via-miami-pink to-miami-cyan
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-5
                [&::-webkit-slider-thumb]:h-5
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-white
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:transition-transform
                [&::-webkit-slider-thumb]:hover:scale-110
                [&::-moz-range-thumb]:w-5
                [&::-moz-range-thumb]:h-5
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-white
                [&::-moz-range-thumb]:border-0
                [&::-moz-range-thumb]:shadow-lg
                [&::-moz-range-thumb]:cursor-pointer"
              aria-label="Current monthly website traffic"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>100</span>
              <span>100k</span>
            </div>
          </div>

          {/* Target Revenue Growth */}
          <div>
            <label 
              htmlFor="growth-select"
              className="flex justify-between items-center mb-3"
            >
              <span className="text-sm font-medium text-gray-200">
                Target Revenue Growth
              </span>
              <span className="text-lg font-bold text-miami-purple">
                + {targetGrowth} %
              </span>
            </label>
            <select
              id="growth-select"
              value={targetGrowth}
              onChange={(e) => setTargetGrowth(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-miami-dark/60 border border-white/20 text-white
                focus:outline-none focus:border-miami-cyan transition-colors cursor-pointer"
              aria-label="Target revenue growth percentage"
            >
              <option value="20">20% Growth</option>
              <option value="50">50% Growth</option>
              <option value="100">100% Growth (2x)</option>
              <option value="200">200% Growth (3x)</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Traffic Needed */}
          <motion.div
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
            className="p-4 rounded-xl bg-gradient-to-br from-miami-cyan/20 to-transparent border border-miami-cyan/30"
          >
            <div className="text-sm text-gray-300 mb-1">Traffic Needed</div>
            <div className="text-2xl font-bold text-white">
              <AnimatedNumber value={calculations.estimatedTrafficNeeded} suffix=" visits" />
            </div>
            <div className="text-xs text-miami-cyan mt-1">
              <span>+<AnimatedNumber value={calculations.trafficIncrease} /></span> new visits/mo
            </div>
          </motion.div>

          {/* Revenue Increase */}
          <motion.div
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
            className="p-4 rounded-xl bg-gradient-to-br from-miami-pink/20 to-transparent border border-miami-pink/30"
          >
            <div className="text-sm text-gray-300 mb-1">Potential Revenue Increase</div>
            <div className="text-2xl font-bold text-white">
              <AnimatedNumber 
                value={calculations.potentialRevenueIncrease} 
                prefix="$" 
              />
              <span className="text-base text-gray-400">/mo</span>
            </div>
            <div className="text-xs text-miami-pink mt-1">
              +{targetGrowth}% monthly growth
            </div>
          </motion.div>

          {/* Monthly Investment */}
          <motion.div
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
            className="p-4 rounded-xl bg-gradient-to-br from-miami-purple/20 to-transparent border border-miami-purple/30"
          >
            <div className="text-sm text-gray-300 mb-1">Recommended Investment</div>
            <div className="text-2xl font-bold text-white">
              <AnimatedNumber 
                value={calculations.monthlyInvestment} 
                prefix="$" 
              />
              <span className="text-base text-gray-400">/mo</span>
            </div>
            <div className="text-xs text-miami-purple mt-1">
              SEO services & optimization
            </div>
          </motion.div>

          {/* ROI Percentage */}
          <motion.div
            whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
            className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-transparent border border-green-500/30"
          >
            <div className="text-sm text-gray-300 mb-1">Expected ROI</div>
            <div className="text-2xl font-bold text-white">
              <AnimatedNumber value={calculations.roiPercentage} suffix="%" />
            </div>
            <div className="text-xs text-green-400 mt-1">
              <AnimatedNumber value={calculations.annualROI} suffix="% annual ROI" />
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <div className="p-4 rounded-xl bg-miami-dark/40 border border-white/10 mb-6 text-center">
          <div className="text-sm text-gray-300 mb-1">Timeline to Results</div>
          <div className="text-xl font-bold text-white">
            {calculations.timeline} months
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Based on competition and growth target
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
          whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
          className="w-full py-4 px-6 rounded-xl font-bold text-white text-lg
            bg-gradient-to-r from-miami-purple via-miami-pink to-miami-cyan
            hover:shadow-2xl hover:shadow-miami-pink/50 transition-shadow"
          onClick={() => {
            // Scroll to contact form or open modal
            const contactSection = document.getElementById('contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          aria-label="Get your custom SEO strategy"
        >
          Get My Custom Strategy
        </motion.button>

        {/* Disclaimer */}
        <p className="text-xs text-gray-400 text-center mt-4">
          * Projections are estimates based on industry averages and may vary based on your specific market, competition, and implementation.
        </p>
      </motion.div>
    </div>
  );
}
