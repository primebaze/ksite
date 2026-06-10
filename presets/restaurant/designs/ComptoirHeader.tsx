"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Sticky header for the Comptoir Parisian bistro. The hero is a LIGHT cream
// café-terrace spread crowned by a red awning, so the transparent-over-hero
// state is a cream tint with zinc type (not white-on-dark). The signature is a
// slim RED AWNING-STRIPE rule pinned to the very top of the bar at all times.
// Once scrolled (or on sub-pages via `solid`) the bar gains a soft cream fill
// and a brass hairline. Collapses to the shared MobileNav below lg.
const RED = "#9E2B25";
const ZINC = "#2B2B2E";
const CREAM = "#F2ECDD";
const BRASS = "#B89150";

// A repeating red/cream awning stripe — the bistro's roof, used as a top rule.
const AWNING = `repeating-linear-gradient(90deg, ${RED} 0 22px, ${CREAM} 22px 44px)`;

export function ComptoirHeader({
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
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? CREAM : "transparent",
        borderBottom: `1px solid ${scrolled ? `${BRASS}55` : "transparent"}`,
        boxShadow: scrolled ? "0 1px 22px rgba(43,43,46,0.10)" : "none",
      }}
    >
      {/* signature red awning stripe — always visible, the bistro roof */}
      <div className="h-1.5 w-full" style={{ backgroundImage: AWNING }} aria-hidden />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8 lg:py-4">
        {/* wordmark (links home) — elegant French serif */}
        <a href={home} className="shrink-0">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: ZINC }}
            className="block whitespace-nowrap text-2xl leading-none tracking-tight sm:text-3xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav
          className="hidden flex-1 items-center justify-center gap-7 text-[11px] font-semibold uppercase tracking-[0.18em] lg:flex"
          style={{ color: ZINC }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[color:#9E2B25]">{l.label}</a>
          ))}
        </nav>

        {/* desktop réserver button */}
        <a
          href={book}
          className="hidden shrink-0 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#F2ECDD] transition hover:opacity-90 lg:inline-flex"
          style={{ background: RED, borderRadius: "2px" }}
        >
          Réserver
        </a>

        {/* mobile menu (functional) — zinc bars on cream */}
        <div className="lg:hidden [&_button>span]:!bg-[#2B2B2E]">
          <MobileNav links={links} book={book} cta="Réserver une table" />
        </div>
      </div>
    </header>
  );
}
