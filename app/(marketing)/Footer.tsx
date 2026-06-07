import Link from "next/link";
import { NAV_LINKS } from "@/lib/marketing";

export default function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2 font-semibold text-white">
              <span className="grid h-5 w-5 place-items-center rounded bg-white text-[10px] font-bold text-black">K</span>
              Kovasite
            </Link>
            <p className="mt-3 text-sm text-white/40">
              Websites for local businesses, built and managed for you.
            </p>
          </div>
          <div className="flex gap-16 text-sm">
            <div className="space-y-2">
              <p className="text-white/40">Product</p>
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="block text-white/70 transition hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-white/40">Company</p>
              <Link href="/get-started" className="block text-white/70 transition hover:text-white">Get started</Link>
              <Link href="/admin" className="block text-white/70 transition hover:text-white">Admin</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/5 pt-6 text-sm text-white/35">
          © 2026 Kovasite · No setup fee, no contract.
        </div>
      </div>
    </footer>
  );
}
