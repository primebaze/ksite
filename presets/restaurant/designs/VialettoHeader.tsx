"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Sticky header for the Vialetto trattoria. Because the hero is a LIGHT cream
// editorial spread (not a dark photo), the transparent-over-hero state is a
// cream tint with cypress-green type rather than white-on-dark. The wordmark is
// a centred lowercase-italic Fraunces serif flanked by the nav; once scrolled
// (or on sub-pages via `solid`) it gains a hairline gold rule and a soft cream
// fill. Collapses to the shared MobileNav below lg.
const GREEN = "#2F4A36";
const CREAM = "#F4EFE3";
const GOLD = "#B8893B";

export function VialettoHeader({
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

  // Split the nav so the wordmark can sit in the centre, editorial-masthead style.
  const half = Math.ceil(links.length / 2);
  const left = links.slice(0, half);
  const right = links.slice(half);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? CREAM : "transparent",
        borderBottom: `1px solid ${scrolled ? `${GOLD}55` : "transparent"}`,
        boxShadow: scrolled ? "0 1px 24px rgba(47,74,54,0.08)" : "none",
      }}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:py-5">
        {/* left nav (desktop) */}
        <nav className="hidden flex-1 items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.2em] lg:flex" style={{ color: GREEN }}>
          {left.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>
          ))}
        </nav>

        {/* centred wordmark */}
        <a href={home} className="shrink-0 lg:absolute lg:left-1/2 lg:-translate-x-1/2">
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: GREEN }}
            className="block whitespace-nowrap text-2xl italic lowercase leading-none tracking-tight sm:text-3xl"
          >
            {name}
          </span>
        </a>

        {/* right nav + book (desktop) */}
        <nav className="hidden flex-1 items-center justify-end gap-7 text-[11px] font-semibold uppercase tracking-[0.2em] lg:flex" style={{ color: GREEN }}>
          {right.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>
          ))}
          <a
            href={book}
            className="border px-5 py-2.5 text-[10px] tracking-[0.22em] transition hover:bg-[color:#2F4A36] hover:text-[color:#F4EFE3]"
            style={{ borderColor: GREEN, color: GREEN }}
          >
            Prenota
          </a>
        </nav>

        {/* mobile menu — green bars on cream */}
        <div className="lg:hidden [&_button>span]:!bg-[#2F4A36]">
          <MobileNav links={links} book={book} cta="Prenota un tavolo" />
        </div>
      </div>
    </header>
  );
}
