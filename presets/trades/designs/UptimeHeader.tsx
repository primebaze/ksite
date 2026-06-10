"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const NAVY = "#0F1E33";
const CYAN = "#2BB0F0";
const GREEN = "#2FCB7E";

// Sticky header for the Uptime design (modern managed-IT / MSP). Transparent over
// the navy hero, then snaps to a solid tech-navy bar with a subtle cyan hairline
// once scrolled. Wordmark left with a live "online" status dot, centre nav, a
// pill "Free IT review" CTA right; collapses to the shared hamburger below md.
export function UptimeHeader({
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
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "backdrop-blur" : ""}`}
      style={scrolled ? { background: "rgba(15,30,51,0.92)", borderBottom: `1px solid ${CYAN}33` } : undefined}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <span className="relative grid h-8 w-8 place-items-center rounded-lg" style={{ background: `linear-gradient(140deg, ${CYAN}, ${NAVY})`, boxShadow: `0 0 0 1px ${CYAN}40` }}>
            <span className="h-2 w-2 rounded-full" style={{ background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-[-0.01em] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[13px] font-medium tracking-tight text-white/80 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-semibold tracking-tight text-white/85 transition hover:text-white">{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[12px] font-bold tracking-tight text-[#0F1E33] transition hover:brightness-110" style={{ background: CYAN, boxShadow: `0 6px 20px -8px ${CYAN}` }}>{ctaLabel}</a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={NAVY} fg="#ffffff" accent={CYAN} />
      </div>
    </header>
  );
}
