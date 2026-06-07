import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SubmitButton } from "@/components/SubmitButton";
import { clientLogin } from "./actions";

export const metadata: Metadata = { title: "Sign in — Kovasite" };

const input =
  "mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <PageHero kicker="Sign in" title="Welcome back.">
        Sign in to manage your site.
      </PageHero>

      <section className="mx-auto max-w-md px-6 py-20">
        <Reveal>
          <form action={clientLogin} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input name="email" type="email" required className={input} autoComplete="email" />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input name="password" type="password" required className={input} autoComplete="current-password" />
            </div>
            {error && <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
            <SubmitButton className="w-full rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90" pendingText="Signing in…">
              Sign in
            </SubmitButton>
            <p className="text-center text-xs text-white/30">
              New here? <Link href="/get-started" className="text-white/60 hover:text-white">Create your site</Link>
            </p>
          </form>
        </Reveal>
      </section>
    </>
  );
}
