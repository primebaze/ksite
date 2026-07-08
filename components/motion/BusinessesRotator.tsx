"use client";

import { useEffect, useState } from "react";

// Hero headline: a STILL "For Businesses:" with only the green word swapping in
// place. The word sits in a slot whose width is fixed to the widest word, so
// "For Businesses:" never moves as the word rotates (no re-centring jiggle).
// The word is anchored to the left of the slot (right after the colon) and
// rises in via a CSS keyframe (word-rise in globals.css) re-fired by the React
// key change — no animation runtime.
export function BusinessesRotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const longest = words.reduce((a, b) => (b.length >= a.length ? b : a), "");

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), 2000);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className="inline-flex items-baseline justify-center gap-x-[0.3em] whitespace-nowrap">
      <span className="text-ink/90">For Businesses:</span>
      <span className="relative inline-grid justify-items-start overflow-hidden pb-[0.12em] text-left align-baseline text-accent">
        {/* invisible sizer holds the slot at the widest word's width so the line
            never reflows and "For Businesses:" stays put. */}
        <span className="invisible col-start-1 row-start-1 whitespace-nowrap" aria-hidden>
          {longest}
        </span>
        <span
          key={words[i]}
          className="col-start-1 row-start-1 inline-block whitespace-nowrap"
          style={{ animation: "word-rise 0.32s cubic-bezier(0.22, 0.61, 0.36, 1) both" }}
        >
          {words[i]}
        </span>
      </span>
    </span>
  );
}
