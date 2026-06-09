"use client";

import { useState } from "react";

// Functional mobile menu for the Ember design: a hamburger that opens a
// full-screen overlay of nav links; taps close it. Shown only below md.
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

  return (
    <div className="md:hidden">
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="flex flex-col gap-1.5">
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
        <span className="h-0.5 w-6 bg-white" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col bg-[#14100e]/98 px-8 py-7 text-white backdrop-blur">
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
        </div>
      )}
    </div>
  );
}
