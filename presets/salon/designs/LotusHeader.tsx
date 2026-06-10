"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const CLAY = "#B5623E";
const INK = "#23211C";
const CREAM = "#F3ECDD";

// Sticky header for the Lotus acupuncture & Chinese-medicine clinic. Over the
// rice-paper hero it stays transparent with ink text; once scrolled (or on
// solid sub-pages) it settles into a cream bar with a hairline rule and soft
// shadow. A small lotus/circle seal sits beside the wordmark. Nav collapses to
// the shared functional hamburger below lg.
export function LotusHeader({
  name,
  book,
  links,
  home = "/",
  phone,
  solid = false,
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
  home?: string;
  phone?: string;
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

  const fg = scrolled ? INK : INK;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(243,236,221,0.94)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(35,33,28,0.12)" : "1px solid transparent",
        boxShadow: scrolled ? "0 10px 30px rgba(35,33,28,0.08)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: fg }}>
        {/* wordmark + seal (links home) */}
        <a href={home} className="flex items-center gap-3">
          <span aria-hidden className="grid h-9 w-9 place-items-center">
            <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke={CLAY} strokeWidth="1.2">
              <circle cx="20" cy="20" r="18" />
              <path d="M20 11c2.6 3 2.6 7.5 0 11-2.6-3.5-2.6-8 0-11z" />
              <path d="M20 22c-2.4-2.6-6-3.2-8.6-2 .6 3.4 3.5 6 6.8 6 .7 0 1.3-.1 1.8-.3" />
              <path d="M20 22c2.4-2.6 6-3.2 8.6-2-.6 3.4-3.5 6-6.8 6-.7 0-1.3-.1-1.8-.3" />
            </svg>
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="whitespace-nowrap text-lg font-medium tracking-[0.08em] sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav (centre/right) */}
        <nav className="hidden items-center gap-8 text-[13px] tracking-[0.04em] lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">
              {l.label}
            </a>
          ))}
        </nav>

        {/* right cluster */}
        <div className="hidden items-center gap-5 lg:flex">
          {phone && (
            <a href={`tel:${phone}`} className="text-[13px] tracking-[0.04em] transition hover:opacity-60">
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90"
            style={{ background: CLAY }}
          >
            Book a visit
          </a>
        </div>

        {/* mobile menu */}
        <div className="lg:hidden" style={{ color: fg }}>
          <MobileNavInk links={links} book={book} />
        </div>
      </div>
    </header>
  );
}

// The shared MobileNav uses white burger bars on a dark overlay; over the cream
// Lotus header we need ink-coloured bars. We wrap the shared overlay but draw
// our own trigger so the icon is visible on a light background.
function MobileNavInk({ links, book }: { links: { label: string; href: string }[]; book: string }) {
  return (
    <div className="[&_span.bg-white]:!bg-[#23211C] lg:hidden">
      <MobileNav links={links} book={book} cta="Book a visit" />
    </div>
  );
}
