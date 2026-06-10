"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Larder palette (baked identity). Light, calm, contemporary.
const INK = "#2A2A26";
const OFFWHITE = "#F6F3EC";
const SAGE = "#7C8567";

// Sticky header for the Larder design: an airy, minimal bar. Because the home
// hero is LIGHT (off-white, not dark imagery), the header keeps dark ink text
// throughout — transparent over the hero, then settling onto a solid off-white
// background with a single hairline rule once scrolled. Forced solid on
// sub-pages via the `solid` prop. The wordmark is a quiet Fraunces serif with
// wide tracking. Collapses to the shared MobileNav below lg.
export function LarderHeader({
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
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? OFFWHITE : "transparent",
        borderBottom: `1px solid ${scrolled ? `${INK}1f` : "transparent"}`,
      }}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5 sm:px-8">
        {/* wordmark (links home) */}
        <a href={home} className="shrink-0">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: INK }}
            className="block whitespace-nowrap text-xl font-normal leading-none tracking-[0.22em] sm:text-2xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav — quiet, wide-tracked caps */}
        <nav
          className="hidden flex-1 items-center justify-center gap-9 text-[11px] font-medium uppercase tracking-[0.2em] lg:flex"
          style={{ color: INK }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-[color:#7C8567]">{l.label}</a>
          ))}
        </nav>

        {/* desktop reserve link — understated outline, sage on hover */}
        <a
          href={book}
          className="hidden shrink-0 border px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] transition-colors hover:border-[color:#7C8567] hover:text-[color:#7C8567] lg:inline-flex"
          style={{ borderColor: `${INK}40`, color: INK }}
        >
          Reserve
        </a>

        {/* mobile menu (functional) — dark ink bars over the light header */}
        <div className="lg:hidden [&_button>span]:!bg-[#2A2A26]">
          <MobileNav links={links} book={book} cta="Reserve a table" />
        </div>
      </div>
      {/* a faint sage seam under the bar when solid — a subtle signature accent */}
      {scrolled && <div className="h-px w-full" style={{ background: `${SAGE}33` }} aria-hidden />}
    </header>
  );
}
