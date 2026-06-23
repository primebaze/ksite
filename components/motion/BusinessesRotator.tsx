"use client";

import { useEffect, useState } from "react";

// Hero headline: a still "For Businesses:" with the type quickly scrolling
// through in a fixed-width clipped slot — "For Businesses: Cafés",
// "…: Salons", … The slot is sized to the widest word so nothing shifts.
//
// Each new word rises into the slot via a CSS keyframe (word-rise in
// globals.css), re-triggered by the React key change — no motion runtime, so
// the homepage hero ships no animation library.
export function BusinessesRotator({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const longest = words.reduce((a, b) => (b.length >= a.length ? b : a), "");

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % words.length), 1200);
    return () => clearInterval(t);
  }, [words.length]);

  return (
    <span className="inline-flex items-baseline justify-center whitespace-nowrap">
      <span className="text-ink/90">For Businesses:</span>
      <span className="relative ml-[0.32em] inline-grid overflow-hidden pb-[0.12em] text-accent">
        {/* invisible sizer holds the slot at the widest word's width so the line
            never reflows and nothing else moves as words scroll through. */}
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
