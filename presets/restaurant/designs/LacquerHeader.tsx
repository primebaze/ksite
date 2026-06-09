"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

const INK = "#0c0b0a";
const GOLD = "#c89b3c";

// Sticky header for the Lacquer design (dark, moody modern-Asian gastropub).
// Transparent over the hero, turns solid near-black once scrolled. Nav links on
// the left, a centred wordmark crest, and a gold "Book a table" button on the
// right; collapses to a functional hamburger below md.
export function LacquerHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-2xl" : ""}`}
      style={scrolled ? { background: INK, borderBottom: `1px solid ${GOLD}33` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 to-transparent" />}
      <div className="relative flex items-center justify-between px-5 py-4 text-white sm:px-7 sm:py-4">
        {/* desktop nav (left) */}
        <nav className="hidden gap-6 text-[11px] font-semibold uppercase tracking-[0.22em] [text-shadow:0_1px_10px_rgba(0,0,0,0.6)] lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#e7c067]">{l.label}</a>
          ))}
        </nav>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta="Book a table" />

        {/* centred wordmark crest (links home) */}
        <a href={home} className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span data-edit="tenant.business_name" style={{ fontFamily: "var(--font-fraunces)" }} className="block whitespace-nowrap text-lg font-semibold lowercase tracking-[0.04em] text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.6)] sm:text-2xl">{name}</span>
        </a>

        {/* desktop book button (right) */}
        <a href={book} className="hidden px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:brightness-110 lg:inline-flex" style={{ background: GOLD, color: INK }}>Book a table</a>
        {/* mobile spacer to balance the menu icon */}
        <span className="w-6 lg:hidden" />
      </div>
    </header>
  );
}
