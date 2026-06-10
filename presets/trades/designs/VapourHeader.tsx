"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#110D18";
const PINK = "#E0399A";
const LILAC = "#F4F0FA";

// Sticky header for the Vapour design (modern vibrant vape shop): transparent
// over the neon charcoal-purple hero, then snaps to a solid deep-ink bar with a
// magenta glow underline once scrolled. Glowing dot + wordmark left, nav
// centre-right, a pink "Reserve in store" pill right; collapses to a functional
// hamburger below md.
export function VapourHeader({
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
      style={scrolled ? { background: "rgba(17,13,24,0.92)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${PINK}55`, boxShadow: `0 10px 40px -22px ${PINK}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: PINK, boxShadow: `0 0 12px ${PINK}, 0 0 4px ${PINK}` }} />
          <span data-edit="tenant.business_name" className="text-lg font-extrabold tracking-[0.02em] [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] sm:text-xl" style={{ fontFamily: "var(--font-space)", color: LILAC }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.18em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#2BD4C4]">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-110" style={{ background: PINK, boxShadow: `0 0 22px -4px ${PINK}` }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg={LILAC} accent={PINK} />
      </div>
    </header>
  );
}
