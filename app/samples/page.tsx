import type { Metadata } from "next";
import Link from "next/link";
import { BUILDS, sampleGroups } from "@/lib/builds";
import { SamplesBrowser, type BrowserGroup, type BrowserItem } from "@/components/SamplesBrowser";
import Nav from "../(marketing)/Nav";
import Footer from "../(marketing)/Footer";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Samples · Kovasite",
  description: "Browse sample websites for over 150 types of local business.",
};

const byKey = new Map(BUILDS.map((b) => [b.key, b]));
const styleOf = (key: string) => byKey.get(key)?.style ?? "classic";

// Bespoke, hand-built designs (real-world-inspired, fully functional) shown
// as the recommended "Popular designs" tab — the first thing visitors see.
// Each previews a full custom design under a fitting build for a real hero photo.
const POPULAR_DESIGNS: BrowserItem[] = [
  { key: "steakhouse", design: "ember", name: "Ember", label: "Ember · steakhouse", style: "luxe" },
  { key: "sushi", design: "drift", name: "Drift", label: "Drift · sushi & sticks", style: "minimal" },
  { key: "fine_dining", design: "laurel", name: "Laurel", label: "Laurel · modern European", style: "editorial" },
  { key: "bar", design: "lantern", name: "Lantern", label: "Lantern · modern Asian", style: "bold" },
  { key: "bbq", design: "marble", name: "Marble", label: "Marble · grill & lounge", style: "luxe" },
  { key: "brunch_cafe", design: "daybreak", name: "Daybreak", label: "Daybreak · all-day dining", style: "warm" },
];

export default function SamplesIndex() {
  const groups: BrowserGroup[] = sampleGroups(10).map((g) => ({
    group: g.group,
    builds: g.builds.map((b) => ({ ...b, style: styleOf(b.key) })),
  }));

  const popular: BrowserGroup = {
    group: "Popular designs",
    builds: POPULAR_DESIGNS,
  };

  const all = [popular, ...groups];

  return (
    <div className="min-h-screen bg-black font-sans text-white antialiased">
      <Nav />

      <header className="mx-auto max-w-6xl px-6 pt-14 pb-2">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-fraunces)" }}>
          Sample sites
        </h1>
        <p className="mt-3 max-w-xl text-white/55">
          {BUILDS.length}+ designs, organised by trade. Pick a category, open a live sample, then make it your own.
        </p>
        <Link href="/get-started" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
          Get started
        </Link>
      </header>

      <SamplesBrowser groups={all} />

      <Footer />
    </div>
  );
}
