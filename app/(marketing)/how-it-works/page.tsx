import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { STEPS } from "@/lib/marketing";

export const metadata: Metadata = { title: "How it works · Kovasite" };

// Small line icon per step (chat → build → bookings).
const STEP_ICONS: React.ReactNode[] = [
  <path key="chat" d="M4 5h16v11H8l-4 3V5z" />,
  <>
    <path key="b1" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
    <path key="b2" d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
  </>,
  <>
    <path key="t1" d="M4 18l5-5 4 4 7-8" />
    <path key="t2" d="M16 9h4v4" />
  </>,
];

const NEVER = [
  { t: "Wrestle a page builder", d: "No drag-and-drop, no templates to fight. We design it for you." },
  { t: "Learn a dashboard", d: "Nothing to set up or maintain. Want a change? Text or email us." },
  { t: "Touch domains or hosting", d: "Domain, DNS, SSL and hosting are registered and renewed for you." },
  { t: "Chase updates", d: "Edits are included every month, with priority turnaround on higher plans." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero kicker="How it works" title="You run your business. We run your website.">
        No dashboards to learn and no DIY builder. We set everything up and keep it running, every month.
      </PageHero>

      {/* Three-step timeline */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {/* connecting line (desktop) */}
          <div className="pointer-events-none absolute inset-x-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.1}>
              <div className="relative flex flex-col">
                <div className="flex items-center gap-4">
                  <span className="relative z-10 grid h-[4.25rem] w-[4.25rem] shrink-0 place-items-center rounded-2xl border border-emerald-400/25 bg-[#0a0a0a] text-emerald-400 shadow-[0_0_40px_-12px_rgba(16,185,129,0.6)]">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {STEP_ICONS[i]}
                    </svg>
                  </span>
                  <span className="bg-gradient-to-br from-white/35 to-white/5 bg-clip-text font-mono text-4xl font-bold tracking-tight text-transparent">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* timing reassurance */}
        <Reveal delay={0.1}>
          <p className="mt-14 text-center text-sm text-white/40">
            Most sites are live on your own custom domain in <span className="text-white/70">under a day</span>.
          </p>
        </Reveal>
      </section>

      {/* What you never have to do */}
      <section className="border-t border-white/5 bg-[#070707]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-emerald-400/80">Hands off</p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              What you never have to do.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {NEVER.map((n, i) => (
              <Reveal key={n.t} delay={(i % 2) * 0.06} className="bg-[#070707]">
                <div className="flex h-full items-start gap-4 p-7">
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-white/40">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" aria-hidden>
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-semibold">{n.t}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">{n.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
