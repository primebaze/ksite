"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Hero headline rotator: opens as a centred "Businesses", which then eases to
// the left as a ": <type>" reveals beside it and cycles — "Businesses: Cafe",
// "Businesses: Salon", … The type rides an industry-standard clipped slide.
export function BusinessesRotator({ words }: { words: string[] }) {
  const [revealed, setRevealed] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setRevealed(true), 1000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!revealed) return;
    const t = setInterval(() => setI((p) => (p + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [revealed, words.length]);

  return (
    <motion.span
      layout
      transition={{ duration: 0.6, ease: EASE }}
      className="inline-flex items-baseline justify-center whitespace-nowrap"
    >
      <span className="text-white/90">Businesses</span>
      <AnimatePresence>
        {revealed && (
          <motion.span
            layout
            initial={{ opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="inline-flex items-baseline"
          >
            <span className="text-white/90">:</span>
            <span className="relative ml-[0.32em] inline-flex overflow-hidden whitespace-nowrap pb-[0.14em] text-emerald-400">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={words[i]}
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.42, ease: EASE }}
                >
                  {words[i]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.span>
  );
}
