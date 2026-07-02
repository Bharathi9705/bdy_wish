import { motion, AnimatePresence } from "framer-motion";

interface Props {
  visible: boolean;
  onBegin: () => void;
}

export default function IntroGate({ visible, onBegin }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9 }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center gap-6 px-6 text-center"
          style={{ background: "radial-gradient(ellipse at 50% 40%, #1c0f34 0%, #08040f 75%)" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display italic text-2xl md:text-3xl text-white/90"
          >
            Something quiet, just for you.
          </motion.h1>
          <p className="max-w-md text-sm text-white/50">
            Turn the sound on if you can. This is meant to be felt slowly.
          </p>
          <button
            onClick={onBegin}
            className="relative rounded-sm border border-champagne px-9 py-4 text-sm font-semibold tracking-widest text-champagne transition-all duration-300 hover:bg-champagne hover:text-deep"
            style={{ animation: "openGlow 2.2s ease-in-out infinite" }}
          >
            Open, Dear
          </button>

          <style>{`
            @keyframes openGlow {
              0%, 100% { box-shadow: 0 0 0 0 rgba(232,200,128,0.35); }
              50% { box-shadow: 0 0 22px 6px rgba(232,200,128,0.35); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
