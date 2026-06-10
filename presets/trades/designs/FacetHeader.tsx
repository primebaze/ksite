"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#0B0B0D"; // deep ink bar
const GOLD = "#C9A86A"; // champagne gold
const IVORY = "#F4F1EA"; // ivory text

// Sticky header for the Facet design (fine jeweller / bespoke goldsmith):
// transparent over the near-black hero, then settles into a deep-ink bar with a
// fine champagne-gold hairline once scrolled. A tiny faceted-gem glyph sits
// beside a spaced wordmark; nav centre, an outlined "Book an appointment" CTA
// right; collapses to the shared trades hamburger below md.
export function FacetHeader({
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
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={scrolled ? { background: INK, borderBottom: `1px solid ${GOLD}55` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8" style={{ color: IVORY }}>
        <a href={home} className="flex items-center gap-2.5">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className="shrink-0">
            <path d="M5 3h14l3 5-10 13L2 8z" fill="none" stroke={GOLD} strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M2 8h20M9 3 7 8l5 13 5-13-2-5M7 8l5 4 5-4" fill="none" stroke={GOLD} strokeWidth="0.9" strokeOpacity="0.75" strokeLinejoin="round" />
          </svg>
          <span data-edit="tenant.business_name" className="text-base font-medium uppercase tracking-[0.32em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-lg" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[11px] font-medium uppercase tracking-[0.26em] md:flex" style={{ color: `${IVORY}cc` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[12px] font-medium tracking-[0.08em] transition hover:text-white" style={{ color: `${IVORY}e0` }}>{phone}</a>}
          <a href={cta} className="border px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.24em] transition hover:bg-white/5" style={{ borderColor: `${GOLD}99`, color: GOLD }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg={IVORY} accent={GOLD} barColor={IVORY} />
      </div>
    </header>
  );
}
