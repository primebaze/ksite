import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { EXAMPLES, SITE_BASE } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Examples",
  description: "See real Kovasite websites built for restaurants, salons, gyms, barbers and trades — the standard of design every customer gets.",
  alternates: { canonical: "/examples" },
  openGraph: { title: "Examples | Kovasite", description: "Real websites built for local businesses on Kovasite.", url: "/examples" },
};

export default function ExamplesPage() {
  return (
    <>
      <PageHero kicker="Examples" title="One engine. Every kind of business.">
        Each of these runs on the same platform, restyled and rewritten for a different trade. They&apos;re live. Open them.
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMPLES.map((e, i) => (
            <Reveal key={e.sub} delay={i * 0.07}>
              <a
                href={`http://${e.sub}.${SITE_BASE}`}
                target="_blank"
                rel="noreferrer"
                className="group block h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25 hover:bg-white/[0.04]"
              >
                <div className="flex aspect-[16/10] items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent text-3xl font-semibold text-white/70">
                  {e.name.charAt(0)}
                </div>
                <p className="mt-4 text-xs uppercase tracking-widest text-white/30">{e.label}</p>
                <p className="mt-1 font-medium">{e.name}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{e.blurb}</p>
                <p className="mt-4 text-sm text-emerald-400/90 transition group-hover:text-emerald-300">View live →</p>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
