"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Heritage British-pub palette (baked identity).
const FOREST = "#1E2B22";
const BRASS = "#B08D2E";
const CREAM = "#EFE7D3";

// Sticky header for the Tavern design: a hand-painted-sign wordmark in cream
// over a brass hairline rule. Transparent over the dark heritage hero, then
// settles onto a deep forest-green bar once scrolled; forced solid on sub-pages
// via the `solid` prop. Collapses to a functional hamburger (shared MobileNav)
// below lg.
export function TavernHeader({
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
        background: scrolled ? FOREST : "transparent",
        borderBottom: `1px solid ${scrolled ? "rgba(176,141,46,0.55)" : "rgba(176,141,46,0.3)"}`,
        boxShadow: scrolled ? "0 6px 22px -12px rgba(0,0,0,0.6)" : "none",
      }}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        {/* hand-painted-sign wordmark (links home) */}
        <a href={home} className="pointer-events-auto shrink-0">
          <span className="flex flex-col leading-none">
            <span className="text-[9px] font-semibold uppercase tracking-[0.42em]" style={{ color: BRASS }}>
              The
            </span>
            <span
              data-edit="tenant.business_name"
              style={{ fontFamily: "var(--font-fraunces)", color: CREAM }}
              className="mt-0.5 block whitespace-nowrap text-2xl font-semibold italic tracking-tight sm:text-[1.7rem]"
            >
              {name}
            </span>
          </span>
        </a>

        {/* desktop nav */}
        <nav
          className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-semibold uppercase tracking-[0.2em] lg:flex"
          style={{ color: CREAM }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#B08D2E]">{l.label}</a>
          ))}
        </nav>

        {/* desktop book button */}
        <a
          href={book}
          className="hidden shrink-0 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:brightness-110 lg:inline-flex"
          style={{ background: BRASS, color: FOREST, borderRadius: "2px" }}
        >
          Book a table
        </a>

        {/* mobile menu (functional) — cream bars on the forest/transparent bar */}
        <div className="lg:hidden [&_button>span]:!bg-[#EFE7D3]">
          <MobileNav links={links} book={book} cta="Book a table" />
        </div>
      </div>
    </header>
  );
}
