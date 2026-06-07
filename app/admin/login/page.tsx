import { SubmitButton } from "@/components/SubmitButton";
import { login } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-stone-100 px-6">
      <form action={login} className="w-full max-w-sm rounded-xl border border-stone-200 bg-white p-8 shadow-sm">
        <h1 className="text-xl font-semibold">Kovasite admin</h1>
        <p className="mt-1 text-sm text-stone-500">Sign in to manage client sites.</p>

        <label className="mt-6 block text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
          autoComplete="email"
        />

        <label className="mt-4 block text-sm font-medium">Password</label>
        <input
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm"
          autoComplete="current-password"
        />

        {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <SubmitButton className="mt-6 w-full rounded-md bg-stone-900 py-2.5 text-sm font-medium text-white" pendingText="Signing in…">
          Sign in
        </SubmitButton>
      </form>
    </main>
  );
}
