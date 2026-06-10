"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const NAVY = "#182433";
const GREEN = "#2E9E5B";
const WHITE = "#F4F6F4";

// Sticky header for the Roadworthy design (clean, trustworthy MOT & service
// centre): transparent over the navy hero, snaps to a solid clean-white bar
// with a pass-green underline once scrolled. A small "MOT" pass-roundel sits by
// the wordmark; nav centre-right, a green "Book your MOT" button right; collapses
// to a functional hamburger below md.
export function RoadworthyHeader({
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

  const fg = scrolled ? NAVY : "#ffffff";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_2px_20px_rgba(24,36,51,0.1)]" : ""}`}
      style={scrolled ? { background: WHITE, borderBottom: `3px solid ${GREEN}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-2.5">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-extrabold uppercase tracking-[0.04em]"
            style={{ background: GREEN, color: "#ffffff", fontFamily: "var(--font-space)" }}
          >
            MOT
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-extrabold uppercase tracking-[0.04em] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.16em] md:flex" style={{ color: scrolled ? "#5C6671" : "#ffffffcc" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ color: "inherit" }}>{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide transition hover:opacity-80" style={{ color: fg }}>{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-white transition hover:brightness-110" style={{ background: GREEN }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={NAVY} fg="#ffffff" accent={GREEN} barColor={fg} />
      </div>
    </header>
  );
}
