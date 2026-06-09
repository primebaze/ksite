"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const GREEN = "#2f4a3c";

// Sticky header for the Radiance aesthetics-clinic design. Transparent over the
// home hero, turns solid forest green once scrolled (or always on sub-pages via
// `solid`). Centred wordmark crest links home; nav left, "Book now" right.
// Collapses to a functional hamburger below md.
export function RadianceHeader({
  name,
  book,
  links,
  home = "/",
  bookLabel = "Book now",
  solid = false,
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
  home?: string;
  bookLabel?: string;
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={scrolled ? { background: GREEN } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />}
      <div className="relative flex items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        {/* desktop nav */}
        <nav className="hidden gap-7 text-[11px] font-medium uppercase tracking-[0.2em] [text-shadow:0_1px_8px_rgba(0,0,0,0.4)] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-70">{l.label}</a>
          ))}
        </nav>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta={bookLabel} />

        {/* centred wordmark (links home) */}
        <a href={home} className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span data-edit="tenant.business_name" style={{ fontFamily: "var(--font-fraunces)" }} className="block whitespace-nowrap text-lg font-medium tracking-[0.25em] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:text-2xl">{name.toUpperCase()}</span>
        </a>

        {/* desktop book button */}
        <a href={book} className="hidden bg-white px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-85 md:inline-flex" style={{ color: GREEN }}>{bookLabel}</a>
        {/* mobile spacer to balance the menu icon */}
        <span className="w-6 md:hidden" />
      </div>
    </header>
  );
}
