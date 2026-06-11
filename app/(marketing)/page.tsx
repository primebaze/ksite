import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { BusinessesRotator } from "@/components/motion/BusinessesRotator";
import { HeroShowcase } from "@/components/HeroShowcase";
import { ScrollZoom } from "@/components/ScrollZoom";
import { LiveExamples } from "@/components/LiveExamples";
import { FeatureBento } from "@/components/FeatureBento";
import { ROTATING_WORDS } from "@/lib/marketing";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 pt-24 pb-10 text-center sm:pt-28 sm:pb-20">
          <Reveal>
            <h1 className="font-semibold leading-[1.05] tracking-tight">
              <span className="block text-5xl sm:text-7xl">Website</span>
              <span className="mt-1 block text-[1.6rem] leading-tight sm:mt-0 sm:text-7xl">
                <BusinessesRotator words={ROTATING_WORDS} />
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/55">
              Tell us what you want, and you go live on your own custom domain: design, hosting, booking, reviews
              and SEO all set up for you. Most sites are online in under a day, and they&apos;re built to convert.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/get-started" className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
                Get your site
              </Link>
              <Link href="/samples" className="rounded-lg border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5">
                Browse samples
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/35">From £99/mo · No setup fee · No contract · Online in under a day</p>
          </Reveal>
        </div>
      </section>

      {/* Reel zooms to fill the screen, then a scroll-driven story plays over it */}
      <ScrollZoom>
        <HeroShowcase />
      </ScrollZoom>

      {/* What you get */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-emerald-400/80">What you get</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Everything a local business needs to win online.
              </h2>
            </div>
            <Link href="/features" className="text-sm text-emerald-400/90 transition hover:text-emerald-300">
              All features →
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <FeatureBento />
        </Reveal>
      </section>

      {/* Live examples: cards part on scroll to reveal the pricing panel */}
      <LiveExamples />

      {/* Final CTA — the section above drapes its rounded edge over this one */}
      <section className="relative -mt-12 bg-[#0a0a0a] sm:-mt-16">
        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-24 text-center sm:pt-24 sm:pb-32">
          <Reveal>
            <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">Stand out online.</h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-white/55">
              Your site, live on your own domain in a day. Booking, SEO and reviews handled for you.
            </p>
            <Link
              href="/get-started"
              className="mt-9 inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-white/90"
            >
              Get started
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
