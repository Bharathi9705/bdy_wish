import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  onReady: () => void; // enables the bottom Next button once everything has appeared
  onNext: () => void; // advances straight to page 2 (used by the in-page Begin button)
}

const PARAGRAPHS = [
  "Hai da...!! 💜",
  "Indha website aa unakaga dhan panniruken 😌",
  "Unaku idhu pidikumanu theriyala...",
  "But oru vishayam yosichiko..",
  "Idhula enoda little efforts,\nlittle thoughts,\nand konjam feelings um iruku ✨",
  "Adhanala kandipa full ah paathu mudichitu,\nepdi irundhuchu nu marakama feedback sollu daa 😤💜",
  "Pidichirundha sollu...\npidikala nalum solluuu...",
  "Aana silent ah povadhaa 😂",
  "Because un reaction venum\nadhanala dha ivlo neram eduthu pannadhu 😌✨",
  "Seri...",
  "Ippo click pannu 💜!!",
];

export default function Page1Greeting({ onReady, onNext }: Props) {
  const [visibleCount, setVisibleCount] = useState(0);
  const [buttonShown, setButtonShown] = useState(false);

  useEffect(() => {
    if (visibleCount >= PARAGRAPHS.length) {
      const t = window.setTimeout(() => {
        setButtonShown(true);
        onReady();
      }, 900);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setVisibleCount((c) => c + 1), 620);
    return () => window.clearTimeout(t);
  }, [visibleCount, onReady]);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 4,
        size: 0.4 + Math.random() * 0.6,
      })),
    []
  );

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-y-auto px-6 pt-36 pb-20 text-center no-scrollbar">
      <div
        className="pointer-events-none fixed h-[460px] w-[460px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(166,99,209,0.3), transparent 70%)" }}
      />

      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="pointer-events-none fixed select-none text-champagne"
          style={{ left: `${s.left}%`, top: `${s.top}%`, fontSize: `${s.size}rem` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
          transition={{ duration: 3, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
      ))}

      <div className="relative z-10 max-w-md space-y-5">
        {PARAGRAPHS.map((p, i) => {
          const isLast = i === PARAGRAPHS.length - 1;
          return (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={visibleCount > i ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className={`whitespace-pre-line font-display text-lg md:text-xl font-light leading-relaxed text-white/90 ${
                isLast ? "text-champagne" : ""
              }`}
              style={
                isLast && visibleCount > i
                  ? { animation: "lastLinePulse 2s ease-in-out infinite" }
                  : undefined
              }
            >
              {p}
            </motion.p>
          );
        })}
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={buttonShown ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        onClick={onNext}
        disabled={!buttonShown}
        className="relative z-10 mt-10 rounded-full border border-champagne/80 bg-champagne/5 px-8 py-3.5 text-sm font-semibold tracking-wide text-champagne backdrop-blur-md transition-all duration-300 hover:bg-champagne hover:text-deep disabled:pointer-events-none"
        style={buttonShown ? { animation: "beginPulse 2.2s ease-in-out infinite" } : undefined}
      >
        ✨ Begin ✨
      </motion.button>

      <style>{`
        @keyframes lastLinePulse {
          0%, 100% { opacity: 1; } 50% { opacity: 0.6; }
        }
        @keyframes beginPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(232,200,128,0.35); }
          50% { box-shadow: 0 0 20px 6px rgba(232,200,128,0.3); }
        }
      `}</style>
    </div>
  );
}
