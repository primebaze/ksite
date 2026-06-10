"use client";

import { useEffect, useState } from "react";

export interface PetLink {
  label: string;
  href: string;
}

// ---------------------------------------------------------------------------
// Shared interactive chrome for the bespoke PET designs. These are the only
// client components the pet templates need: a scroll-aware sticky header and a
// functional mobile menu. Each design passes in its own palette so the same
// behaviour skins to four very different looks.
// ---------------------------------------------------------------------------

export interface PetHeaderTheme {
  /** Solid bar background once scrolled / on sub-pages. */
  bar: string;
  /** Hairline under the bar. */
  border: string;
  /** Brand wordmark colour on the solid bar. */
  brand: string;
  /** Nav link colour on the solid bar. */
  link: string;
  /** Primary CTA background + text. */
  ctaBg: string;
  ctaText: string;
  /** Whether the hero behind the transparent header is dark (use light text). */
  heroDark: boolean;
  /** Font family for the wordmark. */
  brandFont?: string;
  /** Corner radius for the CTA + bar (e.g. "9999px", "0.75rem", "0"). */
  radius: string;
  /** Optional tiny eyebrow under the wordmark. */
  eyebrow?: string;
}

export function PetHeader({
  name,
  cta,
  links,
  home = "/",
  solid = false,
  theme,
}: {
  name: string;
  cta?: { label: string; href: string };
  links: PetLink[];
  home?: string;
  solid?: boolean;
  theme: PetHeaderTheme;
}) {
  const [scrolled, setScrolled] = useState(solid);

  useEffect(() => {
    if (solid) return;
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [solid]);

  // On a transparent header over a dark hero we use light text; over a light
  // hero we use the brand colours so links stay legible.
  const overDark = !scrolled && theme.heroDark;
  const brandColor = scrolled ? theme.brand : overDark ? "#ffffff" : theme.brand;
  const linkColor = scrolled ? theme.link : overDark ? "rgba(255,255,255,0.9)" : theme.link;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-[0_6px_24px_-12px_rgba(0,0,0,0.25)] backdrop-blur" : ""}`}
      style={scrolled ? { background: theme.bar, borderBottom: `1px solid ${theme.border}` } : undefined}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-5 px-5 py-3.5 sm:px-8 sm:py-4">
        {/* wordmark */}
        <a href={home} className="flex shrink-0 items-baseline gap-2">
          <span
            data-edit="tenant.business_name"
            style={{ color: brandColor, fontFamily: theme.brandFont }}
            className="text-lg font-semibold tracking-tight sm:text-xl [text-shadow:0_1px_10px_rgba(0,0,0,0.18)]"
          >
            {name}
          </span>
          {theme.eyebrow && (
            <span className="hidden text-[9px] font-semibold uppercase tracking-[0.32em] opacity-70 sm:inline" style={{ color: linkColor }}>
              {theme.eyebrow}
            </span>
          )}
        </a>

        {/* desktop nav */}
        <nav className="hidden items-center gap-7 text-[13px] font-medium md:flex" style={{ color: linkColor }}>
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-70">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {cta && (
            <a
              href={cta.href}
              className="hidden shrink-0 px-5 py-2.5 text-[12px] font-semibold transition hover:opacity-90 active:scale-[0.98] sm:inline-flex"
              style={{ background: theme.ctaBg, color: theme.ctaText, borderRadius: theme.radius }}
            >
              {cta.label}
            </a>
          )}
          <PetMobileNav links={links} cta={cta} theme={theme} brandColor={overDark ? "#ffffff" : theme.brand} />
        </div>
      </div>
    </header>
  );
}

function PetMobileNav({
  links,
  cta,
  theme,
  brandColor,
}: {
  links: PetLink[];
  cta?: { label: string; href: string };
  theme: PetHeaderTheme;
  brandColor: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="flex flex-col gap-[5px] p-1">
        <span className="h-0.5 w-6 rounded-full" style={{ background: brandColor }} />
        <span className="h-0.5 w-6 rounded-full" style={{ background: brandColor }} />
        <span className="h-0.5 w-6 rounded-full" style={{ background: brandColor }} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col px-8 py-7" style={{ background: theme.bar }}>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold" style={{ color: theme.brand, fontFamily: theme.brandFont }}>
              Menu
            </span>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-4xl font-light leading-none" style={{ color: theme.brand }}>
              ×
            </button>
          </div>
          <nav className="mt-12 flex flex-col gap-7 text-2xl font-semibold tracking-tight" style={{ color: theme.brand }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="transition hover:opacity-60">
                {l.label}
              </a>
            ))}
          </nav>
          {cta && (
            <a
              href={cta.href}
              onClick={() => setOpen(false)}
              className="mt-auto px-6 py-4 text-center text-sm font-semibold transition hover:opacity-90"
              style={{ background: theme.ctaBg, color: theme.ctaText, borderRadius: theme.radius }}
            >
              {cta.label}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
