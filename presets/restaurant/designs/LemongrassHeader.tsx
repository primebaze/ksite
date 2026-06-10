"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Lemongrass palette (baked identity): emerald with chartreuse + chilli accents.
const EMERALD = "#14532D";
const CHARTREUSE = "#A3C847";
const CHILLI = "#D1462F";
const CREAM = "#F7F3E6";

// Sticky header for the Lemongrass design. Over the botanical home hero it is
// transparent (the deep emerald shows through) with cream type and a small
// chartreuse leaf glyph; once scrolled — or on any sub-page via the `solid`
// prop — it settles to a solid emerald bar with a soft shadow and a chartreuse
// hairline underline. Collapses to the shared functional hamburger (MobileNav)
// below lg.
export function LemongrassHeader({
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
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? EMERALD : "transparent",
        boxShadow: scrolled ? "0 10px 30px -12px rgba(0,0,0,0.45)" : "none",
        borderBottom: scrolled ? `1px solid ${CHARTREUSE}55` : "1px solid transparent",
      }}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {/* wordmark with a small chartreuse leaf glyph (links home) */}
        <a href={home} className="pointer-events-auto flex shrink-0 items-center gap-2.5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
            <path
              d="M4 20C4 11 11 4 20 4c0 9-7 16-16 16Z"
              fill={CHARTREUSE}
            />
            <path d="M5 19C9 13 14 9 18 7" stroke={EMERALD} strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: CREAM }}
            className="block whitespace-nowrap text-2xl font-semibold leading-none tracking-tight sm:text-[1.7rem]"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-bold uppercase tracking-[0.16em] lg:flex" style={{ color: CREAM }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative transition hover:text-[color:#A3C847]">{l.label}</a>
          ))}
        </nav>

        {/* desktop reserve button */}
        <a
          href={book}
          className="hidden shrink-0 rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90 lg:inline-flex"
          style={{ background: CHILLI }}
        >
          Reserve
        </a>

        {/* mobile menu (functional) — cream bars on emerald */}
        <div className="lg:hidden [&_button>span]:!bg-[#F7F3E6]">
          <MobileNav links={links} book={book} cta="Reserve a table" />
        </div>
      </div>
    </header>
  );
}
