"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const INK = "#2a2320";
const CLAY = "#a8643c";

// Sticky header for the Atelier design (warm editorial boutique): a soft cream
// bar with a centred serif wordmark, nav split either side, that gains a hairline
// + faint shadow once scrolled. Collapses to a functional hamburger below md.
export function AtelierHeader({
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
      style={{ background: scrolled ? "rgba(250,246,240,0.92)" : "#faf6f0", backdropFilter: "blur(8px)", borderBottom: scrolled ? "1px solid #e6ddd1" : "1px solid transparent", boxShadow: scrolled ? "0 14px 30px -26px rgba(42,35,32,0.5)" : "none" }}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <nav className="hidden items-center gap-7 text-[12px] font-medium uppercase tracking-[0.18em] md:flex" style={{ color: INK }}>
          {links.slice(0, Math.ceil(links.length / 2)).map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#a8643c]">{l.label}</a>
          ))}
        </nav>

        <a href={home} className="md:absolute md:left-1/2 md:-translate-x-1/2">
          <span data-edit="tenant.business_name" className="text-xl font-medium tracking-tight sm:text-2xl" style={{ color: INK, fontFamily: "var(--font-fraunces)" }}>{name}</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.slice(Math.ceil(links.length / 2)).map((l) => (
            <a key={l.href} href={l.href} className="text-[12px] font-medium uppercase tracking-[0.18em] transition hover:text-[#a8643c]" style={{ color: INK }}>{l.label}</a>
          ))}
          <a href={cta} className="rounded-full px-5 py-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90" style={{ background: CLAY }}>{ctaLabel}</a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg="#2a2320" fg="#faf6f0" accent={CLAY} barColor={INK} />
      </div>
    </header>
  );
}
