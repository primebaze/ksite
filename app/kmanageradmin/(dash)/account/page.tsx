import Link from "next/link";
import { getAdminUser } from "@/lib/supabase-server";
import { listStaff } from "@/lib/staff";
import { ChangePassword } from "@/components/ChangePassword";
import { addStaffAction, removeStaffAction } from "./actions";

export const dynamic = "force-dynamic";

const input =
  "mt-1 w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5 text-sm text-ink placeholder-ink/25 outline-none transition focus:border-ink/25 focus:bg-ink/[0.05]";
const btn = "rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink/90";

export default async function AdminAccountPage({ searchParams }: { searchParams: Promise<{ changed?: string; error?: string; notice?: string }> }) {
  const { changed, error, notice } = await searchParams;
  const [user, staff] = await Promise.all([getAdminUser(), listStaff()]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Account</h1>
          <p className="mt-1 text-sm text-ink/45">Signed in as {user?.email}</p>
        </div>
        <Link href="/kmanageradmin" className="text-sm text-ink/50 hover:text-ink">← Overview</Link>
      </div>

      {notice && <p className="rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-accent">{notice}</p>}
      {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}

      <ChangePassword redirectTo="/kmanageradmin/account" changed={changed === "1"} error={undefined} />

      {/* Staff access */}
      <section className="rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-6">
        <h2 className="text-lg font-semibold">Admin access</h2>
        <p className="mt-0.5 text-sm text-ink/45">
          Only the emails listed below can open this admin console — no one else. Each also needs a Kovasite
          account with that email and password to actually sign in.
        </p>

        <ul className="mt-4 divide-y divide-ink/[0.08]">
          {staff.map((s) => (
            <li key={s.email} className="flex items-center justify-between gap-3 py-3">
              <span className="font-medium text-ink">{s.email}</span>
              {!s.isEnv && (
                <form action={removeStaffAction}>
                  <input type="hidden" name="email" value={s.email} />
                  <button className="rounded-lg border border-red-400/30 px-3 py-1.5 text-sm font-medium text-red-400 transition hover:bg-red-400/10">Remove</button>
                </form>
              )}
            </li>
          ))}
        </ul>

        <form action={addStaffAction} className="mt-4 flex flex-wrap items-end gap-2">
          <div className="min-w-[220px] flex-1">
            <label className="text-[13px] font-medium text-ink/55">Add admin by email</label>
            <input name="email" type="email" required placeholder="name@example.com" className={input} />
          </div>
          <button className={btn}>Add admin</button>
        </form>
      </section>
    </div>
  );
}
