"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

const TOMATO = "#d2402e";
const CREAM = "#fbf6ee";

// Sticky header for the Daybreak design: transparent over the bright hero,
// turns solid cream with a shadow once the page is scrolled. Cheerful wordmark
// on the left, nav centre-right, "Book a table" button right; collapses to a
// functional hamburger below md.
export function DaybreakHeader({
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

  const linkColor = scrolled ? "text-neutral-700" : "text-white";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "shadow-lg" : ""}`}
      style={scrolled ? { background: CREAM } : undefined}
    >
      {!scrolled && <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />}
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        {/* wordmark */}
        <a
          href="#top"
          data-edit="tenant.business_name"
          style={{ fontFamily: "var(--font-fraunces)", color: scrolled ? TOMATO : "#ffffff" }}
          className={`text-xl font-semibold tracking-tight sm:text-2xl ${scrolled ? "" : "[text-shadow:0_1px_14px_rgba(0,0,0,0.45)]"}`}
        >
          {name}
        </a>

        {/* desktop nav */}
        <nav className={`hidden items-center gap-7 text-sm font-semibold ${linkColor} md:flex`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className={`transition hover:opacity-70 ${scrolled ? "" : "[text-shadow:0_1px_10px_rgba(0,0,0,0.45)]"}`}>
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

        {/* mobile menu (functional) */}
        <MobileNav links={links} book={book} cta="Book a table" />
      </div>
    </header>
  );
}
