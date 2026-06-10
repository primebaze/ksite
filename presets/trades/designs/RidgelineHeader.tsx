"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const SLATE = "#34404C"; // slate grey-blue
const INK = "#1F262C"; // charcoal ink
const TILE = "#C45A3B"; // warm terracotta-tile accent
const PAPER = "#F3F1EC"; // off-white

// Sticky header for Ridgeline (roofer). Sits transparent over the slate hero
// with a thin ridge-line motif underneath the bar, then snaps to a solid slate
// bar on scroll. Wordmark left under a small chevron/ridge glyph, centred nav,
// a terracotta "Get a quote" pill right. Collapses to the shared mobile nav.
export function RidgelineHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_30px_rgba(31,38,44,0.25)]" : ""}`}
      style={scrolled ? { background: SLATE } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1F262C]/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          {/* ridge / roof apex glyph */}
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden className="shrink-0">
            <path d="M2 14L13 4l11 10" stroke={TILE} strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" />
            <path d="M6.5 18L13 12.5 19.5 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" opacity="0.85" />
          </svg>
          <span data-edit="tenant.business_name" className="text-lg font-bold uppercase tracking-[0.16em] [text-shadow:0_1px_10px_rgba(31,38,44,0.45)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-semibold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] transition hover:brightness-110" style={{ background: TILE, color: PAPER }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg="#ffffff" accent={TILE} />
      </div>
      {/* ridge-line baseline motif */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px" style={{ background: scrolled ? "rgba(255,255,255,0.14)" : "transparent" }} />
    </header>
  );
}
