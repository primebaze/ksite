"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const NAVY = "#243B53";
const AMBER = "#E0A45E";
const CREAM = "#F6F1E7";

// Header for the Clarity audiology design. Sits transparent over the cream
// hero, then settles into a solid cream bar with a soft shadow and a thin
// amber baseline once scrolled (or when `solid` is forced on sub-pages).
// Layout: a left wordmark with a sound-wave mark, centred nav, and a large
// high-contrast "Book a hearing test" button on the right. Generous sizing and
// big tap targets for accessibility. Collapses to the shared hamburger below lg.
export function ClarityHeader({
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

  const onLight = scrolled; // dark text once the cream bar is solid
  const textColor = onLight ? NAVY : "#243B53";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? CREAM : "rgba(246,241,231,0.55)",
        boxShadow: scrolled ? "0 6px 24px rgba(36,59,83,0.12)" : "none",
        borderBottom: scrolled ? `2px solid ${AMBER}` : "2px solid transparent",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8 sm:py-4">
        {/* wordmark + sound-wave mark (links home) */}
        <a href={home} className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full"
            style={{ background: AMBER, color: NAVY }}
            aria-hidden
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M5 10v4M9 7v10M13 9v6M17 12v0.5M17 11.5v1" />
            </svg>
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: textColor }}
            className="whitespace-nowrap text-xl font-semibold tracking-[0.01em] sm:text-2xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav (centre) */}
        <nav
          className="hidden items-center gap-8 text-[15px] font-semibold lg:flex"
          style={{ color: textColor }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#4E8C8A]">
              {l.label}
            </a>
          ))}
        </nav>

        {/* right cluster: phone + Book button */}
        <div className="hidden items-center gap-5 lg:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-[15px] font-bold transition hover:opacity-70"
              style={{ color: textColor }}
            >
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center rounded-full px-6 py-3 text-[15px] font-bold tracking-wide text-white transition hover:opacity-90"
            style={{ background: NAVY }}
          >
            Book a hearing test
          </a>
        </div>

        {/* mobile menu (functional) */}
        <div className="lg:hidden">
          <MobileNavWrap links={links} book={book} navy={NAVY} amber={AMBER} dark={onLight} />
        </div>
      </div>
    </header>
  );
}

// Small wrapper so the hamburger lines pick up the right colour over the cream
// header. MobileNav renders white bars; we tint via currentColor context.
function MobileNavWrap({
  links,
  book,
  navy,
  amber,
  dark,
}: {
  links: { label: string; href: string }[];
  book: string;
  navy: string;
  amber: string;
  dark: boolean;
}) {
  // MobileNav's trigger bars are hard-coded white; recolour them to navy for
  // the light cream header via a scoped style override.
  return (
    <div
      style={{ color: dark ? navy : navy }}
      className="[&_button>span]:!bg-[#243B53]"
      data-amber={amber}
    >
      <MobileNav links={links} book={book} cta="Book a hearing test" />
    </div>
  );
}
