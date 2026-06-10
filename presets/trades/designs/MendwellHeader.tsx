"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const BLUE = "#2E5BBA"; // friendly royal blue
const AMBER = "#F2B03D"; // warm amber-yellow
const INK = "#1B2533"; // deep navy ink

// Sticky header for the Mendwell handyman design: transparent over the blue
// hero, snaps to a solid white bar with a soft shadow once scrolled. A little
// amber toolbox mark sits beside the wordmark; nav centre-right, a friendly
// pill "Get a quote" button right. Collapses to a functional hamburger below md.
export function MendwellHeader({
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
  const fg = onLight ? INK : "#ffffff";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_4px_24px_rgba(27,37,51,0.1)]" : ""}`}
      style={scrolled ? { background: "#FFFFFF", borderBottom: "1px solid #E7EBF1" } : undefined}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl"
            style={{ background: AMBER, color: INK }}
            aria-hidden
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
              <path d="M8 9V7a4 4 0 0 1 8 0v2" />
            </svg>
          </span>
          <span
            data-edit="tenant.business_name"
            className="text-lg font-bold tracking-[-0.01em] sm:text-xl"
            style={{ fontFamily: "var(--font-space)", textShadow: onLight ? "none" : "0 1px 10px rgba(0,0,0,0.25)" }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-[14px] font-semibold md:flex" style={{ color: onLight ? "#42506350" : "#ffffff" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ color: onLight ? INK : "#ffffff", opacity: 0.85 }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="text-[14px] font-semibold transition hover:opacity-80" style={{ color: fg }}>
              {phone}
            </a>
          )}
          <a
            href={cta}
            className="rounded-full px-5 py-2.5 text-[13px] font-bold transition hover:brightness-105"
            style={{ background: onLight ? BLUE : AMBER, color: onLight ? "#ffffff" : INK }}
          >
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg="#ffffff" accent={AMBER} barColor={fg} />
      </div>
    </header>
  );
}
