"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const INK = "#14110F";
const RICE = "#F2EDE3";
const CRIMSON = "#B5292B";

// Sticky header for the Dojo design (martial-arts academy): transparent over the
// ink-black hero, snaps to a solid ink bar with a thin crimson underline once
// scrolled. Enso-circle "鬥" mark left, restrained letter-spaced nav, a crimson
// "Free trial" call to action. Mobile nav reuses the shared overlay.
export function DojoHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_40px_rgba(0,0,0,0.45)]" : ""}`}
      style={scrolled ? { background: INK, borderBottom: `1px solid ${CRIMSON}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5" style={{ color: RICE }}>
        <a href={home} className="flex items-center gap-3.5">
          <span className="relative grid h-10 w-10 place-items-center">
            <span className="absolute inset-0 rounded-full" style={{ border: `2px solid ${CRIMSON}` }} />
            <span className="text-[15px] font-semibold" style={{ color: RICE, fontFamily: "var(--font-fraunces)" }}>{name.trim().charAt(0).toUpperCase() || "道"}</span>
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-semibold tracking-[0.14em] [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]" style={{ fontFamily: "var(--font-fraunces)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.26em] md:flex" style={{ color: `${RICE}cc` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ opacity: 0.85 }}>{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden px-7 py-3 text-[11px] font-bold uppercase tracking-[0.24em] transition hover:opacity-90 md:inline-flex"
          style={{ background: CRIMSON, color: RICE }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={INK} fg={RICE} accent={CRIMSON} />
      </div>
    </header>
  );
}
