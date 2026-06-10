"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const FOREST = "#1E3026"; // deep woodland green
const MOSS = "#8FA06B"; // moss / lichen accent
const CREAM = "#F1EEE3"; // cream

// Sticky header for the Canopy design (tree surgeon / arborist): transparent
// over the woodland hero, then settles into a solid deep-forest bar with a moss
// underline once scrolled. A small concentric tree-ring glyph sits beside the
// wordmark — the recurring signature of the design. Nav centre-right, a moss
// "Free quote" button right; collapses to a functional hamburger below md.
export function CanopyHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_10px_40px_-18px_rgba(0,0,0,0.7)]" : ""}`}
      style={scrolled ? { background: FOREST, borderBottom: `1px solid ${MOSS}66` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
            <circle cx="12" cy="12" r="10" stroke={MOSS} strokeWidth="1.4" />
            <circle cx="12" cy="12" r="6.2" stroke={MOSS} strokeWidth="1.2" opacity="0.8" />
            <circle cx="12" cy="12" r="2.6" stroke={MOSS} strokeWidth="1.1" opacity="0.65" />
            <circle cx="12" cy="12" r="1" fill={MOSS} />
          </svg>
          <span data-edit="tenant.business_name" className="text-lg font-semibold tracking-[0.02em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-semibold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition hover:brightness-105" style={{ background: MOSS, color: FOREST }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={FOREST} fg={CREAM} accent={MOSS} />
      </div>
    </header>
  );
}
