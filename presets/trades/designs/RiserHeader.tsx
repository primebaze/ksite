"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const CHARCOAL = "#1B1E22";
const HIVIS = "#F6C400";
const OFFWHITE = "#F3F4F2";

// Sticky header for the Riser design (commercial & domestic scaffolding):
// transparent over the structural hero, then snaps to a solid charcoal bar with
// a hazard-stripe underline once scrolled. Wordmark left (with a small coupler
// mark), nav centre-right, a hi-vis "Request a quote" tab right; collapses to a
// hamburger below md. Distinct from Forge's skewed amber bar.
export function RiserHeader({
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

  // Hazard stripe used as the scrolled underline — the scaffold signature.
  const hazard = "repeating-linear-gradient(45deg,#1B1E22 0 10px,#F6C400 10px 20px)";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-2xl" : ""}`}
      style={scrolled ? { background: CHARCOAL } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          {/* coupler mark: a tube node */}
          <span className="relative inline-flex h-7 w-7 items-center justify-center" aria-hidden>
            <span className="absolute inset-0 border-2" style={{ borderColor: HIVIS }} />
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: HIVIS }} />
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-extrabold uppercase tracking-[0.1em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.18em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#1B1E22] transition hover:brightness-105" style={{ background: HIVIS }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={CHARCOAL} fg={OFFWHITE} accent={HIVIS} />
      </div>
      {scrolled && <div className="h-1 w-full" style={{ background: hazard }} />}
    </header>
  );
}
