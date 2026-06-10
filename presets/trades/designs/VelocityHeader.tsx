"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const NIGHT = "#0b0e14";
const CYAN = "#22d3ee";

// Sticky header for the Velocity design (sharp modern garage / EV & detailing):
// glassy and transparent over the hero, settling to a deep-navy bar with a fine
// cyan underline once scrolled. Wordmark left, nav centre, cyan CTA right;
// functional hamburger below md.
export function VelocityHeader({
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
      style={scrolled ? { background: "rgba(11,14,20,0.92)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${CYAN}40` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        <a href={home} className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rotate-45" style={{ background: CYAN }} />
          <span data-edit="tenant.business_name" className="text-lg font-bold uppercase tracking-[0.06em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden gap-8 text-[12px] font-bold uppercase tracking-[0.16em] text-white/80 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#22d3ee]">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-sm font-bold text-white/80 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-md px-6 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0b0e14] transition hover:brightness-110" style={{ background: CYAN }}>{ctaLabel}</a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={NIGHT} fg="#ffffff" accent={CYAN} barColor="#ffffff" />
      </div>
    </header>
  );
}
