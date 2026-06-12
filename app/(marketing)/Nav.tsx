"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/marketing";

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-ink/5 bg-paper/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-ink text-xs font-bold text-paper">K</span>
          Kovasite
        </Link>
        <div className="hidden items-center gap-8 text-sm md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={active ? "text-ink" : "text-ink/55 transition hover:text-ink"}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/login" className="text-ink/55 transition hover:text-ink">Sign in</Link>
          <Link
            href="/get-started"
            className="rounded-lg bg-ink px-4 py-2 font-medium text-paper transition hover:bg-ink/90"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
