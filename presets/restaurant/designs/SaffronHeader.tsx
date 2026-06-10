"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Saffron palette (baked identity): deep maroon bar once scrolled, saffron-gold
// wordmark and hairlines, cream nav text.
const MAROON = "#5B1F2A";
const GOLD = "#E0A02E";
const CREAM = "#F6ECD9";

// Sticky header for the Saffron design. Transparent over the dark hero (just the
// gold wordmark and cream links floating on the photograph), then settles into a
// solid maroon bar with a gold hairline underline once scrolled. Forced solid on
// sub-pages via the `solid` prop. Collapses to the shared MobileNav below lg.
export function SaffronHeader({
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
  /** Force the solid maroon background (used on sub-pages with no hero behind). */
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
        background: scrolled ? MAROON : "transparent",
        boxShadow: scrolled ? "0 10px 30px -18px rgba(0,0,0,0.7)" : "none",
        borderBottom: `1px solid ${scrolled ? `${GOLD}55` : "transparent"}`,
      }}
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {/* wordmark (links home) — gold serif with generous tracking */}
        <a href={home} className="shrink-0">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: GOLD }}
            className="block whitespace-nowrap text-2xl leading-none tracking-[0.14em] sm:text-[1.7rem]"
          >
            {name}
          </span>
        </a>

        {/* desktop nav — cream caps with wide tracking */}
        <nav
          className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-semibold uppercase tracking-[0.2em] lg:flex"
          style={{ color: CREAM }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#E0A02E]">{l.label}</a>
          ))}
        </nav>

        {/* desktop reserve button — gold pillarless block */}
        <a
          href={book}
          className="hidden shrink-0 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:brightness-110 lg:inline-flex"
          style={{ background: GOLD, color: "#1A1413" }}
        >
          Reserve
        </a>

        {/* mobile menu (functional) — gold bars */}
        <div className="lg:hidden [&_button>span]:!bg-[#E0A02E]">
          <MobileNav links={links} book={book} cta="Reserve a table" />
        </div>
      </div>
    </header>
  );
}
