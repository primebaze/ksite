import Link from "next/link";
import { SubmitButton } from "@/components/SubmitButton";
import { login } from "./actions";

export const metadata: import("next").Metadata = { robots: { index: false, follow: false } };

const field =
  "mt-1.5 w-full rounded-lg border border-ink/10 bg-ink/5 px-3.5 py-2.5 text-sm text-ink placeholder-ink/30 outline-none transition focus:border-ink/30 focus:ring-2 focus:ring-emerald-500/20";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center bg-panel px-4 py-10 text-ink">
      <form action={login} className="w-full max-w-sm rounded-2xl border border-ink/10 bg-ink/[0.03] p-6 shadow-xl sm:p-8">
        <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight text-ink">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-emerald-500 text-sm font-bold text-neutral-950">K</span>
          Kovasite <span className="text-ink/40">admin</span>
        </Link>
        <h1 className="mt-6 text-xl font-semibold text-ink">Sign in</h1>
        <p className="mt-1 text-sm text-ink/50">Manage client sites and enquiries.</p>

        <label className="mt-6 block text-sm font-medium text-ink/80">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@kovasite.com" />
        </label>

        <label className="mt-4 block text-sm font-medium text-ink/80">
          Password
          <input name="password" type="password" required autoComplete="current-password" className={field} />
        </label>

        {error && <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}

        <SubmitButton
          className="mt-6 w-full rounded-lg bg-emerald-500 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400 disabled:opacity-60"
          pendingText="Signing in…"
        >
          Sign in
        </SubmitButton>
      </form>
    </main>
  );
}
