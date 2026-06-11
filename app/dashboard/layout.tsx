import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant, getMyUser } from "@/lib/my-site";
import { isStaff } from "@/lib/staff";
import { MobileTabBar } from "@/components/MobileTabBar";
import { clientLogout } from "./actions";

export const metadata: import("next").Metadata = { robots: { index: false, follow: false } };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getMyUser();
  if (!user) redirect("/login");
  // Staff use the operator console, not the client dashboard.
  if (isStaff(user.email)) redirect("/kmanageradmin");
  // Suspended accounts are blocked from the dashboard (site is also offline).
  const me = await getMyTenant();
  if (me?.account_status === "suspended") redirect("/suspended");

  const initial = user.email?.[0]?.toUpperCase() ?? "K";
  // Two editing surfaces: "Edit site" (on-page — also where onboarding lands)
  // and "Content & menu" (everything structured). The old step-by-step wizard
  // is retired; editing is the live page.
  const nav = [
    { href: "/dashboard", label: "Home" },
    { href: "/preview?edit=1", label: "Edit site", primary: true },
    { href: "/dashboard/edit", label: "Content & menu" },
    { href: "/dashboard/inbox", label: "Enquiries" },
    { href: "/dashboard/domains", label: "Domains" },
    { href: "/dashboard/billing", label: "Billing" },
    { href: "/dashboard/support", label: "Support" },
  ];

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-white/10 bg-neutral-950 px-7 py-8 lg:flex lg:flex-col">
        <Link href="/dashboard" className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-white text-sm font-bold text-black">K</span>
          Kovasite
        </Link>

        <nav className="mt-16 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.primary
                  ? "block rounded-xl bg-emerald-400/10 px-3 py-2.5 text-sm font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/25 transition hover:bg-emerald-400/15"
                  : "block rounded-xl px-3 py-2.5 text-sm font-medium text-white/50 transition hover:bg-white/[0.06] hover:text-white"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex items-center justify-between">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-white text-sm font-semibold text-black">{initial}</div>
          <form action={clientLogout}>
            <button className="rounded-xl border border-white/15 px-4 py-2 text-sm font-medium text-white/60 transition hover:bg-white/[0.06] hover:text-white">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar (slim — nav lives in the bottom tab bar) */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-center px-5 py-3.5">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-white text-xs font-bold text-black">K</span>
            Kovasite
          </Link>
        </div>
      </header>

      <main className="px-5 py-7 pb-28 lg:ml-72 lg:px-12 lg:py-10 lg:pb-10">{children}</main>

      {/* App-style bottom tab bar (mobile) */}
      <MobileTabBar onSignOut={clientLogout} />
    </div>
  );
}
