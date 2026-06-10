"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Loud retro smash-burger palette (baked identity). Charcoal bar with a mustard
// stamped wordmark; ketchup CTA.
const MUSTARD = "#F2B705";
const CHARCOAL = "#161616";
const KETCHUP = "#D62828";

// Sticky header for the Stack design: transparent over the home hero (so the
// huge condensed wordmark sits straight on the photo), then drops to a solid
// charcoal bar with a hard bottom border once scrolled. Forced solid on
// sub-pages via the `solid` prop. Collapses to the shared MobileNav below lg.
export function StackHeader({
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
        background: scrolled ? CHARCOAL : "transparent",
        borderBottom: scrolled ? `4px solid ${MUSTARD}` : "4px solid transparent",
      }}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        {/* wordmark (links home) — stamped mustard seal mark + condenced caps */}
        <a href={home} className="pointer-events-auto flex shrink-0 items-center gap-2.5">
          <span
            className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border-[3px] text-[9px] font-black uppercase leading-none sm:flex"
            style={{ background: MUSTARD, borderColor: MUSTARD, color: CHARCOAL }}
            aria-hidden
          >
            ★
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: MUSTARD }}
            className="block whitespace-nowrap text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav
          className="hidden flex-1 items-center justify-center gap-6 text-[11px] font-black uppercase tracking-[0.16em] text-white lg:flex"
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[color:#F2B705]">{l.label}</a>
          ))}
        </nav>

        {/* desktop CTA button */}
        <a
          href={book}
          className="hidden shrink-0 border-[3px] px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-[3px_3px_0_0_#F2B705] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0_0_#F2B705] lg:inline-flex"
          style={{ background: KETCHUP, borderColor: "#F2B705" }}
        >
          Order ahead
        </a>

        {/* mobile menu (functional) — white bars from shared MobileNav */}
        <div className="lg:hidden">
          <MobileNav links={links} book={book} cta="Order ahead" />
        </div>
      </div>
    </header>
  );
}
