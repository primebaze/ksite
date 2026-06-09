"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

const NAVY = "#141b2d";

// Sticky header for the Ember design: transparent over the hero, turns solid
// navy with a shadow once the page is scrolled. Nav left, centred crest,
// reservation button right; collapses to a functional hamburger below md.
export function EmberHeader({
  name,
  book,
  links,
  est = "EST 1994",
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
  est?: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-xl" : ""}`}
      style={scrolled ? { background: NAVY } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />}
      <div className="relative flex items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        {/* desktop nav */}
        <nav className="hidden gap-7 text-xs font-medium uppercase tracking-[0.18em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-80">{l.label}</a>
          ))}
        </nav>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} />

        {/* centred crest */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <p data-edit="tenant.business_name" style={{ fontFamily: "var(--font-fraunces)" }} className="pointer-events-auto whitespace-nowrap text-base font-medium tracking-[0.15em] text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:text-xl">{name.toUpperCase()}</p>
          <p className="mt-0.5 text-[8px] tracking-[0.3em] text-white/80 sm:text-[10px]">{est}</p>
        </div>

        {/* desktop reservation button */}
        <a href={book} className="hidden border border-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900 md:inline-flex">Make a reservation</a>
        {/* mobile spacer to balance the menu icon */}
        <span className="w-6 md:hidden" />
      </div>
    </header>
  );
}
