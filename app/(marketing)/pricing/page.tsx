import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { FAQS, TIERS } from "@/lib/marketing";

export const metadata: Metadata = { title: "Pricing · Kovasite" };

export default function PricingPage() {
  return (
    <>
      <PageHero kicker="Pricing" title="One monthly price. Everything included.">
        Site, hosting, domain, SSL and booking are all included. No setup fee, no contract.
      </PageHero>

      {/* Tiers */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-3">
          {TIERS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <div
                className={`relative h-full rounded-2xl border p-8 ${
                  t.highlight ? "border-emerald-400/40 bg-gradient-to-b from-emerald-400/[0.08] to-transparent" : "border-white/10 bg-black"
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-black">
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{t.name}</h3>
                <p className="mt-1 text-sm text-white/50">{t.tagline}</p>
                <p className="mt-5">
                  <span className="text-4xl font-bold tracking-tight">{t.price}</span>
                  <span className="text-white/40">/month</span>
                </p>
                <Link
                  href="/get-started"
                  className={`mt-6 block rounded-lg py-2.5 text-center text-sm font-semibold transition ${
                    t.highlight ? "bg-white text-black hover:bg-white/90" : "border border-white/15 text-white hover:bg-white/5"
                  }`}
                >
                  {t.cta}
                </Link>
                <ul className="mt-7 space-y-3 text-sm text-white/65">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-2.5">
                      <span className="mt-0.5 text-emerald-400">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold tracking-tight">Questions</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <div className="p-6">
                <h3 className="font-medium">{f.q}</h3>
                <p className="mt-2 text-sm text-white/50">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
