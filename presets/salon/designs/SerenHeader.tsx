"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "../../restaurant/designs/MobileNav";

const ROSE = "#cf9583";
const INK = "#2c2622";

// Sticky header for the Seren aesthetics-clinic design. A soft rose bar sits
// over the hero, turning a touch more solid with a shadow once scrolled. Nav
// left of a centred wordmark, phone + "Get started" button on the right;
// collapses to a functional hamburger below md.
export function SerenHeader({
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
      className="fixed inset-x-0 top-0 z-50 transition-shadow duration-300"
      style={{
        background: scrolled ? "rgba(207,149,131,0.97)" : "rgba(207,149,131,0.92)",
        boxShadow: scrolled ? "0 8px 30px rgba(44,38,34,0.18)" : "none",
        backdropFilter: "blur(6px)",
      }}
    >
      <div className="relative flex items-center justify-between px-5 py-3.5 text-white sm:px-8 sm:py-4">
        {/* desktop nav (left) */}
        <nav className="hidden gap-6 text-xs font-medium uppercase tracking-[0.16em] lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:opacity-75">
              {l.label}
            </a>
          ))}
        </nav>

        {/* mobile menu (functional) */}
        <div className="lg:hidden">
          <MobileNav links={links} book={book} cta="Get started" />
        </div>

        {/* centred wordmark (links home) */}
        <a
          href={home}
          className="pointer-events-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        >
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)" }}
            className="block whitespace-nowrap text-lg font-medium tracking-[0.14em] text-white sm:text-xl"
          >
            {name}
          </span>
        </a>

        {/* right cluster: phone + Get started */}
        <div className="hidden items-center gap-5 lg:flex">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-xs font-semibold uppercase tracking-[0.14em] text-white/90 transition hover:text-white"
            >
              {phone}
            </a>
          )}
          <a
            href={book}
            className="inline-flex items-center px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] transition hover:opacity-90"
            style={{ background: INK, color: "#fff" }}
          >
            Get started
          </a>
        </div>
        {/* mobile spacer to balance the menu icon */}
        <span className="w-6 lg:hidden" />
      </div>
    </header>
  );
}
