"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const PINE = "#2C3B2E"; // deep pine green
const CEDAR = "#A9743F"; // warm cedar timber
const OFF = "#F2EFE7"; // off-white

// Sticky header for the Palisade design (fencing, gates & decking specialist):
// transparent over the outdoor hero, then snaps to a solid pine-green bar with a
// cedar underline once scrolled. A run of vertical fence slats marks the
// wordmark — the design's recurring signature. Nav centre-right, a cedar "Get a
// quote" button right; collapses to a functional hamburger below md.
export function PalisadeHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-xl" : ""}`}
      style={scrolled ? { background: PINE, borderBottom: `3px solid ${CEDAR}` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-3">
          {/* vertical fence-slat cluster — the signature motif */}
          <span className="flex h-7 items-end gap-[3px]" aria-hidden>
            <span className="w-[3px] rounded-t-[2px]" style={{ height: "60%", background: CEDAR }} />
            <span className="w-[3px] rounded-t-[2px]" style={{ height: "100%", background: CEDAR }} />
            <span className="w-[3px] rounded-t-[2px]" style={{ height: "78%", background: CEDAR }} />
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-extrabold uppercase tracking-[0.1em] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.18em] text-white/85 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide text-white/90 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-sm px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-110" style={{ background: CEDAR }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={PINE} fg={OFF} accent={CEDAR} />
      </div>
    </header>
  );
}
