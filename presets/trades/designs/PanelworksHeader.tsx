"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#15181C";
const RED = "#D23B2E";
const WHITE = "#F4F6F7";

// Sticky header for the Panelworks design (accident-repair bodyshop): transparent
// over the graphite workshop hero, then snaps to a solid deep-ink bar with a thin
// factory-red rule once scrolled. A small paint-chip mark sits beside the
// wordmark — the design's colour-match signature. Right side carries a phone +
// a square "Get a quote" button; collapses to the shared trades hamburger below md.
export function PanelworksHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-2xl" : ""}`}
      style={scrolled ? { background: INK, borderBottom: `2px solid ${RED}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="flex gap-1" aria-hidden>
            <span className="h-6 w-1.5 rounded-[1px]" style={{ background: RED }} />
            <span className="h-6 w-1.5 rounded-[1px]" style={{ background: "#AEB6BD" }} />
            <span className="h-6 w-1.5 rounded-[1px]" style={{ background: WHITE }} />
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-bold uppercase tracking-[0.12em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-semibold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition hover:brightness-110" style={{ background: RED }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg="#ffffff" accent={RED} />
      </div>
    </header>
  );
}
