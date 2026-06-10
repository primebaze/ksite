"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const TEAL = "#0e9488";
const INK = "#10302c";

// Sticky header for the Marigold design (fresh cleaning / home services): a
// light, rounded white bar that gains a soft shadow once scrolled. Wordmark
// left, nav centre, a pill CTA right; functional hamburger below md.
export function MarigoldHeader({
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
      style={{ boxShadow: scrolled ? "0 1px 0 rgba(14,148,136,0.1), 0 14px 34px -24px rgba(14,148,136,0.5)" : "0 1px 0 rgba(16,48,44,0.06)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href={home} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold text-white" style={{ background: TEAL }}>{name.trim().charAt(0)}</span>
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-tight" style={{ color: INK }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold md:flex" style={{ color: "#3c5b56" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#0e9488]">{l.label}</a>
          ))}
        </nav>

        <a href={cta} className="hidden rounded-full px-6 py-2.5 text-sm font-bold text-white transition hover:opacity-90 md:inline-flex" style={{ background: TEAL }}>{ctaLabel}</a>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg="#ffffff" accent={TEAL} barColor={INK} />
      </div>
    </header>
  );
}
