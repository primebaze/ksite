"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const INK = "#2b2826";
const WINE = "#7a2a38";

// Sticky header for the Atelier salon design. A slim wine promo strip sits on
// top; below it a transparent bar over the hero turns solid charcoal with a
// shadow once scrolled (or when `solid` is forced on sub-pages with no hero).
// Logo crest left, centred nav, booking button right; collapses to a functional
// hamburger below md.
export function AtelierHeader({
  name,
  book,
  links,
  home = "/",
  promo,
  solid = false,
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
  home?: string;
  /** Optional promo strip text shown above the nav. */
  promo?: string;
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
    <header className="fixed inset-x-0 top-0 z-50">
      {promo && (
        <div style={{ background: WINE }} className="px-4 py-2 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white">
          {promo}
        </div>
      )}
      <div
        className={`transition-colors duration-300 ${scrolled ? "shadow-lg" : ""}`}
        style={scrolled ? { background: INK } : undefined}
      >
        {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />}
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
          {/* logo crest (links home) */}
          <a href={home} className="pointer-events-auto flex flex-col leading-none">
            <span data-edit="tenant.business_name" style={{ fontFamily: "var(--font-fraunces)" }} className="whitespace-nowrap text-lg font-medium tracking-[0.12em] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:text-xl">
              {name.toUpperCase()}
            </span>
            <span className="mt-1 text-[8px] font-semibold uppercase tracking-[0.34em] text-white/75 sm:text-[9px]">Hair &amp; Beauty</span>
          </a>

          {/* desktop nav */}
          <nav className="hidden gap-7 text-xs font-medium uppercase tracking-[0.16em] [text-shadow:0_1px_8px_rgba(0,0,0,0.45)] lg:flex">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:opacity-70">{l.label}</a>
            ))}
          </nav>

          {/* desktop booking button */}
          <a
            href={book}
            style={{ background: WINE }}
            className="hidden px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90 lg:inline-flex"
          >
            Book now
          </a>

          {/* mobile menu (functional) */}
          <div className="lg:hidden">
            <MobileNav links={links} book={book} cta="Book now" />
          </div>
        </div>
      </div>
    </header>
  );
}
