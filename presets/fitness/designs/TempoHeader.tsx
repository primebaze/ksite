"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const INK = "#0d0a14";
const NEON = "#ff2d78";

// Sticky header for the Tempo design (boutique indoor cycling / HIIT): glassy
// over the hero, snaps to deep night-violet with a neon-pink underline once
// scrolled. Pill "Reserve a bike" CTA, energetic uppercase nav.
export function TempoHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-2xl backdrop-blur" : ""}`}
      style={scrolled ? { background: `${INK}f2`, borderBottom: `1px solid ${NEON}55` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        <a href={home} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-black" style={{ background: NEON, color: "#fff" }}>
            {name.trim().charAt(0).toUpperCase() || "T"}
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-extrabold tracking-[0.02em] [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden rounded-full px-7 py-3 text-[12px] font-bold uppercase tracking-[0.18em] transition hover:opacity-90 md:inline-flex"
          style={{ background: NEON, color: "#fff" }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={INK} fg="#ffffff" accent={NEON} />
      </div>
    </header>
  );
}
