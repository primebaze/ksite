import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { RotatingWord } from "@/components/motion/RotatingWord";
import { HeroShowcase } from "@/components/HeroShowcase";
import { ScrollZoom } from "@/components/ScrollZoom";
import { LiveExamples } from "@/components/LiveExamples";
import { FeatureIcon } from "@/components/FeatureIcon";
import { FEATURES, ROTATING_WORDS } from "@/lib/marketing";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 pt-24 pb-20 text-center sm:pt-28">
          <Reveal>
            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
              Websites for
              <br />
              <RotatingWord words={ROTATING_WORDS} />
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
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.04}>
              <div className="group relative h-full rounded-2xl bg-gradient-to-b from-white/[0.09] to-white/[0.02] p-px transition duration-300 hover:from-white/25">
                <div className="relative h-full overflow-hidden rounded-2xl bg-neutral-950/90 p-7">
                  {/* hover glow */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-emerald-400/0 blur-2xl transition duration-500 group-hover:bg-emerald-400/[0.12]" />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-b from-white/[0.12] to-white/[0.03] text-white ring-1 ring-inset ring-white/10 transition duration-300 group-hover:text-emerald-300">
                    <FeatureIcon id={f.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="relative mt-5 text-[15px] font-semibold tracking-tight text-white">{f.title}</h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-white/50">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Live examples: cards part on scroll to reveal the pricing panel */}
      <LiveExamples />

      {/* Final CTA */}
      <section className="border-t border-white/5">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to get online?</h2>
            <p className="mt-4 text-white/55">Tell us about your business and we&apos;ll get you live on your own custom domain, usually in under a day.</p>
            <Link href="/get-started" className="mt-8 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
              Get your site
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
