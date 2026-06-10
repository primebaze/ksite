"use client";

import { useState } from "react";

// Functional mobile menu shared by the fitness designs: a hamburger that opens
// a full-screen overlay of nav links; taps close it. Shown only below md. The
// palette is themed per-design via props so each layout keeps its own colours.
export function FitnessMobileNav({
  links,
  cta,
  ctaHref,
  bg = "#0c0e12",
  fg = "#ffffff",
  accent = "#ffffff",
  barColor,
}: {
  links: { label: string; href: string }[];
  cta: string;
  ctaHref: string;
  bg?: string;
  fg?: string;
  accent?: string;
  /** Colour of the hamburger bars over the (possibly light) header. */
  barColor?: string;
}) {
  const [open, setOpen] = useState(false);
  const bar = barColor ?? fg;

  return (
    <div className="md:hidden">
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="flex flex-col gap-1.5">
        <span className="h-0.5 w-7" style={{ background: bar }} />
        <span className="h-0.5 w-7" style={{ background: bar }} />
        <span className="h-0.5 w-7" style={{ background: bar }} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col px-8 py-7 backdrop-blur" style={{ background: bg, color: fg }}>
          <div className="flex justify-end">
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-4xl font-light leading-none">×</button>
          </div>
          <nav className="mt-14 flex flex-col gap-7 text-2xl font-semibold uppercase tracking-[0.12em]">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="transition hover:opacity-70">{l.label}</a>
            ))}
          </nav>
          <a
            href={ctaHref}
            onClick={() => setOpen(false)}
            className="mt-auto px-6 py-4 text-center text-sm font-bold uppercase tracking-[0.18em] transition hover:opacity-90"
            style={{ background: accent, color: bg }}
          >
            {cta}
          </a>
        </div>
      )}
    </div>
  );
}
