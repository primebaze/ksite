"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const SAGE = "#5b6b54"; // muted sage accent / ink
const CREAM = "#f6f3ec"; // warm paper

// Sticky header for the Flow design (calm light editorial yoga / pilates
// studio): translucent cream that solidifies on scroll with a hairline rule.
// Centred wordmark, quiet serif nav, a soft pill "Book a class". Collapses to a
// functional hamburger below md.
export function FlowHeader({
  name,
  cta,
  ctaHref,
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  cta: string;
  ctaHref: string;
  links: { label: string; href: string }[];
  home?: string;
  solid?: boolean;
}) {
  const [scrolled, setScrolled] = useState(solid);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? `${CREAM}f2` : "transparent",
        borderBottom: scrolled ? `1px solid ${SAGE}26` : "1px solid transparent",
        backdropFilter: scrolled ? "blur(8px)" : undefined,
      }}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8" style={{ color: SAGE }}>
        <nav className="hidden gap-8 text-[13px] tracking-[0.02em] md:flex" style={{ fontFamily: "var(--font-fraunces)" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>
          ))}
        </nav>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={SAGE} fg={CREAM} accent={CREAM} barColor={SAGE} />

        <a href={home} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span data-edit="tenant.business_name" style={{ fontFamily: "var(--font-fraunces)" }} className="block whitespace-nowrap text-xl font-medium tracking-[0.02em] sm:text-2xl">{name}</span>
          <span className="mt-0.5 block text-[8px] uppercase tracking-[0.4em] opacity-60 sm:text-[9px]">Studio</span>
        </a>

        <a href={ctaHref} className="hidden rounded-full px-6 py-2.5 text-[12px] font-medium tracking-[0.04em] text-white transition hover:opacity-90 md:inline-flex" style={{ background: SAGE }}>{cta}</a>
        <span className="w-7 md:hidden" />
      </div>
    </header>
  );
}
