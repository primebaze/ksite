import { archetypeFor } from "./verticals";
import type { SiteContent } from "./types";

// Starter content so a brand-new site looks like a complete, professional page
// from the first second — the client edits/replaces it rather than building
// from a blank canvas.

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
}

export function starterContent(preset: string): Starter {
  const archetype = archetypeFor(preset);

  if (archetype === "menu") {
    return {
      content: {
        tagline: "Honest food, made fresh every day.",
        about:
          "A warm neighbourhood spot serving seasonal dishes and proper coffee. Pop in, or book a table — we'd love to have you.",
        hours: [
          { day: "Mon–Fri", open: "08:00 – 22:00" },
          { day: "Sat", open: "09:00 – 23:00" },
          { day: "Sun", open: "09:00 – 21:00" },
        ],
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
      content: {
        tagline: "Look great. Feel great.",
        about:
          "A friendly, modern studio with a team that genuinely loves what they do. Book online in seconds and let us take care of the rest.",
        hours: [
          { day: "Tue–Fri", open: "09:00 – 19:00" },
          { day: "Sat", open: "09:00 – 17:00" },
          { day: "Sun–Mon", open: "Closed" },
        ],
        cta_label: "Book now",
      },
      items: [
        { section: "Services", name: "Consultation", description: "Free, no obligation chat", price: "Free" },
        { section: "Services", name: "Signature treatment", description: "Our most-loved service", price: "from £45" },
        { section: "Services", name: "Premium package", description: "The full experience", price: "from £90" },
      ],
    };
  }

  // services
  return {
    content: {
      tagline: "Reliable local experts — fast, fair and friendly.",
      about:
        "Family-run and fully insured. No call-out fee, upfront pricing, and we always leave things tidy. Get in touch for a free quote.",
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
