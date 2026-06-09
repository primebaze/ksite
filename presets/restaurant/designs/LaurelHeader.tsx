"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

const GREEN = "#163d2b";
const CREAM = "#f6f1e7";

// Sticky header for the Laurel design: transparent over the lush hero, turns
// solid deep green once the page is scrolled. Centred elegant serif wordmark,
// nav split either side, prominent "Book a table" button; collapses to a
// functional hamburger below md.
export function LaurelHeader({
  name,
  book,
  links,
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const left = links.slice(0, Math.ceil(links.length / 2));
  const right = links.slice(Math.ceil(links.length / 2));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={scrolled ? { background: GREEN } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />}
      <div className="relative flex items-center justify-between gap-4 px-5 py-4 text-white sm:px-8 sm:py-5">
        {/* desktop nav — left half */}
        <nav className="hidden flex-1 items-center gap-7 text-xs font-medium uppercase tracking-[0.2em] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)] md:flex">
          {left.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-75">{l.label}</a>
          ))}
        </nav>

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta="Book a table" />

        {/* centred serif wordmark */}
        <a
          href="#top"
          data-edit="tenant.business_name"
          style={{ fontFamily: "var(--font-fraunces)" }}
          className="whitespace-nowrap text-center text-lg font-medium tracking-[0.18em] text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] sm:text-2xl"
        >
          {name}
        </a>

        {/* desktop nav — right half + book button */}
        <div className="hidden flex-1 items-center justify-end gap-7 md:flex">
          <nav className="flex items-center gap-7 text-xs font-medium uppercase tracking-[0.2em] [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
            {right.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:opacity-75">{l.label}</a>
            ))}
          </nav>
          <a
            href={book}
            className="px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:opacity-90"
            style={{ background: CREAM, color: GREEN }}
          >
            Book a table
          </a>
        </div>

        {/* mobile spacer to balance the menu icon */}
        <span className="w-6 md:hidden" />
      </div>
    </header>
  );
}
