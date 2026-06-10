"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const NAVY = "#122036";
const LIME = "#C6F24E";

// Sticky header for the Kinetic sports-physio design. Transparent over the dark
// hero, then snaps to a solid navy bar with a lime hairline once scrolled (or
// immediately, via `solid`, on sub-pages). Left wordmark with a kinetic mark,
// nav in the centre, a lime "Book a session" pill on the right; collapses to the
// shared functional hamburger below lg.
export function KineticHeader({
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
      className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
      style={{
        background: scrolled ? NAVY : "transparent",
        boxShadow: scrolled ? "0 1px 0 0 rgba(198,242,78,0.5), 0 14px 36px rgba(8,14,26,0.45)" : "none",
        backdropFilter: scrolled ? "blur(6px)" : "none",
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 text-white sm:px-8">
        {/* wordmark + kinetic mark (links home) */}
        <a href={home} className="flex items-center gap-2.5">
          <span
            className="grid h-8 w-8 shrink-0 -skew-x-6 place-items-center rounded-md"
            style={{ background: LIME }}
            aria-hidden
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 13h4l2-7 4 14 2-7h4" />
            </svg>
          </span>
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="whitespace-nowrap text-xl font-bold tracking-tight text-white"
          >
            {name}
          </span>
        </a>

        {/* desktop nav (centre) */}
        <nav className="hidden items-center gap-7 text-[13px] font-semibold uppercase tracking-[0.12em] lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative py-1 text-white/80 transition hover:text-white">
              {l.label}
              <span
                className="absolute -bottom-0.5 left-0 h-0.5 w-0 transition-all duration-200 group-hover:w-full"
                style={{ background: LIME }}
              />
            </a>
          ))}
        </nav>

        {/* right cluster: phone + lime pill */}
        <div className="hidden items-center gap-5 lg:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-[13px] font-semibold tracking-wide text-white/70 transition hover:text-white"
            >
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] transition hover:brightness-95"
            style={{ background: LIME, color: NAVY }}
          >
            Book a session
          </a>
        </div>

        {/* mobile menu (functional) */}
        <div className="lg:hidden">
          <MobileNav links={links} book={book} cta="Book a session" />
        </div>
      </div>
    </header>
  );
}
