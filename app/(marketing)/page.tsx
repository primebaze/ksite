import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { RotatingWord } from "@/components/motion/RotatingWord";
import { HeroShowcase } from "@/components/HeroShowcase";
import { ScrollZoom } from "@/components/ScrollZoom";
import { LiveExamples } from "@/components/LiveExamples";
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
              Tell us what you want, and you go live on your own custom domain — design, hosting, booking, reviews
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

      {/* Rotating video reel that zooms to fill the screen on scroll */}
      <ScrollZoom>
        <HeroShowcase />
      </ScrollZoom>

      {/* What you get */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-400/80">What you get</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            A website that brings in customers.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.slice(0, 3).map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05} className="bg-black">
              <div className="h-full p-7 transition hover:bg-white/[0.02]">
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <Link href="/features" className="mt-6 inline-block text-sm text-emerald-400/90 transition hover:text-emerald-300">
            All features →
          </Link>
        </Reveal>
      </section>

      {/* Live examples — real video-hero sites */}
      <LiveExamples />

      {/* Pricing teaser */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-white/10 bg-black p-10 text-center sm:flex-row sm:text-left">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">One price, everything included.</h2>
              <p className="mt-2 text-white/55">Site, hosting, domain, SSL and booking. From £99/month.</p>
            </div>
            <Link href="/pricing" className="shrink-0 rounded-lg border border-white/15 px-6 py-3 text-sm font-medium transition hover:bg-white/5">
              See pricing →
            </Link>
          </div>
        </Reveal>
      </section>

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
