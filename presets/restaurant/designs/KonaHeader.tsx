"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Coastal poke-bar palette (baked identity). Ocean-teal bar with a sand
// wordmark; a coral "Order ahead" pill.
const TEAL = "#0E7C86";
const NAVY = "#123A52";
const CORAL = "#F2755C";
const SAND = "#F4E9D6";

// Sticky header for the Kona design. Transparent over the ocean hero (just a
// soft gradient so the headline reads), then sinks to a solid teal bar with a
// shadow once scrolled; forced solid on sub-pages via the `solid` prop. A thin
// wave-clipped bottom edge gives the bar its coastal signature. Collapses to a
// functional hamburger (shared MobileNav) below lg.
export function KonaHeader({
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

  // Over the hero we float on a translucent gradient; once scrolled / on
  // sub-pages we ride a solid teal bar.
  const barStyle = scrolled
    ? { background: TEAL }
    : { background: "linear-gradient(to bottom, rgba(18,58,82,0.42), rgba(18,58,82,0))" };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-[0_6px_24px_rgba(18,58,82,0.25)]" : ""}`}
      style={barStyle}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        {/* wordmark (links home) — small bowl-circle bullet + name */}
        <a href={home} className="flex shrink-0 items-center gap-2.5">
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-full text-sm"
            style={{ background: CORAL, color: SAND }}
          >
            <span className="block h-2.5 w-2.5 rounded-full" style={{ background: SAND }} />
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: SAND }}
            className="block whitespace-nowrap text-2xl font-semibold leading-none tracking-tight sm:text-3xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-bold uppercase tracking-[0.16em] lg:flex" style={{ color: SAND }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white hover:opacity-100 opacity-85">{l.label}</a>
          ))}
        </nav>

        {/* desktop order button */}
        <a
          href={book}
          className="hidden shrink-0 rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90 lg:inline-flex"
          style={{ background: CORAL }}
        >
          Order ahead
        </a>

        {/* mobile menu (functional) — sand bars on the teal/translucent bar */}
        <div className="lg:hidden [&_button>span]:!bg-[#F4E9D6]">
          <MobileNav links={links} book={book} cta="Order ahead" />
        </div>
      </div>

      {/* wave signature along the bottom edge (only on the solid bar) */}
      {scrolled && (
        <svg
          aria-hidden
          viewBox="0 0 1200 12"
          preserveAspectRatio="none"
          className="block h-2 w-full"
          style={{ color: NAVY }}
        >
          <path d="M0 6 Q 75 0 150 6 T 300 6 T 450 6 T 600 6 T 750 6 T 900 6 T 1050 6 T 1200 6 V12 H0 Z" fill="currentColor" opacity="0.18" />
        </svg>
      )}
    </header>
  );
}
