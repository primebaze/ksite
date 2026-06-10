"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const TEAL = "#3A5159";
const OAT = "#F2EDE3";
const INK = "#232A2C";

// Sticky header for the Stillwater massage & bodywork design. Sits transparent
// over the calm oat hero, then settles into a quiet oat bar with a hairline rule
// and soft shadow once scrolled (or when `solid` is forced on sub-pages). A left
// wordmark, centre-light nav, phone + "Book a session" on the right; collapses to
// the shared mobile menu below lg. Deliberately restful — no heavy chrome.
export function StillwaterHeader({
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

  const overHero = !scrolled;
  const fg = overHero ? INK : INK;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(242,237,227,0.94)" : "rgba(242,237,227,0)",
        borderBottom: scrolled ? "1px solid rgba(35,42,44,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 6px 24px rgba(35,42,44,0.06)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        color: fg,
      }}
    >
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        {/* wordmark (links home) */}
        <a href={home} className="flex items-center gap-2.5">
          <span aria-hidden className="hidden h-px w-7 sm:block" style={{ background: TEAL, opacity: 0.55 }} />
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: TEAL }}
            className="whitespace-nowrap text-lg font-medium tracking-[0.04em] sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav (centre) */}
        <nav
          className="absolute left-1/2 hidden -translate-x-1/2 gap-8 text-[11px] font-medium uppercase tracking-[0.22em] lg:flex"
          style={{ color: INK }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-55">
              {l.label}
            </a>
          ))}
        </nav>

        {/* right cluster */}
        <div className="hidden items-center gap-6 lg:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-xs font-medium tracking-[0.06em] transition hover:opacity-60"
              style={{ color: INK }}
            >
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90"
            style={{ background: TEAL, color: OAT }}
          >
            Book a session
          </a>
        </div>

        {/* mobile menu */}
        <div className="lg:hidden">
          <MobileNav links={links} book={book} cta="Book a session" />
        </div>
      </div>
    </header>
  );
}
