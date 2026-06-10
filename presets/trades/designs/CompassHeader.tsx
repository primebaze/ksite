"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const TEAL = "#14463E"; // deep teal-green
const GOLD = "#C2A04C"; // warm gold accent
const CREAM = "#F4F0E7"; // cream

// Sticky header for the Compass design (calm financial-planning / wealth firm):
// transparent over the deep-teal hero, then settles into a solid cream bar with
// a teal wordmark and a hairline gold rule once scrolled. A small compass-rose
// mark sits beside the name; nav centre-right; a gold "Book a consultation"
// button right. Collapses to a functional drawer below md via TradesMobileNav.
export function CompassHeader({
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

  const onCream = scrolled;
  const fg = onCream ? TEAL : CREAM;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${onCream ? "shadow-[0_8px_30px_-18px_rgba(20,70,62,0.45)]" : ""}`}
      style={onCream ? { background: CREAM, borderBottom: `1px solid ${GOLD}55` } : undefined}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-2.5">
          <CompassMark color={onCream ? GOLD : GOLD} ring={fg} />
          <span data-edit="tenant.business_name" className="text-lg font-semibold tracking-[0.04em] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[13px] font-medium tracking-[0.02em] md:flex" style={{ color: onCream ? "#3c4f48" : "#e9efe9" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ opacity: 0.85 }}>{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-medium tracking-wide transition hover:opacity-80" style={{ color: fg }}>{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-105" style={{ background: GOLD, color: TEAL }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={TEAL} fg={CREAM} accent={GOLD} barColor={fg} />
      </div>
    </header>
  );
}

// Small compass-rose mark — a gold four-point star inside a thin ring. The
// signature glyph of the Compass identity, reused at small scale in the header.
function CompassMark({ color, ring }: { color: string; ring: string }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      <circle cx="12" cy="12" r="10.5" fill="none" stroke={ring} strokeWidth="1" opacity="0.5" />
      <path d="M12 3.5 L13.5 10.5 L20.5 12 L13.5 13.5 L12 20.5 L10.5 13.5 L3.5 12 L10.5 10.5 Z" fill={color} />
      <circle cx="12" cy="12" r="1.3" fill={ring} />
    </svg>
  );
}
