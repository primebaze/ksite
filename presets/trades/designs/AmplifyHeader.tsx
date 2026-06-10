"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#1E1640"; // rich ink-violet
const MAGENTA = "#F0367A"; // electric magenta
const LIME = "#C6F24E"; // vivid lime
const OFF = "#F7F5FF"; // off-white

// Sticky header for the Amplify design (bold creative marketing agency):
// transparent over the ink-violet hero, then snaps to a solid ink bar with a
// lime hairline once scrolled. Pill wordmark left, nav centre-right, a vivid
// magenta "Free strategy call" pill right; collapses to a hamburger below md.
export function AmplifyHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_10px_40px_-18px_rgba(0,0,0,0.6)]" : ""}`}
      style={scrolled ? { background: INK, borderBottom: `2px solid ${LIME}` } : undefined}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: OFF }}>
        <a href={home} className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-full text-sm font-black" style={{ background: MAGENTA, color: OFF, fontFamily: "var(--font-space)" }}>{name.trim().charAt(0) || "A"}</span>
          <span data-edit="tenant.business_name" className="text-lg font-black uppercase tracking-[-0.02em] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[13px] font-bold uppercase tracking-[0.12em] md:flex" style={{ color: "rgba(247,245,255,0.78)" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#C6F24E]">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-bold tracking-wide transition hover:text-[#C6F24E]" style={{ color: "rgba(247,245,255,0.9)" }}>{phone}</a>}
          <a href={cta} className="inline-flex rounded-full px-6 py-3 text-[12px] font-black uppercase tracking-[0.1em] transition hover:brightness-110" style={{ background: MAGENTA, color: OFF }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg={OFF} accent={MAGENTA} />
      </div>
    </header>
  );
}
