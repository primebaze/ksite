"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const CHARCOAL = "#232220";
const ORANGE = "#F26A1B";
const OFFWHITE = "#F6F3ED";

// Sticky header for the Cornerstone design (established building & construction
// firm): transparent over the dark hero, then snaps to a solid off-white bar
// with a charcoal wordmark and a thin orange rule once scrolled. A small square
// "block" mark sits beside the name as the structural signature. Wordmark left,
// nav centre, a squared "Get a quote" button right; collapses to the shared
// trades hamburger below md.
export function CornerstoneHeader({
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

  const onLight = scrolled;
  const fg = onLight ? CHARCOAL : "#ffffff";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_30px_rgba(35,34,32,0.12)]" : ""}`}
      style={scrolled ? { background: OFFWHITE, borderBottom: `3px solid ${ORANGE}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 grid-cols-2 grid-rows-2 gap-[2px]" aria-hidden>
            <span style={{ background: ORANGE }} />
            <span style={{ background: onLight ? "#cfc7b6" : "#ffffff80" }} />
            <span style={{ background: onLight ? "#cfc7b6" : "#ffffff80" }} />
            <span style={{ background: ORANGE }} />
          </span>
          <span
            data-edit="tenant.business_name"
            className="text-lg font-extrabold uppercase tracking-[0.12em] sm:text-xl"
            style={{ fontFamily: "var(--font-space)", color: fg, textShadow: onLight ? "none" : "0 1px 10px rgba(0,0,0,0.5)" }}
          >
            {name}
          </span>
        </a>

        <nav
          className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.18em] md:flex"
          style={{ color: onLight ? "#5a564f" : "#ffffffd9" }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#F26A1B]">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide transition hover:text-[#F26A1B]" style={{ color: fg }}>
              {phone}
            </a>
          )}
          <a
            href={cta}
            className="px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-110"
            style={{ background: ORANGE }}
          >
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={CHARCOAL} fg="#ffffff" accent={ORANGE} barColor={fg} />
      </div>
    </header>
  );
}
