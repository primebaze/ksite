"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const GREEN = "#3f5d44";
const BLUSH = "#d98a8a";

// Sticky header for the Bloom design (soft botanical florist / lifestyle shop):
// a pale blush-cream bar with a serif wordmark left, nav centre, a rounded
// "Order flowers" pill right; gains a hairline once scrolled. Collapses to a
// functional hamburger below md.
export function BloomHeader({
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
      className="sticky top-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(253,248,245,0.92)" : "#fdf8f5", backdropFilter: "blur(8px)", borderBottom: scrolled ? "1px solid #efe1da" : "1px solid transparent" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href={home} className="flex items-center gap-2">
          <span aria-hidden style={{ color: BLUSH }} className="text-lg">❧</span>
          <span data-edit="tenant.business_name" className="text-xl font-medium tracking-tight" style={{ color: GREEN, fontFamily: "var(--font-fraunces)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-8 text-[13px] font-medium md:flex" style={{ color: "#5a6b56" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#3f5d44]">{l.label}</a>
          ))}
        </nav>

        <a href={cta} className="hidden rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.1em] text-white transition hover:opacity-90 md:inline-flex" style={{ background: GREEN }}>{ctaLabel}</a>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={GREEN} fg="#fdf8f5" accent={BLUSH} barColor={GREEN} />
      </div>
    </header>
  );
}
