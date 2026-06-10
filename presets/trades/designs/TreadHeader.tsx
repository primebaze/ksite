"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const BLACK = "#17191C";
const ORANGE = "#F26A1B";

// Sticky header for the Tread design (fast value tyre & fitting centre):
// transparent over the black hero, snaps to a solid tyre-black bar with a
// hi-vis-orange underline once scrolled. A small concentric-rim wheel mark sits
// beside the wordmark. Wordmark left, nav centre-right, an orange "Book a
// fitting" pill + phone right; collapses to a functional hamburger below md.
export function TreadHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-2xl" : ""}`}
      style={scrolled ? { background: BLACK, borderBottom: `3px solid ${ORANGE}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
            <circle cx="12" cy="12" r="10.5" stroke={ORANGE} strokeWidth="1.6" />
            <circle cx="12" cy="12" r="6" stroke="#ffffff" strokeWidth="1.4" />
            <circle cx="12" cy="12" r="2" fill={ORANGE} />
          </svg>
          <span data-edit="tenant.business_name" className="text-lg font-extrabold uppercase tracking-[0.1em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.18em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-black transition hover:brightness-110" style={{ background: ORANGE }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={BLACK} fg="#ffffff" accent={ORANGE} />
      </div>
    </header>
  );
}
