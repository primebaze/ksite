"use client";

import { useEffect, useState } from "react";

const INK = "#181A1B";
const AMBER = "#B07A36";

// Self-contained mobile menu — the shared MobileNav uses white hamburger bars,
// which would vanish on Lumen's light optical-white hero, so the trigger here
// inks its own bars and opens a full-screen ink overlay.
function LumenMobileMenu({
  links,
  book,
  ink,
}: {
  links: { label: string; href: string }[];
  book: string;
  ink: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="flex flex-col gap-1.5 p-1">
        <span className="h-0.5 w-6" style={{ background: ink }} />
        <span className="h-0.5 w-6" style={{ background: ink }} />
        <span className="h-0.5 w-6" style={{ background: ink }} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-[#181A1B] px-8 py-7 text-[#FBFBF9]">
          <div className="flex justify-end">
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-4xl font-light leading-none">×</button>
          </div>
          <nav
            className="mt-14 flex flex-col gap-7 text-2xl"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="transition hover:text-[#B07A36]">
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href={book}
            onClick={() => setOpen(false)}
            className="mt-auto border border-white/40 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-[#181A1B]"
          >
            Book a visit
          </a>
        </div>
      )}
    </div>
  );
}

// Sticky header for the Lumen optician design. Transparent over the high-
// contrast white hero, then turns to a crisp optical-white bar with a hairline
// rule once scrolled (or always, via `solid`, on sub-pages). A small lens /
// aperture ring sits beside the wordmark — the brand's focus-ring motif.
// Collapses to the shared mobile overlay below md.
export function LumenHeader({
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

  // Lumen's hero is light optical-white, so the header text stays ink whether
  // transparent over the hero or solid once scrolled.
  const ink = INK;

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300"
      style={{
        background: scrolled ? "rgba(251,251,249,0.94)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(24,26,27,0.10)" : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 0 rgba(24,26,27,0.04)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        {/* wordmark + lens ring (links home) */}
        <a href={home} className="flex items-center gap-2.5">
          <span
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full border-[1.5px]"
            style={{ borderColor: AMBER }}
            aria-hidden
          >
            <span className="h-2.5 w-2.5 rounded-full border-[1.5px]" style={{ borderColor: ink }} />
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: ink }}
            className="whitespace-nowrap text-lg font-medium tracking-[0.02em] sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav */}
        <nav
          className="hidden items-center gap-8 text-[13px] font-medium md:flex"
          style={{ color: ink }}
        >
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-60">
              {l.label}
            </a>
          ))}
        </nav>

        {/* right cluster: phone + book */}
        <div className="hidden items-center gap-5 md:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-[13px] font-medium transition hover:opacity-60"
              style={{ color: ink }}
            >
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90"
            style={{ background: INK }}
          >
            Book a visit
          </a>
        </div>

        {/* mobile menu (functional, below md) */}
        <LumenMobileMenu links={links} book={book} ink={ink} />
      </div>
    </header>
  );
}
