"use client";

import { useEffect, useState } from "react";

const EUCALYPTUS = "#6E8B7A";
const SLATE = "#2E3A3A";
const CREAM = "#F4F0E8";
const COPPER = "#B07F5A";

// Header for the Thermae day-spa design. It floats transparent over the misty
// hero and softly resolves into a frosted cream bar once the page scrolls (or
// when `solid` is forced on inner pages). The wordmark sits left, a slim ritual
// nav runs centre-right, and a pill "Reserve" button anchors the end. Below lg
// it collapses into its own self-contained slide-down panel (no shared menu) so
// the spa keeps its calm, rounded identity throughout.
export function ThermaeHeader({
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (solid) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  const onHero = !scrolled;
  const ink = onHero ? "#ffffff" : SLATE;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(244,240,232,0.86)" : "transparent",
        boxShadow: scrolled ? "0 10px 40px -18px rgba(46,58,58,0.45)" : "none",
        backdropFilter: scrolled ? "blur(14px) saturate(1.1)" : "none",
        borderBottom: scrolled ? "1px solid rgba(110,139,122,0.18)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8 sm:py-5">
        {/* wordmark with a small water-drop mark */}
        <a href={home} className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full transition-colors"
            style={{ background: onHero ? "rgba(255,255,255,0.16)" : "rgba(110,139,122,0.16)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={onHero ? "#ffffff" : EUCALYPTUS} strokeWidth="1.6">
              <path d="M12 3c3.5 4.2 5.5 7 5.5 9.8A5.5 5.5 0 0 1 12 18a5.5 5.5 0 0 1-5.5-5.2C6.5 10 8.5 7.2 12 3z" />
            </svg>
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: ink }}
            className="whitespace-nowrap text-lg font-medium tracking-[0.06em] transition-colors sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* desktop ritual nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ color: ink }}
              className="text-[13px] font-medium tracking-[0.04em] opacity-90 transition hover:opacity-60"
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* desktop right cluster */}
        <div className="hidden items-center gap-5 lg:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              style={{ color: ink }}
              className="text-[13px] font-medium tracking-[0.02em] opacity-85 transition hover:opacity-60"
            >
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center rounded-full px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90"
            style={{ background: onHero ? COPPER : EUCALYPTUS }}
          >
            Reserve
          </a>
        </div>

        {/* mobile toggle */}
        <button
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full lg:hidden"
          style={{ background: onHero ? "rgba(255,255,255,0.14)" : "rgba(110,139,122,0.14)" }}
        >
          <span className="h-0.5 w-5 rounded-full transition" style={{ background: ink }} />
          <span className="h-0.5 w-5 rounded-full transition" style={{ background: ink }} />
        </button>
      </div>

      {/* mobile slide-down panel */}
      {open && (
        <div
          className="lg:hidden"
          style={{ background: CREAM, borderTop: "1px solid rgba(110,139,122,0.18)" }}
        >
          <nav className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b py-3.5 text-[15px] font-medium tracking-[0.02em]"
                style={{ color: SLATE, borderColor: "rgba(110,139,122,0.14)" }}
              >
                {l.label}
              </a>
            ))}
            <a
              href={book}
              onClick={() => setOpen(false)}
              className="mt-5 mb-2 inline-flex justify-center rounded-full px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.2em] text-white"
              style={{ background: EUCALYPTUS }}
            >
              Reserve your visit
            </a>
            {phone && (
              <a href={`tel:${phone}`} className="pb-2 text-center text-[13px]" style={{ color: COPPER }}>
                {phone}
              </a>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
