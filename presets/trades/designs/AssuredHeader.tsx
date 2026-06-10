"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const BLUE = "#173A6B"; // deep trust-blue
const AMBER = "#E6A537"; // confident amber accent
const CLOUD = "#F4F7FB"; // cloud white

// Sticky header for the Assured design (independent insurance broker): sits
// transparent over the deep trust-blue hero, then snaps to a solid blue bar
// with a fine amber underline once scrolled. Wordmark + small shield mark left,
// nav centre-right, an amber "Get a quote" pill right; collapses to the shared
// trades hamburger below md.
export function AssuredHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_10px_40px_-18px_rgba(10,25,50,0.6)]" : ""}`}
      style={scrolled ? { background: BLUE, borderBottom: `2px solid ${AMBER}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/30 to-transparent" />}
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <svg width="24" height="26" viewBox="0 0 24 26" aria-hidden className="shrink-0">
            <path d="M12 2 L21 5.4 V12 c0 6.3-3.9 10.2-9 12-5.1-1.8-9-5.7-9-12 V5.4 L12 2Z" fill="none" stroke={AMBER} strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M8 13 l2.6 2.6 L16 9.8" fill="none" stroke="#ffffff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-[0.04em] [text-shadow:0_1px_10px_rgba(0,0,0,0.35)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-semibold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.14em] transition hover:brightness-105" style={{ background: AMBER, color: BLUE }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={BLUE} fg={CLOUD} accent={AMBER} />
      </div>
    </header>
  );
}
