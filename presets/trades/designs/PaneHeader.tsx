"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const NAVY = "#14344C";
const SKY = "#2FA6E0";
const WHITE = "#FBFEFF";

// Sticky header for the Pane design (crisp window-cleaning round): transparent
// over the bright sky-blue hero, then snaps to a solid glass-navy bar with a
// sky-blue underline once scrolled. Wordmark sits beside a small four-pane glass
// mark; nav centre-right with a clean "Get a quote" button. Collapses to the
// shared functional hamburger below md.
export function PaneHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_30px_rgba(20,52,76,0.25)]" : ""}`}
      style={scrolled ? { background: NAVY, borderBottom: `2px solid ${SKY}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#14344c4d] to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <PaneMark />
          <span data-edit="tenant.business_name" className="text-lg font-extrabold tracking-[0.02em] [text-shadow:0_1px_10px_rgba(20,52,76,0.4)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.16em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[11px] font-extrabold uppercase tracking-[0.16em] transition hover:brightness-105" style={{ background: SKY, color: WHITE }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={NAVY} fg="#ffffff" accent={SKY} />
      </div>
    </header>
  );
}

// Small four-pane glass mark — the Pane signature, a clean window divided by
// mullions with a single sky-blue glint pane.
export function PaneMark({ size = 26 }: { size?: number }) {
  return (
    <span className="inline-flex" aria-hidden style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="2.5" fill={SKY} />
        <rect x="2" y="2" width="20" height="20" rx="2.5" stroke="#ffffff" strokeWidth="0" />
        <line x1="12" y1="3" x2="12" y2="21" stroke={WHITE} strokeWidth="1.6" />
        <line x1="3" y1="12" x2="21" y2="12" stroke={WHITE} strokeWidth="1.6" />
        <path d="M5 9 L9 5" stroke="#ffffffcc" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M5 12.5 L12 5.5" stroke="#ffffff66" strokeWidth="1.1" strokeLinecap="round" />
      </svg>
    </span>
  );
}
