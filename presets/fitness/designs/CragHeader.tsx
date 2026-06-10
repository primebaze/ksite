"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const SLATE = "#21262B";
const CHALK = "#F2F0EA";
const ORANGE = "#F2762E";
const TEAL = "#19A7A0";
const MAGENTA = "#D6457E";

// Sticky header for the Crag design (indoor climbing & bouldering gym):
// transparent over the slate hero, snaps to a solid slate bar with a tri-colour
// climbing-hold underline once scrolled. Rounded "hold" logo dot left, pill nav,
// vivid rounded "Climb" button. Mobile nav themed to the same hold palette.
export function CragHeader({
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
      style={scrolled ? { background: SLATE } : undefined}
    >
      {scrolled && (
        <div
          className="absolute inset-x-0 bottom-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, ${ORANGE} 0 33%, ${TEAL} 33% 66%, ${MAGENTA} 66% 100%)` }}
        />
      )}
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        <a href={home} className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-black" style={{ background: ORANGE, color: SLATE }}>
            {name.trim().charAt(0).toUpperCase() || "C"}
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-extrabold uppercase tracking-[0.14em] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">{name}</span>
        </a>

        <nav className="hidden items-center gap-2 rounded-full px-2 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85 md:flex" style={{ background: scrolled ? "#ffffff10" : "#00000026", backdropFilter: "blur(6px)" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-3.5 py-1.5 transition hover:bg-white/10 hover:text-white">{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden rounded-full px-7 py-3 text-[11px] font-black uppercase tracking-[0.2em] transition hover:opacity-90 md:inline-flex"
          style={{ background: TEAL, color: SLATE }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={SLATE} fg={CHALK} accent={ORANGE} />
      </div>
    </header>
  );
}
