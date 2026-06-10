"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#1B3B36"; // deep teal-ink
const MINT = "#2BB78A"; // fresh mint
const CORAL = "#FF7A5C"; // warm coral accent
const OFFWHITE = "#F6FBF8"; // off-white

// Sticky header for the Penny design (friendly small-business bookkeeping):
// transparent over the mint/off-white hero, then snaps to a soft off-white bar
// with a faint mint hairline once scrolled. A small coin/tick mark sits beside a
// rounded wordmark; nav centre-right with a pill "Get a free quote" CTA. Below
// md it collapses to the shared trades hamburger overlay.
export function PennyHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_30px_-18px_rgba(27,59,54,0.35)]" : ""}`}
      style={scrolled ? { background: OFFWHITE, borderBottom: `1px solid ${MINT}33` } : undefined}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: MINT, color: OFFWHITE }} aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>
          </span>
          <span
            data-edit="tenant.business_name"
            className="text-lg font-bold tracking-[-0.01em] sm:text-xl"
            style={{ fontFamily: "var(--font-space)", color: scrolled ? INK : INK }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-9 text-[14px] font-semibold md:flex" style={{ color: `${INK}cc` }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#2BB78A]">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[14px] font-semibold transition hover:text-[#2BB78A]" style={{ color: INK }}>{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[13px] font-bold transition hover:brightness-105" style={{ background: CORAL, color: "#ffffff" }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg="#ffffff" accent={CORAL} barColor={INK} />
      </div>
    </header>
  );
}
