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

// Hand-picked "Popular designs" tab — the first thing visitors see. Two from
// every category (interleaved so the top of the list shows real variety, not a
// wall of restaurants), each previewing that type's own bespoke design under a
// build with a distinct, on-theme hero photo (no repeated images).
// TODO: once analytics are wired, order this by most-viewed instead.
const POPULAR_DESIGNS: BrowserItem[] = [
  // round 1 — one per category
  { key: "steakhouse", design: "ember", label: "Steakhouse", sublabel: "Food & drink", style: "luxe" },
  { key: "hair_salon", design: "indigo", label: "Hair studio", sublabel: "Hair & beauty", style: "editorial" },
  { key: "dentist", design: "enamel", label: "Dental practice", sublabel: "Health & wellness", style: "minimal" },
  { key: "climbing_gym", design: "crag", label: "Climbing gym", sublabel: "Fitness", style: "bold" },
  { key: "plumber", design: "pipeworks", label: "Plumber", sublabel: "Trades & home", style: "bold" },
  { key: "garage", design: "apex", label: "Car garage", sublabel: "Automotive", style: "bold" },
  { key: "solicitor", design: "chambers", label: "Law firm", sublabel: "Professional services", style: "classic" },
  { key: "florist", design: "bloom", label: "Florist", sublabel: "Retail & shops", style: "warm" },
  { key: "vet", design: "hearth", label: "Vet practice", sublabel: "Pets", style: "warm" },
  { key: "photographer", design: "aperture", label: "Photographer", sublabel: "Events & creative", style: "editorial" },
  { key: "nursery", design: "sprout", label: "Nursery", sublabel: "Education", style: "warm" },
  // round 2 — a second per category
  { key: "pizzeria", design: "forno", label: "Pizzeria", sublabel: "Food & drink", style: "warm" },
  { key: "barber", design: "fade", label: "Barbershop", sublabel: "Hair & beauty", style: "bold" },
  { key: "spa", design: "thermae", label: "Day spa", sublabel: "Health & wellness", style: "luxe" },
  { key: "pilates", design: "haven", label: "Pilates studio", sublabel: "Fitness", style: "minimal" },
  { key: "electrician", design: "livewire", label: "Electrician", sublabel: "Trades & home", style: "bold" },
  { key: "car_detailing", design: "concours", label: "Car detailing", sublabel: "Automotive", style: "luxe" },
  { key: "marketing_agency", design: "amplify", label: "Marketing agency", sublabel: "Professional services", style: "bold" },
  { key: "jeweller", design: "facet", label: "Jeweller", sublabel: "Retail & shops", style: "luxe" },
  { key: "dog_groomer", design: "romp", label: "Dog grooming", sublabel: "Pets", style: "warm" },
  { key: "wedding_planner", design: "verena", label: "Wedding planner", sublabel: "Events & creative", style: "editorial" },
  { key: "driving_school", design: "ignition", label: "Driving school", sublabel: "Education", style: "bold" },
];

// Driving school has five bespoke designs, so it gets its own category (rather
// than a single card buried inside Education).
const DRIVING_DESIGNS: BrowserItem[] = [
  { key: "driving_school", design: "ignition", label: "Ignition", sublabel: "Bright & friendly", style: "bold" },
  { key: "driving_school", design: "clutch", label: "Clutch", sublabel: "Modern & clean", style: "minimal" },
  { key: "driving_school", design: "roadcraft", label: "Roadcraft", sublabel: "Bold & results-led", style: "bold" },
  { key: "driving_school", design: "milestone", label: "Milestone", sublabel: "Warm & reassuring", style: "warm" },
  { key: "driving_school", design: "junction", label: "Junction", sublabel: "Premium intensive", style: "luxe" },
];

export default function SamplesIndex() {
  const rawGroups: BrowserGroup[] = sampleGroups(10).map((g) => ({
    group: g.group,
    builds: g.builds.map((b) => ({ ...b, style: styleOf(b.key) })),
  }));

  // Driving school is its own category; remove its single build from Education
  // so it isn't shown in both places.
  const groups = rawGroups.map((g) =>
    g.group === "Education" ? { ...g, builds: g.builds.filter((b) => b.key !== "driving_school") } : g,
  );

  const popular: BrowserGroup = {
    group: "Popular designs",
    builds: POPULAR_DESIGNS,
  };
  const driving: BrowserGroup = { group: "Driving school", builds: DRIVING_DESIGNS };

  // Slot the Driving school category right after Education in the sidebar.
  const eduIdx = groups.findIndex((g) => g.group === "Education");
  const ordered = eduIdx >= 0 ? [...groups.slice(0, eduIdx + 1), driving, ...groups.slice(eduIdx + 1)] : [...groups, driving];

  const all = [popular, ...ordered];

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <Nav />

      <header className="mx-auto max-w-6xl px-6 pt-14 pb-2">
        <h1 className="text-3xl font-medium tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-fraunces)" }}>
          Sample sites
        </h1>
        <p className="mt-3 max-w-xl text-ink/55">
          {BUILDS.length}+ designs, organised by trade. Pick a category, open a live sample, then make it your own.
        </p>
        <Link href="/get-started" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90">
          Get started
        </Link>
      </header>

      <SamplesBrowser groups={all} />

      <Footer />
    </div>
  );
}
