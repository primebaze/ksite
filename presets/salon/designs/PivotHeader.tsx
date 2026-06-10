"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const OLIVE = "#3F4A33";
const CLAY = "#C07A52";

// Sticky header for the Pivot osteopathy-clinic design. Transparent over the
// warm sand hero, then settles into an opaque oat-cream bar with a soft olive
// shadow once scrolled (or always-solid on sub-pages via `solid`). A small
// rotating "pivot" mark sits beside the wordmark on the left; nav centre-right,
// phone + book button on the right. Collapses to the shared hamburger below lg.
export function PivotHeader({
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

  const fg = scrolled ? OLIVE : "#fff";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(245,239,228,0.96)" : "transparent",
        boxShadow: scrolled ? "0 6px 26px rgba(63,74,51,0.12)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        {/* wordmark + pivot mark (left) */}
        <a href={home} className="flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 place-items-center rounded-full"
            style={{ background: scrolled ? CLAY : "rgba(255,255,255,0.2)", color: "#fff" }}
            aria-hidden
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
              <circle cx="12" cy="12" r="3.2" />
              <path d="M12 2.6v3.2M12 18.2v3.2M2.6 12h3.2M18.2 12h3.2" />
            </svg>
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: fg, textShadow: scrolled ? "none" : "0 1px 14px rgba(0,0,0,0.35)" }}
            className="whitespace-nowrap text-lg font-medium tracking-[0.04em] sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav (centre-right) */}
        <nav className="hidden items-center gap-7 text-[13px] font-medium tracking-[0.02em] lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition hover:opacity-70"
              style={{ color: fg, textShadow: scrolled ? "none" : "0 1px 12px rgba(0,0,0,0.4)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* right cluster: phone + book */}
        <div className="hidden items-center gap-5 lg:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-[13px] font-semibold transition hover:opacity-75"
              style={{ color: fg, textShadow: scrolled ? "none" : "0 1px 12px rgba(0,0,0,0.4)" }}
            >
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90"
            style={{ background: CLAY }}
          >
            Book now
          </a>
        </div>

        {/* mobile menu (functional) */}
        <div className="lg:hidden">
          <MobileNav links={links} book={book} cta="Book now" />
        </div>
      </div>
    </header>
  );
}
