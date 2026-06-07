import type { Metadata } from "next";
import Link from "next/link";
import { BUILDS, sampleGroups } from "@/lib/builds";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Templates — Kovasite",
  description: "Browse live sample websites for over 150 types of local business.",
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function SamplesIndex() {
  const groups = sampleGroups(10);

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Hero */}
      <header className="border-b border-neutral-200">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
          <Link href="/" className="text-sm text-neutral-400 transition hover:text-neutral-900">← Kovasite</Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Find a starting point you love</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-500">
            {BUILDS.length}+ designs, tailored to your trade. Every one is a real, live site — pick the closest match and make it yours.
          </p>
          <Link href="/get-started" className="mt-8 inline-flex rounded-full bg-neutral-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700">
            Build mine →
          </Link>
        </div>
      </header>

      {/* Sticky category bar */}
      <div className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6 py-3 text-sm">
          {groups.map((g) => (
            <a key={g.group} href={`#${slug(g.group)}`} className="shrink-0 rounded-full border border-neutral-200 px-4 py-1.5 text-neutral-600 transition hover:border-neutral-900 hover:text-neutral-900">
              {g.group}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14">
        {groups.map((g) => (
          <section key={g.group} id={slug(g.group)} className="mb-20 scroll-mt-20">
            <h2 className="text-2xl font-semibold tracking-tight">{g.group}</h2>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-10">
              {g.builds.map((b) => {
                const build = BUILDS.find((x) => x.key === b.key)!;
                return (
                  <Link key={b.key} href={`/samples/${b.key}`} className="group w-[300px]">
                    <div className="relative h-[225px] w-[300px] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-xl">
                      <iframe
                        src={`/samples/${b.key}?embed=1`}
                        title={b.label}
                        loading="lazy"
                        tabIndex={-1}
                        scrolling="no"
                        aria-hidden="true"
                        className="pointer-events-none absolute left-0 top-0 origin-top-left"
                        style={{ width: "1000px", height: "1500px", transform: "scale(0.3)" }}
                      />
                      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-neutral-900/85 px-4 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                        View live →
                      </span>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="font-medium">{b.label}</span>
                      <span className="text-[11px] uppercase tracking-wider text-neutral-400">{build.style}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
