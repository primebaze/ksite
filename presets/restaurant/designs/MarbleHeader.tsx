"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

const CHARCOAL = "#1c1a17";
const GOLD = "#c9a227";

// Sticky header for the Marble design: transparent over the dark hero, turns
// solid charcoal with a shadow once the page is scrolled past ~40px (or always,
// when `solid` is set on a sub-page that has no hero behind it). Wordmark left,
// nav centre-right, "Reserve a table" right; collapses to a functional
// hamburger below md. The wordmark links home.
export function MarbleHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-xl" : ""}`}
      style={scrolled ? { background: CHARCOAL } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        {/* wordmark (links home) */}
        <a href={home} className="shrink-0">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: GOLD }}
            className="whitespace-nowrap text-lg font-medium tracking-[0.16em] [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:text-2xl"
          >
            {name.toUpperCase()}
          </span>
        </a>

        {/* desktop nav + CTA */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex gap-7 text-xs font-medium uppercase tracking-[0.18em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-[#c9a227]">{l.label}</a>
            ))}
          </nav>
          <a
            href={book}
            className="border px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm transition hover:bg-[#c9a227] hover:text-[#1c1a17]"
            style={{ borderColor: GOLD, color: GOLD }}
          >
            Reserve a table
          </a>
        </div>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta="Reserve a table" />
      </div>
    </header>
  );
}
