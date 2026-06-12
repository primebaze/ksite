import { changeOwnPassword } from "@/app/account-actions";

const input =
  "mt-1 w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5 text-sm text-ink placeholder-ink/25 outline-none transition focus:border-ink/25 focus:bg-ink/[0.05]";
const label = "text-[13px] font-medium text-ink/55";

// Self-serve change-password card. Drop into any signed-in surface; `redirectTo`
// is where to return with ?changed=1 / ?error=… and `changed`/`error` come from
// that page's searchParams.
export function ChangePassword({ redirectTo, changed, error }: { redirectTo: string; changed?: boolean; error?: string }) {
  return (
    <section className="rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-6">
      <h2 className="text-lg font-semibold">Change password</h2>
      <p className="mt-0.5 text-sm text-ink/45">Enter your current password, then a new one (at least 8 characters).</p>

      {changed && <p className="mt-4 rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-accent">Password updated.</p>}
      {error && <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}

      <form action={changeOwnPassword} className="mt-4 max-w-sm space-y-4">
        <input type="hidden" name="redirect_to" value={redirectTo} />
        <div>
          <label className={label}>Current password</label>
          <input name="current" type="password" required autoComplete="current-password" className={input} />
        </div>
        <div>
          <label className={label}>New password</label>
          <input name="next_password" type="password" required minLength={8} autoComplete="new-password" className={input} />
        </div>
        <button className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink/90">
          Update password
        </button>
      </form>
    </section>
  );
}
