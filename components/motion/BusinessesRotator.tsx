"use client";

import { useEffect, useState } from "react";

// Hero headline: "For Businesses:" followed by a word that rises in and rotates
// through the list. The word sizes to itself — so short words ("Shops") don't
// leave an awkward gap and long ones ("Restaurants") aren't cramped — and the
// phrase wraps the word to a second line on narrow screens instead of
// overflowing. The rise is a CSS keyframe (word-rise in globals.css), re-fired
// by the React key change, so the hero ships no animation runtime.
export function BusinessesRotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className="inline-flex items-baseline justify-center gap-x-[0.3em] whitespace-nowrap">
      <span className="text-ink/90">For Businesses:</span>
      <span className="relative inline-block overflow-hidden pb-[0.12em] align-baseline text-accent">
        <span
          key={words[i]}
          className="inline-block whitespace-nowrap"
          style={{ animation: "word-rise 0.32s cubic-bezier(0.22, 0.61, 0.36, 1) both" }}
        >
          {words[i]}
        </span>
      </span>
    </span>
  );
}
