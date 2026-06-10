"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Sobremesa palette (baked identity): rioja oxblood, burnt ochre, parchment, ink.
const RIOJA = "#6E1F26";
const OCHRE = "#C77B33";
const PARCHMENT = "#F2E7D2";

// Sticky header for the Sobremesa design. Over the home hero it is transparent
// (parchment wordmark and nav on the dark, sultry imagery); once scrolled — or
// forced via the `solid` prop on sub-pages — it settles into a deep oxblood bar
// with a thin burnt-ochre azulejo rule beneath it. Collapses to the shared
// hamburger MobileNav below lg.
export function SobremesaHeader({
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
  /** Force the solid oxblood background (used on sub-pages with no hero). */
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
        background: scrolled ? RIOJA : "transparent",
        boxShadow: scrolled ? "0 12px 40px -24px rgba(36,24,19,0.8)" : "none",
      }}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {/* wordmark (links home) */}
        <a href={home} className="shrink-0">
          <span
            data-edit="tenant.business_name"
            style={{
              fontFamily: "var(--font-fraunces)",
              color: PARCHMENT,
              textShadow: scrolled ? "none" : "0 2px 18px rgba(0,0,0,0.55)",
            }}
            className="block whitespace-nowrap text-[26px] font-medium leading-none tracking-tight sm:text-[30px]"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav
          className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-semibold uppercase tracking-[0.2em] lg:flex"
          style={{ color: PARCHMENT, textShadow: scrolled ? "none" : "0 1px 12px rgba(0,0,0,0.5)" }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[color:#C77B33]">{l.label}</a>
          ))}
        </nav>

        {/* desktop reserve button — ochre pill on parchment text */}
        <a
          href={book}
          className="hidden shrink-0 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#241813] transition hover:opacity-90 lg:inline-flex"
          style={{ background: OCHRE }}
        >
          Reservar
        </a>

        {/* mobile menu (functional) — parchment bars */}
        <div className="lg:hidden [&_button>span]:!bg-[#F2E7D2]">
          <MobileNav links={links} book={book} cta="Reservar mesa" />
        </div>
      </div>
      {/* thin burnt-ochre azulejo rule under the solid bar */}
      {scrolled && (
        <div
          className="h-[3px] w-full"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, ${OCHRE} 0 10px, ${PARCHMENT} 10px 12px, ${OCHRE} 12px 22px, transparent 22px 24px)`,
            opacity: 0.85,
          }}
        />
      )}
    </header>
  );
}
