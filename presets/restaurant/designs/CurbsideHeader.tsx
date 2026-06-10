"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Curbside street-food palette (baked identity). The header is a hazard-striped
// bar: a stencilled wordmark on the left, nav in the middle, a tangerine
// "Book us" button on the right. Over the home hero it floats transparent on the
// dark asphalt; once scrolled (or forced via `solid` on sub-pages) it drops the
// asphalt bar + hazard underline.
const TANGERINE = "#F5631E";
const ASPHALT = "#1B1B1D";
const HAZARD = "#FFD23F";

export function CurbsideHeader({
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

  // Diagonal hazard stripe used as the bottom edge of the solid bar.
  const hazardStripe = `repeating-linear-gradient(45deg, ${HAZARD} 0, ${HAZARD} 10px, ${ASPHALT} 10px, ${ASPHALT} 20px)`;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{ background: scrolled ? ASPHALT : "transparent" }}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        {/* stencilled wordmark (links home) */}
        <a href={home} className="pointer-events-auto shrink-0">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: "#FFFFFF" }}
            className="block whitespace-nowrap text-2xl font-black uppercase leading-none tracking-tight [text-shadow:2px_2px_0_#F5631E] sm:text-3xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-6 text-[11px] font-black uppercase tracking-[0.16em] text-white lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[color:#FFD23F]">{l.label}</a>
          ))}
        </nav>

        {/* desktop book button */}
        <a
          href={book}
          className="hidden shrink-0 border-[2.5px] px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.16em] text-white transition hover:translate-y-[1px] lg:inline-flex"
          style={{ background: TANGERINE, borderColor: HAZARD, borderRadius: "0.4rem" }}
        >
          Book us
        </a>

        {/* mobile menu (functional) — white bars over asphalt */}
        <div className="lg:hidden [&_button>span]:!bg-white">
          <MobileNav links={links} book={book} cta="Book us" />
        </div>
      </div>
      {/* hazard stripe underline appears with the solid bar */}
      {scrolled && <div className="h-1.5 w-full" style={{ backgroundImage: hazardStripe }} aria-hidden />}
    </header>
  );
}
