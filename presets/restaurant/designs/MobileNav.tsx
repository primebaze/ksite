"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

// Functional mobile menu: a hamburger that opens a full-screen overlay of nav
// links; taps close it. Shown only below md.
//
// The overlay is rendered through a portal to <body>. Several headers that use
// this menu set `backdrop-filter`/`transform` on the sticky bar, and either of
// those makes the header a containing block for `position: fixed` descendants —
// which would otherwise trap this overlay inside the thin header strip (its
// backdrop covering only the bar while the links spill over the page). Portaling
// to <body> guarantees `fixed inset-0` resolves against the viewport.
export function MobileNav({
  links,
  book,
  cta = "Make a reservation",
}: {
  links: { label: string; href: string }[];
  book: string;
  cta?: string;
}) {
  const [open, setOpen] = useState(false);

  // Lock page scroll behind the open overlay.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="flex flex-col gap-1.5">
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
      </button>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col bg-[#14100e]/98 px-8 py-7 text-white backdrop-blur md:hidden">
            <div className="flex justify-end">
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-4xl font-light leading-none">×</button>
            </div>
            <nav className="mt-14 flex flex-col gap-8 text-2xl font-medium uppercase tracking-[0.18em]">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="transition hover:opacity-70">{l.label}</a>
              ))}
            </nav>
            <a
              href={book}
              onClick={() => setOpen(false)}
              className="mt-auto border border-white/60 px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-neutral-900"
            >
              {cta}
            </a>
          </div>,
          document.body,
        )}
    </div>
  );
}
