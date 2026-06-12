import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabase-server";
import { isStaff } from "@/lib/staff";
import { getNavBadges } from "@/lib/admin";
import { sessionExpired, ADMIN_SESSION_MAX_AGE_MS } from "@/lib/session";
import { AdminNav, type AdminNavItem } from "@/components/AdminNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { logout } from "../login/actions";

export const dynamic = "force-dynamic";
export const metadata: import("next").Metadata = { robots: { index: false, follow: false } };

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();
  if (!user) redirect("/kmanageradmin/login");
  // Time-box: force staff re-login once the session exceeds the max age.
  if (sessionExpired(user.last_sign_in_at, ADMIN_SESSION_MAX_AGE_MS)) redirect("/auth/signout?to=admin");
  // Clients who sign in land here only if they're on the staff allowlist;
  // everyone else is sent to their own dashboard.
  if (!(await isStaff(user.email))) redirect("/dashboard");

  const { newEnquiries, openTickets } = await getNavBadges();
  const items: AdminNavItem[] = [
    { href: "/kmanageradmin", label: "Overview", icon: "overview" },
    { href: "/kmanageradmin/enquiries", label: "Enquiries", icon: "enquiries", badge: newEnquiries },
    { href: "/kmanageradmin/support", label: "Support", icon: "support", badge: openTickets },
    { href: "/kmanageradmin/promos", label: "Promo codes", icon: "promos" },
    { href: "/kmanageradmin/account", label: "Account", icon: "account" },
  ];
  const initial = user.email?.[0]?.toUpperCase() ?? "K";

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-ink/10 bg-panel px-5 py-7 lg:flex">
        <Link href="/kmanageradmin" className="flex items-center gap-2.5 px-2 font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-sm font-bold text-neutral-950">K</span>
          <span>Kovasite <span className="text-ink/40">admin</span></span>
        </Link>

        <div className="mt-10">
          <AdminNav items={items} />
        </div>

        <div className="mt-auto border-t border-ink/10 pt-4">
          <div className="flex items-center gap-3 px-2">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink/10 text-sm font-semibold">{initial}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink/80">{user.email}</p>
              <p className="text-xs text-ink/35">Operator</p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <form action={logout} className="flex-1">
              <button className="w-full rounded-xl border border-ink/12 px-3 py-2 text-sm font-medium text-ink/70 transition hover:bg-ink/[0.06] hover:text-ink">
                Sign out
              </button>
            </form>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/80 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between px-5 py-3.5">
          <Link href="/kmanageradmin" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500 text-xs font-bold text-neutral-950">K</span>
            <span>Kovasite <span className="text-ink/40">admin</span></span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <form action={logout}>
              <button className="rounded-lg border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink/70">Sign out</button>
            </form>
          </div>
        </div>
        <div className="border-t border-ink/10 px-3 py-2">
          <AdminNav items={items} orientation="horizontal" />
        </div>
      </header>

      <main className="px-5 py-8 lg:ml-72 lg:px-12 lg:py-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
