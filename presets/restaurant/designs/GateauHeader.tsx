"use client";

import { useEffect, useState } from "react";
import { MobileNav } from "./MobileNav";

// Couture French-patisserie palette (baked identity). Deep-cocoa ink and gold
// leaf over ivory — nothing like Crumb's rustic crust-brown or Meadow's coral.
const COCOA = "#3B2C28";
const GOLD = "#C9A24A";
const IVORY = "#FBF7F1";

// Sticky header for the Gateau design: a centred, jewellery-box wordmark framed
// by two hairline gold rules, floating transparently over the ivory hero. Once
// scrolled (or forced solid on sub-pages via `solid`) it settles onto a frosted
// ivory pane with a single fine gold underline. The nav splits symmetrically to
// either side of the wordmark on large screens; below lg it collapses to the
// shared MobileNav (bars recoloured to cocoa). Because the hero is a pale ivory
// field — never a dark photo — type stays cocoa throughout.
export function GateauHeader({
  name,
  book,
  links,
  home = "/",
  solid = false,
}: {
  name: string;
  book: string;
  links: { label: string; href: string }[];
  home?: string;
  /** Force the solid background (used on sub-pages with no hero behind it). */
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

  // Symmetric split: half the links to the left of the wordmark, half to the right.
  const mid = Math.ceil(links.length / 2);
  const leftLinks = links.slice(0, mid);
  const rightLinks = links.slice(mid);

  const linkCls =
    "text-[10px] font-medium uppercase tracking-[0.32em] transition-colors hover:text-[color:#C9A24A]";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(251,247,241,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${GOLD}3d` : "1px solid transparent",
        color: COCOA,
      }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        {/* left nav (desktop) */}
        <nav className="hidden items-center justify-end gap-7 lg:flex" style={{ color: COCOA }}>
          {leftLinks.map((l) => (
            <a key={l.href} href={l.href} className={linkCls}>{l.label}</a>
          ))}
        </nav>

        {/* centred jewellery-box wordmark, double gold rule */}
        <a href={home} className="flex shrink-0 flex-col items-center lg:px-8">
          <span className="hidden h-px w-10 lg:block" style={{ background: GOLD }} aria-hidden />
          <span
            data-edit="tenant.business_name"
            style={{ fontFamily: "var(--font-fraunces)", color: COCOA }}
            className="block whitespace-nowrap text-2xl font-normal lowercase italic leading-none tracking-[0.04em] sm:text-3xl lg:my-1.5"
          >
            {name}
          </span>
          <span className="hidden h-px w-10 lg:block" style={{ background: GOLD }} aria-hidden />
        </a>

        {/* right nav (desktop) + book CTA */}
        <nav className="hidden items-center gap-7 lg:flex" style={{ color: COCOA }}>
          {rightLinks.map((l) => (
            <a key={l.href} href={l.href} className={linkCls}>{l.label}</a>
          ))}
          <a
            href={book}
            className="rounded-full border px-5 py-2 text-[10px] font-medium uppercase tracking-[0.28em] transition-colors hover:bg-[color:#3B2C28] hover:text-[color:#FBF7F1]"
            style={{ borderColor: GOLD, color: COCOA }}
          >
            Order
          </a>
        </nav>

        {/* mobile hamburger — cocoa bars on ivory */}
        <div className="lg:hidden [&_button>span]:!bg-[#3B2C28]">
          <MobileNav links={links} book={book} cta="Order a cake" />
        </div>
      </div>
    </header>
  );
}
