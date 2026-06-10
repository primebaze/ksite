"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Gilded palette (baked identity): a glamorous art-deco cocktail lounge. Near-
// black bar over the midnight hero, champagne-gold wordmark and hairline, an
// ivory geometric nav.
const BLACK = "#0E0E10";
const GOLD = "#CBA14B";
const IVORY = "#EFE7D6";

// Sticky header for the Gilded design: transparent over the deco hero (only a
// faint gradient and a high-tracking serif wordmark flanked by a thin gold
// rule), then settles to a solid near-black bar with a champagne underline once
// scrolled. Forced solid on sub-pages via the `solid` prop. Collapses to the
// shared MobileNav (full-screen overlay) below lg.
export function GildedHeader({
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
        background: scrolled ? BLACK : "transparent",
        borderBottom: `1px solid ${scrolled ? `${GOLD}55` : "transparent"}`,
        boxShadow: scrolled ? "0 18px 50px -28px rgba(0,0,0,0.85)" : "none",
      }}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-4 sm:px-9">
        {/* wordmark (links home) — high-tracking serif flanked by a gold diamond */}
        <a href={home} className="flex shrink-0 items-center gap-3">
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="hidden sm:block">
            <path d="M5 0 L10 5 L5 10 L0 5 Z" fill={GOLD} />
          </svg>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: IVORY }}
            className="block whitespace-nowrap text-2xl font-normal uppercase leading-none tracking-[0.22em] sm:text-[1.6rem]"
          >
            {name}
          </span>
        </a>

        {/* desktop nav — ivory, wide deco tracking */}
        <nav className="hidden flex-1 items-center justify-center gap-9 text-[10px] font-medium uppercase tracking-[0.3em] lg:flex" style={{ color: `${IVORY}cc` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#CBA14B]">{l.label}</a>
          ))}
        </nav>

        {/* desktop reserve — solid champagne deco button */}
        <a
          href={book}
          className="hidden shrink-0 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] transition hover:brightness-110 lg:inline-flex"
          style={{ background: GOLD, color: BLACK }}
        >
          Reserve a table
        </a>

        {/* mobile menu (functional) — gold bars on black */}
        <div className="lg:hidden [&_button>span]:!bg-[#CBA14B]">
          <MobileNav links={links} book={book} cta="Reserve a table" />
        </div>
      </div>
    </header>
  );
}
