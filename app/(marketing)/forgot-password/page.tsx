import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SubmitButton } from "@/components/SubmitButton";
import { requestPasswordReset } from "./actions";

export const metadata: Metadata = { title: "Reset password", robots: { index: false, follow: false } };

const input =
  "mt-1 w-full rounded-lg border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink placeholder-ink/30 outline-none focus:border-ink/30";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;
  return (
    <>
      <PageHero kicker="Password reset" title="Forgot your password?">
        Enter your email and we&apos;ll send you a link to set a new one.
      </PageHero>

      <section className="mx-auto max-w-md px-6 pb-20 pt-10">
        <Reveal>
          {sent ? (
            <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-8 text-center">
              <p className="text-sm leading-relaxed text-ink/70">
                If an account exists for that email, we&apos;ve sent a link to reset your password. Check your inbox (and your spam folder).
              </p>
              <p className="mt-5 text-xs text-ink/40">
                <Link href="/login" className="text-ink/60 hover:text-ink">Back to sign in</Link>
              </p>
            </div>
          ) : (
            <form action={requestPasswordReset} className="space-y-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-8">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input name="email" type="email" required className={input} autoComplete="email" />
              </div>
              <SubmitButton className="w-full rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90" pendingText="Sending…">
                Send reset link
              </SubmitButton>
              <p className="text-center text-xs text-ink/30">
                Remembered it? <Link href="/login" className="text-ink/60 hover:text-ink">Back to sign in</Link>
              </p>
            </form>
          )}
        </Reveal>
      </section>
    </>
  );
}
