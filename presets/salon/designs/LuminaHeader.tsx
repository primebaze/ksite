"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const INK = "#26201c";
const ROSE = "#e9d6cf";

// Sticky header for the Lumina aesthetics-clinic design: transparent over the
// hero, turns solid (warm ivory with a hairline) once the page is scrolled.
// Centred wordmark with a "beauty with depth" sub-line, nav left, BOOK button
// right; collapses to a functional hamburger below md. `solid` forces the solid
// background on sub-pages that have no hero behind it.
export function LuminaHeader({
  name,
  book,
  links,
  home = "/",
  strap = "Beauty with depth",
  solid = false,
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
  home?: string;
  strap?: string;
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

  const fg = scrolled ? INK : "#ffffff";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "border-b shadow-[0_1px_24px_rgba(0,0,0,0.06)]" : ""}`}
      style={scrolled ? { background: "#fbf7f4", borderColor: ROSE } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />}
      <div className="relative flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5" style={{ color: fg }}>
        {/* desktop nav */}
        <nav className="hidden gap-7 text-[11px] font-medium uppercase tracking-[0.2em] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>
          ))}
        </nav>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta="Book a consultation" />

        {/* centred wordmark (links home) */}
        <a href={home} className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: fg }}
            className="block whitespace-nowrap text-base font-medium tracking-[0.28em] sm:text-xl"
          >
            {name.toUpperCase()}
          </span>
          <span className="mt-1 block text-[8px] uppercase tracking-[0.38em] opacity-70 sm:text-[10px]">{strap}</span>
        </a>

        {/* desktop book button */}
        <a
          href={book}
          className="hidden px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-85 md:inline-flex"
          style={{ background: scrolled ? INK : "#ffffff", color: scrolled ? "#ffffff" : INK }}
        >
          Book now
        </a>
        {/* mobile spacer to balance the menu icon */}
        <span className="w-6 md:hidden" />
      </div>
    </header>
  );
}
