"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

// Sticky header for the Halo salon design: a minimal Salt-style bar with the
// centred serif wordmark, small uppercase nav split either side, and a slim
// "Book" link on the right. Transparent (white text) over the home hero, turns
// solid white with a hairline border once scrolled or on sub-pages. Collapses
// to a functional hamburger below md.
export function HaloHeader({
  name,
  book,
  bookLabel = "Book",
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  book: string;
  bookLabel?: string;
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

  // Split the nav into two halves so the wordmark can sit dead centre.
  const mid = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, mid);
  const rightLinks = links.slice(mid);

  const fg = scrolled ? "text-neutral-900" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-black/10 bg-white" : ""
      }`}
    >
      {!scrolled && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />
      )}
      <div className={`relative flex items-center justify-between px-5 py-5 sm:px-10 ${fg}`}>
        {/* desktop: left nav */}
        <nav className="hidden flex-1 gap-8 text-[11px] font-medium uppercase tracking-[0.22em] md:flex">
          {leftLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>
          ))}
        </nav>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta={bookLabel} />

        {/* centred wordmark (links home) */}
        <a href={home} className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className={`block whitespace-nowrap text-xl font-medium tracking-[0.32em] sm:text-2xl ${
              scrolled ? "" : "[text-shadow:0_1px_14px_rgba(0,0,0,0.45)]"
            }`}
          >
            {name.toUpperCase()}
          </span>
        </a>

        {/* desktop: right nav + book */}
        <nav className="hidden flex-1 items-center justify-end gap-8 text-[11px] font-medium uppercase tracking-[0.22em] md:flex">
          {rightLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>
          ))}
          <a
            href={book}
            className={`border px-5 py-2.5 transition ${
              scrolled
                ? "border-neutral-900 hover:bg-neutral-900 hover:text-white"
                : "border-white/70 hover:bg-white hover:text-neutral-900"
            }`}
          >
            {bookLabel}
          </a>
        </nav>

        {/* mobile spacer to balance the hamburger */}
        <span className="w-6 md:hidden" />
      </div>
    </header>
  );
}
