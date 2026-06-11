import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { FAQS } from "@/lib/marketing";

export const metadata: Metadata = { title: "Support · Kovasite" };

const CHANNELS = [
  {
    icon: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2.5" />
        <path d="M4 7l8 6 8-6" />
      </>
    ),
    title: "Email us",
    body: "Questions about your site, billing or anything else. We usually reply the same business day.",
    cta: "hello@kovasite.com",
    href: "mailto:hello@kovasite.com",
  },
  {
    icon: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
      </>
    ),
    title: "Request a change",
    body: "New photos, prices, menu or hours? Tap the text on your site to edit it yourself in seconds, or send it over and we'll do it for you.",
    cta: "changes@kovasite.com",
    href: "mailto:changes@kovasite.com",
  },
  {
    icon: (
      <>
        <path d="M5 11V7a5 5 0 0 1 10 0v4" transform="translate(2)" />
        <rect x="4" y="11" width="16" height="9" rx="2" />
      </>
    ),
    title: "Account help",
    body: "Trouble signing in or confirming your email? Sign in here, or email us and we'll sort it quickly.",
    cta: "Go to sign in",
    href: "/login",
  },
];

export default function SupportPage() {
  return (
    <>
      <PageHero kicker="Support" title="We're here to help.">
        Real people, quick replies. We look after the whole site for you, so most things are a single message
        away.
      </PageHero>

      {/* Contact channels */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {CHANNELS.map((c, i) => {
            const external = c.href.startsWith("mailto:");
            const Inner = (
              <>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-400">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {c.icon}
                  </svg>
                </span>
                <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/55">{c.body}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400/90 transition group-hover:text-emerald-300">
                  {c.cta}
                  <span aria-hidden>→</span>
                </span>
              </>
            );
            const cls =
              "group flex h-full flex-col rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 transition hover:-translate-y-1 hover:border-emerald-400/40";
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                {external ? (
                  <a href={c.href} className={cls}>
                    {Inner}
                  </a>
                ) : (
                  <Link href={c.href} className={cls}>
                    {Inner}
                  </Link>
                )}
              </Reveal>
            );
          })}
        </div>

        {/* Response-time strip */}
        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-white/10 bg-black/40 px-6 py-5 text-sm text-white/55">
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
              </svg>
              Same-day replies on business days
            </span>
            <span className="hidden text-white/15 sm:inline">·</span>
            <span>Priority turnaround on Standard &amp; Premium</span>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/5 bg-[#070707]">
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">Common questions</h2>
          </Reveal>
          <div className="mt-10 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]">
            {FAQS.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <details className="group p-6 [&_summary]:cursor-pointer">
                  <summary className="flex list-none items-center justify-between gap-4 font-medium">
                    {f.q}
                    <svg className="h-4 w-4 shrink-0 text-white/40 transition group-open:rotate-45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.08}>
            <p className="mt-8 text-center text-sm text-white/45">
              Still stuck?{" "}
              <a href="mailto:hello@kovasite.com" className="text-emerald-400/90 underline-offset-4 transition hover:text-emerald-300 hover:underline">
                Email our team
              </a>{" "}
              and we&apos;ll get back to you.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
