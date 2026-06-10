"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const CHAR = "#16181c"; // charcoal
const COPPER = "#c4794e"; // warm metallic accent

// Sticky header for the Apex design (premium personal-training / performance):
// transparent over the hero, solidifies to charcoal with a copper hairline on
// scroll. Wordmark left, refined nav centre-right, an outlined "Apply" CTA.
// Collapses to a functional hamburger below md.
export function ApexHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-xl" : ""}`}
      style={scrolled ? { background: CHAR, borderBottom: `1px solid ${COPPER}40` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8 sm:py-6">
        <a href={home} className="flex items-baseline gap-2">
          <span data-edit="tenant.business_name" style={{ fontFamily: "var(--font-fraunces)" }} className="text-lg font-medium tracking-[0.02em] [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:text-xl">{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-neutral-900 md:inline-flex"
          style={{ border: `1px solid ${COPPER}` }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={CHAR} fg="#ffffff" accent={COPPER} />
      </div>
    </header>
  );
}
