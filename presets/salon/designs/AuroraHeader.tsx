"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const NIGHT = "#20235C";
const AQUA = "#4FD1C5";

// Sticky header for the Aurora IV vitamin-drip clinic design. Transparent and
// glassy over the deep-indigo hero, then condenses into a frosted indigo bar
// with an aqua hairline once scrolled. A small droplet glyph sits beside a
// left-aligned wordmark; nav + an electric-aqua "Book a drip" pill on the right.
// Collapses to the shared mobile overlay below lg.
export function AuroraHeader({
  name,
  book,
  links,
  home = "/",
  phone,
  solid = false,
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
  home?: string;
  phone?: string;
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
        background: scrolled ? "rgba(32,35,92,0.82)" : "transparent",
        backdropFilter: scrolled ? "blur(14px) saturate(140%)" : "blur(2px)",
        borderBottom: scrolled ? `1px solid ${AQUA}44` : "1px solid transparent",
        boxShadow: scrolled ? "0 10px 40px rgba(15,17,50,0.45)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 text-white sm:px-7">
        {/* wordmark (links home) with droplet glyph */}
        <a href={home} className="flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 place-items-center rounded-full"
            style={{ background: `radial-gradient(120% 120% at 30% 20%, ${AQUA}, #2bb6a8 70%)` }}
            aria-hidden
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill={NIGHT} aria-hidden>
              <path d="M12 2.5s6.5 7 6.5 11.5a6.5 6.5 0 1 1-13 0C5.5 9.5 12 2.5 12 2.5z" />
            </svg>
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="whitespace-nowrap text-lg font-semibold tracking-[0.02em] text-white sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 text-[13px] font-medium tracking-[0.02em] text-white/85 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        {/* right cluster */}
        <div className="hidden items-center gap-5 lg:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-[13px] font-medium text-white/75 transition hover:text-white"
            >
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:brightness-110"
            style={{ background: AQUA, color: NIGHT, boxShadow: `0 8px 24px ${AQUA}55` }}
          >
            Book a drip
          </a>
        </div>

        {/* mobile menu */}
        <div className="lg:hidden">
          <MobileNav links={links} book={book} cta="Book a drip" />
        </div>
      </div>
    </header>
  );
}
