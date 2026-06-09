"use client";

import { useState } from "react";

const INK = "#3a3744";

export interface LustreReview {
  name: string;
  when: string;
  body: string;
  initial: string;
  color: string;
}

// Client review carousel for the Lustre aesthetics design: a Google-style card
// strip with prev / next controls, mirroring the reference's testimonial slider.
// Shows three cards on desktop, one on mobile, advancing a window over the array.
export function LustreReviews({ reviews }: { reviews: LustreReview[] }) {
  const [start, setStart] = useState(0);
  const total = reviews.length;
  if (total === 0) return null;

  const go = (dir: number) => setStart((s) => (s + dir + total) % total);
  const windowed = Array.from({ length: Math.min(3, total) }, (_, i) => reviews[(start + i) % total]);

  return (
    <div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {windowed.map((r, i) => (
          <article
            key={`${start}-${i}`}
            className={`bg-white p-6 shadow-sm ring-1 ring-black/5 ${i > 0 ? "hidden sm:block" : ""} ${i > 1 ? "lg:block sm:hidden" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ background: r.color }}
              >
                {r.initial}
              </span>
              <div>
                <p className="text-sm font-semibold text-neutral-800">{r.name}</p>
                <p className="text-xs text-neutral-400">{r.when}</p>
              </div>
            </div>
            <div className="mt-3 text-amber-400" aria-label="5 out of 5 stars">★★★★★</div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">{r.body}</p>
            <p className="mt-3 text-xs text-neutral-400">Posted on Google</p>
          </article>
        ))}
      </div>

      {total > 3 && (
        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            aria-label="Previous reviews"
            onClick={() => go(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border text-lg transition hover:bg-[#3a3744] hover:text-white"
            style={{ borderColor: INK, color: INK }}
          >
            ‹
          </button>
          <button
            aria-label="Next reviews"
            onClick={() => go(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border text-lg transition hover:bg-[#3a3744] hover:text-white"
            style={{ borderColor: INK, color: INK }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
