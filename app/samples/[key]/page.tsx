import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPresetComponent } from "@/presets";
import { sampleSiteFor } from "@/lib/sample-site";
import { BUILDS, buildFor } from "@/lib/builds";
import type { SiteContent } from "@/lib/types";

export function generateStaticParams() {
  return BUILDS.map((b) => ({ key: b.key }));
}

const STYLES = new Set(["editorial", "bold", "minimal", "warm", "luxe", "classic"]);

export async function generateMetadata({ params }: { params: Promise<{ key: string }> }): Promise<Metadata> {
  const { key } = await params;
  const build = buildFor(key);
  return { title: build ? `${build.label} — sample site` : "Sample" };
}

export default async function SamplePage({
  params,
  searchParams,
}: {
  params: Promise<{ key: string }>;
  searchParams: Promise<{ style?: string; embed?: string; img?: string; video?: string; name?: string }>;
}) {
  const { key } = await params;
  const { style, embed, img, video, name } = await searchParams;
  const site = sampleSiteFor(key);
  if (!site) notFound();

  // Optional brand-name override (used by the homepage showcase for real-feeling demos).
  if (name && name.length <= 40) {
    site.tenant = { ...site.tenant, business_name: name.replace(/[<>]/g, "") };
  }

  // Optional style override so the same build can be previewed in any look.
  if (style && STYLES.has(style)) {
    site.content = { ...site.content, style: style as SiteContent["style"] };
  }
  // Optional media overrides (used by the homepage showcase).
  if (img && /^[\w-]+$/.test(img)) {
    site.content = { ...site.content, hero_image_url: `https://images.unsplash.com/photo-${img}?w=1600&q=70&auto=format&fit=crop` };
  }
  if (video && /^\/hero\/[\w.-]+\.mp4$/.test(video)) {
    site.content = { ...site.content, hero_video_url: video };
  }
  const Preset = getPresetComponent(site.tenant.preset);

  return (
    <div className="relative">
      {!embed && (
        <div className="fixed bottom-5 left-1/2 z-[100] flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-black/80 px-2 py-2 text-sm text-white shadow-2xl backdrop-blur">
          <Link href="/samples" className="rounded-full px-4 py-1.5 font-medium text-white/80 transition hover:bg-white/10 hover:text-white">← All samples</Link>
          <Link href="/get-started" className="rounded-full bg-white px-4 py-1.5 font-semibold text-black transition hover:bg-white/90">Build mine</Link>
        </div>
      )}
      <Preset site={site} />
    </div>
  );
}
