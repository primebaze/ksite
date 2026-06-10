"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Wood-fired pizzeria palette (baked identity).
const TOMATO = "#C1432E";
const CHARCOAL = "#1C1A17";
const CREAM = "#F6EDE0";

// Sticky header for the Forno design: transparent over the home hero (with a
// soft top gradient so the white wordmark reads on photography), then a solid
// charcoal bar once scrolled. Forced solid on sub-pages via the `solid` prop.
// Condensed Fraunces wordmark, tomato "Reserve" button. Collapses to the shared
// MobileNav below lg. Same prop shape as MeadowHeader.
export function FornoHeader({
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
      style={
        scrolled
          ? { background: CHARCOAL, boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }
          : { background: "linear-gradient(to bottom, rgba(28,26,23,0.55), transparent)" }
      }
    >
      <div className="relative flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        {/* wordmark (links home) */}
        <a href={home} className="pointer-events-auto flex shrink-0 items-center gap-2.5">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full text-[15px] font-black text-white"
            style={{ background: TOMATO }}
          >
            🔥
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: CREAM }}
            className="block whitespace-nowrap text-2xl font-black uppercase leading-none tracking-tight sm:text-[28px]"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav
          className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-bold uppercase tracking-[0.18em] lg:flex"
          style={{ color: CREAM }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[color:#C1432E]">{l.label}</a>
          ))}
        </nav>

        {/* desktop reserve button */}
        <a
          href={book}
          className="hidden shrink-0 rounded-md px-6 py-2.5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition hover:opacity-90 lg:inline-flex"
          style={{ background: TOMATO }}
        >
          Reserve
        </a>

        {/* mobile menu (functional) — cream bars */}
        <div className="lg:hidden [&_button>span]:!bg-[#F6EDE0]">
          <MobileNav links={links} book={book} cta="Reserve a table" />
        </div>
      </div>
    </header>
  );
}
