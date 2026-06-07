import type { Metadata } from "next";
import Link from "next/link";
import { BUILDS, sampleGroups } from "@/lib/builds";
import { TemplateThumb } from "@/components/TemplateThumb";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Templates — Kovasite",
  description: "Browse beautiful website templates for over 150 types of local business.",
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function SamplesIndex() {
  const groups = sampleGroups(10);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Hero */}
      <header className="mx-auto max-w-3xl px-6 pt-20 pb-12 text-center sm:pt-28">
        <Link href="/" className="text-sm text-neutral-400 transition hover:text-neutral-900">← Kovasite</Link>
        <h1 className="mt-8 text-4xl font-medium leading-[1.05] tracking-tight text-neutral-900 sm:text-6xl" style={{ fontFamily: "var(--font-fraunces)" }}>
          Start with a template you love
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-neutral-500">
          {BUILDS.length}+ designs, tailored to your trade. Every one is a real, live site — choose the closest match and make it your own.
        </p>
        <Link href="/get-started" className="mt-9 inline-flex rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-700">
          Get started
        </Link>
      </header>

      {/* Sticky category bar */}
      <div className="sticky top-0 z-40 border-y border-neutral-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3 text-sm [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groups.map((g) => (
            <a key={g.group} href={`#${slug(g.group)}`} className="shrink-0 rounded-full px-4 py-1.5 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-900">
              {g.group}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16">
        {groups.map((g) => (
          <section key={g.group} id={slug(g.group)} className="mb-24 scroll-mt-16">
            <h2 className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">{g.group}</h2>
            <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
              {g.builds.map((b) => {
                const build = BUILDS.find((x) => x.key === b.key)!;
                return (
                  <Link key={b.key} href={`/samples/${b.key}`} className="group block">
                    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.22)]">
                      {/* Browser chrome */}
                      <div className="flex items-center gap-2 border-b border-neutral-100 px-4 py-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
                        <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
                        <span className="h-2.5 w-2.5 rounded-full bg-neutral-200" />
                        <span className="ml-2 truncate rounded-md bg-neutral-100 px-3 py-1 text-xs text-neutral-400">
                          {b.key}.kovasite.com
                        </span>
                      </div>
                      <TemplateThumb src={`/samples/${b.key}?embed=1`} />
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                      <h3 className="text-lg font-medium tracking-tight">{b.label}</h3>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-400 transition group-hover:text-neutral-700">
                        {build.style}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {/* Footer CTA */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="text-3xl font-medium tracking-tight" style={{ fontFamily: "var(--font-fraunces)" }}>Can&apos;t decide? Start anywhere.</h2>
          <p className="mt-4 text-neutral-500">You can switch design and edit everything later. Nothing is permanent.</p>
          <Link href="/get-started" className="mt-8 inline-flex rounded-full bg-neutral-900 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-700">
            Build my site →
          </Link>
        </div>
      </section>
    </main>
  );
}
