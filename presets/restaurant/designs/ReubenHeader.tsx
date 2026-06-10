"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Vintage NYC deli palette (baked identity): deli green bar, cream wordmark,
// mustard accent, a thin awning-stripe ribbon along the bottom edge.
const DELI = "#2F5D50";
const MUSTARD = "#E0A526";
const CREAM = "#F3ECDC";
const INK = "#2A211A";

// Awning-stripe ribbon: alternating cream/green diagonal bands, the signature
// deli-storefront motif. Used as the header's bottom rule.
const AWNING = `repeating-linear-gradient(45deg, ${CREAM} 0 12px, ${DELI} 12px 24px)`;

// Sticky header for the Reuben deli design. Transparent over the home hero (the
// deli-green wordmark plate floats on the painted-sign hero), then drops to a
// solid deli-green enamel bar once scrolled; forced solid on sub-pages via the
// `solid` prop. A cream slab/serif wordmark sits on a small mustard-edged
// "enamel pin" plate. Collapses to the shared MobileNav below lg.
export function ReubenHeader({
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
      className="fixed inset-x-0 top-0 z-50 transition-[background,box-shadow] duration-300"
      style={{
        background: scrolled ? DELI : "transparent",
        boxShadow: scrolled ? "0 6px 20px rgba(42,33,26,0.25)" : "none",
      }}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* wordmark on an enamel-pin plate (links home) */}
        <a href={home} className="pointer-events-auto shrink-0">
          <span
            data-edit="tenant.business_name"
            style={{
              fontFamily: "var(--font-fraunces)",
              color: CREAM,
              background: scrolled ? "transparent" : DELI,
              borderColor: MUSTARD,
            }}
            className={`block whitespace-nowrap border-2 px-3 py-1 text-xl font-bold leading-none tracking-[0.01em] sm:text-2xl ${scrolled ? "!border-transparent !bg-transparent px-0" : ""}`}
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-bold uppercase tracking-[0.16em] lg:flex" style={{ color: CREAM }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[color:#E0A526]">{l.label}</a>
          ))}
        </nav>

        {/* desktop order/book button — mustard enamel chip */}
        <a
          href={book}
          className="hidden shrink-0 border-2 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[color:#2A211A] transition hover:opacity-90 lg:inline-flex"
          style={{ background: MUSTARD, borderColor: INK, borderRadius: "2px" }}
        >
          Order ahead
        </a>

        {/* mobile menu (functional) — cream bars on deli green */}
        <div className="lg:hidden [&_button>span]:!bg-[#F3ECDC]">
          <MobileNav links={links} book={book} cta="Order ahead" />
        </div>
      </div>
      {/* awning-stripe ribbon along the bottom edge */}
      <div className="h-1.5 w-full" style={{ backgroundImage: AWNING, opacity: scrolled ? 1 : 0.9 }} aria-hidden />
    </header>
  );
}
