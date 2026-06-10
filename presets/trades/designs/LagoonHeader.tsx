"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const SLATE = "#2F4A4D"; // deep teal-slate
const OFFWHITE = "#F6F4EF"; // off-white
const BRASS = "#C2A468"; // soft brass accent

// Sticky header for the Lagoon design (calm bathroom-design studio): floats
// transparently over the seafoam hero, then settles into a soft off-white bar
// with a hairline brass underline once scrolled. Wordmark left with a small
// ripple mark, gentle nav centre-right, a brass-outline "Free design & quote"
// pill right; collapses into the shared trades hamburger overlay below md.
export function LagoonHeader({
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

  const fg = scrolled ? SLATE : "#ffffff";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={
        scrolled
          ? { background: `${OFFWHITE}f2`, borderBottom: `1px solid ${BRASS}66`, backdropFilter: "blur(10px)", boxShadow: "0 8px 30px -18px rgba(47,74,77,0.5)" }
          : undefined
      }
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/25 to-transparent" />}
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-2.5">
          <span aria-hidden className="relative inline-flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-full" style={{ border: `1.5px solid ${BRASS}` }} />
            <span className="absolute inset-[5px] rounded-full" style={{ border: `1.5px solid ${BRASS}99` }} />
            <span className="h-1 w-1 rounded-full" style={{ background: BRASS }} />
          </span>
          <span
            data-edit="tenant.business_name"
            className="text-lg font-semibold tracking-[0.02em] sm:text-xl"
            style={{ fontFamily: "var(--font-space)" }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-medium uppercase tracking-[0.2em] md:flex" style={{ color: scrolled ? "#52706f" : "#ffffffe6" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ opacity: 0.85 }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="text-[13px] font-medium tracking-wide transition hover:opacity-80" style={{ color: fg }}>
              {phone}
            </a>
          )}
          <a
            href={cta}
            className="rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:opacity-90"
            style={{ border: `1px solid ${scrolled ? BRASS : "#ffffffcc"}`, color: fg }}
          >
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={SLATE} fg="#ffffff" accent={BRASS} barColor={fg} />
      </div>
    </header>
  );
}
