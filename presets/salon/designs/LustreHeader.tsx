"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const LAVENDER = "#a9a2b4";
const INK = "#3a3744";

// Sticky header for the Lustre aesthetics design: transparent (over the soft
// lavender hero) with dark text, turning to a solid lavender bar with a subtle
// shadow once the page is scrolled. Centred wordmark crest links home; nav left,
// "Book Now" pill right; collapses to a functional hamburger below md.
export function LustreHeader({
  name,
  book,
  links,
  home = "/",
  bookLabel = "Book Now",
  solid = false,
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
  home?: string;
  bookLabel?: string;
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-md" : ""}`}
      style={scrolled ? { background: LAVENDER } : { background: "rgba(169,162,180,0.55)", backdropFilter: "blur(6px)" }}
    >
      <div className="relative flex items-center justify-between px-5 py-3.5 sm:px-8 sm:py-4" style={{ color: INK }}>
        {/* desktop nav */}
        <nav className="hidden gap-7 text-[11px] font-medium uppercase tracking-[0.22em] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>
          ))}
        </nav>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta={bookLabel} />

        {/* centred wordmark (links home) */}
        <a href={home} className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: INK }}
            className="block whitespace-nowrap text-[15px] font-normal tracking-[0.18em] sm:text-lg"
          >
            {name.toUpperCase()}
          </span>
        </a>

        {/* desktop book pill */}
        <a
          href={book}
          className="hidden rounded-full border px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#3a3744] hover:text-white md:inline-flex"
          style={{ borderColor: INK, color: INK }}
        >
          {bookLabel}
        </a>
        {/* mobile spacer to balance the menu icon */}
        <span className="w-6 md:hidden" />
      </div>
    </header>
  );
}
