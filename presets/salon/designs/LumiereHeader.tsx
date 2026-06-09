"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const INK = "#0e0e0e";
const GOLD = "#b79257";

// Sticky header for the Lumiere beauty-clinic design. A slim announcement strip
// sits on top; below it a header bar that is transparent over the home hero and
// turns solid ink once scrolled (or always solid on sub-pages via `solid`).
// Centred wordmark crest, nav left, book button right; functional hamburger
// below md. Mirrors the Beauty Club London structure (announcement bar + dark
// nav + prominent booking CTA).
export function LumiereHeader({
  name,
  book,
  bookLabel = "Book consultation",
  links,
  home = "/",
  announce = "Complimentary consultations available",
  solid = false,
}: {
  name: string;
  book: string;
  bookLabel?: string;
  links: { label: string; href: string }[];
  home?: string;
  announce?: string;
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
    <header className="fixed inset-x-0 top-0 z-50">
      {/* announcement strip */}
      <div style={{ background: INK }} className="px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[0.3em] text-white/80">
        {announce}
      </div>

      <div
        className={`transition-colors duration-300 ${scrolled ? "shadow-lg" : ""}`}
        style={scrolled ? { background: INK } : undefined}
      >
        {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/55 to-transparent" />}
        <div className="relative flex items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
          {/* desktop nav */}
          <nav className="hidden gap-7 text-[11px] font-medium uppercase tracking-[0.22em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-[var(--gold)]" style={{ ["--gold" as string]: GOLD }}>{l.label}</a>
            ))}
          </nav>

          {/* mobile hamburger (functional) */}
          <MobileNav links={links} book={book} cta={bookLabel} />

          {/* centred wordmark crest (links home) */}
          <a href={home} className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span data-edit="tenant.business_name" style={{ fontFamily: "var(--font-fraunces)" }} className="block whitespace-nowrap text-base font-medium tracking-[0.28em] text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:text-xl">{name.toUpperCase()}</span>
          </a>

          {/* desktop book button */}
          <a
            href={book}
            className="hidden px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90 md:inline-flex"
            style={{ background: GOLD }}
          >
            {bookLabel}
          </a>
          {/* mobile spacer to balance the hamburger */}
          <span className="w-6 md:hidden" />
        </div>
      </div>
    </header>
  );
}
