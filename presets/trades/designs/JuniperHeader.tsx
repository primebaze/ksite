"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const CREAM = "#fbf6ee";
const CLAY = "#bd5b3d";
const COCOA = "#3c2c24";

// Sticky header for the Juniper design (warm gift / concept retail shop): a soft
// cream bar with a hairline that warms once scrolled. Centred serif wordmark,
// nav either side, a clay "Visit us" CTA; functional hamburger below md.
export function JuniperHeader({
  name,
  cta,
  ctaLabel,
  links,
  home = "/",
}: {
  name: string;
  cta: string;
  ctaLabel: string;
  links: { label: string; href: string }[];
  home?: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur transition-colors duration-300"
      style={{ background: scrolled ? "rgba(251,246,238,0.95)" : "rgba(251,246,238,0.7)", borderBottom: `1px solid ${scrolled ? "#3c2c2422" : "#3c2c2410"}` }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <nav className="hidden flex-1 items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.2em] md:flex" style={{ color: "#7a655a" }}>
          {links.slice(0, 2).map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#bd5b3d]">{l.label}</a>
          ))}
        </nav>

        <a href={home} className="flex flex-col items-center text-center md:flex-1">
          <span data-edit="tenant.business_name" className="text-xl tracking-[0.04em] sm:text-2xl" style={{ color: COCOA, fontFamily: "var(--font-fraunces)" }}>{name}</span>
          <span className="mt-0.5 text-[8px] uppercase tracking-[0.4em]" style={{ color: "#a08a7c" }}>Shop</span>
        </a>

        <div className="hidden flex-1 items-center justify-end gap-6 md:flex">
          <nav className="flex items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#7a655a" }}>
            {links.slice(2).map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-[#bd5b3d]">{l.label}</a>
            ))}
          </nav>
          <a href={cta} className="rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CLAY }}>{ctaLabel}</a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={COCOA} fg={CREAM} accent={CLAY} barColor={COCOA} />
      </div>
    </header>
  );
}
