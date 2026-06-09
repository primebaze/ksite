"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

const CHARCOAL = "#2b2926";
const RED = "#d83b2e";

// Sticky header for the Tide design (modern sushi house). Inspired by the
// Sticks'n'Sushi layout: a dark translucent bar with a centred logo, nav on the
// left and Takeaway / Book Table actions on the right. Transparent over the
// home hero, turns solid charcoal once scrolled (or forced solid on sub-pages).
// Collapses to a functional hamburger below md. The centred crest links home.
export function TideHeader({
  name,
  book,
  order,
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  book: string;
  order?: string | null;
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
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{ background: scrolled ? CHARCOAL : "rgba(28,26,24,0.32)", backdropFilter: "blur(6px)" }}
    >
      <div className="relative flex items-center justify-between px-5 py-3.5 text-white sm:px-8">
        {/* desktop nav */}
        <nav className="hidden gap-7 text-xs font-semibold uppercase tracking-[0.16em] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white/70">{l.label}</a>
          ))}
        </nav>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta="Book a table" />

        {/* centred crest (links home), red mark + wordmark */}
        <a href={home} className="pointer-events-auto absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span aria-hidden className="mb-1 inline-block h-2.5 w-7" style={{ background: RED, clipPath: "polygon(0 100%,50% 0,100% 100%)" }} />
          <span data-edit="tenant.business_name" className="block whitespace-nowrap text-sm font-extrabold uppercase tracking-[0.22em] text-white sm:text-base">{name.toUpperCase()}</span>
        </a>

        {/* desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          {order && (
            <a href={order} target="_blank" rel="noreferrer" className="border border-white/50 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-neutral-900">Takeaway</a>
          )}
          <a href={book} className="px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: RED }}>Book a table</a>
        </div>
        {/* mobile spacer to balance the menu icon */}
        <span className="w-6 md:hidden" />
      </div>
    </header>
  );
}
