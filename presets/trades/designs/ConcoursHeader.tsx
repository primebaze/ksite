"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const GLOSS = "#0E0F12"; // deep gloss black
const GOLD = "#C9A24A"; // liquid gold
const PEARL = "#F3F4F2"; // pearl white

// Sticky header for the Concours design (premium car-detailing & ceramic-coating
// studio): transparent over the glossy black hero, then settles into a solid
// gloss-black bar with a fine liquid-gold hairline once scrolled. Serif-free
// luxe wordmark with a thin gold rule left, spaced-out nav centre-right, an
// outlined gold "Book" pill right; collapses to a hamburger below md.
export function ConcoursHeader({
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
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
      style={
        scrolled
          ? { background: "rgba(14,15,18,0.86)", borderBottom: `1px solid ${GOLD}40`, backdropFilter: "blur(14px)" }
          : undefined
      }
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/55 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-5 text-white sm:px-8">
        <a href={home} className="flex items-center gap-3">
          <span className="inline-block h-6 w-px" style={{ background: `linear-gradient(${GOLD}, transparent)` }} />
          <span
            data-edit="tenant.business_name"
            className="text-lg font-semibold uppercase tracking-[0.34em] sm:text-xl"
            style={{ fontFamily: "var(--font-space)", color: PEARL }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-10 text-[11px] font-medium uppercase tracking-[0.26em] text-white/75 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-[#C9A24A]">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[12px] font-medium tracking-[0.16em] text-white/85 transition hover:text-white">{phone}</a>}
          <a
            href={cta}
            className="rounded-full border px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-[#C9A24A] hover:text-[#0E0F12]"
            style={{ borderColor: `${GOLD}88`, color: GOLD, fontFamily: "var(--font-space)" }}
          >
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={GLOSS} fg={PEARL} accent={GOLD} />
      </div>
    </header>
  );
}
