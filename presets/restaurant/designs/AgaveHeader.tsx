"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Agave — vibrant Mexican cantina palette (baked identity).
const TERRACOTTA = "#C9542A";
const CREAM = "#FBF1E2";
const INK = "#221A14";

// Sticky header for the Agave design. Over the sun-soaked home hero it floats
// transparent with light type; once scrolled (or forced via `solid` on sub
// pages) it drops onto a warm cream bar with a papel-picado scalloped underline
// and a terracotta wordmark. Collapses to the shared functional MobileNav below
// lg.
export function AgaveHeader({
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

  // Papel-picado style scalloped edge, drawn with a repeating radial gradient.
  const scallop = {
    backgroundImage: `radial-gradient(circle at 9px -2px, transparent 9px, ${TERRACOTTA} 9px 10px, transparent 10px)`,
    backgroundSize: "18px 12px",
    backgroundRepeat: "repeat-x",
  } as const;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`transition-colors duration-300 ${scrolled ? "shadow-[0_6px_24px_-12px_rgba(34,26,20,0.45)]" : ""}`}
        style={{ background: scrolled ? CREAM : "transparent" }}
      >
        <div className="relative flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          {/* wordmark (links home) */}
          <a href={home} className="pointer-events-auto flex shrink-0 items-center gap-2.5">
            <span aria-hidden className="inline-block h-6 w-6 rotate-45 rounded-[5px]" style={{ background: scrolled ? TERRACOTTA : CREAM, boxShadow: `inset 0 0 0 2px ${scrolled ? CREAM : TERRACOTTA}` }} />
            <span
              data-edit="tenant.business_name"
              style={{ fontFamily: "var(--font-fraunces)", color: scrolled ? TERRACOTTA : CREAM }}
              className={`block whitespace-nowrap text-2xl font-semibold leading-none tracking-tight sm:text-3xl ${scrolled ? "" : "[text-shadow:0_2px_18px_rgba(0,0,0,0.4)]"}`}
            >
              {name}
            </span>
          </a>

          {/* desktop nav */}
          <nav
            className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-bold uppercase tracking-[0.16em] lg:flex"
            style={{ color: scrolled ? INK : CREAM }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} className={`transition hover:opacity-60 ${scrolled ? "" : "[text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"}`}>{l.label}</a>
            ))}
          </nav>

          {/* desktop book button */}
          <a
            href={book}
            className="hidden shrink-0 rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90 lg:inline-flex"
            style={{ background: TERRACOTTA }}
          >
            Reserve
          </a>

          {/* mobile menu (functional) — bars tint with the bar */}
          <div className={`lg:hidden ${scrolled ? "[&_button>span]:!bg-[#221A14]" : "[&_button>span]:!bg-[#FBF1E2]"}`}>
            <MobileNav links={links} book={book} cta="Reserve a table" />
          </div>
        </div>
      </div>
      {/* papel-picado scalloped edge under the solid bar */}
      {scrolled && <div className="h-3" style={scallop} />}
    </header>
  );
}
