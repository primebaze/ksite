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

// Curated royalty-free hero photos (Unsplash). Each category has a large POOL
// of distinct photos; we assign them uniquely per category so no two cards in
// the gallery ever share an image. Recognisable types get a preferred override.
const HERO_POOL: Record<string, string[]> = {
  "Food & drink": ["1517248135467-4c7edcad34c4", "1414235077428-338989a2e8c0", "1504674900247-0877df9cc836", "1513104890138-7c749659a591", "1514362545857-3bc16c4c7d1b", "1568901346375-23c9450c58cd", "1555126634-323283e090fa", "1424847651672-bf20a4b0982b", "1466978913421-dad2ebd01d17", "1559339352-11d035aa65de", "1559925393-8be0ec4767c8", "1467003909585-2f8a72700288"],
  "Hair & beauty": ["1560066984-138dadb4c035", "1604654894610-df63bc536371", "1487412947147-5cebf100ffc2", "1522337660859-02fbefca4702", "1596462502278-27bfdc403348", "1556228578-8c89e6adf883", "1633681926022-84c23e8cb2d6", "1521590832167-7bcbfaa6381f", "1605497788044-5a32c7078486", "1562322140-8baeececf3df"],
  "Health & wellness": ["1540555700478-4be289fbecef", "1544161515-4ab6ce6db874", "1606811841689-23dfddce3e95", "1545205597-3d9d02c29597", "1579684385127-1ef15d508118", "1570172619644-dfd03ed5d881", "1519494026892-80bbd2d6fd0d", "1512290923902-8a9f81dc236c", "1505751172876-fa1923c5c528", "1551601651-2a8555f1a136", "1571019614242-c5c5dee9f50b"],
  Fitness: ["1534438327276-14e5300c3a48", "1571019613454-1cb2f99b2d8b", "1588286840104-8957b019727f", "1538805060514-97d9cc17730c", "1517836357463-d25dfeac3438", "1534258936925-c58bed479fcb", "1518611012118-696072aa579a", "1599058917212-d750089bc07e", "1574680096145-d05b474e2155", "1583454110551-21f2fa2afe61"],
  "Contractors & home": ["1504148455328-c376907d081c", "1607472586893-edb57bdc0e39", "1621905251189-08b45d6a269e", "1562259949-e8e7689d7828", "1560518883-ce09059eeffa", "1572981779307-38b8cabb2407", "1581094794329-c8112a89af12", "1503328427499-d92d1ac3d174", "1416879595882-3373a0480b5b", "1556909114-f6e7ad7d3136"],
  Automotive: ["1492144534655-ae79c964c9d7", "1486262715619-67b85e0b08d3", "1605559424843-9e4c228bf1c2", "1487754180451-c456f719a1fc", "1503376780353-7e6692767b70", "1493238792000-8113da705763", "1568605117036-5fe5e7bab0b7", "1552519507-da3b142c6e3d", "1525609004556-c46c7d6cf023"],
  "Professional services": ["1497366216548-37526070297c", "1497366811353-6870744d04b2", "1556761175-5973dc0f32e7", "1486312338219-ce68d2c6f44d", "1521737711867-e3b97375f902", "1454165804606-c3d57bc86b40", "1517245386807-bb43f82c33c4", "1600880292203-757bb62b4baf", "1542744173-8e7e53415bb0", "1531973576160-7125cd663d86", "1573164713988-8665fc963095"],
  "Retail & shops": ["1441986300917-64674bd600d8", "1567401893414-76b7b1e5a7a5", "1490750967868-88aa4486c946", "1521587760476-6c12a4b040da", "1472851294608-062f824d29cc", "1604719312566-8912e9227c6a", "1556740738-b6a63e27c4df", "1534452203293-494d7ddbf7e0", "1555529669-e69e7aa0ba9a", "1481437156560-3205f6a55735", "1528698827591-e19ccd7bc23d"],
  Pets: ["1450778869180-41d0601e046e", "1514888286974-6c03e2ca1dba", "1576201836106-db1758fd1c97", "1583337130417-3346a1be7dee", "1587300003388-59208cc962cb", "1518717758536-85ae29035b6d", "1425082661705-1834bfd09dca", "1601758228041-f3b2795255f1"],
  "Events & creative": ["1519225421980-715cb0215aed", "1492691527719-9d1e07e534b4", "1505236858219-8359eb29e329", "1464366400600-7168b8af9bc3", "1465495976277-4387d4b0b4c6", "1511795409834-ef04bbd61622", "1469371670807-013ccf25f16a", "1530103862676-de8c9debad1d", "1492684223066-81342ee5ff30"],
  Education: ["1503676260728-1c00da094a0b", "1481627834876-b7833e8f5570", "1522202176988-66273c2fd55f", "1587654780291-39c9404d746b", "1509062522246-3755977927d7", "1427504494785-3a9ca7044f45", "1497633762265-9d179a990aa6", "1524178232363-1fb2b075b655", "1546410531-bb4caa6b424d"],
};
const HERO_BY_KEY: Record<string, string> = {
  cafe: "1501339847302-ac426a4a7cbb", coffee_shop: "1501339847302-ac426a4a7cbb", brunch_cafe: "1501339847302-ac426a4a7cbb", tearoom: "1501339847302-ac426a4a7cbb",
  bakery: "1509440159596-0249088772ff", patisserie: "1509440159596-0249088772ff",
  pizzeria: "1513104890138-7c749659a591", burger_joint: "1568901346375-23c9450c58cd",
  bar: "1514362545857-3bc16c4c7d1b", cocktail_bar: "1514362545857-3bc16c4c7d1b", wine_bar: "1514362545857-3bc16c4c7d1b",
  barber: "1503951914875-452162b0f3f1", mens_grooming: "1503951914875-452162b0f3f1",
  nail_salon: "1604654894610-df63bc536371", makeup_artist: "1487412947147-5cebf100ffc2", lash_brow: "1596462502278-27bfdc403348",
  spa: "1540555700478-4be289fbecef", day_spa: "1540555700478-4be289fbecef", massage: "1544161515-4ab6ce6db874",
  dental: "1606811841689-23dfddce3e95", dentist: "1606811841689-23dfddce3e95", orthodontist: "1606811841689-23dfddce3e95",
  skin_clinic: "1570172619644-dfd03ed5d881", dermatology: "1570172619644-dfd03ed5d881",
  yoga_studio: "1588286840104-8957b019727f", pilates: "1588286840104-8957b019727f", barre: "1588286840104-8957b019727f",
  boxing_gym: "1517836357463-d25dfeac3438", martial_arts: "1517836357463-d25dfeac3438",
  plumber: "1607472586893-edb57bdc0e39", electrician: "1621905251189-08b45d6a269e", painter_decorator: "1562259949-e8e7689d7828",
  florist: "1490750967868-88aa4486c946", bookshop: "1521587760476-6c12a4b040da",
  vet: "1576201836106-db1758fd1c97", dog_groomer: "1583337130417-3346a1be7dee",
  photographer: "1492691527719-9d1e07e534b4", videographer: "1492691527719-9d1e07e534b4",
  nursery: "1587654780291-39c9404d746b",
};

