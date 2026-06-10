"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#221A12"; // deep timber ink
const WALNUT = "#5A3E2B"; // rich walnut
const OAK = "#B98A52"; // warm oak accent
const CREAM = "#EFE6D6"; // sawdust cream

// Sticky header for the Heartwood design (bespoke carpenter & joiner). Floats
// transparent over the warm timber hero, then settles into a solid walnut-ink
// bar carrying a fine oak hairline once scrolled. A small dovetail glyph sits
// beside the wordmark; nav is centre-right with a "Request a quote" pill. Below
// md it collapses to the shared trades hamburger overlay.
export function HeartwoodHeader({
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
      style={scrolled ? { background: INK, borderBottom: `1px solid ${OAK}55`, boxShadow: "0 10px 30px rgba(34,26,18,0.35)" } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8" style={{ color: CREAM }}>
        <a href={home} className="flex items-center gap-2.5">
          {/* dovetail joint glyph */}
          <svg width="26" height="20" viewBox="0 0 26 20" aria-hidden className="shrink-0">
            <path d="M1 1h7l2 4h6l2-4h7v18h-7l-2-4h-6l-2 4H1z" fill="none" stroke={OAK} strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <span data-edit="tenant.business_name" className="text-lg font-semibold tracking-[0.14em] [text-shadow:0_1px_8px_rgba(0,0,0,0.4)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-medium uppercase tracking-[0.2em] md:flex" style={{ color: `${CREAM}cc` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ opacity: 0.85 }}>{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-medium tracking-wide transition hover:opacity-100" style={{ opacity: 0.9 }}>{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:brightness-105" style={{ background: OAK, color: INK }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg={CREAM} accent={OAK} barColor={CREAM} />
      </div>
    </header>
  );
}
