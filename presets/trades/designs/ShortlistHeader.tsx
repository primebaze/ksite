"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INDIGO = "#2A2E7A";
const CORAL = "#FB6E5C";
const INK = "#181A2E";

// Sticky header for the Shortlist design (modern people-focused recruitment
// agency): transparent over the indigo hero, then snaps to a solid off-white bar
// with a coral hairline once scrolled. Wordmark left, nav centre-right, a rounded
// coral "Get in touch" pill right; collapses to a functional hamburger below md
// (overlay uses the indigo palette).
export function ShortlistHeader({
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

  const onLight = scrolled;
  const wordColor = onLight ? INK : "#ffffff";
  const navColor = onLight ? "#4a4d6e" : "rgba(255,255,255,0.82)";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={scrolled ? { background: "#F6F6FB", borderBottom: `2px solid ${CORAL}`, boxShadow: "0 14px 40px -28px rgba(24,26,46,0.55)" } : undefined}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="relative inline-flex h-7 w-7 items-center justify-center" aria-hidden>
            <span className="absolute inline-block h-2.5 w-2.5 rounded-full" style={{ background: CORAL, transform: "translate(-4px,-3px)" }} />
            <span className="absolute inline-block h-2.5 w-2.5 rounded-full" style={{ background: "#6FD3A6", transform: "translate(4px,3px)" }} />
            <span className="absolute h-px w-5 origin-center" style={{ background: onLight ? INDIGO : "#ffffff", transform: "rotate(45deg)" }} />
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-[-0.01em] sm:text-xl" style={{ fontFamily: "var(--font-space)", color: wordColor }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-8 text-[13px] font-semibold md:flex" style={{ color: navColor }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ opacity: 0.92 }}>{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-semibold transition hover:opacity-80" style={{ color: onLight ? INDIGO : "rgba(255,255,255,0.9)" }}>{phone}</a>}
          <a href={cta} className="rounded-full px-5 py-2.5 text-[12px] font-bold tracking-wide text-white transition hover:brightness-105" style={{ background: CORAL }}>{ctaLabel}</a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INDIGO} fg="#ffffff" accent={CORAL} barColor={onLight ? INK : "#ffffff"} />
      </div>
    </header>
  );
}
