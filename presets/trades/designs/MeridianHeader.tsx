"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#1a1d22";
const GOLD = "#9a7b4f";

// Sticky header for the Meridian design (refined, photo-led premium services):
// transparent over the hero, snaps to a crisp white bar with a hairline once
// scrolled. Wordmark left, nav centre, an outlined "Enquire" button right;
// collapses to a functional hamburger below md.
export function MeridianHeader({
  name,
  cta,
  ctaLabel,
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  cta: string;
  ctaLabel: string;
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

  const dark = !scrolled;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={scrolled ? { background: "rgba(255,255,255,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #ececec" } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />}
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href={home}>
          <span data-edit="tenant.business_name" className="text-xl font-medium tracking-tight" style={{ color: dark ? "#fff" : INK, fontFamily: "var(--font-fraunces)", textShadow: dark ? "0 1px 12px rgba(0,0,0,0.5)" : undefined }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.16em] md:absolute md:left-1/2 md:flex md:-translate-x-1/2" style={{ color: dark ? "rgba(255,255,255,0.85)" : "#4a4f57" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-70" style={dark ? { textShadow: "0 1px 10px rgba(0,0,0,0.5)" } : undefined}>{l.label}</a>
          ))}
        </nav>

        <a href={cta} className="hidden border px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition md:inline-flex" style={dark ? { borderColor: "rgba(255,255,255,0.5)", color: "#fff" } : { borderColor: GOLD, color: GOLD }}>{ctaLabel}</a>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg="#ffffff" accent={GOLD} barColor={dark ? "#ffffff" : INK} />
      </div>
    </header>
  );
}
