"use client";

import { useEffect, useState } from "react";
import { TradesMobileNav } from "./TradesMobileNav";

const BLUE = "#1FA2E0"; // splash blue
const NAVY = "#143A52"; // deep navy
const LEMON = "#FBD24B"; // sunny accent

// Sticky header for the Hydro design (bright, friendly car wash & valeting):
// transparent and white over the splashy blue hero, then snaps to a clean white
// pill-shaped bar with a soft shadow once scrolled. Wordmark with a droplet mark
// left, rounded nav centre-right, a rounded lemon "Book a wash" button right;
// collapses to a friendly hamburger below md.
export function HydroHeader({
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

  const fg = scrolled ? NAVY : "#ffffff";

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className="relative mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300 sm:px-7"
        style={
          scrolled
            ? { background: "#fffffff2", boxShadow: "0 10px 30px -12px rgba(20,58,82,0.35)", backdropFilter: "blur(8px)" }
            : { background: "transparent" }
        }
      >
        <a href={home} className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill={scrolled ? BLUE : "#ffffff"} aria-hidden>
              <path d="M12 2.5c3.4 4.2 6.5 7.9 6.5 11.6A6.5 6.5 0 0 1 5.5 14.1C5.5 10.4 8.6 6.7 12 2.5z" />
            </svg>
          </span>
          <span
            data-edit="tenant.business_name"
            className="text-lg font-extrabold tracking-tight sm:text-xl"
            style={{ fontFamily: "var(--font-space)", color: fg }}
          >
            {name}
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-[13px] font-bold md:flex" style={{ color: fg }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-70">{l.label}</a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {phone && (
            <a href={`tel:${phone}`} className="text-[13px] font-bold transition hover:opacity-70" style={{ color: fg }}>{phone}</a>
          )}
          <a
            href={cta}
            className="rounded-full px-6 py-2.5 text-[12px] font-extrabold uppercase tracking-[0.1em] transition hover:brightness-105"
            style={{ background: LEMON, color: NAVY }}
          >
            {ctaLabel}
          </a>
        </div>

        <TradesMobileNav links={links} cta={cta} ctaLabel={ctaLabel} bg={NAVY} fg="#ffffff" accent={LEMON} barColor={fg} />
      </div>
    </header>
  );
}
