import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SubmitButton } from "@/components/SubmitButton";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { setPassword } from "./actions";

export const metadata: Metadata = { title: "Set your password", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

const input =
  "mt-1 w-full rounded-lg border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink placeholder-ink/30 outline-none focus:border-ink/30";

export default async function SetPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;

  // The recovery link must have established a session. No session means the
  // link was invalid or expired — send them to sign in.
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?error=${encodeURIComponent("That link is invalid or has expired. Please sign in or reset your password.")}`);
  }

  return (
    <>
      <PageHero kicker="Account" title="Set your password.">
        Choose a password to finish setting up your account.
      </PageHero>

      <section className="mx-auto max-w-md px-6 pb-20 pt-10">
        <Reveal>
          <form action={setPassword} className="space-y-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-8">
            <div>
              <label className="text-sm font-medium">New password</label>
              <input name="password" type="password" required minLength={8} placeholder="At least 8 characters" className={input} autoComplete="new-password" />
            </div>
            <div>
              <label className="text-sm font-medium">Confirm password</label>
              <input name="confirm" type="password" required minLength={8} className={input} autoComplete="new-password" />
            </div>
            {error && <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
            <SubmitButton className="w-full rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90" pendingText="Saving…">
              Save password
            </SubmitButton>
          </form>
        </Reveal>
      </section>
    </>
  );
}
