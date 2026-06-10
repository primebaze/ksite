"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const GARDEN = "#234B30"; // deep garden green
const GRASS = "#6FAE54"; // fresh grass
const CREAM = "#F4F1E6"; // warm cream

// Sticky header for the Greenscape design (garden-maintenance / lawn-care):
// transparent over the green outdoor hero, then snaps to a solid deep-garden
// bar with a grass-green underline once scrolled. A small leaf mark sits left of
// the wordmark; nav centre-right; a rounded "Get a quote" pill right. Collapses
// to the shared trades hamburger below md.
export function GreenscapeHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={scrolled ? { background: GARDEN, borderBottom: `3px solid ${GRASS}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-full" style={{ background: GRASS }}>
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={GARDEN} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 3c-7 0-12 4-12 11 0 0 0 .5.1 1.2C12 12 16 10 16 10s-3.5 3-5.5 6.8C10 18 11 19 13 19c7 0 8-9 8-16Z" />
              <path d="M3 21c1.5-3.5 4-6 7-7.5" />
            </svg>
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-extrabold tracking-[0.01em] [text-shadow:0_1px_8px_rgba(0,0,0,0.35)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.16em] text-white/90 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.14em] transition hover:brightness-105" style={{ background: GRASS, color: GARDEN }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={GARDEN} fg={CREAM} accent={GRASS} />
      </div>
    </header>
  );
}
