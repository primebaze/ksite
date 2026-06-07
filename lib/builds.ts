import rawBuilds from "./builds-data.json";

// A "build" is a ready-made starting point for a business type: tailored copy,
// a sample catalog, a recommended design style and brand palette. The client
// picks their type, the site is born complete, and they edit from there.

export type BuildArchetype = "menu" | "bookings" | "services";
export type BuildStyle = "editorial" | "bold" | "minimal" | "warm" | "luxe" | "classic";

export interface BuildItem {
  section?: string;
  category?: string;
  name: string;
  description?: string;
  price?: string;
}

export interface Build {
  key: string;
  label: string;
  group: string;
  archetype: BuildArchetype;
  catalogLabel: string;
  itemNoun: string;
  sectionLabel: string;
  style: BuildStyle;
  palette: { primary: string; accent: string };
  font: "serif" | "sans-serif";
  tagline: string;
  about: string;
  ctaLabel: string;
  items: BuildItem[];
}

export const BUILDS = rawBuilds as Build[];

const byKey = new Map(BUILDS.map((b) => [b.key, b]));

// Legacy preset keys (from before the builds library) → closest current build,
// so sites created earlier keep rendering with the right archetype.
const LEGACY_ALIASES: Record<string, string> = {
  salon: "hair_salon",
  stylist: "barber",
  beauty: "beauty_salon",
  clinic: "aesthetics_clinic",
  moving: "removals",
};

export function buildFor(key: string): Build | undefined {
  return byKey.get(key) ?? byKey.get(LEGACY_ALIASES[key] ?? "");
}

// Curated royalty-free hero photos (Unsplash) for the sample gallery, so each
// design looks vibrant and on-theme. Per-group defaults + a few per-type overrides.
const HERO_BY_GROUP: Record<string, string> = {
  "Food & drink": "1517248135467-4c7edcad34c4",
  "Hair & beauty": "1560066984-138dadb4c035",
  "Health & wellness": "1576091160550-2173dba999ef",
  Fitness: "1534438327276-14e5300c3a48",
  "Trades & home": "1504148455328-c376907d081c",
  Automotive: "1492144534655-ae79c964c9d7",
  "Professional services": "1497366216548-37526070297c",
  "Retail & shops": "1441986300917-64674bd600d8",
  Pets: "1450778869180-41d0601e046e",
  "Events & creative": "1519225421980-715cb0215aed",
  Education: "1503676260728-1c00da094a0b",
};
const HERO_BY_KEY: Record<string, string> = {
  cafe: "1501339847302-ac426a4a7cbb",
  coffee_shop: "1501339847302-ac426a4a7cbb",
  brunch_cafe: "1501339847302-ac426a4a7cbb",
  tearoom: "1501339847302-ac426a4a7cbb",
  bakery: "1509440159596-0249088772ff",
  patisserie: "1509440159596-0249088772ff",
  barber: "1503951914875-452162b0f3f1",
  mens_grooming: "1503951914875-452162b0f3f1",
  spa: "1540555700478-4be289fbecef",
  day_spa: "1540555700478-4be289fbecef",
  massage: "1540555700478-4be289fbecef",
};

export function heroFor(key: string): string | undefined {
  const build = buildFor(key);
  if (!build) return undefined;
  const id = HERO_BY_KEY[key] ?? HERO_BY_GROUP[build.group];
  return id ? `https://images.unsplash.com/photo-${id}?w=1600&q=70&auto=format&fit=crop` : undefined;
}

export interface BuildGroup {
  group: string;
  builds: { key: string; label: string }[];
}

// Builds grouped for the type picker, preserving a sensible group order.
const GROUP_ORDER = [
  "Food & drink",
  "Hair & beauty",
  "Health & wellness",
  "Fitness",
  "Trades & home",
  "Automotive",
  "Professional services",
  "Retail & shops",
  "Pets",
  "Events & creative",
  "Education",
];

// A curated, style-diverse subset per group for the samples gallery, so the
// visible designs look distinct from one another (round-robin across styles).
export function sampleGroups(perGroup = 10): BuildGroup[] {
  return buildGroups().map((g) => {
    const buckets = new Map<string, { key: string; label: string }[]>();
    for (const b of g.builds) {
      const style = byKey.get(b.key)?.style ?? "classic";
      if (!buckets.has(style)) buckets.set(style, []);
      buckets.get(style)!.push(b);
    }
    const lists = [...buckets.values()];
    const picked: { key: string; label: string }[] = [];
    let i = 0;
    while (picked.length < perGroup && lists.some((l) => l.length)) {
      const list = lists[i % lists.length];
      if (list.length) picked.push(list.shift()!);
      i++;
    }
    return { group: g.group, builds: picked };
  });
}

export function buildGroups(): BuildGroup[] {
  const map = new Map<string, { key: string; label: string }[]>();
  for (const b of BUILDS) {
    if (!map.has(b.group)) map.set(b.group, []);
    map.get(b.group)!.push({ key: b.key, label: b.label });
  }
  const groups = [...map.entries()].map(([group, builds]) => ({ group, builds }));
  groups.sort((a, b) => {
    const ai = GROUP_ORDER.indexOf(a.group);
    const bi = GROUP_ORDER.indexOf(b.group);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  return groups;
}
