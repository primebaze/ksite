"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

// Industry-standard rotating word: a clipped one-line mask through which the
// current word slides up and out while the next slides up into place. Only one
// word is present at a time (mode "wait") so the box always sizes to the word
// and never clips it horizontally; the leading space keeps it off "for".
export function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className="relative inline-flex overflow-hidden whitespace-nowrap pb-[0.12em] align-bottom text-emerald-400">
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
  );
}
