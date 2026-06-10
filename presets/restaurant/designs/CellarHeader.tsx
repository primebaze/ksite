"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Cellar palette (baked identity): a nocturnal natural wine bar. Charcoal header
// over the moody hero, oat wordmark, muted-gold hairline.
const CHARCOAL = "#1A1720";
const OAT = "#E7DECF";
const GOLD = "#B79653";

// Sticky header for the Cellar design: transparent over the candle-lit hero
// (only a faint gradient and a fine serif wordmark), then settles to a solid
// charcoal bar with a thin gold underline once scrolled. Forced solid on
// sub-pages via the `solid` prop. Collapses to the shared MobileNav (full-screen
// overlay) below lg.
export function CellarHeader({
  name,
  book,
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
  home?: string;
  /** Force the solid background (used on sub-pages with no hero behind it). */
  solid?: boolean;
}) {
  const [scrolled, setScrolled] = useState(solid);

  useEffect(() => {
    if (solid) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={{
        background: scrolled ? CHARCOAL : "transparent",
        borderBottom: `1px solid ${scrolled ? `${GOLD}40` : "transparent"}`,
        boxShadow: scrolled ? "0 18px 50px -28px rgba(0,0,0,0.7)" : "none",
      }}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-4 sm:px-9">
        {/* wordmark (links home) — fine serif, light tracking on dark */}
        <a href={home} className="shrink-0">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: OAT }}
            className="block whitespace-nowrap text-2xl font-normal leading-none tracking-[0.04em] sm:text-[1.7rem]"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-9 text-[11px] font-medium uppercase tracking-[0.24em] lg:flex" style={{ color: `${OAT}cc` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#C98F86]">{l.label}</a>
          ))}
        </nav>

        {/* desktop reserve link — thin gold-outlined pill, understated */}
        <a
          href={book}
          className="hidden shrink-0 border px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.26em] transition hover:bg-[#B79653] hover:text-[#1A1720] lg:inline-flex"
          style={{ borderColor: GOLD, color: OAT }}
        >
          Reserve
        </a>

        {/* mobile menu (functional) — oat bars on charcoal */}
        <div className="lg:hidden [&_button>span]:!bg-[#E7DECF]">
          <MobileNav links={links} book={book} cta="Reserve a table" />
        </div>
      </div>
    </header>
  );
}
