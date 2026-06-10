"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const NAVY = "#0f2a43";
const BLUE = "#1f6feb";

// Sticky header for the Ledger design (clean professional services): a light
// white bar that gains a subtle shadow once scrolled. Wordmark left, nav
// centre, a solid primary CTA right; collapses to a functional hamburger
// below md (overlay uses the navy palette).
export function LedgerHeader({
  name,
  cta,
  ctaLabel,
  links,
  home = "/",
}: {
  name: string;
  cta: string;
  ctaLabel: string;
  links: { label: string; href: string }[];
  home?: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow duration-300"
      style={{ boxShadow: scrolled ? "0 1px 0 rgba(15,42,67,0.08), 0 12px 30px -22px rgba(15,42,67,0.4)" : "0 1px 0 rgba(15,42,67,0.07)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href={home} className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md text-sm font-bold text-white" style={{ background: NAVY }}>{name.trim().charAt(0)}</span>
          <span data-edit="tenant.business_name" className="text-lg font-semibold tracking-tight" style={{ color: NAVY, fontFamily: "var(--font-fraunces)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium md:flex" style={{ color: "#33536e" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#0f2a43]">{l.label}</a>
          ))}
        </nav>

        <a href={cta} className="hidden rounded-md px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 md:inline-flex" style={{ background: BLUE }}>{ctaLabel}</a>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={NAVY} fg="#ffffff" accent={BLUE} barColor={NAVY} />
      </div>
    </header>
  );
}
