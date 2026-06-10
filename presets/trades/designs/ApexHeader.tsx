"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const CARBON = "#0a0c10";
const RED = "#e11d2a";

// Sticky header for the Apex design (sleek automotive / performance garage):
// transparent over the hero, snaps to a glassy carbon bar with a thin red
// underline once scrolled. Wordmark left, nav centre, a red "Book in" button
// right; collapses to a functional hamburger below md.
export function ApexHeader({
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
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={scrolled ? { background: "rgba(10,12,16,0.85)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${RED}66` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="h-6 w-1 -skew-x-12" style={{ background: RED }} />
          <span data-edit="tenant.business_name" className="text-lg font-bold uppercase italic tracking-tight sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/80 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-semibold tracking-wide text-white/85 transition hover:text-white">{phone}</a>}
          <a href={cta} className="-skew-x-12 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-110" style={{ background: RED }}>
            <span className="inline-block skew-x-12">{ctaLabel}</span>
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={CARBON} fg="#ffffff" accent={RED} />
      </div>
    </header>
  );
}
