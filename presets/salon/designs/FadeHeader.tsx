"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const INK = "#1c1a17";
const CORAL = "#e8492e";

// Sticky header for the Fade salon design (New Cross Hair inspired). Transparent
// over the home hero with a soft top gradient, turns solid cream/ink with a
// shadow once scrolled. Business name sits left, nav links centre-right, and a
// coral "Book Appointment" button sits on the far right; collapses to a
// functional hamburger below md.
export function FadeHeader({
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

  // White text everywhere keeps the reused MobileNav hamburger (white bars)
  // visible; the solid state is a dark ink bar so the contrast holds.
  const textColor = "#ffffff";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-md" : ""}`}
      style={scrolled ? { background: INK } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        {/* business name (links home) */}
        <a href={home} className="pointer-events-auto">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: textColor }}
            className="block whitespace-nowrap text-lg font-medium italic tracking-wide [text-shadow:0_1px_10px_rgba(0,0,0,0.35)] sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav + CTA */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex gap-7 text-sm font-medium" style={{ color: textColor }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:opacity-70">{l.label}</a>
            ))}
          </nav>
          <a
            href={book}
            className="inline-flex px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ background: CORAL }}
          >
            Book Appointment
          </a>
        </div>

        {/* mobile menu (functional) */}
        <div className="md:hidden" style={{ color: textColor }}>
          <MobileNav links={links} book={book} cta="Book Appointment" />
        </div>
      </div>
    </header>
  );
}
