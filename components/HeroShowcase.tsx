"use client";

import { useEffect, useState } from "react";
import { TemplateThumb } from "./TemplateThumb";

// A rotating product shot: cycles through different business types every 2s,
// some with a photo hero, some with a looping video hero. All slides preload
// and crossfade so there's no reload flicker.
const SLIDES: { key: string; img?: string; video?: string }[] = [
  { key: "spa", video: "/hero/hero1.mp4" },
  { key: "restaurant", img: "1517248135467-4c7edcad34c4" },
  { key: "hair_salon", img: "1560066984-138dadb4c035" },
  { key: "steakhouse", video: "/hero/hero2.mp4" },
  { key: "bakery", img: "1509440159596-0249088772ff" },
  { key: "aesthetics_clinic", video: "/hero/hero3.mp4" },
];

function srcFor(s: (typeof SLIDES)[number]) {
  let u = `/samples/${s.key}?embed=1`;
  if (s.img) u += `&img=${s.img}`;
  if (s.video) u += `&video=${encodeURIComponent(s.video)}`;
  return u;
}

export function HeroShowcase() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 2600);
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
