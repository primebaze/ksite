"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#1C2024";
const OFFWHITE = "#F6F4EF";
const COBALT = "#2F5FD0";
const OCHRE = "#E8A83C";
const SAGE = "#9DB89A";

// Sticky header for the Rollwell design (fresh painter & decorator). Over the
// bright off-white hero it floats transparent with ink text; once scrolled it
// snaps to a solid off-white bar with a thin tri-colour paint-swatch underline
// (cobalt / ochre / sage). Wordmark carries a little colour-chip mark. Collapses
// to the shared trades hamburger below md.
export function RollwellHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_30px_-18px_rgba(28,32,36,0.45)]" : ""}`}
      style={scrolled ? { background: OFFWHITE } : undefined}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: INK }}>
        <a href={home} className="flex items-center gap-2.5">
          {/* colour-chip mark */}
          <span className="flex h-6 overflow-hidden rounded-[3px]" aria-hidden>
            <span className="block h-full w-1.5" style={{ background: COBALT }} />
            <span className="block h-full w-1.5" style={{ background: OCHRE }} />
            <span className="block h-full w-1.5" style={{ background: SAGE }} />
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-[-0.01em] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[13px] font-semibold tracking-[0.02em] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative transition hover:opacity-60">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-semibold transition hover:opacity-60">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-110" style={{ background: COBALT }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg="#ffffff" accent={OCHRE} barColor={INK} />
      </div>
      {scrolled && (
        <div className="flex h-[3px] w-full" aria-hidden>
          <span className="block h-full flex-1" style={{ background: COBALT }} />
          <span className="block h-full flex-1" style={{ background: OCHRE }} />
          <span className="block h-full flex-1" style={{ background: SAGE }} />
        </div>
      )}
    </header>
  );
}
