"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#101114";
const INDIGO = "#4f46e5";

// Sticky header for the Summit design (confident corporate consultancy / agency):
// a crisp white bar that gains a subtle shadow once scrolled. Wordmark left, nav
// centre, a solid indigo CTA right; functional hamburger below md.
export function SummitHeader({
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
      style={{ boxShadow: scrolled ? "0 1px 0 rgba(16,17,20,0.08), 0 14px 34px -24px rgba(16,17,20,0.45)" : "0 1px 0 rgba(16,17,20,0.06)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href={home} className="flex items-center gap-2.5">
          <span className="h-7 w-7 rounded-md" style={{ background: `conic-gradient(from 140deg, ${INDIGO}, ${INK})` }} />
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-tight" style={{ color: INK }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex" style={{ color: "#41454d" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#101114]">{l.label}</a>
          ))}
        </nav>

        <a href={cta} className="hidden rounded-lg px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 md:inline-flex" style={{ background: INDIGO }}>{ctaLabel}</a>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg="#ffffff" accent={INDIGO} barColor={INK} />
      </div>
    </header>
  );
}
