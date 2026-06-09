"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

// Indigo — creative-salon header. Off-white, friendly geometric sans. Logo
// wordmark left, horizontal nav centre/left, a green pill "Book appointment"
// button right. Sits transparent over the light home hero and turns solid white
// with a hairline + shadow once scrolled (or on every sub-page via `solid`).
// Collapses to a functional hamburger below md (reuses the shared MobileNav).
const INK = "#15130f";
const MINT = "#9fe7c6";

export function IndigoHeader({
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
  /** Force the solid white background (used on sub-pages with no hero behind it). */
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "border-b border-black/10 bg-[#f3f1ec] shadow-sm" : ""}`}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        {/* wordmark (links home) */}
        <a href={home} className="pointer-events-auto flex items-center gap-2.5">
          <span aria-hidden className="h-5 w-5 rounded-full" style={{ background: MINT, border: `1.5px solid ${INK}` }} />
          <span
            data-edit="tenant.business_name"
            style={{ color: INK }}
            className="whitespace-nowrap text-xl font-extrabold tracking-tight sm:text-2xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" style={{ color: INK }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold transition hover:opacity-60">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* desktop book button */}
          <a
            href={book}
            className="hidden rounded-full px-5 py-2.5 text-sm font-bold transition hover:opacity-85 md:inline-flex"
            style={{ background: MINT, color: INK, border: `1.5px solid ${INK}` }}
          >
            {bookLabel}
          </a>

          {/* mobile menu (functional). MobileNav draws white bars, so wrap it in
              an ink chip to stay visible on the light header. */}
          <div className="rounded-lg p-1.5 lg:hidden" style={{ background: INK }}>
            <MobileNav links={links} book={book} cta={bookLabel} />
          </div>
        </div>
      </div>
    </header>
  );
}
