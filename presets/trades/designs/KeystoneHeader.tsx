"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const SLATE = "#2F4A63"; // warm slate-blue
const TERRA = "#D08158"; // terracotta accent
const CREAM = "#F4EEE3"; // warm cream
const INK = "#1E2730"; // charcoal ink

// Sticky header for the Keystone design (warm, reassuring mortgage broker):
// transparent over the slate-blue hero, then settles into a solid cream bar with
// a slate wordmark and a hairline terracotta rule once scrolled. A small
// keystone-arch + key mark sits beside the name; nav centre-right; a terracotta
// "Book a free chat" button right. Collapses to a functional drawer below md.
export function KeystoneHeader({
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

  const onCream = scrolled;
  const fg = onCream ? SLATE : CREAM;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${onCream ? "shadow-[0_10px_34px_-20px_rgba(30,39,48,0.5)]" : ""}`}
      style={onCream ? { background: CREAM, borderBottom: `1px solid ${TERRA}55` } : undefined}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-2.5">
          <KeyMark fill={TERRA} ring={fg} />
          <span data-edit="tenant.business_name" className="text-lg font-semibold tracking-[0.02em] sm:text-xl" style={{ fontFamily: "var(--font-space)" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-9 text-[13px] font-medium tracking-[0.02em] md:flex" style={{ color: onCream ? "#46586a" : "#e7ddca" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ opacity: 0.85 }}>{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {phone && <a href={`tel:${phone}`} className="text-[13px] font-medium tracking-wide transition hover:opacity-80" style={{ color: fg }}>{phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] transition hover:brightness-105" style={{ background: TERRA, color: CREAM }}>
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={SLATE} fg={CREAM} accent={TERRA} barColor={fg} />
      </div>
    </header>
  );
}

// The Keystone signature glyph — a keystone arch (doorway / roofline) cradled
// around a small key. Reused at small scale in the header and large in the hero.
function KeyMark({ fill, ring }: { fill: string; ring: string }) {
  void INK;
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden className="shrink-0">
      {/* keystone arch / doorway */}
      <path d="M5 21 V11 a7 7 0 0 1 14 0 V21" fill="none" stroke={ring} strokeWidth="1.4" opacity="0.55" strokeLinecap="round" />
      {/* key */}
      <circle cx="12" cy="9.5" r="2.4" fill="none" stroke={fill} strokeWidth="1.6" />
      <path d="M12 12 V18 M12 15 h2.4 M12 16.6 h1.8" stroke={fill} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
