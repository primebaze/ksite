import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPresetComponent } from "@/presets";
import { sampleSiteFor } from "@/lib/sample-site";
import { BUILDS, buildFor } from "@/lib/builds";

export const dynamic = "force-static";

export function generateStaticParams() {
  return BUILDS.map((b) => ({ key: b.key }));
}

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }): Promise<Metadata> {
  const { key } = await params;
  const build = buildFor(key);
  return { title: build ? `${build.label} — sample site` : "Sample" };
}

export default async function SamplePage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const site = sampleSiteFor(key);
  if (!site) notFound();
  const Preset = getPresetComponent(site.tenant.preset);

  return (
    <div className="relative">
      {/* Floating bar back to the gallery / get started — sits above the sample. */}
      <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/80 px-2 py-2 text-sm text-white shadow-2xl backdrop-blur">
        <Link href="/samples" className="rounded-full px-4 py-1.5 font-medium text-white/80 transition hover:bg-white/10 hover:text-white">← All samples</Link>
        <Link href="/get-started" className="rounded-full bg-white px-4 py-1.5 font-semibold text-black transition hover:bg-white/90">Build mine</Link>
      </div>
      <Preset site={site} />
    </div>
  );
}
