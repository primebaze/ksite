"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const CHARCOAL = "#211C1A";
const EMBER = "#E2622E";
const CREAM = "#F5EFE6";

// Sticky header for the Radiate design (warm heating & boiler specialist):
// transparent over the charcoal hero, then snaps to a solid charcoal bar with an
// ember underline once scrolled. The wordmark carries a small radiating-heat glyph
// (concentric warmth arcs) — the design's signature motif. Wordmark left, nav
// centre-right, a rounded ember "Get a quote" pill right; collapses to a hamburger
// below md via the shared TradesMobileNav.
export function RadiateHeader({
  name,
  cta,
  ctaLabel,
  phone,
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  cta: string;
  ctaLabel: string;
  phone?: string;
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-xl" : ""}`}
      style={scrolled ? { background: CHARCOAL, borderBottom: `1px solid ${EMBER}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center" aria-hidden>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
              <circle cx="16" cy="16" r="3.4" fill={EMBER} />
              <path d="M16 9.5a6.5 6.5 0 0 1 6.5 6.5" stroke={EMBER} strokeWidth="1.7" strokeLinecap="round" opacity="0.85" />
              <path d="M16 5.5a10.5 10.5 0 0 1 10.5 10.5" stroke="#F2B45C" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
              <path d="M16 22.5A6.5 6.5 0 0 1 9.5 16" stroke={EMBER} strokeWidth="1.7" strokeLinecap="round" opacity="0.85" />
              <path d="M16 26.5A10.5 10.5 0 0 1 5.5 16" stroke="#F2B45C" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
            </svg>
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-extrabold uppercase tracking-[0.07em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.16em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white transition hover:brightness-110" style={{ background: EMBER }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={CHARCOAL} fg={CREAM} accent={EMBER} />
      </div>
    </header>
  );
}
