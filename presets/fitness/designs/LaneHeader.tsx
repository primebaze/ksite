"use client";

import { useEffect, useState } from "react";
import { FitnessMobileNav } from "./FitnessMobileNav";

const NAVY = "#103A57";
const POOL = "#1B8FD1";
const WHITE = "#F4FBFE";

// Sticky header for the Lane swim-school design: transparent + white text over
// the bright watery hero, then snaps to a clean white bar with a pool-blue
// underline once scrolled (or when `solid`). Rounded "drop" logo + pill CTA, in
// keeping with the friendly, rounded swim-school register (no hard edges).
export function LaneHeader({
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
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const fg = scrolled ? NAVY : "#ffffff";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-[0_8px_30px_rgba(16,58,87,0.10)]" : ""}`}
      style={scrolled ? { background: WHITE, borderBottom: `2px solid ${POOL}33` } : undefined}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5" style={{ color: fg }}>
        <a href={home} className="flex items-center gap-2.5">
          <span
            className="grid h-9 w-9 place-items-center text-sm font-extrabold"
            style={{ background: POOL, color: "#ffffff", borderRadius: "50% 50% 50% 0" }}
            aria-hidden
          >
            {name.trim().charAt(0).toUpperCase() || "L"}
          </span>
          <span data-edit="tenant.business_name" className="text-lg font-extrabold tracking-[-0.01em]" style={{ fontFamily: "var(--font-poppins, var(--font-inter))" }}>{name}</span>
        </a>

        <nav className="hidden items-center gap-8 text-[13px] font-semibold tracking-[0.01em] md:flex" style={{ opacity: scrolled ? 0.85 : 0.95 }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-100" style={{ opacity: 0.85 }}>{l.label}</a>
          ))}
        </nav>

        <a
          href={ctaHref}
          className="hidden rounded-full px-6 py-2.5 text-[13px] font-bold tracking-[0.01em] transition hover:opacity-90 md:inline-flex"
          style={{ background: scrolled ? POOL : "#ffffff", color: scrolled ? "#ffffff" : NAVY }}
        >
          {cta}
        </a>

        <FitnessMobileNav links={links} cta={cta} ctaHref={ctaHref} bg={NAVY} fg="#ffffff" accent="#FBD24B" barColor={fg} />
      </div>
    </header>
  );
}
