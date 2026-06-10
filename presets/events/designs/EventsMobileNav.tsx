"use client";

import { useState } from "react";

// Functional mobile menu shared across the EVENTS & CREATIVE designs: a
// hamburger that opens a full-screen overlay of nav links; taps close it. Shown
// only below md. Colours are passed in so each design can match its palette.
export function EventsMobileNav({
  links,
  cta,
  ctaLabel = "Enquire",
  bg = "#0c0c0e",
  fg = "#ffffff",
  accent = "#ffffff",
  barColor,
}: {
  links: { label: string; href: string }[];
  cta: string;
  ctaLabel?: string;
  /** Overlay background. */
  bg?: string;
  /** Overlay text colour. */
  fg?: string;
  /** CTA / accent colour. */
  accent?: string;
  /** Hamburger bar colour (defaults to fg). */
  barColor?: string;
}) {
  const [open, setOpen] = useState(false);
  const bar = barColor ?? fg;

  return (
    <div className="md:hidden">
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="flex flex-col gap-1.5">
        <span className="h-0.5 w-6" style={{ background: bar }} />
        <span className="h-0.5 w-6" style={{ background: bar }} />
        <span className="h-0.5 w-6" style={{ background: bar }} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col px-8 py-7 backdrop-blur" style={{ background: bg, color: fg }}>
          <div className="flex justify-end">
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-4xl font-light leading-none">×</button>
          </div>
          <nav className="mt-14 flex flex-col gap-8 text-2xl font-medium uppercase tracking-[0.16em]">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="transition hover:opacity-70">{l.label}</a>
            ))}
          </nav>
          <a
            href={cta}
            onClick={() => setOpen(false)}
            className="mt-auto px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] transition hover:opacity-90"
            style={{ background: accent, color: bg }}
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </div>
  );
}
