"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const MIDNIGHT = "#14213A";
const BRASS = "#C9A24A";
const ALERT = "#D14B45";

// Keyhole mark for the Latchkey locksmith design — a small brass shield with a
// keyhole, used as the wordmark glyph. Distinct from Forge's amber skew bar.
function KeyholeMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 1.5 3 4.5v6c0 5.4 3.6 9.9 9 12 5.4-2.1 9-6.6 9-12v-6L12 1.5Z" fill={MIDNIGHT} stroke={BRASS} strokeWidth="1.4" />
      <circle cx="12" cy="9.6" r="2.3" fill={BRASS} />
      <path d="M11 11.4h2l.7 4h-3.4l.7-4Z" fill={BRASS} />
    </svg>
  );
}

// Sticky header for the Latchkey design (24/7 locksmith & home security):
// transparent over the midnight-blue hero, snaps to a solid midnight bar with a
// thin brass underline once scrolled. Keyhole mark + wordmark left, nav centre,
// a steel phone + brass "Request a quote" button right; an always-visible 24/7
// emergency call pill sits to the right on the solid bar. Collapses to the
// shared trades hamburger below md.
export function LatchkeyHeader({
  name,
  cta,
  ctaLabel,
  phone,
  emergency,
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  cta: string;
  ctaLabel: string;
  phone?: string;
  emergency?: string;
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

  const call = emergency || phone;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_10px_30px_-12px_rgba(0,0,0,0.6)]" : ""}`}
      style={scrolled ? { background: MIDNIGHT, borderBottom: `1px solid ${BRASS}66` } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0c1730]/70 to-transparent" />}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 text-white sm:px-8">
        <a href={home} className="flex items-center gap-2.5">
          <KeyholeMark />
          <span data-edit="tenant.business_name" className="text-lg font-extrabold uppercase tracking-[0.14em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[12px] font-bold uppercase tracking-[0.2em] text-white/85 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#C9A24A]">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {call && (
            <a href={`tel:${call}`} className="flex items-center gap-2 rounded-sm px-3 py-2 text-[12px] font-extrabold uppercase tracking-[0.12em] text-white" style={{ background: ALERT }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
              </span>
              24/7 {call}
            </a>
          )}
          <a href={cta} className="rounded-sm px-6 py-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#14213A] transition hover:brightness-105" style={{ background: BRASS }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={MIDNIGHT} fg="#F5F6F8" accent={BRASS} />
      </div>
    </header>
  );
}
