"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const TEAL = "#1F5E54";
const INK = "#16252A";
const LIME = "#8FBF4D";

// Sticky header for the Stride podiatry-clinic design. Transparent over the
// forest-teal hero, settling into a solid teal bar with a soft shadow once
// scrolled (or immediately on sub-pages via `solid`). Left wordmark with a
// footstep mark, centred nav, lime "Book" pill on the right; collapses to a
// functional hamburger below lg.
export function StrideHeader({
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

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(31,94,84,0.97)" : "transparent",
        boxShadow: scrolled ? "0 8px 30px rgba(22,37,42,0.22)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(143,191,77,0.25)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-3.5 text-white sm:px-8 sm:py-4">
        {/* wordmark with footstep mark (links home) */}
        <a href={home} className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full" style={{ background: LIME }} aria-hidden>
            <svg width="17" height="17" viewBox="0 0 24 24" fill={INK}>
              <path d="M9.5 3c1.6 0 2.6 1.5 2.6 3.6 0 2.4-1 4.3-2.7 4.3-1.5 0-2.4-1.4-2.4-3.5C7 5.2 8 3 9.5 3zM14 12c1.2 0 2 1.1 2 2.7 0 1.8-.8 3.1-2.1 3.1-1.1 0-1.8-1-1.8-2.6 0-1.8.8-3.2 1.9-3.2zM8 13.5c1.6 0 3 1.3 3 3.6 0 2-.6 3.9-2.7 3.9-1.6 0-3.3-.9-3.3-3 0-2.6 1.4-4.5 3-4.5zM16.6 6c1.1 0 1.8 1 1.8 2.5 0 1.6-.7 2.8-1.9 2.8-1 0-1.6-.9-1.6-2.4 0-1.6.7-2.9 1.7-2.9z" />
            </svg>
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="whitespace-nowrap text-lg font-medium tracking-[0.06em] text-white sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav (centre) */}
        <nav className="hidden gap-7 text-xs font-semibold uppercase tracking-[0.16em] lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-white/85 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        {/* right cluster: phone + Book pill */}
        <div className="hidden items-center gap-5 lg:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-white/85 transition hover:text-white"
            >
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition hover:opacity-90"
            style={{ background: LIME, color: INK }}
          >
            Book now
          </a>
        </div>

        {/* mobile menu (functional) */}
        <div className="lg:hidden">
          <MobileNav links={links} book={book} cta="Book now" />
        </div>
      </div>
    </header>
  );
}
