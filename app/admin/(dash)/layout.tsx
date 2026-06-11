import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabase-server";
import { isStaff } from "@/lib/staff";
import { logout } from "../login/actions";

export default async function DashLayout({ children }: { children: React.ReactNode }) {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  // Clients who sign in land here only if they're on the staff allowlist;
  // everyone else is sent to their own dashboard.
  if (!isStaff(user.email)) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-semibold">
              Kovasite <span className="text-stone-400">admin</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-stone-500">
              <Link href="/admin" className="hover:text-stone-900">Clients</Link>
              <Link href="/admin/enquiries" className="hover:text-stone-900">Enquiries</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm text-stone-500">
            <span>{user.email}</span>
            <form action={logout}>
              <button className="rounded-md border border-stone-300 px-3 py-1.5 text-stone-700">
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
