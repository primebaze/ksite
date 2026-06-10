"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const ESPRESSO = "#34291F";
const IVORY = "#F5F1EA";
const TEAL = "#41706B";

// Sticky header for the Parquet design (flooring supply & fit specialist):
// transparent over the ivory/greige room-led hero, then snaps to a solid ivory
// bar with an espresso wordmark and a thin teal hairline once scrolled. A small
// herringbone chevron mark sits beside the name. Wordmark left, nav centre, a
// teal "Request a quote" pill right; collapses to a functional hamburger below md.
export function ParquetHeader({
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

  const fg = scrolled ? ESPRESSO : ESPRESSO;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={
        scrolled
          ? { background: IVORY, borderBottom: `1px solid ${TEAL}40`, boxShadow: "0 1px 24px rgba(52,41,31,0.07)" }
          : undefined
      }
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#34291F1a] to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-2.5">
          {/* herringbone chevron mark */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
            <path d="M3 14l5-9 2 4-5 9z" fill={TEAL} />
            <path d="M11 14l5-9 2 4-5 9z" fill={TEAL} opacity="0.55" />
          </svg>
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-[0.02em] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.16em] md:flex" style={{ color: `${fg}cc` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-semibold tracking-wide transition hover:opacity-70" style={{ color: fg }}>{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-110" style={{ background: TEAL }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={ESPRESSO} fg={IVORY} accent={TEAL} barColor={fg} />
      </div>
    </header>
  );
}
