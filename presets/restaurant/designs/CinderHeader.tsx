"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

const DARK = "#14100e";
const GOLD = "#b08d57";

// Sticky header for the Cinder design (warm-dark steakhouse & lounge):
// transparent over the hero, turns solid near-black with a thin gold underline
// once scrolled. Nav left, centred crest, "Book a table" button right;
// collapses to a functional hamburger below md.
export function CinderHeader({
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
      style={scrolled ? { background: DARK, borderBottom: `1px solid ${GOLD}33` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/50 to-transparent" />}
      <div className="relative flex items-center justify-between px-5 py-4 text-white sm:px-9 sm:py-5">
        {/* desktop nav */}
        <nav className="hidden gap-8 text-[11px] font-medium uppercase tracking-[0.22em] text-white/90 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta="Book a table" />

        {/* centred crest (links home) */}
        <a href={home} className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span data-edit="tenant.business_name" style={{ fontFamily: "var(--font-fraunces)" }} className="block whitespace-nowrap text-lg font-medium lowercase tracking-[0.08em] text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:text-2xl">{name}</span>
          <span className="mt-1 block text-[7px] uppercase tracking-[0.4em] text-white/70 sm:text-[9px]">Steakhouse &amp; Lounge</span>
        </a>

        {/* desktop reservation button */}
        <a href={book} className="hidden border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900 md:inline-flex" style={{ borderColor: GOLD }}>Book a table</a>
        {/* mobile spacer to balance the menu icon */}
        <span className="w-6 md:hidden" />
      </div>
    </header>
  );
}
