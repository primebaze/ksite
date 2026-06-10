"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const CHARCOAL = "#25282B";
const AMBER = "#D69A3C";
const BONE = "#EFEAE1";

// Sticky header for the Axis chiropractic-clinic design. Transparent over the
// charcoal hero, settling into a solid charcoal bar (with a thin amber "axis"
// underline) once scrolled or on inner pages via the `solid` prop. The wordmark
// sits left behind a small vertical spine tick; nav is centred, an amber book
// button anchors the right. Collapses to the shared functional hamburger.
export function AxisHeader({
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
        background: scrolled ? CHARCOAL : "transparent",
        borderBottom: scrolled ? `1px solid ${AMBER}` : "1px solid transparent",
        boxShadow: scrolled ? "0 10px 30px rgba(37,40,43,0.28)" : "none",
      }}
    >
      <div className="relative flex items-center justify-between px-5 py-4 text-white sm:px-8">
        {/* wordmark (left) with a small vertical spine tick */}
        <a href={home} className="flex items-center gap-3">
          <span aria-hidden className="h-7 w-[3px] shrink-0" style={{ background: AMBER }} />
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="whitespace-nowrap text-lg font-medium tracking-[0.04em] text-white sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* desktop nav (centred) */}
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-8 text-xs font-semibold uppercase tracking-[0.18em] md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-white/80 transition hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>

        {/* right cluster: phone + book */}
        <div className="hidden items-center gap-5 md:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-white/75 transition hover:text-white"
            >
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition hover:opacity-90"
            style={{ background: AMBER, color: CHARCOAL }}
          >
            Book now
          </a>
        </div>

        {/* mobile menu (functional) */}
        <div className="md:hidden">
          <MobileNav links={links} book={book} cta="Book now" />
        </div>
      </div>
      <span className="sr-only" style={{ color: BONE }}>{name}</span>
    </header>
  );
}
