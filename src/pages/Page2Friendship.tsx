import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Divider from "../components/Divider";

type Block = { type: "text"; content: string } | { type: "divider" };

const BLOCKS: Block[] = [
  { type: "text", content: "We became friends in September 2025." },
  { type: "divider" },
  {
    type: "text",
    content:
      "We probably argue more than most friends, but somehow that makes every conversation more interesting.",
  },
  { type: "divider" },
  { type: "text", content: "Nothing is ever boring." },
  { type: "divider" },
  { type: "text", content: "Easy. Jolly. Comfortable." },
  { type: "divider" },
  { type: "text", content: "And that's something I genuinely appreciate." },
];

export default function Page2Friendship() {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (visibleCount >= BLOCKS.length) return;
    const t = window.setTimeout(() => setVisibleCount((c) => c + 1), 380);
    return () => window.clearTimeout(t);
  }, [visibleCount]);

  const hearts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 6,
        symbol: Math.random() > 0.5 ? "♡" : "✦",
      })),
    []
  );

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center px-6 text-center overflow-hidden">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="pointer-events-none absolute bottom-0 text-lilac/40 text-lg"
          style={{ left: `${h.left}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: "-100vh", opacity: [0, 0.7, 0] }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "linear" }}
        >
          {h.symbol}
        </motion.span>
      ))}

      <div className="relative z-10 max-w-xl space-y-3">
        {BLOCKS.map((block, i) =>
          block.type === "divider" ? (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={visibleCount > i ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="py-1"
            >
              <Divider />
            </motion.div>
          ) : (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={visibleCount > i ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="font-display text-xl md:text-2xl font-light text-white/90 leading-relaxed"
            >
              {block.content}
            </motion.p>
          )
        )}
      </div>
    </div>
  );
}
