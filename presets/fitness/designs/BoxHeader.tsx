"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const INK = "#161412";
const ORANGE = "#f4511e";

// Sticky header for the Box design (industrial CrossFit box): transparent over
// the hero, snaps to dark concrete with a thin safety-orange underline once
// scrolled. Square logo tile left, condensed nav, hard-edged "Drop in" button.
export function BoxHeader({
  name,
  cta,
  ctaHref,
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  cta: string;
  ctaHref: string;
  links: { label: string; href: string }[];
  home?: string;
  solid?: boolean;
}) {
  const [scrolled, setScrolled] = useState(solid);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-2xl" : ""}`}
      style={scrolled ? { background: INK, borderBottom: `2px solid ${ORANGE}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/65 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        <a href={home} className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center text-sm font-black" style={{ background: ORANGE, color: INK }}>
            {name.trim().charAt(0).toUpperCase() || "B"}
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-extrabold uppercase tracking-[0.06em] [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.2em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden px-7 py-3 text-[12px] font-black uppercase tracking-[0.2em] transition hover:opacity-90 md:inline-flex"
          style={{ background: ORANGE, color: INK }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={INK} fg="#ffffff" accent={ORANGE} />
      </div>
    </header>
  );
}
