"use client";

import { useEffect, useState } from "react";

const SKY = "#2e7cb8";
const NAVY = "#15293a";

// Sticky header for the Enamel dental-practice design. Over the bright hero it
// is transparent (dark ink text on white/sky); once scrolled — or on any
// sub-page via `solid` — it turns to a crisp white bar with a hairline border
// and soft shadow. Left wordmark with a tooth mark, centre nav, phone + a
// pill "Book a check-up" CTA on the right. Collapses to the shared hamburger
// below lg.
export function EnamelHeader({
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
  const [menuOpen, setMenuOpen] = useState(false);

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

  // Over the bright hero the bar is see-through; ink text reads on light imagery.
  const ink = NAVY;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        boxShadow: scrolled ? "0 6px 24px rgba(21,41,58,0.08)" : "none",
        borderBottom: scrolled ? "1px solid rgba(21,41,58,0.07)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8 sm:py-4" style={{ color: ink }}>
        {/* wordmark (links home) with tooth mark */}
        <a href={home} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: SKY, color: "#fff" }} aria-hidden>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M8 3c-2.2 0-3.5 1.7-3.5 4 0 1.3.3 2.4.5 4 .3 2 .4 6 1.6 8 .8 1.3 1.8.7 2.1-.6.3-1.4.5-3.4 1.3-3.4s1 2 1.3 3.4c.3 1.3 1.3 1.9 2.1.6 1.2-2 1.3-6 1.6-8 .2-1.6.5-2.7.5-4 0-2.3-1.3-4-3.5-4-1.3 0-1.9.6-3 .6S9.3 3 8 3Z" /></svg>
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="whitespace-nowrap text-lg font-medium tracking-tight sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav (centre) */}
        <nav className="hidden items-center gap-8 text-sm font-medium lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-[#2e7cb8]">
              {l.label}
            </a>
          ))}
        </nav>

        {/* right cluster: phone + Book a check-up */}
        <div className="hidden items-center gap-5 lg:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="flex items-center gap-1.5 text-sm font-semibold transition hover:text-[#2e7cb8]"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" /></svg>
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90"
            style={{ background: SKY }}
          >
            Book a check-up
          </a>
        </div>

        {/* mobile trigger (functional) — ink bars read over the bright hero */}
        <button
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
          className="flex flex-col gap-1.5 lg:hidden"
        >
          <span className="h-0.5 w-6 rounded-full" style={{ background: ink }} />
          <span className="h-0.5 w-6 rounded-full" style={{ background: ink }} />
          <span className="h-0.5 w-6 rounded-full" style={{ background: ink }} />
        </button>
      </div>

      {/* mobile overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-[90] flex flex-col px-8 py-7 text-white lg:hidden" style={{ background: "rgba(21,41,58,0.98)", backdropFilter: "blur(8px)" }}>
          <div className="flex items-center justify-between">
            <span style={{ fontFamily: "var(--font-fraunces)" }} className="text-lg font-medium tracking-tight">{name}</span>
            <button aria-label="Close menu" onClick={() => setMenuOpen(false)} className="text-4xl font-light leading-none">×</button>
          </div>
          <nav className="mt-14 flex flex-col gap-7 text-2xl font-medium tracking-tight">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="transition hover:text-[#cde9dd]">
                {l.label}
              </a>
            ))}
          </nav>
          {phone && (
            <a href={`tel:${phone}`} onClick={() => setMenuOpen(false)} className="mt-8 text-sm font-semibold text-white/80">
              {phone}
            </a>
          )}
          <a
            href={book}
            onClick={() => setMenuOpen(false)}
            className="mt-auto rounded-full px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90"
            style={{ background: SKY }}
          >
            Book a check-up
          </a>
        </div>
      )}
    </header>
  );
}
