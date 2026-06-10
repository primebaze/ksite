"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const NAVY = "#102A43";
const WATER = "#2C8FE0";
const COPPER = "#C26B3E";

// Sticky header for the Pipeworks design (plumber & heating engineer): floats
// transparent over the deep marine-navy hero, then condenses to a frosted white
// bar with a thin water-blue underline once scrolled. A small copper drop mark +
// wordmark sit left, pill nav centre, a phone + rounded "Get a quote" pill right;
// below md a water-blue call button and the shared trades hamburger overlay.
export function PipeworksHeader({
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

  const fg = scrolled ? NAVY : "#ffffff";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? { background: "rgba(247,250,252,0.92)", backdropFilter: "blur(10px)", borderBottom: `2px solid ${WATER}`, boxShadow: "0 8px 30px rgba(16,42,67,0.10)" }
          : undefined
      }
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0a1d2e]/70 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-2.5">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full" style={{ background: scrolled ? WATER : "#ffffff" }}>
            {/* water drop */}
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden fill={scrolled ? "#ffffff" : NAVY}>
              <path d="M12 2.5c3.6 4.2 6.5 7.9 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.4 8.4 6.7 12 2.5z" />
            </svg>
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-[0.01em] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav
          className="hidden items-center gap-1 rounded-full px-2 py-1.5 text-[12px] font-semibold tracking-[0.04em] md:flex"
          style={scrolled ? { background: "rgba(16,42,67,0.05)" } : { background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.18)" }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3.5 py-1.5 transition hover:opacity-100" style={{ opacity: 0.85 }}>{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide transition hover:opacity-80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
              {phone}
            </a>
          )}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[12px] font-bold tracking-[0.02em] text-white shadow-sm transition hover:brightness-110" style={{ background: COPPER }}>{ctaLabel}</a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={NAVY} fg="#ffffff" accent={COPPER} barColor={fg} />
      </div>
    </header>
  );
}
