"use client";

import { useState } from "react";

// Functional mobile menu shared by the bespoke trades designs: a hamburger that
// opens a full-screen overlay of nav links; taps close it. Shown only below md.
// Colours are passed in so each design can match its baked palette.
export function TradesMobileNav({
  links,
  cta,
  ctaLabel,
  bg = "#0c0d10",
  fg = "#ffffff",
  accent = "#ffffff",
  barColor,
}: {
  links: { label: string; href: string }[];
  cta?: string;
  ctaLabel?: string;
  bg?: string;
  fg?: string;
  accent?: string;
  /** Colour of the hamburger bars when closed (defaults to fg). */
  barColor?: string;
}) {
  const [open, setOpen] = useState(false);
  const bars = barColor ?? fg;

  return (
    <div className="md:hidden">
      <button aria-label="Open menu" onClick={() => setOpen(true)} className="flex flex-col gap-1.5">
        <span className="h-0.5 w-6" style={{ background: bars }} />
        <span className="h-0.5 w-6" style={{ background: bars }} />
        <span className="h-0.5 w-6" style={{ background: bars }} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[90] flex flex-col px-8 py-7 backdrop-blur" style={{ background: bg, color: fg }}>
          <div className="flex justify-end">
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="text-4xl font-light leading-none" style={{ color: fg }}>×</button>
          </div>
          <nav className="mt-14 flex flex-col gap-7 text-2xl font-semibold uppercase tracking-[0.12em]">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="transition hover:opacity-70">{l.label}</a>
            ))}
          </nav>
          {cta && ctaLabel && (
            <a
              href={cta}
              onClick={() => setOpen(false)}
              className="mt-auto px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] transition hover:opacity-90"
              style={{ background: accent, color: bg }}
            >
              {ctaLabel}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

// Shared social-link icon used across the trades designs; falls back to a globe.
export function TradesSocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("linkedin")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}
