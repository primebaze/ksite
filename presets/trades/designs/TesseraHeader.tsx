"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#1E2329";
const CERAMIC = "#F4F2EE";
const GLAZE = "#2E6E8E";
const CLAY = "#C16A4A";

// Sticky header for the Tessera design (precise design-aware tiler). Transparent
// over the geometric grid hero, then snaps to a glazed-ceramic bar with a thin
// Moroccan-blue rule once scrolled. A tiny 2x2 tile glyph sits before the
// wordmark; nav is set in Space display caps; the CTA is a flat terracotta chip.
export function TesseraHeader({
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

  const fg = scrolled ? INK : "#ffffff";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={
        scrolled
          ? { background: CERAMIC, borderBottom: `1px solid ${GLAZE}`, boxShadow: "0 1px 24px rgba(30,35,41,0.08)" }
          : undefined
      }
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-2.5">
          <span
            className="grid h-6 w-6 shrink-0 grid-cols-2 grid-rows-2 overflow-hidden"
            style={{ outline: `1px solid ${scrolled ? "#1E232922" : "#ffffff66"}` }}
            aria-hidden
          >
            <span style={{ background: GLAZE }} />
            <span style={{ background: CLAY }} />
            <span style={{ background: scrolled ? "#9AA39B" : "#ffffffcc" }} />
            <span style={{ background: GLAZE }} />
          </span>
          <span
            data-edit="tenant.business_name"
            className="text-lg font-semibold uppercase tracking-[0.18em] sm:text-xl"
            style={{ fontFamily: "var(--font-space)", textShadow: scrolled ? "none" : "0 1px 10px rgba(0,0,0,0.45)" }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.2em] md:flex" style={{ color: scrolled ? "#1E2329cc" : "#ffffffdd" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ opacity: 0.86 }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="text-[13px] font-semibold tracking-wide transition hover:opacity-80" style={{ color: fg }}>
              {phone}
            </a>
          )}
          <a
            href={cta}
            className="px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition hover:brightness-110"
            style={{ background: CLAY, color: CERAMIC }}
          >
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg={CERAMIC} accent={CLAY} barColor={fg} />
      </div>
    </header>
  );
}
