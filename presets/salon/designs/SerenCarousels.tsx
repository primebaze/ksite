"use client";

import { useEffect, useState } from "react";

const ROSE = "#cf9583";
const INK = "#2c2622";

// ---- Hero photo slider ----------------------------------------------------
// Faithful to the reference's full-width hero slider: a stack of cover images
// that cross-fade, with prev/next arrows and slide dots. Fed by our gallery
// (falls back to the hero image alone). The title + Book Now overlay is passed
// in as children so the design owns the copy and editable hooks.
export function SerenHeroSlider({
  slides,
  children,
}: {
  slides: string[];
  children: React.ReactNode;
}) {
  const [i, setI] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => setI((p) => (p + 1) % count), 6000);
    return () => clearInterval(t);
  }, [count]);

  const go = (n: number) => setI(((n % count) + count) % count);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-neutral-200">
      {slides.map((src, idx) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={idx}
          src={src}
          alt=""
          data-edit-image={idx === 0 ? "hero" : undefined}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms]"
          style={{ opacity: idx === i ? 1 : 0 }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />

      <div className="relative z-10 w-full px-6 sm:px-10">{children}</div>

      {count > 1 && (
        <>
          <button
            aria-label="Previous slide"
            onClick={() => go(i - 1)}
            className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/30 text-white backdrop-blur transition hover:bg-white/50 sm:left-6"
          >
            ‹
          </button>
          <button
            aria-label="Next slide"
            onClick={() => go(i + 1)}
            className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/30 text-white backdrop-blur transition hover:bg-white/50 sm:right-6"
          >
            ›
          </button>
          <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-2.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to slide ${idx + 1}`}
                onClick={() => go(idx)}
                className="h-2.5 w-2.5 rounded-full transition"
                style={{ background: idx === i ? "#fff" : "rgba(255,255,255,0.45)" }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}

// ---- Reviews carousel -----------------------------------------------------
// Recreates the reference's "What our customers say" review slider: cards that
// page three-at-a-time on desktop (one on mobile), with dots. Static design
// copy (no brand names, no lorem) since reviews are not part of tenant data.
export interface SerenReview {
  quote: string;
  author: string;
}

export function SerenReviews({ reviews }: { reviews: SerenReview[] }) {
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const set = () => setPerView(window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  const pages = Math.max(1, Math.ceil(reviews.length / perView));
  const safePage = Math.min(page, pages - 1);
  const start = safePage * perView;
  const shown = reviews.slice(start, start + perView);

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((r, idx) => (
          <figure
            key={`${safePage}-${idx}`}
            className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-[0_10px_30px_rgba(44,38,34,0.07)]"
          >
            <div className="flex gap-0.5" aria-hidden style={{ color: ROSE }}>
              {Array.from({ length: 5 }).map((_, s) => (
                <span key={s}>★</span>
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-600">
              {r.quote}
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold" style={{ color: INK }}>
              {r.author}
            </figcaption>
          </figure>
        ))}
      </div>

      {pages > 1 && (
        <div className="mt-9 flex justify-center gap-2.5">
          {Array.from({ length: pages }).map((_, idx) => (
            <button
              key={idx}
              aria-label={`Reviews page ${idx + 1}`}
              onClick={() => setPage(idx)}
              className="h-2.5 w-2.5 rounded-full transition"
              style={{ background: idx === safePage ? ROSE : "rgba(207,149,131,0.35)" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---- FAQ accordion --------------------------------------------------------
export interface SerenFaq {
  q: string;
  a: string;
}

export function SerenFaqAccordion({ items }: { items: SerenFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-neutral-200 border-y border-neutral-200">
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx}>
            <button
              onClick={() => setOpen(isOpen ? null : idx)}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-[15px] font-medium" style={{ color: INK }}>
                {it.q}
              </span>
              <span
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-lg leading-none text-white transition"
                style={{ background: ROSE, transform: isOpen ? "rotate(45deg)" : "none" }}
                aria-hidden
              >
                +
              </span>
            </button>
            {isOpen && <p className="pb-6 pr-12 text-sm leading-relaxed text-neutral-600">{it.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
