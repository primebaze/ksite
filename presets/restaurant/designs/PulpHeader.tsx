"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Citrus juice-bar palette (baked identity). Sunny header, berry-ink wordmark.
const ORANGE = "#F47A20";
const PINK = "#F0567A";
const CREAM = "#FFFBF2";
const INK = "#3A1F2B";

// Sticky header for the Pulp design. Sits transparent over the bright hero, then
// snaps to a frosted cream bar with a juicy bottom border once scrolled; forced
// solid on sub-pages via the `solid` prop. The wordmark sits inside a rounded
// citrus pill so it reads like a fruit-sticker logo. A gradient "Order ahead"
// pill button on the right. Collapses to the shared MobileNav below lg.
export function PulpHeader({
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
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={
        scrolled
          ? { background: `${CREAM}f2`, backdropFilter: "blur(10px)", borderBottom: `3px solid ${ORANGE}` }
          : { background: "transparent", borderBottom: "3px solid transparent" }
      }
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-3 sm:px-8">
        {/* wordmark — sits in a citrus sticker pill */}
        <a href={home} className="pointer-events-auto shrink-0">
          <span
            data-edit="tenant.business_name"
            style={{
              fontFamily: "var(--font-fraunces)",
              color: "#fff",
              background: `linear-gradient(120deg, ${ORANGE}, ${PINK})`,
            }}
            className="block whitespace-nowrap rounded-full px-5 py-1.5 text-xl font-bold leading-none tracking-tight sm:text-2xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav
          className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-extrabold uppercase tracking-[0.16em] lg:flex"
          style={{ color: scrolled ? INK : "#fff", textShadow: scrolled ? "none" : "0 1px 10px rgba(58,31,43,0.45)" }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>
          ))}
        </nav>

        {/* desktop order button */}
        <a
          href={book}
          className="hidden shrink-0 rounded-full px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-105 lg:inline-flex"
          style={{ background: `linear-gradient(120deg, ${ORANGE}, ${PINK})` }}
        >
          Order ahead
        </a>

        {/* mobile menu (functional) — bars switch from white over hero to ink when solid */}
        <div className={`lg:hidden ${scrolled ? "[&_button>span]:!bg-[#3A1F2B]" : "[&_button>span]:!bg-white"}`}>
          <MobileNav links={links} book={book} cta="Order ahead" />
        </div>
      </div>
    </header>
  );
}
