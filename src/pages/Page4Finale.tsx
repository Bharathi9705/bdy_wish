import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const CORNER_FLOWERS = ["🌸", "🌹", "🪷", "🌺"];

const PARAGRAPHS = [
  "I know I tease you a lot.\nWe argue a lot.\nSometimes our conversations\ndon't even make sense 😂",
  "But honestly...\nI'm really glad\nour paths crossed.",
  "And no matter how much\nwe fight or annoy each other,\nyou've become one of those people\nI genuinely enjoy talking to.\n✨",
  "May this year bring you\nmore happiness,\nmore peace,\nmore laughter,\nand countless moments\nthat make life feel beautiful.\n💜",
  "Thank you for taking the time\nto go through all of this.\nAnd thank you\nfor being part of my days.\nTake care of yourself.\nAnd once again...\nHappy Birthday 💜✨",
];

export default function Page4Finale() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHandshake, setShowHandshake] = useState(false);

  useEffect(() => {
    if (visibleCount >= PARAGRAPHS.length) return;
    const t = window.setTimeout(() => setVisibleCount((c) => c + 1), 900);
    return () => window.clearTimeout(t);
  }, [visibleCount]);

  useEffect(() => {
    if (visibleCount < PARAGRAPHS.length) return;
    const t = window.setTimeout(() => setShowFeedback(true), 2600);
    return () => window.clearTimeout(t);
  }, [visibleCount]);

  useEffect(() => {
    if (!showFeedback) return;
    const t = window.setTimeout(() => setShowHandshake(true), 1400);
    return () => window.clearTimeout(t);
  }, [showFeedback]);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 70,
        delay: Math.random() * 4,
        size: 0.5 + Math.random() * 0.7,
      })),
    []
  );

  const petals = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 10 + Math.random() * 8,
        emoji: Math.random() > 0.5 ? "🌸" : "✨",
      })),
    []
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-y-auto px-6 pt-36 pb-20 text-center no-scrollbar">
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="pointer-events-none fixed select-none text-champagne"
          style={{ left: `${s.left}%`, top: `${s.top}%`, fontSize: `${s.size}rem` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.9, 0], scale: [0, 1, 0] }}
          transition={{ duration: 2.5, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          ✦
        </motion.span>
      ))}

      {petals.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none fixed bottom-0 text-lg opacity-70"
          style={{ left: `${p.left}%` }}
          initial={{ y: 0, rotate: 0, opacity: 0 }}
          animate={{ y: "-110vh", rotate: 220, opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
        >
          {p.emoji}
        </motion.span>
      ))}

      <motion.div
        className="pointer-events-none fixed -bottom-6 -left-8 select-none text-6xl md:text-8xl opacity-70"
        style={{ filter: "drop-shadow(0 0 30px rgba(166,99,209,0.5))" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.4 }}
      >
        {CORNER_FLOWERS[0]}
        <span className="ml-[-1.2rem] text-4xl md:text-6xl align-bottom">{CORNER_FLOWERS[2]}</span>
      </motion.div>
      <motion.div
        className="pointer-events-none fixed -bottom-6 -right-8 select-none text-6xl md:text-8xl opacity-70"
        style={{ filter: "drop-shadow(0 0 30px rgba(166,99,209,0.5))" }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.7, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.6 }}
      >
        <span className="mr-[-1.2rem] text-4xl md:text-6xl align-bottom">{CORNER_FLOWERS[3]}</span>
        {CORNER_FLOWERS[1]}
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1 }}
        className="relative z-10 font-display text-4xl md:text-6xl font-light leading-tight text-white"
        style={{ textShadow: "0 0 40px rgba(166,99,209,0.4)" }}
      >
        Happy Birthday,
        <br />
        <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-lilac via-orchid to-champagne">
          Barani 💜
        </span>
      </motion.h1>

      <div className="relative z-10 mt-10 max-w-md space-y-6">
        {PARAGRAPHS.map((p, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={visibleCount > i ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="whitespace-pre-line font-serif italic text-base md:text-lg text-white/85 leading-relaxed"
          >
            {p}
          </motion.p>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={showFeedback ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative z-10 mt-12 whitespace-pre-line font-display text-lg md:text-xl text-champagne"
      >
        {"Okay...\nnow where's my feedback? 😤😂"}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={showHandshake ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.7 }}
        className="relative z-10 mt-6 text-3xl"
      >
        🤝💜
      </motion.p>
    </div>
  );
}
