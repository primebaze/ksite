"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const SAND = "#f6f1e9";
const INK = "#33302a";
const SAGE = "#7c8a6f";

// Sticky header for the Haven design (calm wellness & recovery studio): a light,
// airy bar that gains a soft sand background + faint hairline once scrolled.
// Serif wordmark, quiet uppercase nav, a soft "Book a visit" pill.
export function HavenHeader({
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

  const dark = !scrolled && !solid; // sitting over imagery → light text

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_1px_24px_rgba(60,50,40,0.08)]" : ""}`}
      style={scrolled ? { background: SAND, borderBottom: `1px solid ${INK}1a` } : undefined}
    >
      {dark && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 to-transparent" />}
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5" style={{ color: dark ? "#ffffff" : INK }}>
        <a href={home} className="flex flex-col leading-none">
          <span data-edit="tenant.business_name" style={{ fontFamily: "var(--font-fraunces)" }} className="text-xl tracking-[0.02em]">{name}</span>
          <span className="mt-1 text-[8px] uppercase tracking-[0.4em]" style={{ color: dark ? "#ffffffaa" : SAGE }}>Wellness &amp; Recovery</span>
        </a>

        <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.24em] md:flex" style={{ color: dark ? "#ffffffd0" : `${INK}cc` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-70">{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90 md:inline-flex"
          style={{ background: SAGE, color: "#fff" }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={INK} fg="#ffffff" accent={SAGE} barColor={dark ? "#ffffff" : INK} />
      </div>
    </header>
  );
}
