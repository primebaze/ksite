"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const PLASTER = "#EDE8DF"; // smooth off-white
const INK = "#2A2C2E"; // deep slate ink
const STEEL = "#5E7488"; // trowel steel-blue

// Sticky header for the Render design (plasterer & rendering specialist).
// Sits transparent over the pale plaster hero, then settles into a calm
// off-white bar with a hairline steel underline once scrolled. The wordmark
// reads like a trowelled stamp; nav is quiet and widely-tracked. Collapses to
// the shared trades hamburger below md. Pass solid on inner pages.
export function RenderHeader({
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

  const fg = scrolled ? INK : INK;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? { background: `${PLASTER}f2`, borderBottom: `1px solid ${STEEL}33`, backdropFilter: "blur(10px)" }
          : undefined
      }
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-3">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full"
            style={{ background: STEEL, boxShadow: `inset 0 -3px 6px ${INK}40` }}
            aria-hidden
          >
            <span className="h-[2px] w-3.5 rounded-full" style={{ background: PLASTER }} />
          </span>
          <span
            data-edit="tenant.business_name"
            className="text-[19px] font-semibold tracking-[0.04em] sm:text-xl"
            style={{ fontFamily: "var(--font-space)" }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-10 text-[12px] font-medium uppercase tracking-[0.22em] md:flex" style={{ color: `${fg}cc` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative transition hover:opacity-100" style={{ opacity: 0.78 }}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="text-[13px] font-medium tracking-wide transition hover:opacity-70" style={{ color: fg }}>
              {phone}
            </a>
          )}
          <a
            href={cta}
            className="rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:brightness-110"
            style={{ background: INK, color: PLASTER }}
          >
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={PLASTER} fg={INK} accent={STEEL} barColor={INK} />
      </div>
    </header>
  );
}
