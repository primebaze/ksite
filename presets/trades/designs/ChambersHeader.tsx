"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const NAVY = "#16263F"; // deep legal navy
const BRASS = "#B08A4A"; // brass / gold rule
const PARCH = "#F2ECE0"; // warm parchment

// Sticky header for the Chambers design (established solicitor / law firm):
// transparent over the navy hero, then settles into a solid navy bar with a
// fine brass underline once scrolled. A serif wordmark sits left with a
// "Solicitors" eyebrow, the nav is centre-right in restrained small-caps, and a
// brass "Request a consultation" button anchors the right. Collapses to the
// shared trades hamburger below md.
export function ChambersHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_10px_40px_-24px_rgba(0,0,0,0.7)]" : ""}`}
      style={scrolled ? { background: NAVY, borderBottom: `1px solid ${BRASS}66` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-3">
          <span className="inline-block h-9 w-px" style={{ background: BRASS }} />
          <span className="leading-none">
            <span data-edit="tenant.business_name" className="block text-lg font-medium tracking-[0.01em] [text-shadow:0_1px_10px_rgba(0,0,0,0.4)] sm:text-xl" style={{ fontFamily: "var(--font-fraunces)" }}>{name}</span>
            <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.42em]" style={{ color: BRASS }}>Solicitors</span>
          </span>
        </a>

        <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-medium tracking-wide text-white/85 transition hover:text-white">{phone}</a>}
          <a href={cta} className="px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:brightness-110" style={{ background: BRASS, color: NAVY }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={NAVY} fg={PARCH} accent={BRASS} />
      </div>
    </header>
  );
}
