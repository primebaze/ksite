"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const INK = "#120c0c";
const BRASS = "#c2783f";

// Sticky header for the Ironclad design (combat / martial-arts gym): transparent
// over the hero, snaps to deep oxblood-charcoal with a brass underline once
// scrolled. Diamond logo mark, hard uppercase nav, "Start training" button.
export function IroncladHeader({
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
      style={scrolled ? { background: INK, borderBottom: `1px solid ${BRASS}55` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/65 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        <a href={home} className="flex items-center gap-3">
          <span className="grid h-6 w-6 rotate-45 place-items-center" style={{ border: `2px solid ${BRASS}` }} />
          <span data-edit="tenant.business_name" className="text-lg font-bold uppercase tracking-[0.14em] [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[11px] font-bold uppercase tracking-[0.22em] text-white/80 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden border px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-neutral-900 md:inline-flex"
          style={{ borderColor: BRASS }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={INK} fg="#ffffff" accent={BRASS} />
      </div>
    </header>
  );
}
