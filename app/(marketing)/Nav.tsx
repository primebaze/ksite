"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/marketing";

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-white text-xs font-bold text-black">K</span>
          Kovasite
        </Link>
        <div className="hidden items-center gap-8 text-sm md:flex">
          {NAV_LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={active ? "text-white" : "text-white/55 transition hover:text-white"}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/login" className="text-white/55 transition hover:text-white">Sign in</Link>
          <Link
            href="/get-started"
            className="rounded-lg bg-white px-4 py-2 font-medium text-black transition hover:bg-white/90"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
