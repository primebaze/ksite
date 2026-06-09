"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Bright all-day-diner palette (baked identity). Coral header, dark wordmark.
const CORAL = "#f4a7a3";
const INK = "#3a322f";

// Sticky header for the Meadow design: a flat coral bar with a dark condensed
// wordmark on the left, the nav in the middle/right and a filled "Book a table"
// button. Transparent (coral, no shadow) over the home hero, gains a shadow once
// scrolled; forced solid on sub-pages via the `solid` prop. Collapses to a
// functional hamburger (shared MobileNav) below md.
export function MeadowHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={{ background: CORAL }}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        {/* wordmark (links home) */}
        <a href={home} className="pointer-events-auto shrink-0">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: INK }}
            className="block whitespace-nowrap text-2xl font-semibold leading-none tracking-tight sm:text-3xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-[0.14em] lg:flex" style={{ color: INK }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>
          ))}
        </nav>

        {/* desktop book button */}
        <a
          href={book}
          className="hidden shrink-0 rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90 lg:inline-flex"
          style={{ background: INK }}
        >
          Book a table
        </a>

        {/* mobile menu (functional) — dark bars on coral */}
        <div className="lg:hidden [&_button>span]:!bg-[#3a322f]">
          <MobileNav links={links} book={book} cta="Book a table" />
        </div>
      </div>
    </header>
  );
}
