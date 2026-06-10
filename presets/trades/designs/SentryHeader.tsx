"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const TEAL = "#1C3F3A";
const AMBER = "#E8A22B";

// Sticky header for the Sentry design (professional pest-control specialist):
// transparent over the deep-teal hero, then snaps to a solid teal bar with an
// amber hairline once scrolled. A small shield mark sits beside the wordmark.
// Wordmark left, nav centre-right, an amber "Request a quote" pill + phone
// right; collapses to the shared trades mobile nav below md.
export function SentryHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_10px_30px_-18px_rgba(0,0,0,0.6)]" : ""}`}
      style={scrolled ? { background: TEAL, borderBottom: `1px solid ${AMBER}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full" style={{ background: "rgba(255,255,255,0.08)", border: `1px solid ${AMBER}` }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 2.5l7 2.6v6c0 4.6-3 8.2-7 10.4-4-2.2-7-5.8-7-10.4v-6l7-2.6z" stroke={AMBER} strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4.2" stroke={AMBER} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-[0.02em] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[13px] font-semibold tracking-[0.02em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition hover:brightness-105" style={{ background: AMBER, color: TEAL }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={TEAL} fg="#ffffff" accent={AMBER} />
      </div>
    </header>
  );
}
