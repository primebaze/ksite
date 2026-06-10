"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const NAVY = "#1F3A5F";
const CORAL = "#F2724B";
const CREAM = "#F6F1E8";

// Sticky header for the Boxwell design (friendly house removals & storage):
// transparent over the navy hero, then settles to a solid navy bar with a soft
// cream hairline once scrolled. A small stacked-boxes mark sits beside the
// wordmark; a coral pill "Get a quote" button anchors the right. Collapses to
// the shared trades mobile nav below md.
export function BoxwellHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_30px_rgba(15,28,46,0.25)]" : ""}`}
      style={scrolled ? { background: NAVY, borderBottom: "1px solid rgba(246,241,232,0.16)" } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0f1c2e]/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-[7px]" style={{ background: CORAL }} aria-hidden>
            <BoxMark />
          </span>
          <span
            data-edit="tenant.business_name"
            className="text-lg font-bold tracking-[0.01em] [text-shadow:0_1px_10px_rgba(0,0,0,0.35)] sm:text-xl"
            style={{ fontFamily: "var(--font-space)" }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-[13px] font-semibold tracking-wide text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a
            href={cta}
            className="rounded-full px-6 py-2.5 text-[12px] font-bold tracking-[0.04em] text-white transition hover:brightness-105"
            style={{ background: CORAL }}
          >
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={NAVY} fg={CREAM} accent={CORAL} />
      </div>
    </header>
  );
}

// Tiny stacked-cardboard-boxes glyph used in the wordmark lockup.
function BoxMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="13" width="8" height="8" rx="1" />
      <rect x="13" y="13" width="8" height="8" rx="1" />
      <rect x="8" y="3" width="8" height="8" rx="1" />
      <path d="M12 3v8M7 17h0M17 17h0" strokeLinecap="round" />
    </svg>
  );
}
