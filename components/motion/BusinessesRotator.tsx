"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

// Hero headline: a still "For Businesses:" with the type quickly scrolling
// through in a fixed-width clipped slot — "For Businesses: Cafés",
// "…: Salons", … The slot is sized to the widest word so nothing shifts.
export function BusinessesRotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const longest = words.reduce((a, b) => (b.length >= a.length ? b : a), "");

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), 1200);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className="inline-flex items-baseline justify-center whitespace-nowrap">
      <span className="text-white/90">For Businesses:</span>
      <span className="relative ml-[0.32em] inline-grid overflow-hidden pb-[0.12em] text-emerald-400">
        {/* invisible sizer holds the slot at the widest word's width so the line
            never reflows and nothing else moves as words scroll through. */}
        <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden>
          {longest}
        </span>
        <AnimatePresence initial={false}>
          <motion.span
            key={words[i]}
            className="col-start-1 row-start-1 inline-block whitespace-nowrap"
            initial={{ y: "1em", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-1em", opacity: 0 }}
            transition={{ duration: 0.32, ease: EASE }}
          >
            {words[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </span>
  );
}
