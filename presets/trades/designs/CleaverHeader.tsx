"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const CREAM = "#F2E9DA";
const RED = "#8E2B2B";
const CHAR = "#232120";
const BRASS = "#B58A45";

// Sticky header for the Cleaver design (traditional craft butcher): sits
// transparent over the hearty cream/red hero, then snaps to a solid cream bar
// with a charcoal wordmark and a brass underline once scrolled. A small
// butcher-stripe block flanks the name; the order CTA is a deep meat-red pill.
// Collapses to the shared functional hamburger below md.
export function CleaverHeader({
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

  // Butcher-stripe block — the signature motif, scaled for the wordmark.
  const stripe = (
    <span
      aria-hidden
      className="inline-block h-7 w-3 rounded-[2px]"
      style={{
        background: `repeating-linear-gradient(45deg, ${RED} 0 4px, ${CREAM} 4px 8px)`,
        boxShadow: scrolled ? `inset 0 0 0 1px ${CHAR}1a` : "inset 0 0 0 1px rgba(255,255,255,0.4)",
      }}
    />
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_10px_30px_-18px_rgba(35,33,32,0.7)]" : ""}`}
      style={scrolled ? { background: CREAM, borderBottom: `3px solid ${BRASS}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/30 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          {stripe}
          <span
            data-edit="tenant.business_name"
            className="text-lg font-extrabold uppercase tracking-[0.04em] sm:text-xl"
            style={{ fontFamily: "var(--font-space)", color: scrolled ? CHAR : "#ffffff", textShadow: scrolled ? "none" : "0 1px 10px rgba(0,0,0,0.5)" }}
          >
            {name}
          </span>
        </a>

        <nav
          className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.18em] md:flex"
          style={{ color: scrolled ? `${CHAR}cc` : "rgba(255,255,255,0.9)" }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-70">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide transition hover:opacity-70" style={{ color: scrolled ? CHAR : "#ffffff" }}>{phone}</a>
          )}
          <a
            href={cta}
            className="rounded-full px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-110"
            style={{ background: RED }}
          >
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={CHAR} fg="#ffffff" accent={RED} barColor={scrolled ? CHAR : "#ffffff"} />
      </div>
    </header>
  );
}
