import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyUser } from "@/lib/my-site";
import { isStaff } from "@/lib/staff";
import { clientLogout } from "./actions";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await getMyUser();
  if (!user) redirect("/login");
  // Staff use the operator console, not the client dashboard.
  if (isStaff(user.email)) redirect("/admin");

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="grid h-6 w-6 place-items-center rounded-md bg-white text-xs font-bold text-black">K</span>
            Dashboard
          </Link>
          <div className="flex items-center gap-4 text-sm text-white/55">
            <Link href="/dashboard" className="transition hover:text-white">Overview</Link>
            <Link href="/dashboard/edit" className="transition hover:text-white">Edit site</Link>
            <form action={clientLogout}>
              <button className="rounded-lg border border-white/15 px-3 py-1.5 text-white/80 transition hover:bg-white/5">
                Sign out
              </button>
            </form>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
    </div>
  );
}
