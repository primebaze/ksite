import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { SubmitButton } from "@/components/SubmitButton";
import { VERTICALS } from "@/lib/verticals";
import { startOnboarding } from "./actions";

const GROUPS = Array.from(new Set(VERTICALS.map((v) => v.group)));

export const metadata: Metadata = { title: "Get started — Kovasite" };

const input =
  "mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30";

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <PageHero kicker="Get started" title="Create your site in minutes.">
        Set up your account and tell us the basics. You&apos;ll get a draft you can edit straight away, then publish
        when you&apos;re ready.
      </PageHero>

      <section className="mx-auto max-w-xl px-6 py-20">
        <Reveal>
          <form action={startOnboarding} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.02] p-8">
            <div>
              <label className="text-sm font-medium">Business name</label>
              <input name="business_name" required className={input} placeholder="Nonna's Kitchen" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Type</label>
                <select name="preset" className={input} defaultValue="salon">
                  {GROUPS.map((g) => (
                    <optgroup key={g} label={g} className="bg-zinc-900">
                      {VERTICALS.filter((v) => v.group === g).map((v) => (
                        <option key={v.key} value={v.key} className="bg-zinc-900">{v.label}</option>
                      ))}
                    </optgroup>
                  ))}
                  <optgroup label="Something else" className="bg-zinc-900">
                    <option value="other" className="bg-zinc-900">Other (type below)</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Subdomain</label>
                <div className="mt-1 flex items-center">
                  <input name="subdomain" required pattern="[a-z0-9-]+" placeholder="nonna" className={`${input} mt-0 rounded-r-none lowercase`} />
                  <span className="rounded-r-lg border border-l-0 border-white/10 bg-white/[0.03] px-3 py-3 text-sm text-white/40">.kovasite.com</span>
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">If you chose “Other”, what kind of business?</label>
              <input name="preset_other" placeholder="e.g. Photography studio, dog groomer…" className={input} />
            </div>
            <div className="h-px bg-white/10" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input name="email" type="email" required className={input} />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <input name="password" type="password" required minLength={8} className={input} />
              </div>
            </div>

            {error && <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

            <SubmitButton className="w-full rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90" pendingText="Creating your account…">
              Create my site
            </SubmitButton>
            <p className="text-center text-xs text-white/30">
              Already have an account? <Link href="/login" className="text-white/60 hover:text-white">Sign in</Link>
            </p>
          </form>
        </Reveal>
      </section>
    </>
  );
}
