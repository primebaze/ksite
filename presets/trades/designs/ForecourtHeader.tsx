"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const NAVY = "#14233B";
const GOLD = "#C7A35A";

// Sticky header for the Forecourt design (premium car dealership): transparent
// over the showroom-navy hero, then snaps to a solid navy bar with a thin gold
// hairline once scrolled. Wordmark with a gold marque chip on the left, the
// dealership nav centre-right, phone + a gold "Enquire" pill on the right;
// collapses to the shared trades hamburger below md.
export function ForecourtHeader({
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : ""}`}
      style={scrolled ? { background: NAVY, borderBottom: `1px solid ${GOLD}59` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: GOLD, color: NAVY, fontFamily: "var(--font-space)" }} aria-hidden>
            {(name?.[0] ?? "F").toUpperCase()}
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-tight [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-semibold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition hover:brightness-110" style={{ background: GOLD, color: NAVY }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={NAVY} fg="#ffffff" accent={GOLD} />
      </div>
    </header>
  );
}
