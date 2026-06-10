"use client";

import { useState } from "react";

// Functional mobile menu shared by the education designs: a hamburger that
// opens a full-screen overlay of nav links; taps close it. Shown only below md.
// Colours are passed in so each design can match its baked palette.
export function EduMobileNav({
  links,
  cta,
  ctaLabel = "Get started",
  barColor = "#111111",
  panelBg = "#ffffff",
  panelText = "#111111",
  ctaBg = "#111111",
  ctaText = "#ffffff",
}: {
  links: { label: string; href: string }[];
  cta: string;
  ctaLabel?: string;
  barColor?: string;
  panelBg?: string;
  panelText?: string;
  ctaBg?: string;
  ctaText?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="flex flex-col gap-1.5">
        <span className="h-0.5 w-6" style={{ background: barColor }} />
        <span className="h-0.5 w-6" style={{ background: barColor }} />
        <span className="h-0.5 w-6" style={{ background: barColor }} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col px-8 py-7 backdrop-blur" style={{ background: panelBg, color: panelText }}>
          <div className="flex justify-end">
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-4xl font-light leading-none">×</button>
          </div>
          <nav className="mt-14 flex flex-col gap-7 text-2xl font-semibold">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="transition hover:opacity-70">{l.label}</a>
            ))}
          </nav>
          <a
            href={cta}
            onClick={() => setOpen(false)}
            className="mt-auto px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] transition hover:opacity-90"
            style={{ background: ctaBg, color: ctaText }}
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </div>
  );
}
