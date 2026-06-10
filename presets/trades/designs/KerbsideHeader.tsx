"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const ASPHALT = "#2A2D31";
const SAND = "#C8A87C";
const TEAL = "#2E8C8A";
const OFFWHITE = "#F4F1EB";

// Sticky header for the Kerbside design (driveways & paving specialist).
// Transparent over the dark asphalt hero, then snaps to a solid off-white bar
// with a sandstone hairline once scrolled. A small herringbone paving glyph
// sits beside the wordmark; a teal "Get a quote" pill anchors the right.
export function KerbsideHeader({
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

  const fg = scrolled ? ASPHALT : "#ffffff";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_30px_-12px_rgba(42,45,49,0.4)]" : ""}`}
      style={scrolled ? { background: OFFWHITE, borderBottom: `1px solid ${SAND}` } : undefined}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-2.5">
          <PavingGlyph color={scrolled ? SAND : "#ffffff"} />
          <span
            data-edit="tenant.business_name"
            className="text-lg font-bold uppercase tracking-[0.14em] sm:text-xl"
            style={{ fontFamily: "var(--font-space)", textShadow: scrolled ? "none" : "0 1px 10px rgba(0,0,0,0.45)" }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.16em] md:flex" style={{ opacity: scrolled ? 0.78 : 0.9 }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ opacity: 0.85 }}>{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide transition hover:opacity-80">{phone}</a>
          )}
          <a
            href={cta}
            className="rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-110"
            style={{ background: TEAL }}
          >
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={ASPHALT} fg="#ffffff" accent={TEAL} barColor={fg} />
      </div>
    </header>
  );
}

// A tiny herringbone paving glyph — two interlocking blocks — the Kerbside mark.
function PavingGlyph({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <rect x="1.5" y="3.5" width="10" height="4.5" rx="0.5" fill={color} opacity="0.95" />
      <rect x="9" y="9" width="4.5" height="10" rx="0.5" fill={color} opacity="0.75" />
      <rect x="13.5" y="3.5" width="7" height="4.5" rx="0.5" fill={color} opacity="0.55" />
      <rect x="1.5" y="9" width="6" height="10" rx="0.5" fill={color} opacity="0.55" />
    </svg>
  );
}
