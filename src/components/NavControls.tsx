import { motion, AnimatePresence } from "framer-motion";

interface NavControlsProps {
  page: number;
  total: number;
  canAdvance: boolean;
  onNext: () => void;
  onBack: () => void;
  onDotClick: (index: number) => void;
}

export default function NavControls({
  page,
  total,
  canAdvance,
  onNext,
  onBack,
  onDotClick,
}: NavControlsProps) {
  const isFirst = page === 1;
  const isLast = page === total;

  return (
    <>
      {/* Progress dots — bottom center */}
      <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to page ${i + 1}`}
            onClick={() => onDotClick(i)}
            className={`h-2 w-2 rounded-full border transition-all duration-500 ${
              page === i + 1
                ? "border-orchid bg-orchid scale-110"
                : "border-white/30 bg-transparent hover:border-white/50"
            }`}
          />
        ))}
      </div>

      {/* Back button — bottom left */}
      <AnimatePresence>
        {!isFirst && (
          <motion.button
            key="back"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={onBack}
            className="fixed bottom-7 left-6 md:left-8 z-40 flex items-center gap-2 rounded-full border border-white/25 bg-white/5 backdrop-blur-md px-5 py-3 text-xs text-white/85 transition-all duration-300 hover:border-white/50 hover:bg-white/10"
          >
            <span>←</span>
            <span>Back</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Next button — bottom right */}
      <AnimatePresence>
        {!isLast && canAdvance && (
          <motion.button
            key="next"
            initial={{ opacity: 0, y: 14, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.95 }}
            onClick={onNext}
            className="fixed bottom-7 right-6 md:right-8 z-40 flex items-center gap-2 rounded-full border border-white/30 bg-white/8 backdrop-blur-md px-6 py-3 text-xs font-medium text-white transition-all duration-300 hover:bg-white hover:text-deep"
            style={{ animation: "nextPulse 2.6s ease-in-out infinite" }}
          >
            <span>Next</span>
            <span>→</span>
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes nextPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.14); }
          50% { box-shadow: 0 0 0 9px rgba(255,255,255,0); }
        }
      `}</style>
    </>
  );
}
