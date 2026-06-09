"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const SAGE = "#8ba29c";
const TAUPE = "#5c5048";

// Sticky header for the Linea aesthetics-clinic design (inspired by AM Aesthetics).
// Logo / wordmark on the LEFT, horizontal nav and a "Book now" pill on the RIGHT.
// Transparent over the home hero, turns to a solid white bar with a soft shadow
// once scrolled (or forced solid on sub-pages). Collapses to a functional
// hamburger below md.
export function LineaHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-white shadow-[0_1px_24px_rgba(0,0,0,0.06)]" : ""}`}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />}
      <div className={`relative flex items-center justify-between px-5 py-4 sm:px-8 sm:py-5 ${scrolled ? "text-neutral-800" : "text-white"}`}>
        {/* wordmark (links home) — left */}
        <a href={home} className="pointer-events-auto flex flex-col leading-none">
          <span
            data-edit="tenant.business_name"
            style={{ color: scrolled ? TAUPE : undefined }}
            className={`whitespace-nowrap text-lg font-semibold uppercase tracking-[0.22em] sm:text-xl ${scrolled ? "" : "[text-shadow:0_1px_14px_rgba(0,0,0,0.45)]"}`}
          >
            {name}
          </span>
        </a>

        {/* desktop nav — right */}
        <nav className={`hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.18em] md:flex ${scrolled ? "" : "[text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-70">{l.label}</a>
          ))}
          <a
            href={book}
            style={{ background: SAGE }}
            className="inline-flex px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90"
          >
            Book now
          </a>
        </nav>

        {/* mobile menu (functional) */}
        <div className={scrolled ? "[&_span]:!bg-neutral-800 md:hidden" : "md:hidden"}>
          <MobileNav links={links} book={book} cta="Book now" />
        </div>
      </div>
    </header>
  );
}
