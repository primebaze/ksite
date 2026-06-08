import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { STEPS } from "@/lib/marketing";

export const metadata: Metadata = { title: "How it works · Kovasite" };

export default function HowItWorksPage() {
  return (
    <>
      <PageHero kicker="How it works" title="You run your business. We run your website.">
        No dashboards to learn and no DIY builder. We set everything up and keep it running, every month.
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/10 bg-black p-8">
                <span className="bg-gradient-to-br from-white/40 to-white/10 bg-clip-text font-mono text-3xl font-bold text-transparent">
                  {s.n}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
