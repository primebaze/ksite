"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const INK = "#0b0d10";
const LIME = "#c6f24e";

// Sticky header for the Forge design (bold dark high-energy gym): transparent
// over the hero, snaps to near-black with a thin lime underline once scrolled.
// Logo left, nav centre-right, a hard "Join now" button. Collapses to a
// functional hamburger below md.
export function ForgeHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-2xl" : ""}`}
      style={scrolled ? { background: INK, borderBottom: `1px solid ${LIME}33` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-5">
        <a href={home} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center text-sm font-black" style={{ background: LIME, color: INK }}>
            {name.trim().charAt(0).toUpperCase() || "F"}
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-black uppercase tracking-[0.04em] [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.18em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden px-7 py-3 text-[12px] font-black uppercase tracking-[0.18em] transition hover:opacity-90 md:inline-flex"
          style={{ background: LIME, color: INK }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={INK} fg="#ffffff" accent={LIME} />
      </div>
    </header>
  );
}
