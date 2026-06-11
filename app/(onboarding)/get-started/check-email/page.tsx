import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Check your email · Kovasite" };

export default async function CheckEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return (
    <>
      <PageHero kicker="Almost there" title="Check your email.">
        We&apos;ve sent a confirmation link{email ? ` to ${email}` : ""}. Click it to verify your address and we&apos;ll
        finish setting up your site.
      </PageHero>

      <section className="mx-auto max-w-md px-6 py-20">
        <Reveal>
          <div className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/15 text-accent">
              ✉
            </div>
            <p className="mt-4 text-sm text-ink/55">
              Once you click the link, you&apos;ll land straight in your dashboard with your draft site ready to edit.
            </p>
            <p className="mt-6 text-xs text-ink/30">
              Didn&apos;t get it? Check spam, or <Link href="/get-started" className="text-ink/60 hover:text-ink">try again</Link>.
              Already confirmed? <Link href="/login" className="text-ink/60 hover:text-ink">Sign in</Link>.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
