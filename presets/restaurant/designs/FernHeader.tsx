"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Fern — warm-neutral plant-based palette (baked identity). Over the oat hero
// the header is transparent with charcoal type; once scrolled (or on sub-pages
// via `solid`) it settles onto an off-white bar with a hairline charcoal seam.
const INK = "#26241F";
const GREEN = "#2C4A3A";
const OFFWHITE = "#F7F2E9";

// Sticky header for the Fern design. A wide, quiet bar: a small pressed-leaf
// mark beside a serif wordmark on the left, letter-spaced nav centred, and a
// thin "Reserve" link on the right. Transparent over the home hero (which is
// already oat, so type stays charcoal), gaining a hairline border + off-white
// fill once scrolled; forced solid on sub-pages. Collapses to the shared
// MobileNav (functional hamburger) below lg.
export function FernHeader({
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
      className="fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300"
      style={{
        background: scrolled ? OFFWHITE : "transparent",
        borderColor: scrolled ? `${INK}1f` : "transparent",
      }}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:py-5">
        {/* wordmark with a small pressed-leaf mark (links home) */}
        <a href={home} className="flex shrink-0 items-center gap-2.5">
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden className="shrink-0">
            <path d="M7 19V5" stroke={GREEN} strokeWidth="1.2" />
            <path d="M7 6C7 6 1 5 1 1C1 1 7 1 7 6Z" fill={GREEN} />
            <path d="M7 9C7 9 13 8 13 4C13 4 7 4 7 9Z" fill={GREEN} />
          </svg>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: INK }}
            className="block whitespace-nowrap text-2xl font-normal leading-none tracking-[0.04em] sm:text-3xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-8 text-[11px] font-medium uppercase tracking-[0.2em] lg:flex" style={{ color: INK }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[color:#2C4A3A]">{l.label}</a>
          ))}
        </nav>

        {/* desktop reserve link — a thin charcoal-ruled chip */}
        <a
          href={book}
          className="hidden shrink-0 border px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] transition hover:bg-[color:#2C4A3A] hover:text-[#F7F2E9] lg:inline-flex"
          style={{ borderColor: `${INK}40`, color: INK }}
        >
          Reserve
        </a>

        {/* mobile menu (functional) — charcoal bars on oat */}
        <div className="lg:hidden [&_button>span]:!bg-[#26241F]">
          <MobileNav links={links} book={book} cta="Reserve a table" />
        </div>
      </div>
    </header>
  );
}
