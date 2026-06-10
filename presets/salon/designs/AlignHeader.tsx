"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const TEAL = "#0E6E6E";
const CORAL = "#F2856B";
const INK = "#1E2A2A";

// Sticky header for the Align orthodontics design. Transparent over the deep
// teal hero, then condensing to a solid off-white bar with the wordmark and a
// coral CTA once scrolled (or forced via `solid` on sub-pages). A left wordmark
// + smile-arc mark, centred nav, phone + "Book consult" on the right; collapses
// to the shared functional hamburger below md.
export function AlignHeader({
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

  // On the dark hero the header is light text; once solid it flips to ink text.
  const onDark = !scrolled;
  const textCol = onDark ? "#ffffff" : INK;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(246,250,249,0.94)" : "transparent",
        boxShadow: scrolled ? "0 10px 34px rgba(30,42,42,0.12)" : "none",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(14,110,110,0.10)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {/* wordmark + smile-arc mark (links home) */}
        <a href={home} className="flex items-center gap-2.5">
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
            style={{ background: onDark ? "rgba(255,255,255,0.14)" : TEAL }}
            aria-hidden
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={onDark ? "#fff" : "#F6FAF9"} strokeWidth="2" strokeLinecap="round">
              <path d="M4 10c2.5 4.5 13.5 4.5 16 0" />
              <path d="M8 13.5c1 1.4 7 1.4 8 0" opacity="0.6" />
            </svg>
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: textCol }}
            className="whitespace-nowrap text-xl font-medium tracking-tight sm:text-2xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav (centre) */}
        <nav className="hidden items-center gap-7 text-[13px] font-medium tracking-tight md:flex" style={{ color: textCol }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-65">
              {l.label}
            </a>
          ))}
        </nav>

        {/* right cluster: phone + CTA */}
        <div className="hidden items-center gap-5 md:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-[13px] font-semibold tracking-tight transition hover:opacity-70"
              style={{ color: textCol }}
            >
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] transition hover:opacity-90"
            style={{ background: CORAL, color: INK }}
          >
            Book consult
          </a>
        </div>

        {/* mobile menu (functional, shared overlay). The shared MobileNav draws
            white bars, so we seat them on a teal pill to stay visible whether
            the header is transparent over the hero or solid off-white. */}
        <div className="grid h-10 w-10 place-items-center rounded-full md:hidden" style={{ background: onDark ? "rgba(255,255,255,0.16)" : TEAL }}>
          <MobileNav links={links} book={book} cta="Book consult" />
        </div>
      </div>
    </header>
  );
}
