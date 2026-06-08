import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/motion/Reveal";
import { FEATURES } from "@/lib/marketing";

export const metadata: Metadata = { title: "Features · Kovasite" };

export default function FeaturesPage() {
  return (
    <>
      <PageHero kicker="Features" title="Everything you need to be found, booked and remembered.">
        Your site takes bookings, captures leads and shows up on Google, and we look after the whole thing for you.
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.05} className="bg-black">
              <div className="h-full p-7 transition hover:bg-white/[0.02]">
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
