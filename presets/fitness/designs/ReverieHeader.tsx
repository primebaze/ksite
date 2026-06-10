"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const PLUM = "#4A2E45";
const INK = "#241620";
const GOLD = "#C8A15A";
const CREAM = "#F6EFE9";

// Sticky header for the Reverie design (graceful artistic dance studio):
// transparent over the plum hero, easing to a solid deep-plum bar with a thin
// dusty-gold barre rule once scrolled. A small ribbon glyph sits beside the
// wordmark; nav is a refined letter-spaced serif; the CTA is a gold pill-less
// outline that fills on solid. Mobile uses the shared overlay nav.
export function ReverieHeader({
  name,
  cta,
  ctaHref,
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  cta: string;
  ctaHref: string;
  links: { label: string; href: string }[];
  home?: string;
  solid?: boolean;
}) {
  const [scrolled, setScrolled] = useState(solid);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "shadow-[0_18px_50px_-30px_rgba(36,22,32,0.9)]" : ""}`}
      style={scrolled ? { background: PLUM, borderBottom: `1px solid ${GOLD}66` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-[#F6EFE9] sm:px-8 sm:py-6">
        <a href={home} className="flex items-center gap-3">
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full" style={{ border: `1px solid ${GOLD}` }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" aria-hidden>
              <path d="M4 16c4-9 12-9 16 0M4 8c4 9 12 9 16 0" />
            </svg>
          </span>
          <span data-edit="tenant.business_name" className="font-display text-xl tracking-[0.14em] [text-shadow:0_1px_14px_rgba(0,0,0,0.35)]" style={{ fontFamily: "var(--font-fraunces)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] uppercase tracking-[0.26em] md:flex" style={{ color: "#F6EFE9CC" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden rounded-full px-7 py-2.5 text-[11px] uppercase tracking-[0.24em] transition hover:opacity-90 md:inline-flex"
          style={scrolled ? { background: GOLD, color: INK } : { border: `1px solid ${GOLD}`, color: CREAM }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={PLUM} fg="#F6EFE9" accent={GOLD} />
      </div>
    </header>
  );
}
