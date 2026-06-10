"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const PAPER = "#f3efe7";
const INK = "#1a1a17";

// Sticky header for the Drafthouse design (premium architecture / design
// studio): a quiet paper-toned bar with a fine baseline rule that firms up once
// scrolled. Serif wordmark left, wide-tracked nav centre, outlined CTA right;
// functional hamburger below md.
export function DrafthouseHeader({
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
      className="sticky top-0 z-50 backdrop-blur transition-colors duration-300"
      style={{ background: scrolled ? "rgba(243,239,231,0.94)" : "rgba(243,239,231,0.6)", borderBottom: `1px solid ${scrolled ? "#1a1a1722" : "#1a1a170f"}` }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a href={home} className="flex flex-col leading-none">
          <span data-edit="tenant.business_name" className="text-lg tracking-[0.04em]" style={{ color: INK, fontFamily: "var(--font-fraunces)" }}>{name}</span>
          <span className="mt-1 text-[8px] uppercase tracking-[0.42em]" style={{ color: "#8a8576" }}>Studio</span>
        </a>

        <nav className="hidden items-center gap-9 text-[11px] font-semibold uppercase tracking-[0.22em] md:flex" style={{ color: "#5c574b" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#1a1a17]">{l.label}</a>
          ))}
        </nav>

        <a href={cta} className="hidden border px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#1a1a17] hover:text-[#f3efe7] md:inline-flex" style={{ borderColor: INK, color: INK }}>{ctaLabel}</a>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg={PAPER} accent={PAPER} barColor={INK} />
      </div>
    </header>
  );
}
