"use client";

import { useEffect, useState } from "react";
import { TemplateThumb } from "./TemplateThumb";

// A rotating product reel: best-selling business types, each shown with a
// looping video hero. Slides preload and crossfade so there's no flicker.
const SLIDES: { key: string; video: string; name: string }[] = [
  { key: "restaurant", video: "/hero/restaurant.mp4", name: "Nonna's Kitchen" },
  { key: "cafe", video: "/hero/cafe.mp4", name: "Maple & Bean" },
  { key: "hair_salon", video: "/hero/hair.mp4", name: "The Chair Co." },
  { key: "gym", video: "/hero/gym.mp4", name: "Ironworks Gym" },
];

function srcFor(s: (typeof SLIDES)[number]) {
  // Bold full-bleed layout: big headline over the video hero.
  return `/samples/${s.key}?embed=1&style=bold&video=${encodeURIComponent(s.video)}&name=${encodeURIComponent(s.name)}`;
}

export function HeroShowcase() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_40px_120px_-25px_rgba(0,0,0,0.85)]">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 flex items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1 text-xs text-white/40">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M6 10V8a6 6 0 1112 0v2m-9 0h6a3 3 0 013 3v5a3 3 0 01-3 3H9a3 3 0 01-3-3v-5a3 3 0 013-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          your custom domain
        </span>
      </div>
      <div className="grid">
        {SLIDES.map((s, idx) => (
          <div
            key={s.key}
            style={{ gridArea: "1 / 1" }}
            className={`transition-opacity duration-700 ${idx === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={idx !== i}
          >
            <TemplateThumb src={srcFor(s)} aspect={0.56} />
          </div>
        ))}
      </div>
    </div>
  );
}
