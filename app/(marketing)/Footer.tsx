import Link from "next/link";
import { NAV_LINKS } from "@/lib/marketing";

const COMPANY_LINKS = [
  { href: "/get-started", label: "Get started" },
  { href: "/samples", label: "Browse samples" },
  { href: "/support", label: "Support" },
  { href: "/login", label: "Sign in" },
  { href: "/admin", label: "Admin" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/cookies", label: "Cookie Policy" },
  { href: "/acceptable-use", label: "Acceptable Use" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      {/* Hairline glow along the top edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-white">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-white text-xs font-bold text-black">K</span>
              Kovasite
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/45">
              Premium websites for local businesses, designed, hosted and managed for you.
            </p>
            <a
              href="mailto:hello@kovasite.com"
              className="mt-5 inline-block text-sm text-white/60 underline-offset-4 transition hover:text-white hover:underline"
            >
              hello@kovasite.com
            </a>
          </div>

          {/* Product */}
          <nav className="flex flex-col gap-3 text-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">Product</p>
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-white/55 transition hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Company */}
          <nav className="flex flex-col gap-3 text-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">Company</p>
            {COMPANY_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="text-white/55 transition hover:text-white">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Get-online callout */}
          <div className="md:justify-self-end">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400/80">Ready to launch?</p>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              One flat monthly price. Design, hosting, domain and booking, all handled for you.
            </p>
            <Link
              href="/get-started"
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Get your site
              <span aria-hidden>→</span>
            </Link>
            <p className="mt-4 text-xs text-white/35">From £99/mo · No setup fee · No contract</p>
          </div>
        </div>

      </div>

      {/* Oversized brand wordmark with the legal line resting at its base */}
      <div className="relative mt-2">
        <div
          aria-hidden
          className="pointer-events-none select-none bg-gradient-to-b from-white/[0.18] to-white/[0.05] bg-clip-text px-6 text-center text-[22vw] font-bold leading-[0.7] tracking-tighter text-transparent"
        >
          Kovasite
        </div>
        <div className="mx-auto -mt-[5vw] flex max-w-6xl flex-col gap-3 px-6 pb-8 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kovasite. All rights reserved.</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition hover:text-white/70">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
