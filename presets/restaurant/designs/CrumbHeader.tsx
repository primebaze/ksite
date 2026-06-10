"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Warm artisan-bakery palette (baked identity). Soft brown ink on a cream field.
const INK = "#43342A";
const CREAM = "#F3E9D8";
const CRUST = "#C98A3C";

// Sticky header for the Crumb design. Unlike Meadow's flat coral bar, this is an
// airy, transparent strip that floats over the cream hero with a centered serif
// wordmark and an underline motif, then settles onto a translucent cream pane
// with a hairline crust rule once scrolled (or forced solid on sub-pages via
// `solid`). Collapses to the shared MobileNav below lg. Because the hero is a
// light cream field — never a dark photo — the type stays soft-brown throughout.
export function CrumbHeader({
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
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(243,233,216,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? `1px solid ${CRUST}55` : "1px solid transparent",
      }}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        {/* left nav (desktop) */}
        <nav className="hidden flex-1 items-center gap-7 text-[11px] font-medium uppercase tracking-[0.22em] lg:flex" style={{ color: INK }}>
          {links.slice(0, Math.ceil(links.length / 2)).map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[color:#C98A3C]">{l.label}</a>
          ))}
        </nav>

        {/* centered serif wordmark with hand-drawn underline */}
        <a href={home} className="shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: INK }}
            className="block whitespace-nowrap text-2xl font-light leading-none tracking-tight sm:text-[1.7rem]"
          >
            {name}
          </span>
          <svg viewBox="0 0 120 8" preserveAspectRatio="none" className="mt-1 hidden h-[6px] w-full lg:block" aria-hidden>
            <path d="M2 5 C 30 1, 90 1, 118 4" fill="none" stroke={CRUST} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </a>

        {/* right nav (desktop) + reserve */}
        <div className="hidden flex-1 items-center justify-end gap-7 lg:flex">
          <nav className="flex items-center gap-7 text-[11px] font-medium uppercase tracking-[0.22em]" style={{ color: INK }}>
            {links.slice(Math.ceil(links.length / 2)).map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-[color:#C98A3C]">{l.label}</a>
            ))}
          </nav>
          <a
            href={book}
            className="shrink-0 rounded-full px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.22em] transition hover:opacity-90"
            style={{ background: INK, color: CREAM }}
          >
            Reserve
          </a>
        </div>

        {/* mobile menu (functional) — dark bars on cream */}
        <div className="lg:hidden [&_button>span]:!bg-[#43342A]">
          <MobileNav links={links} book={book} cta="Reserve a table" />
        </div>
      </div>
    </header>
  );
}
