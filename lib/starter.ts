import { archetypeFor } from "./verticals";
import { buildFor, type BuildArchetype } from "./builds";
import type { SiteContent } from "./types";

// Starter content so a brand-new site looks like a complete, professional page
// from the first second. The client edits/replaces it rather than building
// from a blank canvas. When the business type has a curated "build", we use its
// tailored copy, sample catalog, recommended design style and brand palette.

export interface StarterItem {
  section?: string | null;
  category?: string | null;
  name: string;
  description?: string | null;
  price?: string | null;
}
export interface Starter {
  content: SiteContent;
  items: StarterItem[];
  theme: { primary_color: string; accent_color: string; font: string };
}

function defaultHours(archetype: BuildArchetype): SiteContent["hours"] {
  if (archetype === "menu") {
    return [
      { day: "Mon to Fri", open: "12:00 to 22:00" },
      { day: "Saturday", open: "12:00 to 23:00" },
      { day: "Sunday", open: "12:00 to 21:00" },
    ];
  }
  if (archetype === "bookings") {
    return [
      { day: "Tue to Fri", open: "09:00 to 19:00" },
      { day: "Saturday", open: "09:00 to 17:00" },
      { day: "Sun and Mon", open: "Closed" },
    ];
  }
  // services (trades, professional, etc.) — never leave hours empty, or owners
  // fill the gap with a vague single line. Clean, structured day ranges.
  return [
    { day: "Mon to Fri", open: "08:00 to 18:00" },
    { day: "Saturday", open: "09:00 to 13:00" },
    { day: "Sunday", open: "Closed" },
  ];
}

export function starterContent(preset: string): Starter {
  const build = buildFor(preset);

  if (build) {
    const content: SiteContent = {
      style: build.style,
      tagline: build.tagline,
      about: build.about,
      cta_label: build.ctaLabel,
      hours: defaultHours(build.archetype),
    };
    if (build.archetype === "services") {
      content.service_areas = ["Your town", "& surrounding areas"];
      content.accreditations = ["Fully insured", "5-star rated"];
    }
    return {
      content,
      items: build.items.map((it) => ({
        section: it.section ?? null,
        category: it.category ?? null,
        name: it.name,
        description: it.description ?? null,
        price: it.price ?? null,
      })),
      theme: {
        primary_color: build.palette.primary,
        accent_color: build.palette.accent,
        font: build.font,
      },
    };
  }

  // Fallback for custom / "other" types with no curated build.
  const archetype = archetypeFor(preset);
  const theme = { primary_color: "#111111", accent_color: "#10b981", font: "sans-serif" };

  if (archetype === "menu") {
    return {
      theme,
      content: {
        style: "classic",
        tagline: "Honest food, made fresh every day.",
        about: "A warm neighbourhood spot serving seasonal dishes and proper coffee. Pop in, or book a table. We'd love to have you.",
        hours: defaultHours("menu"),
        cta_label: "Book a table",
      },
      items: [
        { section: "Menu", category: "Starters", name: "Soup of the day", description: "Served with warm sourdough", price: "£6" },
        { section: "Menu", category: "Mains", name: "House burger", description: "Aged beef, smoked cheese, skin-on fries", price: "£14" },
        { section: "Menu", category: "Mains", name: "Seasonal risotto", description: "Ask your server for today's", price: "£13" },
        { section: "Menu", category: "Dessert", name: "Chocolate brownie", description: "With vanilla ice cream", price: "£6.50" },
      ],
    };
  }

  if (archetype === "bookings") {
    return {
      theme,
      content: {
        style: "warm",
        tagline: "Look great. Feel great.",
        about: "A friendly, modern studio with a team that genuinely loves what they do. Book online in seconds and let us take care of the rest.",
        hours: defaultHours("bookings"),
        cta_label: "Book now",
      },
      items: [
        { section: "Services", name: "Consultation", description: "Free, no obligation chat", price: "Free" },
        { section: "Services", name: "Signature treatment", description: "Our most-loved service", price: "from £45" },
        { section: "Services", name: "Premium package", description: "The full experience", price: "from £90" },
      ],
    };
  }

  return {
    theme,
    content: {
      style: "classic",
      tagline: "Reliable local experts, fast, fair and friendly.",
      about: "Family-run and fully insured. No call-out fee, upfront pricing, and we always leave things tidy. Get in touch for a free quote.",
      service_areas: ["Your town", "& surrounding areas"],
      accreditations: ["Fully insured", "5-star rated"],
      cta_label: "Get a quote",
    },
    items: [
      { section: "Services", name: "Repairs", description: "Fast, reliable fixes for all the common problems", price: "from £75" },
      { section: "Services", name: "Installations", description: "Supply and fit, done properly", price: "Free quote" },
      { section: "Services", name: "Servicing & maintenance", description: "Keep everything running smoothly", price: "from £90" },
    ],
  };
}
