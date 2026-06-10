"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#16181D"; // charcoal-ink
const YELLOW = "#FFD21E"; // electric yellow
const BLUE = "#3A6EA5"; // circuit blue

// Sticky header for the Livewire design (sharp, modern electrician). Transparent
// over the charcoal hero, then snaps to a solid charcoal bar with a thin
// electric-yellow circuit underline once scrolled. A small bolt-mark sits before
// the wordmark; nav centre-right, a yellow "Get a quote" pill far right; below md
// it collapses into the shared trades mobile nav.
export function LivewireHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : ""}`}
      style={scrolled ? { background: INK, borderBottom: `2px solid ${YELLOW}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-[5px]" style={{ background: YELLOW }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill={INK} aria-hidden><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" /></svg>
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-extrabold uppercase tracking-[0.1em] [text-shadow:0_1px_10px_rgba(0,0,0,0.4)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.18em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#FFD21E]">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="flex items-center gap-1.5 text-[13px] font-bold tracking-wide text-white/90 transition hover:text-white">
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: BLUE }} />
              {phone}
            </a>
          )}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#16181D] transition hover:brightness-110" style={{ background: YELLOW }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg="#ffffff" accent={YELLOW} />
      </div>
    </header>
  );
}
