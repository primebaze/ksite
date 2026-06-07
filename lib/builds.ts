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

// Curated royalty-free hero photos (Unsplash). Each category has a POOL of
// distinct photos; builds cycle through them by position so neighbouring cards
// never repeat. Recognisable types get an exact override.
const HERO_POOL: Record<string, string[]> = {
  "Food & drink": ["1517248135467-4c7edcad34c4", "1414235077428-338989a2e8c0", "1504674900247-0877df9cc836", "1513104890138-7c749659a591", "1514362545857-3bc16c4c7d1b", "1568901346375-23c9450c58cd"],
  "Hair & beauty": ["1560066984-138dadb4c035", "1604654894610-df63bc536371", "1487412947147-5cebf100ffc2", "1522337660859-02fbefca4702", "1596462502278-27bfdc403348"],
  "Health & wellness": ["1540555700478-4be289fbecef", "1544161515-4ab6ce6db874", "1606811841689-23dfddce3e95", "1545205597-3d9d02c29597", "1579684385127-1ef15d508118", "1570172619644-dfd03ed5d881"],
  Fitness: ["1534438327276-14e5300c3a48", "1571019613454-1cb2f99b2d8b", "1588286840104-8957b019727f", "1538805060514-97d9cc17730c", "1517836357463-d25dfeac3438"],
  "Trades & home": ["1504148455328-c376907d081c", "1607472586893-edb57bdc0e39", "1621905251189-08b45d6a269e", "1562259949-e8e7689d7828", "1560518883-ce09059eeffa"],
  Automotive: ["1492144534655-ae79c964c9d7", "1486262715619-67b85e0b08d3", "1605559424843-9e4c228bf1c2", "1487754180451-c456f719a1fc"],
  "Professional services": ["1497366216548-37526070297c", "1497366811353-6870744d04b2", "1556761175-5973dc0f32e7", "1486312338219-ce68d2c6f44d"],
  "Retail & shops": ["1441986300917-64674bd600d8", "1567401893414-76b7b1e5a7a5", "1490750967868-88aa4486c946", "1521587760476-6c12a4b040da"],
  Pets: ["1450778869180-41d0601e046e", "1514888286974-6c03e2ca1dba", "1576201836106-db1758fd1c97", "1583337130417-3346a1be7dee"],
  "Events & creative": ["1519225421980-715cb0215aed", "1492691527719-9d1e07e534b4", "1505236858219-8359eb29e329", "1464366400600-7168b8af9bc3"],
  Education: ["1503676260728-1c00da094a0b", "1481627834876-b7833e8f5570", "1522202176988-66273c2fd55f", "1587654780291-39c9404d746b"],
};
const HERO_BY_KEY: Record<string, string> = {
  // Food & drink
  cafe: "1501339847302-ac426a4a7cbb", coffee_shop: "1501339847302-ac426a4a7cbb", brunch_cafe: "1501339847302-ac426a4a7cbb", tearoom: "1501339847302-ac426a4a7cbb",
  bakery: "1509440159596-0249088772ff", patisserie: "1509440159596-0249088772ff",
  pizzeria: "1513104890138-7c749659a591", burger_joint: "1568901346375-23c9450c58cd",
  bar: "1514362545857-3bc16c4c7d1b", cocktail_bar: "1514362545857-3bc16c4c7d1b", wine_bar: "1514362545857-3bc16c4c7d1b", pub: "1514362545857-3bc16c4c7d1b", gastropub: "1514362545857-3bc16c4c7d1b",
  // Hair & beauty
  barber: "1503951914875-452162b0f3f1", mens_grooming: "1503951914875-452162b0f3f1",
  nail_salon: "1604654894610-df63bc536371", makeup_artist: "1487412947147-5cebf100ffc2", bridal_hair: "1487412947147-5cebf100ffc2", lash_brow: "1596462502278-27bfdc403348",
  // Health & wellness
  spa: "1540555700478-4be289fbecef", day_spa: "1540555700478-4be289fbecef", massage: "1544161515-4ab6ce6db874",
  dental: "1606811841689-23dfddce3e95", dentist: "1606811841689-23dfddce3e95", orthodontist: "1606811841689-23dfddce3e95",
  skin_clinic: "1570172619644-dfd03ed5d881", aesthetics_clinic: "1570172619644-dfd03ed5d881", cosmetic_clinic: "1570172619644-dfd03ed5d881", dermatology: "1570172619644-dfd03ed5d881",
  // Fitness
  yoga_studio: "1588286840104-8957b019727f", pilates: "1588286840104-8957b019727f", barre: "1588286840104-8957b019727f",
  boxing_gym: "1517836357463-d25dfeac3438", martial_arts: "1517836357463-d25dfeac3438",
  // Trades
  plumber: "1607472586893-edb57bdc0e39", electrician: "1621905251189-08b45d6a269e", painter_decorator: "1562259949-e8e7689d7828",
  // Retail
  florist: "1490750967868-88aa4486c946", bookshop: "1521587760476-6c12a4b040da",
  // Pets
  vet: "1576201836106-db1758fd1c97", dog_groomer: "1583337130417-3346a1be7dee",
  // Events
  photographer: "1492691527719-9d1e07e534b4", videographer: "1492691527719-9d1e07e534b4",
  // Education
  nursery: "1587654780291-39c9404d746b",
};

// Each build's position within its group, for cycling the pool.
const groupIndex = new Map<string, number>();
{
  const counters: Record<string, number> = {};
  for (const b of BUILDS) {
    const i = counters[b.group] ?? 0;
    groupIndex.set(b.key, i);
    counters[b.group] = i + 1;
  }
}

export function heroFor(key: string): string | undefined {
  const build = buildFor(key);
  if (!build) return undefined;
  let id = HERO_BY_KEY[key];
  if (!id) {
    const pool = HERO_POOL[build.group];
    if (pool && pool.length) id = pool[(groupIndex.get(key) ?? 0) % pool.length];
  }
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
