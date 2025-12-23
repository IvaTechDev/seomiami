import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { testimonials, type Testimonial } from '../../data/testimonials';

/**
 * Rotating testimonials carousel component
 * Auto-plays with manual controls and accessibility support
 */
export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const currentTestimonial = testimonials[currentIndex];

  // Auto-play functionality
  useEffect(() => {
    if (isPaused || shouldReduceMotion) return;

    const interval = setInterval(() => {
      handleNext();
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, shouldReduceMotion]);

  // Navigation handlers
  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  // Star rating component
  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        role="region"
        aria-label="Client testimonials carousel"
      >
        {/* Main Carousel Container */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-miami-dark/80 to-miami-dark/60 backdrop-blur-xl border border-white/10 shadow-2xl p-8 md:p-12 min-h-[400px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={shouldReduceMotion ? {} : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex flex-col items-center text-center"
            >
              {/* Quote Mark */}
              <div className="text-6xl text-miami-cyan/30 font-serif leading-none mb-4">
                "
              </div>

              {/* Star Rating */}
              <div className="mb-4">
                <StarRating rating={currentTestimonial.rating} />
              </div>

              {/* Testimonial Quote */}
              <blockquote className="text-lg md:text-xl text-gray-200 leading-relaxed mb-6 max-w-2xl">
                {currentTestimonial.quote}
              </blockquote>

              {/* Results Badge (if available) */}
              {currentTestimonial.results && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring' }}
                  className="mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-miami-cyan/20 border border-green-500/30"
                >
                  <span className="text-green-400 font-bold text-sm">
                    {currentTestimonial.results}
                  </span>
                </motion.div>
              )}

              {/* Client Info */}
              <div className="space-y-1">
                <div className="text-white font-bold text-xl">
                  {currentTestimonial.name}
                </div>
                <div className="text-miami-cyan font-medium">
                  {currentTestimonial.business}
                </div>
                <div className="text-gray-400 text-sm flex items-center justify-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {currentTestimonial.location}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-miami-dark/80 border border-white/20 text-white hover:bg-miami-dark hover:border-miami-cyan transition-all group"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-miami-dark/80 border border-white/20 text-white hover:bg-miami-dark hover:border-miami-cyan transition-all group"
            aria-label="Next testimonial"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-2 mt-6" role="tablist">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                index === currentIndex
                  ? 'w-8 h-3 bg-gradient-to-r from-miami-purple via-miami-pink to-miami-cyan'
                  : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-selected={index === currentIndex}
              role="tab"
            />
          ))}
        </div>

        {/* Progress Bar (optional visual indicator when auto-playing) */}
        {!isPaused && !shouldReduceMotion && (
          <div className="mt-4 h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-miami-purple via-miami-pink to-miami-cyan"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 6, ease: 'linear' }}
              key={currentIndex}
            />
          </div>
        )}

        {/* Pause/Play Indicator */}
        <div className="text-center mt-4">
          <p className="text-xs text-gray-400">
            {isPaused ? (
              <span className="flex items-center justify-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" />
                </svg>
                Paused
              </span>
            ) : (
              'Hover to pause'
            )}
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 grid grid-cols-3 gap-4"
      >
        <div className="text-center p-4 rounded-xl bg-miami-dark/40 border border-white/10">
          <div className="text-3xl font-bold text-miami-cyan mb-1">
            <span>{testimonials.length}</span>
          </div>
          <div className="text-sm text-gray-400">Happy Clients</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-miami-dark/40 border border-white/10">
          <div className="text-3xl font-bold text-miami-pink mb-1"><span>5.0</span></div>
          <div className="text-sm text-gray-400">Average Rating</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-miami-dark/40 border border-white/10">
          <div className="text-3xl font-bold text-miami-purple mb-1"><span>100%</span></div>
          <div className="text-sm text-gray-400">Satisfaction</div>
        </div>
      </motion.div>
    </div>
  );
}
