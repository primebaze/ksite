"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const DARK = "#0d0f12";
const AMBER = "#f5a524";

// Sticky header for the Forge design (bold industrial contractor): transparent
// over the hero, snaps to a solid near-black bar with an amber underline once
// scrolled. Wordmark left, nav centre-right, a hard "Get a quote" button right;
// collapses to a functional hamburger below md.
export function ForgeHeader({
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
      style={scrolled ? { background: DARK, borderBottom: `2px solid ${AMBER}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2">
          <span className="inline-block h-7 w-2.5 skew-x-[-12deg]" style={{ background: AMBER }} />
          <span data-edit="tenant.business_name" className="text-lg font-extrabold uppercase tracking-[0.08em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.18em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="skew-x-[-10deg] px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-black transition hover:brightness-110" style={{ background: AMBER }}>
            <span className="inline-block skew-x-[10deg]">{ctaLabel}</span>
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={DARK} fg="#ffffff" accent={AMBER} />
      </div>
    </header>
  );
}
