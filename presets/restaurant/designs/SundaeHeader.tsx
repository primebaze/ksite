"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Joyful gelato-parlour palette (baked identity). Cream bar, cocoa wordmark,
// bubblegum-pink accents. The wordmark sits beside a little scoop-on-cone mark.
const CREAM = "#FCF6EA";
const PINK = "#F4A3C0";
const COCOA = "#4A352C";
const CHERRY = "#E0533B";

// A tiny ice-cream-cone glyph used in the header next to the wordmark, so the
// brand reads instantly as an ice-cream shop even before the hero loads.
function ConeMark() {
  return (
    <svg width="26" height="30" viewBox="0 0 26 30" aria-hidden className="shrink-0">
      <circle cx="13" cy="9" r="8" fill={PINK} />
      <circle cx="9" cy="7" r="1.4" fill="#fff" opacity="0.7" />
      <circle cx="16" cy="11" r="1.1" fill="#fff" opacity="0.55" />
      <path d="M5 15 L21 15 L13 29 Z" fill={CHERRY} />
      <path d="M9 16 L11 22 M14 16 L16 21 M11.5 18 L13 24" stroke="#fff" strokeWidth="0.9" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

// Sticky header for the Sundae design: a rounded floating pill-bar in cream with
// a cocoa wordmark + cone mark on the left and a candy-pink "Book a party"
// button. Transparent (just the floating pill, no heavy shadow) over the home
// hero, gains a soft shadow once scrolled; forced solid on sub-pages via the
// `solid` prop. Collapses to the shared MobileNav hamburger below lg.
export function SundaeHeader({
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border-2 px-4 py-2.5 transition-all duration-300 sm:px-6 ${
          scrolled ? "shadow-[0_14px_40px_-18px_rgba(74,53,44,0.5)]" : "shadow-[0_8px_24px_-16px_rgba(74,53,44,0.35)]"
        }`}
        style={{ background: CREAM, borderColor: COCOA }}
      >
        {/* wordmark + cone (links home) */}
        <a href={home} className="flex shrink-0 items-center gap-2.5">
          <ConeMark />
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: COCOA }}
            className="block whitespace-nowrap text-xl font-bold leading-none tracking-tight sm:text-2xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav
          className="hidden flex-1 items-center justify-center gap-7 text-[12px] font-bold lowercase tracking-wide lg:flex"
          style={{ color: COCOA }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[color:#E0533B]">
              {l.label}
            </a>
          ))}
        </nav>

        {/* desktop book button — chunky pink pill */}
        <a
          href={book}
          className="hidden shrink-0 rounded-full border-2 px-6 py-2.5 text-[12px] font-extrabold lowercase tracking-wide transition hover:-translate-y-0.5 lg:inline-flex"
          style={{ background: PINK, borderColor: COCOA, color: COCOA }}
        >
          book a party
        </a>

        {/* mobile menu (functional) — cocoa bars on cream */}
        <div className="lg:hidden [&_button>span]:!bg-[#4A352C]">
          <MobileNav links={links} book={book} cta="Book a party" />
        </div>
      </div>
    </header>
  );
}
