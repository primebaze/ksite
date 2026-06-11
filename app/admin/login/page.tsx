import Link from "next/link";
import { SubmitButton } from "@/components/SubmitButton";
import { login } from "./actions";

const field =
  "mt-1.5 w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition focus:border-stone-400 focus:ring-2 focus:ring-stone-900/10";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center bg-stone-100 px-4 py-10 text-stone-900">
      <form action={login} className="w-full max-w-sm rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="inline-flex items-center gap-2 font-semibold tracking-tight text-stone-900">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-stone-900 text-sm font-bold text-white">K</span>
          Kovasite <span className="text-stone-400">admin</span>
        </Link>
        <h1 className="mt-6 text-xl font-semibold text-stone-900">Sign in</h1>
        <p className="mt-1 text-sm text-stone-500">Manage client sites and enquiries.</p>

        <label className="mt-6 block text-sm font-medium text-stone-700">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@kovasite.com" />
        </label>

        <label className="mt-4 block text-sm font-medium text-stone-700">
          Password
          <input name="password" type="password" required autoComplete="current-password" className={field} />
        </label>

        {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <SubmitButton
          className="mt-6 w-full rounded-lg bg-stone-900 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60"
          pendingText="Signing in…"
        >
          Sign in
        </SubmitButton>
      </form>
    </main>
  );
}
