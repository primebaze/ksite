"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

const GREEN = "#0d3b2e";
const GOLD = "#c8a45c";

// Sticky header for the Botanica design (elegant botanical brasserie, single
// venue). Transparent over the home hero, turns solid deep green once scrolled.
// Nav sits left, a centred serif crest links home, and a gold "Book" button
// sits on the right. Collapses to a functional hamburger below md.
export function BotanicaHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={scrolled ? { background: GREEN } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />}
      <div className="relative flex items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        {/* desktop nav */}
        <nav className="hidden gap-7 text-[11px] font-medium uppercase tracking-[0.22em] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-white transition hover:text-[#e6cf95]">{l.label}</a>
          ))}
        </nav>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta="Book a table" />

        {/* centred crest (links home) */}
        <a href={home} className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="mx-auto mb-1 block h-px w-6 opacity-70" style={{ background: GOLD }} />
          <span data-edit="tenant.business_name" style={{ fontFamily: "var(--font-fraunces)" }} className="block whitespace-nowrap text-base font-medium tracking-[0.28em] text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] sm:text-xl">{name.toUpperCase()}</span>
        </a>

        {/* desktop book button */}
        <a
          href={book}
          className="hidden px-7 py-2.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition hover:brightness-110 md:inline-flex"
          style={{ background: GOLD, color: GREEN }}
        >
          Book
        </a>
        {/* mobile spacer to balance the menu icon */}
        <span className="w-6 md:hidden" />
      </div>
    </header>
  );
}
