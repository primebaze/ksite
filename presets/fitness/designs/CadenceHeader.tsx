"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const IVORY = "#fbf7f4";
const INK = "#1c1a1d";
const BLUSH = "#c8657a";

// Sticky header for the Cadence design (dance / movement studio): a light,
// editorial bar that gains a soft ivory background + hairline once scrolled.
// Italic serif wordmark, refined uppercase nav, a blush "Book a class" pill.
export function CadenceHeader({
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

  const dark = !scrolled && !solid;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_1px_24px_rgba(28,26,29,0.08)]" : ""}`}
      style={scrolled ? { background: IVORY, borderBottom: `1px solid ${INK}14` } : undefined}
    >
      {dark && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />}
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5" style={{ color: dark ? "#ffffff" : INK }}>
        <a href={home}>
          <span data-edit="tenant.business_name" style={{ fontFamily: "var(--font-fraunces)" }} className="text-2xl italic tracking-[0.01em]">{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.26em] md:flex" style={{ color: dark ? "#ffffffd0" : `${INK}bb` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90 md:inline-flex"
          style={{ background: BLUSH, color: "#fff" }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={INK} fg="#ffffff" accent={BLUSH} barColor={dark ? "#ffffff" : INK} />
      </div>
    </header>
  );
}
