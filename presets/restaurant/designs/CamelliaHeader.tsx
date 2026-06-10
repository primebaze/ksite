"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Camellia — genteel English afternoon tearoom palette (baked identity).
// Clotted-cream bar, rose script wordmark, warm grey-brown ink.
const ROSE = "#C56B7A";
const INK = "#4A3F3A";
const CREAM = "#FBF4E9";
const GOLD = "#C2A24C";

// Sticky header for the Camellia design: transparent over the cream hero (so the
// floral hero shows through), settling into a translucent clotted-cream bar with
// a fine gold hairline once scrolled. Forced solid on sub-pages via `solid`.
// A small camellia-sprig mark sits before the script wordmark. Collapses to the
// shared hamburger (MobileNav) below lg, with ink bars over the light bar.
export function CamelliaHeader({
  name,
  book,
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
  home?: string;
  /** Force the solid background (used on sub-pages with no hero behind it). */
  solid?: boolean;
}) {
  const [scrolled, setScrolled] = useState(solid);

  useEffect(() => {
    if (solid) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={
        scrolled
          ? { background: `${CREAM}f2`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${GOLD}55`, boxShadow: "0 10px 30px -24px rgba(74,63,58,0.5)" }
          : { background: "transparent", borderBottom: "1px solid transparent" }
      }
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {/* wordmark with a little camellia sprig (links home) */}
        <a href={home} className="flex shrink-0 items-center gap-2.5">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
            <circle cx="12" cy="12" r="3.1" fill={ROSE} />
            <ellipse cx="12" cy="5.6" rx="2.5" ry="3.6" fill={ROSE} opacity="0.85" />
            <ellipse cx="18.4" cy="12" rx="3.6" ry="2.5" fill={ROSE} opacity="0.7" />
            <ellipse cx="12" cy="18.4" rx="2.5" ry="3.6" fill={ROSE} opacity="0.85" />
            <ellipse cx="5.6" cy="12" rx="3.6" ry="2.5" fill={ROSE} opacity="0.7" />
            <circle cx="12" cy="12" r="1.5" fill={GOLD} />
          </svg>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: INK, fontStyle: "italic" }}
            className="block whitespace-nowrap text-2xl font-medium leading-none tracking-tight sm:text-[1.7rem]"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-7 text-[12px] font-medium uppercase tracking-[0.22em] lg:flex" style={{ color: INK }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="relative transition hover:text-[color:#C56B7A]">{l.label}</a>
          ))}
        </nav>

        {/* desktop book button — rose pill with soft gold ring */}
        <a
          href={book}
          className="hidden shrink-0 rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 lg:inline-flex"
          style={{ background: ROSE, boxShadow: `0 0 0 1px ${GOLD}55, 0 8px 20px -12px ${ROSE}` }}
        >
          Book afternoon tea
        </a>

        {/* mobile menu (functional) — ink bars over the light bar */}
        <div className="lg:hidden [&_button>span]:!bg-[#4A3F3A]">
          <MobileNav links={links} book={book} cta="Book afternoon tea" />
        </div>
      </div>
    </header>
  );
}
