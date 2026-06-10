"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const PLUM = "#1a0b2e"; // deep plum ink
const PINK = "#ff3d81"; // vibrant magenta

// Sticky header for the Pulse design (vibrant modern boutique studio): white
// over the hero, snaps to deep-plum with a magenta underline on scroll. Logo
// left, nav centre, a gradient pill CTA. Collapses to a functional hamburger
// below md.
export function PulseHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-xl" : ""}`}
      style={scrolled ? { background: PLUM, borderBottom: `2px solid ${PINK}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        <a href={home} className="flex items-center gap-2">
          <span data-edit="tenant.business_name" className="text-lg font-extrabold tracking-[-0.01em] [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]">{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[13px] font-semibold tracking-[0.02em] text-white/90 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden rounded-full px-7 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:opacity-90 md:inline-flex"
          style={{ background: `linear-gradient(90deg, ${PINK}, #ff8a3d)` }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={PLUM} fg="#ffffff" accent={PINK} />
      </div>
    </header>
  );
}
