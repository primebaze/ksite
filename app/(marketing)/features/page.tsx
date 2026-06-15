import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { FeatureIcon } from "@/components/FeatureIcon";
import { Reveal } from "@/components/motion/Reveal";
import { DesignWindow, ShieldWindow, BookingWindow, SpeedWindow } from "@/components/FeatureBento";
import { FEATURES } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Features",
  description: "Premium design, online booking, a free custom domain with SSL, local SEO and live editing — everything your local business website needs, done for you.",
  alternates: { canonical: "/features" },
  openGraph: { title: "Features | Kovasite", description: "Everything your local business website needs, done for you.", url: "/features" },
};

// The four headline features each get a live demo window; the rest read as
// clean icon cards. Keyed by the `icon` id on each FEATURES entry.
const WINDOWS: Record<string, () => React.ReactNode> = {
  design: DesignWindow,
  shield: ShieldWindow,
  calendar: BookingWindow,
  bolt: SpeedWindow,
};

const POINTS: Record<string, string[]> = {
  design: ["Crafted for your industry", "Looks bespoke, not templated", "Yours to tweak any time"],
  shield: ["Free custom domain, registered & renewed", "HTTPS / SSL handled", "DNS configured for you"],
  calendar: ["Tables, appointments & orders", "No per-booking commission", "Synced to your calendar"],
  bolt: ["Top Core Web Vitals", "Loads in well under a second", "Built mobile-first"],
};

export default function FeaturesPage() {
  const showcase = FEATURES.filter((f) => WINDOWS[f.icon]);
  const rest = FEATURES.filter((f) => !WINDOWS[f.icon]);

  return (
    <>
      <PageHero kicker="Features" title="Everything you need to be found, booked and remembered.">
        Your site takes bookings, captures leads and shows up on Google, and we look after the whole thing for
        you, every month.
      </PageHero>

      {/* Headline features — each paired with a live demo window, alternating sides */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="space-y-20 sm:space-y-28">
          {showcase.map((f, i) => {
            const Visual = WINDOWS[f.icon];
            const flip = i % 2 === 1;
            return (
              <Reveal key={f.title}>
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  {/* Copy */}
                  <div className={flip ? "lg:order-2" : ""}>
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] text-accent">
                      <FeatureIcon id={f.icon} className="h-6 w-6" />
                    </span>
                    <p className="mt-5 text-xs font-medium uppercase tracking-[0.22em] text-ink/30">
                      {String(i + 1).padStart(2, "0")} / {String(showcase.length).padStart(2, "0")}
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{f.title}</h2>
                    <p className="mt-4 max-w-md text-base leading-relaxed text-ink/55">{f.body}</p>
                    <ul className="mt-6 space-y-3">
                      {(POINTS[f.icon] ?? []).map((p) => (
                        <li key={p} className="flex items-start gap-2.5 text-sm text-ink/70">
                          <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                            <path d="M5 12.5l4.5 4.5L19 7" />
                          </svg>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Live window */}
                  <div className={`${flip ? "lg:order-1" : ""} relative`}>
                    <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br from-emerald-400/10 via-transparent to-transparent blur-2xl" />
                    <div className="h-[360px] sm:h-[420px]">
                      <Visual />
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* The rest — clean icon cards */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
          {rest.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05} className="bg-panel">
              <div className="h-full p-8 transition hover:bg-ink/[0.02]">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-ink/10 bg-ink/[0.03] text-accent">
                  <FeatureIcon id={f.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/50">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Reassurance strip */}
        <Reveal delay={0.08}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 rounded-2xl border border-ink/10 bg-paper/40 px-6 py-5 text-sm text-ink/55">
            {["Everything included from £49.99/mo", "No setup fee", "No contract", "Live in 5 minutes"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
                {t}
              </span>
            ))}
            <Link href="/pricing" className="text-accent/90 underline-offset-4 transition hover:text-accent hover:underline">
              See pricing →
            </Link>
          </div>
        </Reveal>
      </section>

      <CTASection />
    </>
  );
}