// heroFor + the unique-assignment precompute live at the end of this file,
// after sampleGroups/buildGroups are defined.

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
  "Contractors & home",
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

// Assign a UNIQUE photo per build, walking each category in the same
// (style-diverse) order the gallery shows them, so the visible cards never
// repeat an image. Falls back to cycling only once a pool is exhausted.
const HERO = new Map<string, string>();
for (const g of sampleGroups(1000)) {
  const pool = HERO_POOL[g.group] ?? [];
  const used = new Set<string>();
  for (const b of g.builds) {
    let id: string | undefined = HERO_BY_KEY[b.key];
    if (id && used.has(id)) id = undefined;
    if (!id) id = pool.find((p) => !used.has(p));
    if (!id && pool.length) id = pool[used.size % pool.length];
    if (id) {
      used.add(id);
      HERO.set(b.key, id);
    }
  }
}

export function heroFor(key: string): string | undefined {
  const id = HERO.get(key) ?? HERO.get(buildFor(key)?.key ?? "");
  return id ? `https://images.unsplash.com/photo-${id}?w=1600&q=70&auto=format&fit=crop` : undefined;
}

// Category-matching gallery: pulls photos from the build's group image pool,
// skipping the one used as the hero so cards never repeat it. Used to give
// samples a realistic, on-theme set of images.
export function galleryFor(key: string, n = 6): string[] {
  const build = buildFor(key);
  if (!build) return [];
  const pool = HERO_POOL[build.group] ?? [];
  const heroId = HERO.get(key);
  const ids = pool.filter((id) => id !== heroId).slice(0, n);
  return ids.map((id) => `https://images.unsplash.com/photo-${id}?w=1100&q=70&auto=format&fit=crop`);
}

// A looping hero video that matches the trade, where we have one in /public/hero.
const VIDEO_BY_KEY: Record<string, string> = {
  // food & drink
  restaurant: "restaurant", steakhouse: "restaurant", fine_dining: "restaurant",
  bistro: "restaurant", brasserie: "restaurant", gastropub: "restaurant", pub: "restaurant",
  cafe: "cafe", coffee_shop: "cafe", brunch_cafe: "cafe", tearoom: "cafe", bakery: "cafe", patisserie: "cafe",
  // hair & beauty
  hair_salon: "hair", salon: "hair", blow_dry_bar: "hair", hairdresser: "hair",
  barber: "barber", mens_grooming: "barber",
  // fitness
  gym: "gym", fitness_studio: "gym", personal_trainer: "gym", yoga_studio: "gym", pilates_studio: "gym",
  crossfit: "box", boxing_gym: "box", martial_arts: "box",
};

export function videoFor(key: string): string | undefined {
  const file = VIDEO_BY_KEY[key];
  return file ? `/hero/${file}.mp4` : undefined;
}
