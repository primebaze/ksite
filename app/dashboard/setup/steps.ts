import type { Preset } from "@/lib/types";

export interface StepField {
  name: string;
  label: string;
  help?: string;
  placeholder?: string;
  multiline?: boolean;
  type?: "text" | "color" | "select";
  options?: { value: string; label: string }[];
  source: "tenant" | "theme" | "content";
}

export interface Step {
  key: string;
  title: string;
  intro: string;
  kind: "fields" | "menu" | "review";
  fields?: StepField[];
}

// The guided build flow — one friendly screen at a time, plain language.
export const STEPS: Step[] = [
  {
    key: "look",
    title: "Your look",
    intro: "Start with your name and colours. Nothing here is permanent — you can change it any time.",
    kind: "fields",
    fields: [
      { name: "business_name", label: "Business name", help: "What your business is called.", source: "tenant" },
      { name: "primary_color", label: "Main colour", help: "Your main brand colour, used for big areas and headers.", type: "color", source: "theme" },
      { name: "accent_color", label: "Highlight colour", help: "Used for buttons and small accents.", type: "color", source: "theme" },
      { name: "font", label: "Font style", type: "select", source: "theme", options: [
        { value: "sans-serif", label: "Modern (clean, rounded)" },
        { value: "serif", label: "Classic (traditional)" },
      ] },
    ],
  },
  {
    key: "story",
    title: "Tell visitors about you",
    intro: "A friendly intro that appears near the top of your site.",
    kind: "fields",
    fields: [
      { name: "tagline", label: "Tagline", help: "One short line that sums you up.", placeholder: "e.g. Fresh cuts, friendly faces", source: "content" },
      { name: "about", label: "About you", help: "A short paragraph about your business — who you are and what makes you great.", placeholder: "We're a family-run…", multiline: true, source: "content" },
    ],
  },
  {
    key: "contact",
    title: "How can people reach you?",
    intro: "These appear in your contact section and footer.",
    kind: "fields",
    fields: [
      { name: "phone", label: "Phone number", placeholder: "0123 456 7890", source: "content" },
      { name: "email", label: "Email address", placeholder: "hello@yourbusiness.com", source: "content" },
      { name: "address", label: "Address", help: "Where you're based.", placeholder: "12 High Street, Leeds", source: "content" },
    ],
  },
  {
    key: "menu",
    title: "What you offer",
    intro: "Add a few items. You can always add more or edit them later.",
    kind: "menu",
  },
  {
    key: "action",
    title: "What should visitors do?",
    intro: "Most sites have one main button. Tell us what it should say and where it sends people.",
    kind: "fields",
    fields: [
      { name: "cta_label", label: "Main button text", help: "The big button visitors tap. For example: “Book a table”, “Get a quote”, or “Book online”.", placeholder: "Book now", source: "content" },
      { name: "cta_url", label: "Where the button goes", help: "Paste the link it should open — your booking page, or a phone/email link.", placeholder: "https://…", source: "content" },
      { name: "booking_url", label: "Booking or ordering link (optional)", help: "If you take bookings or orders online, paste that link too.", placeholder: "https://…", source: "content" },
    ],
  },
  {
    key: "review",
    title: "Review your site",
    intro: "Here's how it looks. Happy with it? Publish to go live.",
    kind: "review",
  },
];

export const FIRST_STEP = STEPS[0].key;
export function stepIndex(key: string) {
  return STEPS.findIndex((s) => s.key === key);
}
export function menuLabel(preset: Preset) {
  return preset === "restaurant" ? "menu" : preset === "trades" ? "services" : "treatments";
}
