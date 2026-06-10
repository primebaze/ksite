"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const PARCH = "#F3EAD8"; // parchment
const INK = "#20211C"; // ink
const GREEN = "#2C4034"; // bottle green
const BURGUNDY = "#7C3A33"; // accent

// Sticky header for the Vellum design (independent bookshop): transparent and
// cream-tinted over the parchment hero, then settles into a solid parchment bar
// with a bottle-green hairline and a row of tiny book-spine ticks once scrolled.
// Serif wordmark left, nav centre-right, a burgundy "Reserve a book" button
// right; collapses to a functional hamburger below md.
export function VellumHeader({
  name,
  cta,
  ctaLabel,
  phone,
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  cta: string;
  ctaLabel: string;
  phone?: string;
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

  const spines = [GREEN, BURGUNDY, "#B08A3E", INK];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_14px_40px_-28px_rgba(32,33,28,0.6)]" : ""}`}
      style={scrolled ? { background: PARCH, borderBottom: `1px solid ${GREEN}33` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#20211C26] to-transparent" />}
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: INK }}>
        <a href={home} className="flex items-center gap-2.5">
          <span aria-hidden className="flex h-5 items-end gap-[3px]">
            {spines.map((c, i) => (
              <span key={i} className="block w-[3px] rounded-[1px]" style={{ height: `${10 + ((i * 5) % 11)}px`, background: c }} />
            ))}
          </span>
          <span data-edit="tenant.business_name" className="text-xl font-medium tracking-tight sm:text-2xl" style={{ fontFamily: "var(--font-fraunces)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.18em] md:flex" style={{ fontFamily: "var(--font-space)" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="opacity-80 transition hover:opacity-100">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-medium tracking-wide opacity-80 transition hover:opacity-100">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#F3EAD8] transition hover:opacity-90" style={{ background: BURGUNDY, fontFamily: "var(--font-space)" }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={GREEN} fg="#F3EAD8" accent={BURGUNDY} barColor={scrolled ? INK : INK} />
      </div>
    </header>
  );
}
