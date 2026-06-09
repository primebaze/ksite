"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const INK = "#16140f";

// Sticky header for the Aurelia aesthetics-clinic design: transparent over the
// hero, turns solid ink once scrolled. Logo left, centred nav, book button
// right; collapses to a functional hamburger below md.
export function AureliaHeader({
  name,
  book,
  links,
  home = "/",
  bookLabel = "Book an appointment",
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
      style={scrolled ? { background: INK } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />}
      <div className="relative flex items-center justify-between px-5 py-4 text-white sm:px-9 sm:py-5">
        {/* logo / wordmark (links home) */}
        <a href={home} className="pointer-events-auto flex items-center gap-2.5">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="whitespace-nowrap text-lg font-medium tracking-[0.12em] text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-70">{l.label}</a>
          ))}
        </nav>

        {/* desktop book button */}
        <a
          href={book}
          className="hidden border border-white/70 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900 lg:inline-flex"
        >
          {bookLabel}
        </a>

        {/* mobile menu (functional) */}
        <div className="lg:hidden">
          <MobileNav links={links} book={book} cta={bookLabel} />
        </div>
      </div>
    </header>
  );
}
