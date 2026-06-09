"use client";

import { useEffect, useState } from "react";

const TOMATO = "#d2402e";
const GREEN = "#3f6b3a";
const CREAM = "#fbf6ee";
const INK = "#20201d";

// Sticky header for the Daybreak design. Transparent over the bright home hero
// and turns solid cream with a shadow once the page is scrolled; on sub-pages
// (no hero behind it) `solid` forces the cream background from the start so the
// wordmark, nav and hamburger all keep enough contrast. The wordmark/crest links
// home. Below md it collapses to a self-contained, functional hamburger menu so
// the bar colours always match the (cream) overlay — independent of the dark
// Ember MobileNav. All links are real routes passed in from the page.
export function DaybreakHeader({
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
  /** Force the solid cream background (used on sub-pages with no hero behind it). */
  solid?: boolean;
}) {
  const [scrolled, setScrolled] = useState(solid);
  const [open, setOpen] = useState(false);

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

  const onCream = scrolled; // solid cream bar → dark text + dark hamburger bars
  const linkColor = onCream ? "text-neutral-700" : "text-white";
  const barColor = onCream ? INK : "#ffffff";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${onCream ? "shadow-lg" : ""}`}
      style={onCream ? { background: CREAM } : undefined}
    >
      {!onCream && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />}
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        {/* wordmark / crest → home */}
        <a
          href={home}
          data-edit="tenant.business_name"
          style={{ fontFamily: "var(--font-fraunces)", color: onCream ? TOMATO : "#ffffff" }}
          className={`pointer-events-auto text-xl font-semibold tracking-tight sm:text-2xl ${onCream ? "" : "[text-shadow:0_1px_14px_rgba(0,0,0,0.45)]"}`}
        >
          {name}
        </a>

        {/* desktop nav */}
        <nav className={`hidden items-center gap-7 text-sm font-semibold ${linkColor} md:flex`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`transition hover:opacity-70 ${onCream ? "" : "[text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"}`}>
              {l.label}
            </a>
          ))}
          <a
            href={book}
            className="rounded-full px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
            style={{ background: TOMATO }}
          >
            Book a table
          </a>
        </nav>

        {/* mobile hamburger (functional, contrast-aware) */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex flex-col gap-1.5 md:hidden"
        >
          <span className="h-0.5 w-6 rounded-full" style={{ background: barColor }} />
          <span className="h-0.5 w-6 rounded-full" style={{ background: barColor }} />
          <span className="h-0.5 w-6 rounded-full" style={{ background: barColor }} />
        </button>
      </div>

      {/* mobile overlay menu */}
      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col px-8 py-7 md:hidden" style={{ background: CREAM, color: INK }}>
          <div className="flex items-center justify-between">
            <a
              href={home}
              onClick={() => setOpen(false)}
              style={{ fontFamily: "var(--font-fraunces)", color: TOMATO }}
              className="text-xl font-semibold tracking-tight"
            >
              {name}
            </a>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-4xl font-light leading-none text-neutral-700">
              ×
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-7 text-3xl font-semibold" style={{ fontFamily: "var(--font-fraunces)" }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="transition hover:opacity-60">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={book}
            onClick={() => setOpen(false)}
            className="mt-auto rounded-full px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90"
            style={{ background: GREEN }}
          >
            Book a table
          </a>
        </div>
      )}
    </header>
  );
}
