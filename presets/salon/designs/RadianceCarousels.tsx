"use client";

import { useState } from "react";

const GREEN = "#2f4a3c";
const GOLD = "#a98b54";

// Testimonial carousel for the Radiance design: prev/next state, swipe-friendly
// dots. Fed by a small reviews array derived from our data with a fallback.
export function RadianceTestimonials({
  reviews,
}: {
  reviews: { quote: string; author: string }[];
}) {
  const [i, setI] = useState(0);
  if (reviews.length === 0) return null;
  const n = reviews.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);
  const r = reviews[i];

  return (
    <div className="mx-auto max-w-3xl px-6 text-center">
      <p style={{ color: GOLD, fontFamily: "var(--font-fraunces)" }} className="text-5xl leading-none">&ldquo;</p>
      <blockquote style={{ fontFamily: "var(--font-fraunces)" }} className="mt-2 min-h-[7rem] text-2xl leading-relaxed text-white sm:text-3xl">
        {r.quote}
      </blockquote>
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">{r.author}</p>

      {n > 1 && (
        <div className="mt-10 flex items-center justify-center gap-6">
          <button onClick={() => go(-1)} aria-label="Previous review" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/10">
            &#8592;
          </button>
          <div className="flex gap-2.5">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to review ${idx + 1}`}
                onClick={() => setI(idx)}
                className="h-2 w-2 rounded-full transition"
                style={{ background: idx === i ? "#ffffff" : "rgba(255,255,255,0.35)" }}
              />
            ))}
          </div>
          <button onClick={() => go(1)} aria-label="Next review" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white/10">
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
}

// "Join our community" image slider: a horizontally scrolling row of treatment /
// gallery tiles with prev/next controls. Swipe-friendly (native scroll-snap).
export function RadianceCommunitySlider({
  tiles,
}: {
  tiles: { image: string; label: string; href: string }[];
}) {
  const [scroller, setScroller] = useState<HTMLDivElement | null>(null);
  if (tiles.length === 0) return null;

  const nudge = (d: number) => {
    if (!scroller) return;
    scroller.scrollBy({ left: d * Math.min(360, scroller.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={setScroller}
        className="flex snap-x snap-mandatory gap-1 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {tiles.map((t, idx) => (
          <a
            key={idx}
            href={t.href}
            className="group relative aspect-[3/4] w-[72%] flex-none snap-start overflow-hidden sm:w-[42%] lg:w-[25%]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.image} alt={t.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <span style={{ fontFamily: "var(--font-fraunces)" }} className="absolute inset-x-0 bottom-0 p-5 text-center text-lg text-white">
              {t.label}
            </span>
          </a>
        ))}
      </div>
      {tiles.length > 1 && (
        <>
          <button
            onClick={() => nudge(-1)}
            aria-label="Scroll left"
            className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg shadow-lg transition hover:bg-white sm:flex"
            style={{ color: GREEN }}
          >
            &#8592;
          </button>
          <button
            onClick={() => nudge(1)}
            aria-label="Scroll right"
            className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-lg shadow-lg transition hover:bg-white sm:flex"
            style={{ color: GREEN }}
          >
            &#8594;
          </button>
        </>
      )}
    </div>
  );
}
