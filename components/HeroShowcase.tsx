"use client";

import { useContext, useEffect, useState } from "react";
import { PreviewVideo } from "./PreviewVideo";
import { StoryReelContext } from "./ScrollZoom";

// A rotating product reel: best-selling business types, each shown as a website
// hero built from a looping video plus a headline overlay. Only the active
// slide's video decodes, so the homepage stays light on mobile.
const SLIDES: { key: string; video: string; name: string; tag: string; cta: string }[] = [
  { key: "restaurant", video: "/hero/restaurant.mp4", name: "The Copper Fork", tag: "Restaurant", cta: "Book a table" },
  { key: "hair_salon", video: "/hero/hair.mp4", name: "The Chair Co.", tag: "Hair Studio", cta: "Book appointment" },
  { key: "gym", video: "/hero/gym.mp4", name: "Ironworks Gym", tag: "Strength & Conditioning", cta: "Start free trial" },
];

export function HeroShowcase() {
  const [i, setI] = useState(0);
  const story = useContext(StoryReelContext);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % SLIDES.length), 7000);
    return () => clearInterval(t);
  }, []);
  // Tell the scroll-story which video is on screen so its mobile backdrop matches.
  useEffect(() => {
    story?.setActiveVideo(SLIDES[i].video);
  }, [i, story]);

  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.02] shadow-[0_40px_120px_-25px_rgba(0,0,0,0.85)]">
      <div className="flex items-center gap-2 border-b border-ink/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-2 flex items-center gap-1.5 rounded-md bg-ink/[0.06] px-3 py-1 text-xs text-ink/40">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M6 10V8a6 6 0 1112 0v2m-9 0h6a3 3 0 013 3v5a3 3 0 01-3 3H9a3 3 0 01-3-3v-5a3 3 0 013-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          your custom domain
        </span>
      </div>
      <div className="grid">
        {SLIDES.map((s, idx) => (
          <div
            key={s.key}
            style={{ gridArea: "1 / 1" }}
            className={`relative aspect-video transition-opacity duration-700 ${idx === i ? "opacity-100" : "pointer-events-none opacity-0"}`}
            aria-hidden={idx !== i}
          >
            <PreviewVideo
              src={s.video}
              active={idx === i}
              className="absolute inset-0 h-full w-full object-cover opacity-70 [filter:saturate(0.8)_brightness(0.85)]"
            />
            <div className="absolute inset-0 bg-paper/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-paper/85 via-paper/40 to-paper/20" />
            <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6 sm:p-10">
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink/45 sm:text-xs">{s.tag}</p>
              <h3 className="max-w-xl text-3xl font-semibold tracking-tight text-ink/65 drop-shadow-[0_2px_18px_rgba(0,0,0,0.45)] sm:text-5xl">
                {s.name}
              </h3>
              <div className="mt-1">
                <span className="inline-flex rounded-full bg-ink/85 px-5 py-2 text-sm font-semibold text-paper/80">{s.cta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
