import type { TenantSite } from "./types";

// Built-in demo tenants, mirroring supabase/seed.sql. Used automatically when
// Supabase env vars are absent, so `npm run dev` shows all three presets
// before any database is connected. Once SUPABASE_* env is set, the real DB
// takes over (see lib/tenant.ts).

export const MOCK_SITES: Record<string, TenantSite> = {
  nonna: {
    tenant: {
      id: "11111111-1111-1111-1111-111111111111",
      business_name: "Nonna's Kitchen",
      preset: "restaurant",
      subdomain: "nonna",
      custom_domain: null,
      domain_status: "active",
      published: true,
      plan: "standard",
      plan_status: "active",
      meta_title: "Nonna's Kitchen · Italian Restaurant",
      meta_description: "Family-run Italian kitchen. Book a table or order direct.",
      og_image_url: null,
      favicon_url: null,
      analytics_id: null,
    },
    theme: { logo_url: null, primary_color: "#7a2e2e", accent_color: "#e3b04b", font: "serif" },
    content: {
      tagline: "Honest Italian cooking, the way Nonna made it",
      cuisine_type: "Italian",
      about:
        "Three generations of family recipes, fresh pasta made daily, and a wine list that punches above its postcode.",
      address: "14 Mercer Street, Manchester M1 2QP",
      phone: "0161 555 0142",
      hours: [
        { day: "Tue–Thu", open: "12:00–22:00" },
        { day: "Fri–Sat", open: "12:00–23:30" },
        { day: "Sun", open: "12:00–21:00" },
        { day: "Mon", open: "Closed" },
      ],
      reservation_url: "https://www.opentable.co.uk",
      ordering_links: [
        { label: "Order direct (no fees)", url: "#", commission_free: true },
        { label: "Deliveroo", url: "#" },
        { label: "Just Eat", url: "#" },
      ],
      socials: [{ label: "Instagram", url: "#" }],
    },
    catalog: [
      { id: "r1", section: "Dinner", category: "Starters", name: "Burrata & Heritage Tomato", description: "Puglian burrata, basil oil, sourdough", price: "£9.50", tags: ["vegetarian"], is_available: true, sort_order: 1 },
      { id: "r2", section: "Dinner", category: "Starters", name: "Calamari Fritti", description: "Lightly fried squid, lemon aioli", price: "£8.00", tags: [], is_available: true, sort_order: 2 },
      { id: "r3", section: "Dinner", category: "Pasta", name: "Tagliatelle al Ragù", description: "Slow-cooked beef & pork ragù, fresh tagliatelle", price: "£15.00", tags: [], is_available: true, sort_order: 3 },
      { id: "r4", section: "Dinner", category: "Pasta", name: "Cacio e Pepe", description: "Pecorino, black pepper, spaghetti", price: "£13.00", tags: ["vegetarian"], is_available: true, sort_order: 4 },
      { id: "r5", section: "Dinner", category: "Mains", name: "Branzino", description: "Whole sea bass, salsa verde, roast lemon", price: "£21.00", tags: ["gluten-free"], is_available: true, sort_order: 5 },
      { id: "r6", section: "Dinner", category: "Dessert", name: "Tiramisù", description: "The classic, made to order", price: "£7.50", tags: ["vegetarian"], is_available: true, sort_order: 6 },
    ],
    gallery: [
      { id: "rg1", image_url: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=900", caption: "Fresh pasta", sort_order: 1 },
      { id: "rg2", image_url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900", caption: "The dining room", sort_order: 2 },
    ],
    team: [],
  },

  swift: {
    tenant: {
      id: "22222222-2222-2222-2222-222222222222",
      business_name: "Swift Plumbing & Heating",
      preset: "trades",
      subdomain: "swift",
      custom_domain: null,
      domain_status: "active",
      published: true,
      plan: "basic",
      plan_status: "active",
      meta_title: "Swift Plumbing & Heating · Leeds",
      meta_description: "Gas Safe registered plumbers. Fast callouts, free quotes.",
      og_image_url: null,
      favicon_url: null,
      analytics_id: null,
    },
    theme: { logo_url: null, primary_color: "#0f3d6b", accent_color: "#f2a900", font: "sans-serif" },
    content: {
      tagline: "Leeds' trusted plumbers, fast, fair, Gas Safe",
      about: "Family-run since 2009. No call-out fee, upfront pricing, and we tidy up after ourselves.",
      phone: "0113 555 0198",
      emergency_phone: "0113 555 0199",
      address: "Leeds & surrounding areas",
      service_areas: ["Leeds", "Wakefield", "Bradford", "Harrogate", "Pudsey"],
      accreditations: ["Gas Safe Registered", "CIPHE Member", "Which? Trusted Trader"],
      hours: [
        { day: "Mon–Fri", open: "07:00–18:00" },
        { day: "Sat", open: "08:00–14:00" },
        { day: "24/7", open: "Emergency callouts" },
      ],
      cta_label: "Get a free quote",
      cta_url: "#contact",
    },
    catalog: [
      { id: "t1", section: "Services", category: null, name: "Boiler Repair & Servicing", description: "Annual servicing and same-day repairs on all major brands", price: "from £90", tags: [], is_available: true, sort_order: 1 },
      { id: "t2", section: "Services", category: null, name: "Boiler Installation", description: "Supply & fit with up to 10-year warranty", price: "Free quote", tags: [], is_available: true, sort_order: 2 },
      { id: "t3", section: "Services", category: null, name: "Leaks & Burst Pipes", description: "Rapid response, leak detection, repairs", price: "from £75", tags: [], is_available: true, sort_order: 3 },
      { id: "t4", section: "Services", category: null, name: "Bathroom Installation", description: "Full bathroom design and fit", price: "Free quote", tags: [], is_available: true, sort_order: 4 },
      { id: "t5", section: "Services", category: null, name: "Power Flushing", description: "Restore heating efficiency across your system", price: "from £350", tags: [], is_available: true, sort_order: 5 },
    ],
    gallery: [
      { id: "tg1", image_url: "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=900", caption: "New boiler install", sort_order: 1 },
      { id: "tg2", image_url: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=900", caption: "Bathroom fit", sort_order: 2 },
    ],
    team: [],
  },

  lumiere: {
    tenant: {
      id: "33333333-3333-3333-3333-333333333333",
      business_name: "Lumière Hair & Beauty",
      preset: "salon",
      subdomain: "lumiere",
      custom_domain: null,
      domain_status: "active",
      published: true,
      plan: "premium",
      plan_status: "active",
      meta_title: "Lumière Hair & Beauty · Bristol",
      meta_description: "Award-winning salon. Book online in seconds.",
      og_image_url: null,
      favicon_url: null,
      analytics_id: null,
    },
    theme: { logo_url: null, primary_color: "#2d2a32", accent_color: "#c98b9e", font: "serif" },
    content: {
      tagline: "Where Bristol comes to glow",
      about: "A calm, modern salon with a team obsessed by great hair and happy clients.",
      address: "8 Park Street, Bristol BS1 5HX",
      phone: "0117 555 0123",
      hours: [
        { day: "Tue–Fri", open: "09:00–19:00" },
        { day: "Sat", open: "09:00–17:00" },
        { day: "Sun–Mon", open: "Closed" },
      ],
      booking_url: "https://www.fresha.com",
      socials: [{ label: "Instagram", url: "#" }, { label: "TikTok", url: "#" }],
      cta_label: "Book online",
      cta_url: "https://www.fresha.com",
    },
    catalog: [
      { id: "s1", section: "Hair", category: "Cut & Finish", name: "Cut & Blow Dry", description: "Consultation, cut and style", price: "from £45", tags: [], is_available: true, sort_order: 1 },
      { id: "s2", section: "Hair", category: "Colour", name: "Full Head Highlights", description: "Foils, toner and finish", price: "from £120", tags: [], is_available: true, sort_order: 2 },
      { id: "s3", section: "Hair", category: "Colour", name: "Balayage", description: "Hand-painted, lived-in colour", price: "from £140", tags: [], is_available: true, sort_order: 3 },
      { id: "s4", section: "Beauty", category: "Brows & Lashes", name: "Lash Lift & Tint", description: "Lifted, tinted lashes lasting weeks", price: "£45", tags: [], is_available: true, sort_order: 4 },
      { id: "s5", section: "Beauty", category: "Skin", name: "Express Facial", description: "30-minute glow-boosting facial", price: "£40", tags: [], is_available: true, sort_order: 5 },
    ],
    gallery: [
      { id: "sg1", image_url: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=900", caption: "The salon", sort_order: 1 },
      { id: "sg2", image_url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=900", caption: "Balayage result", sort_order: 2 },
    ],
    team: [
      { id: "sm1", name: "Sofia Reyes", role: "Founder & Senior Stylist", credentials: "L'Oréal Colour Specialist", photo_url: null, sort_order: 1 },
      { id: "sm2", name: "Aisha Khan", role: "Colour Director", credentials: "Balayage Expert", photo_url: null, sort_order: 2 },
      { id: "sm3", name: "Mia Thompson", role: "Beauty Therapist", credentials: "CIDESCO Diploma", photo_url: null, sort_order: 3 },
    ],
  },
};

export function mockSiteByHost(subdomain: string): TenantSite | null {
  return MOCK_SITES[subdomain] ?? null;
}
