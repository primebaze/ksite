import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SubmitButton } from "@/components/SubmitButton";
import { clientLogin } from "./actions";

export const metadata: Metadata = { title: "Sign in", robots: { index: false, follow: false } };

const input =
  "mt-1 w-full rounded-lg border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink placeholder-ink/30 outline-none focus:border-ink/30";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; notice?: string; email?: string }>;
}) {
  const { error, notice, email } = await searchParams;
  return (
    <>
      <PageHero kicker="Sign in" title="Welcome back.">
        Sign in to manage your site.
      </PageHero>

      <section className="mx-auto max-w-md px-6 pb-20 pt-10">
        <Reveal>
          <form action={clientLogin} className="space-y-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-8">
            {notice && <p className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-3 text-sm text-accent">{notice}</p>}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input name="email" type="email" required defaultValue={email ?? ""} className={input} autoComplete="email" />
            </div>
            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-medium">Password</label>
                <Link href="/forgot-password" className="text-xs text-ink/45 hover:text-ink">Forgot password?</Link>
              </div>
              <input name="password" type="password" required className={input} autoComplete="current-password" />
            </div>
            {error && <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
            <SubmitButton className="w-full rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90" pendingText="Signing in…">
              Sign in
            </SubmitButton>
            <p className="text-center text-xs text-ink/30">
              New here? <Link href="/get-started" className="text-ink/60 hover:text-ink">Create your site</Link>
            </p>
          </form>
        </Reveal>
      </section>
    </>
  );
}
