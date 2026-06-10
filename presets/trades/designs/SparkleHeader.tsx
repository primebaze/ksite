"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const AQUA = "#19A7A0";
const INK = "#133A3A";
const LEMON = "#FBD24B";

// Sticky header for the Sparkle design (bright domestic & commercial cleaning):
// transparent over the airy aqua hero, then snaps to a crisp white pill-bar with
// a soft shadow once scrolled. A rounded "sparkle" bubble mark + wordmark sit
// left, the nav rides centre-right, and a lemon-accented quote button anchors the
// right. Collapses to the shared trades hamburger below md.
export function SparkleHeader({
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`relative mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300 sm:px-6 ${scrolled ? "bg-white shadow-[0_14px_40px_-18px_rgba(19,58,58,0.45)]" : "bg-white/15 backdrop-blur-md"}`}
        style={scrolled ? { border: `1px solid ${AQUA}1f` } : { border: "1px solid #ffffff3d" }}
      >
        <a href={home} className="flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center rounded-full" style={{ background: AQUA }}>
            <SparkleMark color="#ffffff" size={18} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full" style={{ background: LEMON }} />
          </span>
          <span
            data-edit="tenant.business_name"
            className="text-lg font-extrabold tracking-tight sm:text-xl"
            style={{ fontFamily: "var(--font-space)", color: scrolled ? INK : "#ffffff" }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-[13px] font-semibold md:flex" style={{ color: scrolled ? INK : "#ffffff" }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-70">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="text-[13px] font-bold transition hover:opacity-70" style={{ color: scrolled ? AQUA : "#ffffff" }}>{phone}</a>
          )}
          <a
            href={cta}
            className="rounded-full px-5 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.12em] transition hover:brightness-105"
            style={{ background: LEMON, color: INK }}
          >
            {ctaLabel}
          </a>
        </div>

        <div style={{ color: scrolled ? INK : "#ffffff" }}>
          <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={INK} fg="#ffffff" accent={LEMON} barColor={scrolled ? INK : "#ffffff"} />
        </div>
      </div>
    </header>
  );
}

// Four-point sparkle / shine glyph — the recurring Sparkle motif.
export function SparkleMark({ color, size = 16 }: { color: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 0c.7 5.9 5.4 10.6 11.3 11.3v.4C17.4 12.4 12.7 17.1 12 23h-.4C10.9 17.1 6.2 12.4.3 11.7v-.4C6.2 10.6 10.9 5.9 11.6 0z" />
    </svg>
  );
}
