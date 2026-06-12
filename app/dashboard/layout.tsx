import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant, getMyUser } from "@/lib/my-site";
import { isStaff } from "@/lib/staff";
import { MobileTabBar } from "@/components/MobileTabBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { sessionExpired } from "@/lib/session";
import { clientLogout } from "./actions";

export const metadata: import("next").Metadata = { robots: { index: false, follow: false } };

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getMyUser();
  if (!user) redirect("/login");
  // Time-box: force re-login once the session exceeds the max age.
  if (sessionExpired(user.last_sign_in_at)) redirect("/auth/signout");
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
    { href: "/dashboard/account", label: "Account" },
  ];

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-ink/10 bg-panel px-7 py-8 lg:flex lg:flex-col">
        <Link href="/dashboard" className="flex items-center gap-3 font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-ink text-sm font-bold text-paper">K</span>
          Kovasite
        </Link>

        <nav className="mt-16 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.primary
                  ? "block rounded-xl bg-emerald-400/10 px-3 py-2.5 text-sm font-semibold text-accent ring-1 ring-inset ring-emerald-400/25 transition hover:bg-emerald-400/15"
                  : "block rounded-xl px-3 py-2.5 text-sm font-medium text-ink/50 transition hover:bg-ink/[0.06] hover:text-ink"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="grid h-11 w-11 place-items-center rounded-full bg-ink text-sm font-semibold text-paper">{initial}</div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <form action={clientLogout}>
              <button className="rounded-xl border border-ink/15 px-4 py-2 text-sm font-medium text-ink/60 transition hover:bg-ink/[0.06] hover:text-ink">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Mobile top bar (slim — nav lives in the bottom tab bar) */}
      <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/70 backdrop-blur-xl lg:hidden">
        <div className="relative flex items-center justify-center px-5 py-3.5">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-ink text-xs font-bold text-paper">K</span>
            Kovasite
          </Link>
          <div className="absolute right-4"><ThemeToggle /></div>
        </div>
      </header>

      <main className="px-5 py-7 pb-28 lg:ml-72 lg:px-12 lg:py-10 lg:pb-10">{children}</main>

      {/* App-style bottom tab bar (mobile) */}
      <MobileTabBar onSignOut={clientLogout} />
    </div>
  );
}
