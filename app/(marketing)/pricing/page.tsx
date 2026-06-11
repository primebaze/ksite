import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PricingPlan } from "@/components/PricingPlan";
import { Reveal } from "@/components/motion/Reveal";
import { FAQS } from "@/lib/marketing";

export const metadata: Metadata = {
  title: "Pricing",
  description: "One simple plan at £99/month — or pay yearly and save two months. Design, hosting, a free custom domain, booking and SEO all included. No setup fee, cancel anytime.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Pricing | Kovasite", description: "One simple plan, everything included. £99/month, cancel anytime.", url: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero kicker="Pricing" title="One simple plan. Everything included.">
        Site, hosting, a free custom domain, SSL and booking are all included. No setup fee, no contract — pay
        monthly, or get 2 months free when you pay yearly.
      </PageHero>

      {/* Single plan, billed monthly or yearly */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <PricingPlan />
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 pb-24">
        <Reveal>
          <h2 className="text-center text-3xl font-semibold tracking-tight">Questions</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-ink/10 rounded-2xl border border-ink/10">
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <div className="p-6">
                <h3 className="font-medium">{f.q}</h3>
                <p className="mt-2 text-sm text-ink/50">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
