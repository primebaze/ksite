"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#0D0E12"; // near-black bar
const INDIGO = "#4B6BFB"; // electric accent
const PAPER = "#F4F4F2"; // off-white

// Sticky header for the Pixel design (modern web/product design studio):
// transparent over the dark hero, snaps to a solid near-black bar with a faint
// hairline + a tiny pixel-grid wordmark mark once scrolled. Wordmark left, nav
// centre-right, a pill "Start a project" button right; collapses to the shared
// trades mobile nav below md.
export function PixelHeader({
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

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={scrolled ? { background: "rgba(13,14,18,0.86)", borderBottom: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span aria-hidden className="grid h-6 w-6 shrink-0 grid-cols-2 grid-rows-2 gap-[2px]">
            <span style={{ background: INDIGO }} />
            <span style={{ background: "#34D6B4" }} />
            <span style={{ background: "rgba(255,255,255,0.28)" }} />
            <span style={{ background: INDIGO }} />
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-[-0.01em] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[13px] font-medium text-white/75 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden md:flex">
          <a href={cta} className="rounded-full px-5 py-2.5 text-[12px] font-semibold tracking-wide text-white transition hover:brightness-110" style={{ background: INDIGO }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg={PAPER} accent={INDIGO} />
      </div>
    </header>
  );
}
