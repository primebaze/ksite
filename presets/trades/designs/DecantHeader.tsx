"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const BURGUNDY = "#5A1E2D";
const AMBER = "#C58A3A";
const OAT = "#EFE7D6";
const INK = "#1B1518";

// Sticky header for the Decant design (independent wine & spirits bottle shop):
// transparent over the warm burgundy hero, snaps to a solid burgundy bar with an
// amber hairline once scrolled. Oat wordmark with a small cork-stopper mark left,
// nav centre-right, an amber "Reserve a bottle" pill right; collapses to the
// shared trades hamburger below md.
export function DecantHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_10px_40px_-20px_rgba(0,0,0,0.7)]" : ""}`}
      style={scrolled ? { background: BURGUNDY, borderBottom: `1px solid ${AMBER}55` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: OAT }}>
        <a href={home} className="flex items-center gap-2.5">
          {/* cork-stopper mark */}
          <span aria-hidden className="grid h-7 w-5 place-items-start overflow-hidden rounded-[3px]" style={{ background: AMBER }}>
            <span className="mt-[3px] h-px w-full" style={{ background: `${INK}55` }} />
            <span className="mt-[3px] h-px w-full" style={{ background: `${INK}55` }} />
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-medium uppercase tracking-[0.22em] [text-shadow:0_1px_10px_rgba(0,0,0,0.35)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-medium uppercase tracking-[0.2em] md:flex" style={{ color: `${OAT}d9` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-medium tracking-wide transition hover:text-white" style={{ color: `${OAT}e6` }}>{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:brightness-105" style={{ background: AMBER, color: INK }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={BURGUNDY} fg={OAT} accent={AMBER} barColor={OAT} />
      </div>
    </header>
  );
}
