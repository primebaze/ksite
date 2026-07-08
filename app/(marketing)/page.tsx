import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { BusinessesRotator } from "@/components/motion/BusinessesRotator";
import { HeroShowcase } from "@/components/HeroShowcase";
import { ScrollZoom } from "@/components/ScrollZoom";
import { LazyLiveExamples } from "@/components/LazyLiveExamples";
import { LazyFeatureBento } from "@/components/LazyFeatureBento";
import { ROTATING_WORDS } from "@/lib/marketing";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";

const HOME_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    logo: `${SITE_URL}/icon`,
    sameAs: [] as string[],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Done-for-you website for local businesses",
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    areaServed: "GB",
    description: SITE_DESCRIPTION,
    offers: {
      "@type": "Offer",
      price: "99",
      priceCurrency: "GBP",
      url: `${SITE_URL}/pricing`,
    },
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={HOME_JSONLD} />
      {/* Hero */}
      <section className="relative border-b border-ink/5">
        <div className="mx-auto max-w-3xl px-6 pt-24 pb-10 text-center sm:pt-28 sm:pb-20">
          <Reveal>
            <h1 className="font-semibold leading-[1.05] tracking-tight">
              <span className="block text-5xl sm:text-7xl">Website</span>
              <span className="mt-1 block text-[clamp(1.25rem,6.2vw,3.5rem)] leading-tight sm:mt-0">
                <BusinessesRotator words={ROTATING_WORDS} />
              </span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ink/55">
              Create your own business website in under 5 minutes. Pick a design and go live on your own free
              custom domain — hosting, booking, reviews and SEO all included, and built to convert.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/get-started" className="rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90">
                Get your site
              </Link>
              <Link href="/samples" className="rounded-lg border border-ink/15 px-6 py-3 text-sm font-medium text-ink/80 transition hover:bg-ink/5">
                Browse samples
              </Link>
            </div>
            <p className="mt-5 text-sm text-ink/35">From £49.99/mo · No setup fee · No contract · Live in 5 minutes</p>
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
              <p className="text-xs font-medium uppercase tracking-widest text-accent/80">What you get</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Everything a local business needs to win online.
              </h2>
            </div>
            <Link href="/features" className="text-sm text-accent/90 transition hover:text-accent">
              All features →
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <LazyFeatureBento />
        </Reveal>
      </section>

      {/* Live examples: cards part on scroll to reveal the pricing panel */}
      <LazyLiveExamples />

      {/* Final CTA — the section above drapes its rounded edge over this one */}
      <section className="relative -mt-12 bg-panel sm:-mt-16">
        <div className="relative mx-auto max-w-3xl px-6 pt-20 pb-24 text-center sm:pt-24 sm:pb-32">
          <Reveal>
            <h2 className="text-5xl font-semibold tracking-tight text-ink sm:text-7xl">Stand out online.</h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-ink/55">
              Your site, live on your own domain in minutes. Booking, SEO and reviews handled for you.
            </p>
            <Link
              href="/get-started"
              className="mt-9 inline-block rounded-full bg-ink px-8 py-4 text-base font-semibold text-paper transition hover:bg-ink/90"
            >
              Get started
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
