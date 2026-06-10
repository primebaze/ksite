"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const SLATE = "#34423A"; // deep slate-green
const SAND = "#B89B6E"; // warm sandstone
const STONE = "#CFC6B4"; // natural stone

// Sticky header for the Terrace design (design-led landscaping & garden-design
// studio): transparent over the editorial garden hero, then settles to a solid
// slate-green bar with a fine sandstone hairline once scrolled. A small enclosed
// square mark sits left of the wordmark; nav centre-right; a refined outlined
// "Book a consultation" link right. Collapses to the shared trades hamburger.
export function TerraceHeader({
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
      style={scrolled ? { background: SLATE, borderBottom: `1px solid ${SAND}66` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-white sm:px-8">
        <a href={home} className="flex items-center gap-3">
          <span aria-hidden className="grid h-8 w-8 place-items-center border" style={{ borderColor: STONE }}>
            <span className="block h-2 w-2 rotate-45" style={{ background: SAND }} />
          </span>
          <span data-edit="tenant.business_name" className="text-[17px] font-medium uppercase tracking-[0.26em] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] sm:text-lg" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[11px] font-medium uppercase tracking-[0.2em] text-white/85 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-medium tracking-wide text-white/85 transition hover:text-white">{phone}</a>}
          <a href={cta} className="border px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white hover:text-[#34423A]" style={{ borderColor: STONE, color: "#ffffff" }}>
            {ctaLabel}
          </a>
        </div>

        <div className="lg:hidden">
          <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={SLATE} fg="#F2EEE4" accent={SAND} />
        </div>
      </div>
    </header>
  );
}
