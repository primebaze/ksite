import type { Metadata } from "next";
import Link from "next/link";
import { BUILDS, buildGroups } from "@/lib/builds";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Sample sites — Kovasite",
  description: "Browse live sample websites for over 150 types of local business.",
};

export default function SamplesIndex() {
  const groups = buildGroups();

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <Link href="/" className="text-sm text-white/50 transition hover:text-white">← Kovasite</Link>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">Sample sites</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/60">
            {BUILDS.length} ready-made designs, tailored to your trade. Pick the closest match — your site starts here, then you make it yours.
          </p>
          <Link href="/get-started" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
            Build mine →
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-16">
        {groups.map((g) => (
          <section key={g.group} className="mb-16">
            <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/40">{g.group}</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {g.builds.map((b) => {
                const build = BUILDS.find((x) => x.key === b.key)!;
                return (
                  <Link
                    key={b.key}
                    href={`/samples/${b.key}`}
                    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition hover:border-white/25 hover:bg-white/[0.05]"
                  >
                    <div
                      className="flex h-24 items-end p-4"
                      style={{ background: `linear-gradient(135deg, ${build.palette.primary}, ${build.palette.accent})` }}
                    >
                      <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/90 backdrop-blur">
                        {build.style}
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-white">{b.label}</p>
                      <p className="mt-0.5 text-xs text-white/45 transition group-hover:text-white/70">View sample →</p>
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
