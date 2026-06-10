"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const STEEL = "#15171b";
const AMBER = "#f5a524";

// Sticky header for the Mason design (bold builder / construction): transparent
// over the dark hero, turns solid charcoal with an amber underline once
// scrolled. Wordmark left, nav centre, amber CTA right; functional hamburger
// below md.
export function MasonHeader({
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
      style={scrolled ? { background: STEEL, borderBottom: `2px solid ${AMBER}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        <a href={home} className="flex items-center gap-2.5">
          <span className="h-7 w-2 -skew-x-12" style={{ background: AMBER }} />
          <span data-edit="tenant.business_name" className="text-lg font-extrabold uppercase tracking-tight [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden gap-8 text-[12px] font-bold uppercase tracking-[0.18em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-sm font-bold text-white/85 transition hover:text-white">{phone}</a>}
          <a href={cta} className="px-6 py-3 text-[12px] font-bold uppercase tracking-[0.16em] text-black transition hover:brightness-105" style={{ background: AMBER }}>{ctaLabel}</a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={STEEL} fg="#ffffff" accent={AMBER} barColor="#ffffff" />
      </div>
    </header>
  );
}
