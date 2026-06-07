import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { RotatingWord } from "@/components/motion/RotatingWord";
import { TemplateThumb } from "@/components/TemplateThumb";
import { EXAMPLES, FEATURES, ROTATING_WORDS, SITE_BASE } from "@/lib/marketing";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="mx-auto max-w-3xl px-6 pt-24 text-center sm:pt-28">
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

        {/* Product shot — a real, live sample site */}
        <Reveal delay={0.26}>
          <div className="mx-auto mt-16 max-w-5xl px-6 pb-24">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-[0_40px_120px_-25px_rgba(0,0,0,0.85)]">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-2 flex items-center gap-1.5 rounded-md bg-white/[0.06] px-3 py-1 text-xs text-white/40">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M6 10V8a6 6 0 1112 0v2m-9 0h6a3 3 0 013 3v5a3 3 0 01-3 3H9a3 3 0 01-3-3v-5a3 3 0 013-3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  your custom domain
                </span>
              </div>
              <TemplateThumb src="/samples/spa?embed=1" aspect={0.56} />
            </div>
          </div>
        </Reveal>
      </section>

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

      {/* Examples */}
      <section className="border-t border-white/5 bg-white/[0.015]">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-widest text-emerald-400/80">Live examples</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Real sites, one engine.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {EXAMPLES.map((e, i) => (
              <Reveal key={e.sub} delay={i * 0.06}>
                <a
                  href={`http://${e.sub}.${SITE_BASE}`}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25 hover:bg-white/[0.04]"
                >
                  <div className="flex aspect-[16/10] items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent text-2xl font-semibold text-white/70">
                    {e.name.charAt(0)}
                  </div>
                  <p className="mt-4 text-xs uppercase tracking-widest text-white/30">{e.label}</p>
                  <p className="mt-1 font-medium">{e.name}</p>
                  <p className="mt-3 text-sm text-emerald-400/90 transition group-hover:text-emerald-300">View live →</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
