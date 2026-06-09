"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const INK = "#141210";
const GOLD = "#c9a96a";

// Sticky header for the Verve salon design (bold, contemporary VA-style).
// A thin dark utility bar sits at the very top; below it the main nav row is
// transparent over the home hero and turns solid ink once scrolled. On
// sub-pages `solid` forces the dark background from the start. Collapses to a
// functional hamburger below md.
export function VerveHeader({
  name,
  book,
  bookLabel = "Book appointment",
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  book: string;
  bookLabel?: string;
  links: { label: string; href: string }[];
  home?: string;
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
      {/* thin utility / promo bar */}
      <div style={{ background: INK }} className="flex items-center justify-center gap-4 px-5 py-2 text-white">
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs">Discover your salon match</span>
        <a
          href={book}
          className="hidden border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-80 sm:inline-flex"
          style={{ borderColor: GOLD, color: GOLD }}
        >
          {bookLabel}
        </a>
      </div>

      {/* main nav row */}
      <div
        className={`relative transition-colors duration-300 ${scrolled ? "shadow-xl" : ""}`}
        style={scrolled ? { background: INK } : undefined}
      >
        {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/55 to-transparent" />}
        <div className="relative flex items-center justify-between px-5 py-4 text-white sm:px-8">
          {/* crest (links home) */}
          <a href={home} className="pointer-events-auto flex items-center gap-2">
            <span
              data-edit="tenant.business_name"
              style={{ fontFamily: "var(--font-fraunces)" }}
              className="whitespace-nowrap text-lg font-semibold tracking-[0.16em] text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:text-xl"
            >
              {name.toUpperCase()}
            </span>
          </a>

          {/* desktop nav */}
          <nav className="hidden items-center gap-7 text-xs font-medium uppercase tracking-[0.2em] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] md:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:opacity-70">{l.label}</a>
            ))}
            <a
              href={book}
              className="border px-5 py-2.5 font-semibold tracking-[0.2em] transition hover:bg-[var(--verve-gold)] hover:text-[#141210]"
              style={{ borderColor: GOLD, color: GOLD, ["--verve-gold" as string]: GOLD }}
            >
              {bookLabel}
            </a>
          </nav>

          {/* mobile menu (functional) */}
          <MobileNav links={links} book={book} cta={bookLabel} />
        </div>
      </div>
    </header>
  );
}
