"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

const CORAL = "#e0483d";

// Sticky header for the Drift design: transparent (white text) over the bright
// hero, turns solid white with ink text and a soft shadow once scrolled.
// Wordmark left, horizontal nav centre-right, coral "Book a table" button right;
// collapses to a functional hamburger below md.
export function DriftHeader({
  name,
  book,
  links,
  bookLabel = "Book a table",
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
  bookLabel?: string;
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "bg-white shadow-md" : ""}`}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />}
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        {/* wordmark left */}
        <a href="#top" className="shrink-0">
          <span
            data-edit="tenant.business_name"
            className={`text-lg font-semibold tracking-[0.12em] transition-colors sm:text-xl ${scrolled ? "text-[#1a1a1a]" : "text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]"}`}
          >
            {name}
          </span>
        </a>

        {/* desktop nav + CTA */}
        <div className="hidden items-center gap-8 md:flex">
          <nav className="flex gap-7 text-sm font-medium">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`transition hover:opacity-70 ${scrolled ? "text-[#1a1a1a]" : "text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"}`}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={book}
            style={{ background: CORAL }}
            className="inline-flex rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {bookLabel}
          </a>
        </div>

        {/* mobile menu (functional) — coral pill keeps the white bars visible
            on both the transparent hero and the solid white scrolled header */}
        <div className="rounded-full px-3 py-2 md:hidden" style={{ background: CORAL }}>
          <MobileNav links={links} book={book} cta={bookLabel} />
        </div>
      </div>
    </header>
  );
}
