"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const FOREST = "#2B3A34";
const BRASS = "#B68A4E";
const MARBLE = "#F7F4EE";

// Sticky header for the Culina design (bespoke kitchen design & installation
// studio). Transparent over the aspirational hero, then settles to a soft
// off-white marble bar with a hairline brass rule once scrolled. Serif-feel
// wordmark with a small brass diamond mark left, light-spaced nav centre-right,
// a pill "Book a consultation" CTA right; collapses to a hamburger below md.
export function CulinaHeader({
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

  const onLight = scrolled;
  const fg = onLight ? FOREST : "#ffffff";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={onLight ? { background: MARBLE, borderBottom: `1px solid ${BRASS}55`, boxShadow: "0 10px 30px -22px rgba(43,58,52,0.55)" } : undefined}
    >
      {!onLight && <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/45 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-3">
          <span className="inline-block h-3 w-3 rotate-45" style={{ border: `1.5px solid ${BRASS}`, background: onLight ? "transparent" : "rgba(182,138,78,0.25)" }} />
          <span data-edit="tenant.business_name" className="text-[19px] font-medium tracking-[0.16em] uppercase sm:text-[21px]" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-medium uppercase tracking-[0.22em] md:flex" style={{ color: onLight ? "#4a574f" : "rgba(255,255,255,0.85)" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ opacity: 0.85 }}>{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-medium tracking-wide transition hover:opacity-70" style={{ color: fg }}>{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:brightness-105" style={{ background: BRASS, color: "#1e2a25" }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={FOREST} fg="#F7F4EE" accent={BRASS} barColor={fg} />
      </div>
    </header>
  );
}
