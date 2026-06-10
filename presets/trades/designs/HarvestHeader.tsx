"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const GREEN = "#3E8E41"; // fresh leaf-green
const CREAM = "#F6F1E2"; // warm cream
const TOMATO = "#E0533B"; // tomato red

// Sticky header for the Harvest design (bright local greengrocer): transparent
// over the cream/green market hero, then snaps to a solid leaf-green bar with a
// sunny-yellow awning underline once scrolled. Wordmark + a little crate mark on
// the left, nav centre-right, a rounded "Order a veg box" button right; collapses
// to a functional hamburger below md.
export function HarvestHeader({
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

  // The crate mark — a little stacked-slat produce crate that recurs across the design.
  const Crate = ({ dark }: { dark: boolean }) => (
    <span aria-hidden className="inline-flex h-7 w-7 flex-col justify-center gap-[3px] rounded-[5px] p-[3px]" style={{ background: dark ? CREAM : "#ffffff2e", border: `1.5px solid ${dark ? GREEN : "#ffffff66"}` }}>
      <span className="h-[3px] w-full rounded-full" style={{ background: TOMATO }} />
      <span className="h-[3px] w-full rounded-full" style={{ background: "#F4C430" }} />
      <span className="h-[3px] w-full rounded-full" style={{ background: dark ? GREEN : CREAM }} />
    </span>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_10px_30px_-18px_rgba(46,74,28,0.7)]" : ""}`}
      style={scrolled ? { background: GREEN, borderBottom: `3px solid #F4C430` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/25 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: scrolled ? CREAM : "#2e3a1c" }}>
        <a href={home} className="flex items-center gap-2.5">
          <Crate dark={!scrolled} />
          <span data-edit="tenant.business_name" className="text-lg font-extrabold tracking-[0.01em] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.16em] md:flex" style={{ color: scrolled ? "#ffffffe6" : "#3a4a26" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-70">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide transition hover:opacity-70" style={{ color: scrolled ? "#ffffffe6" : "#3a4a26" }}>{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] transition hover:brightness-105" style={{ background: TOMATO, color: "#fff" }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={GREEN} fg={CREAM} accent={TOMATO} barColor={scrolled ? CREAM : "#2e3a1c"} />
      </div>
    </header>
  );
}
