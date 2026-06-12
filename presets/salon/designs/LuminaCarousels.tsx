"use client";

import { useState } from "react";
import type { GalleryImage, TeamMember } from "@/lib/types";

const PLUM = "#7a4f63";
const INK = "#26201c";

// ---- Reviews carousel ----------------------------------------------------
// A small client-side carousel of star reviews (the reference shows a Google
// review strip that auto-advances). Fed by a fixed set of sample testimonials;
// prev/next controls, one card at a time on mobile, a peek of three on desktop.
export type Review = { quote: string; author: string };

export function LuminaReviews({ reviews }: { reviews: Review[] }) {
  const [i, setI] = useState(0);
  const n = reviews.length;
  if (n === 0) return null;
  const go = (d: number) => setI((p) => (p + d + n) % n);
  // Show up to three reviews starting at i, wrapping.
  const shown = [0, 1, 2].map((k) => reviews[(i + k) % n]);

  return (
    <div className="relative">
      <div className="grid gap-6 md:grid-cols-3">
        {shown.map((r, k) => (
          <figure
            key={`${i}-${k}`}
            className={`border bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${k > 0 ? "hidden md:block" : ""}`}
            style={{ borderColor: "#ece2dc" }}
          >
            <div className="flex gap-1 text-sm" style={{ color: PLUM }} aria-hidden>
              {"★★★★★".split("").map((s, si) => (
                <span key={si}>{s}</span>
              ))}
            </div>
            <blockquote className="mt-4 text-[15px] leading-relaxed text-neutral-700">&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption className="mt-5 text-sm font-semibold" style={{ color: INK }}>{r.author}</figcaption>
          </figure>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          aria-label="Previous reviews"
          onClick={() => go(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-neutral-900 hover:text-white"
          style={{ borderColor: INK, color: INK }}
        >
          &#8592;
        </button>
        <button
          aria-label="Next reviews"
          onClick={() => go(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-neutral-900 hover:text-white"
          style={{ borderColor: INK, color: INK }}
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

// ---- Team / experts carousel ---------------------------------------------
// The reference's "Our experts" row is a slider with prev/next arrows and dots.
// Fed by site.team; shows up to three at a time on desktop, one on mobile.
export function LuminaTeamSlider({ team }: { team: TeamMember[] }) {
  const [i, setI] = useState(0);
  const n = team.length;
  if (n === 0) return null;
  const per = 3;
  const pages = Math.max(1, Math.ceil(n / per));
  const go = (d: number) => setI((p) => (p + d + n) % n);
  const shown = Array.from({ length: Math.min(per, n) }, (_, k) => team[(i + k) % n]);

  return (
    <div className="relative">
      <div className="grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((m, k) => (
          <div key={`${m.id}-${i}-${k}`} className={`text-center ${k > 0 ? (k > 1 ? "hidden lg:block" : "hidden sm:block") : ""}`}>
            <div className="mx-auto aspect-[4/5] w-full overflow-hidden bg-neutral-100">
              {m.photo_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
              )}
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: INK }}>{m.name}</p>
            {m.role && <p className="mt-1 text-sm text-neutral-500">{m.role}</p>}
            {m.credentials && <p className="mt-0.5 text-xs text-neutral-400">{m.credentials}</p>}
          </div>
        ))}
      </div>

      {n > 1 && (
        <>
          <button
            aria-label="Previous experts"
            onClick={() => go(-1)}
            className="absolute -left-2 top-1/3 hidden h-11 w-11 items-center justify-center rounded-full border bg-white/90 transition hover:bg-neutral-900 hover:text-white lg:flex"
            style={{ borderColor: INK, color: INK }}
          >
            &#8592;
          </button>
          <button
            aria-label="Next experts"
            onClick={() => go(1)}
            className="absolute -right-2 top-1/3 hidden h-11 w-11 items-center justify-center rounded-full border bg-white/90 transition hover:bg-neutral-900 hover:text-white lg:flex"
            style={{ borderColor: INK, color: INK }}
          >
            &#8594;
          </button>
          <div className="mt-10 flex items-center justify-center gap-3">
            <button
              aria-label="Previous experts"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-neutral-900 hover:text-white lg:hidden"
              style={{ borderColor: INK, color: INK }}
            >
              &#8592;
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: pages }).map((_, p) => (
                <span
                  key={p}
                  className="h-2 w-2 rounded-full transition"
                  style={{ background: Math.floor(i / per) === p ? PLUM : "#d8ccc4" }}
                />
              ))}
            </div>
            <button
              aria-label="Next experts"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-neutral-900 hover:text-white lg:hidden"
              style={{ borderColor: INK, color: INK }}
            >
              &#8594;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
