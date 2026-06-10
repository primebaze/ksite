"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const OFFWHITE = "#F3EFE8";
const WALNUT = "#4A3B2E";
const CLAY = "#C08763";
const INK = "#2A2722";

// Sticky header for the Abode design (calm, curated homeware & interiors shop):
// sits transparent over the light editorial hero, then settles onto a soft
// off-white bar with a hairline and faint shadow once scrolled. Wordmark left
// with a small "homeware" eyebrow, quiet uppercase nav centre-right, a slim
// outlined "Reserve" pill right; collapses to the shared hamburger below md.
export function AbodeHeader({
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
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_10px_40px_-30px_rgba(42,39,34,0.6)]" : ""}`}
      style={scrolled ? { background: "rgba(243,239,232,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid #e2d8c8" } : undefined}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8" style={{ color: INK }}>
        <a href={home} className="flex flex-col leading-none">
          <span data-edit="tenant.business_name" className="text-xl font-medium tracking-[0.02em] sm:text-2xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
          <span className="mt-1 text-[9px] uppercase tracking-[0.4em]" style={{ color: CLAY }}>Homeware &amp; Interiors</span>
        </a>

        <nav className="hidden items-center gap-9 text-[11px] font-medium uppercase tracking-[0.24em] md:flex" style={{ color: WALNUT }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#C08763]">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex">
          <a href={cta} className="inline-flex rounded-full border px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] transition hover:bg-[#4A3B2E] hover:text-[#F3EFE8]" style={{ borderColor: WALNUT, color: WALNUT }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={OFFWHITE} fg={INK} accent={WALNUT} barColor={INK} />
      </div>
    </header>
  );
}
