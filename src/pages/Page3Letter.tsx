import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onReady: () => void; // called once the full letter has finished animating in
}

const PARAGRAPHS = [
  "Dear Barani,",
  "Life will not always move at the speed you want.",
  "Some days will feel uncertain. Some plans will fail. Some people will leave.",
  "But never lose your ability to stay kind, to laugh loudly, and to keep moving forward.",
  "The people who know you will always remember that energy.",
  "Keep it. And keep being yourself.",
];

export default function Page3Letter({ onReady }: Props) {
  const [opened, setOpened] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!opened) return;
    if (visibleCount >= PARAGRAPHS.length) {
      const t = window.setTimeout(onReady, 500);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setVisibleCount((c) => c + 1), 650);
    return () => window.clearTimeout(t);
  }, [opened, visibleCount, onReady]);

  return (
    <div className="relative flex h-full w-full items-center justify-center px-6">
      <div className="relative flex w-full max-w-xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="envelope"
              onClick={() => setOpened(true)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05, y: -10 }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col items-center gap-6 focus:outline-none"
              aria-label="Open the letter"
            >
              <div className="relative">
                <div
                  className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, rgba(201,168,232,0.4), transparent 70%)" }}
                />
                <svg viewBox="0 0 220 160" width="230" className="drop-shadow-[0_25px_60px_rgba(0,0,0,0.55)]">
                  <rect x="10" y="20" width="200" height="130" rx="10" fill="#4a2a68" />
                  <path d="M10,150 L110,85 L210,150 Z" fill="#3a2054" />
                  <path d="M10,20 L110,95 L210,20 Z" fill="#5e3580" />
                  <circle cx="110" cy="72" r="17" fill="#c9a8e8" opacity="0.95" />
                  <text x="110" y="79" fontSize="18" textAnchor="middle" fill="#4a2a68">
                    ♥
                  </text>
                </svg>
              </div>
              <span className="text-sm tracking-[0.2em] uppercase text-white/70">Click to Open</span>
            </motion.button>
          ) : (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative w-full"
            >
              <div
                className="pointer-events-none absolute -inset-8 -z-10 rounded-full blur-3xl opacity-60"
                style={{ background: "radial-gradient(circle, rgba(201,168,232,0.35), transparent 70%)" }}
              />
              <div
                className="w-full p-8 pb-14 md:p-12 md:pb-16 text-left shadow-[0_30px_90px_rgba(0,0,0,0.45)]"
                style={{
                  background: "linear-gradient(160deg, #f6f0fb, #ede2f7)",
                  color: "#33234a",
                  clipPath: "polygon(0% 0%, 100% 0%, 100% 90%, 50% 100%, 0% 90%)",
                }}
              >
                <div className="space-y-4 font-serif italic text-base md:text-lg leading-relaxed">
                  {PARAGRAPHS.map((p, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={visibleCount > i ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6 }}
                    >
                      {p}
                    </motion.p>
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={visibleCount >= PARAGRAPHS.length ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mt-6 text-right font-serif italic text-base text-[#7a4a8f]"
                >
                  — always in your corner
                </motion.p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
