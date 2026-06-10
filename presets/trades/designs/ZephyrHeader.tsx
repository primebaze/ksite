"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const SLATE = "#2B3640";
const CYAN = "#25B4D6";
const MINT = "#EFF7F8";

// Sticky header for the Zephyr design (cool air-conditioning & ventilation
// specialist). Floats transparent over the airy slate/cyan hero, then settles
// into a frosted mint bar with a fine cyan hairline once scrolled. A small
// airflow streamline glyph sits beside the wordmark; the rounded pill CTA reads
// cool and modern. Collapses to the shared trades hamburger below md.
export function ZephyrHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_30px_-12px_rgba(43,54,64,0.35)] backdrop-blur-md" : ""}`}
      style={scrolled ? { background: "rgba(239,247,248,0.86)", borderBottom: `1px solid ${CYAN}55` } : undefined}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span aria-hidden className="inline-flex h-7 w-7 items-center justify-center">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
              <path d="M2 8c4-3 9 1 13-1s7-3 9-1" stroke={CYAN} strokeWidth="2" strokeLinecap="round" />
              <path d="M2 14c4-3 9 1 13-1s5-2 8-1" stroke={scrolled ? SLATE : MINT} strokeOpacity={scrolled ? "0.55" : "0.7"} strokeWidth="2" strokeLinecap="round" />
              <path d="M4 20c4-2.5 8 1 11-0.5" stroke={CYAN} strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span
            data-edit="tenant.business_name"
            className={`text-lg font-bold tracking-[0.04em] sm:text-xl ${scrolled ? "" : "[text-shadow:0_1px_10px_rgba(20,40,50,0.45)]"}`}
            style={{ fontFamily: "var(--font-space)", color: scrolled ? SLATE : "#ffffff" }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-semibold uppercase tracking-[0.16em] md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="transition hover:opacity-100"
              style={{ color: scrolled ? "#4a5862" : "rgba(255,255,255,0.88)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="text-[13px] font-semibold tracking-wide transition" style={{ color: scrolled ? SLATE : "rgba(255,255,255,0.92)" }}>
              {phone}
            </a>
          )}
          <a
            href={cta}
            className="rounded-full px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition hover:brightness-110"
            style={{ background: CYAN, color: "#06222b", boxShadow: "0 6px 18px -6px rgba(37,180,214,0.7)" }}
          >
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={SLATE} fg="#ffffff" accent={CYAN} barColor={scrolled ? SLATE : "#ffffff"} />
      </div>
    </header>
  );
}
