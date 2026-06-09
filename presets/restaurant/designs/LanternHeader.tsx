"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

const NEAR_BLACK = "#141210";
const RED = "#c1272d";

// Sticky header for the Lantern design: transparent over the dark hero, turns
// solid near-black with a shadow once the page is scrolled. On sub-pages (no
// hero behind it) pass `solid` to force the solid background from the start.
// Wordmark left (links home), nav centre-right, a "Book a table" button right;
// collapses to a functional hamburger below md.
export function LanternHeader({
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
  /** Force the solid background (used on sub-pages that have no hero behind it). */
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
      style={scrolled ? { background: NEAR_BLACK } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative flex items-center justify-between px-5 py-4 text-[#f3ede1] sm:px-8 sm:py-5">
        {/* wordmark (links home) */}
        <a
          href={home}
          data-edit="tenant.business_name"
          style={{ fontFamily: "var(--font-fraunces)" }}
          className="text-lg font-medium tracking-[0.12em] text-[#f3ede1] [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:text-2xl"
        >
          {name}
        </a>

        {/* desktop nav */}
        <nav className="hidden gap-7 text-xs font-medium uppercase tracking-[0.18em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#c8a24a]">{l.label}</a>
          ))}
        </nav>

        {/* desktop book button */}
        <a
          href={book}
          style={{ background: RED }}
          className="hidden px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 md:inline-flex"
        >
          Book a table
        </a>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta="Book a table" />
      </div>
    </header>
  );
}
