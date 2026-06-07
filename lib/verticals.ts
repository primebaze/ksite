// The business types Kovasite supports, and how each maps to a template
// archetype + a tailored onboarding flow. This is the single source of truth
// for "what kind of site is this and what should we ask the owner".

export type Archetype = "bookings" | "menu" | "services";

export interface Vertical {
  key: string; // stored in tenants.preset
  label: string;
  group: string; // for grouping in the picker
  archetype: Archetype;
  catalogLabel: string; // "Services" | "Menu" | "Treatments"
}

export const VERTICALS: Vertical[] = [
  { key: "salon", label: "Hair salon", group: "Hair & beauty", archetype: "bookings", catalogLabel: "Services" },
  { key: "stylist", label: "Stylist / barber", group: "Hair & beauty", archetype: "bookings", catalogLabel: "Services" },
  { key: "beauty", label: "Beauty (nails, lashes, skin)", group: "Hair & beauty", archetype: "bookings", catalogLabel: "Treatments" },
  { key: "clinic", label: "Clinic / aesthetics", group: "Health & care", archetype: "bookings", catalogLabel: "Treatments" },
  { key: "restaurant", label: "Restaurant / café", group: "Food", archetype: "menu", catalogLabel: "Menu" },
  { key: "plumber", label: "Plumber", group: "Trades & services", archetype: "services", catalogLabel: "Services" },
  { key: "electrician", label: "Electrician", group: "Trades & services", archetype: "services", catalogLabel: "Services" },
  { key: "moving", label: "Moving company", group: "Trades & services", archetype: "services", catalogLabel: "Services" },
];

export function verticalFor(key: string): Vertical | undefined {
  return VERTICALS.find((v) => v.key === key);
}
export function archetypeFor(key: string): Archetype {
  return verticalFor(key)?.archetype ?? "services";
}
export function catalogLabelFor(key: string): string {
  return verticalFor(key)?.catalogLabel ?? "Services";
}
export function isVertical(key: string): boolean {
  return VERTICALS.some((v) => v.key === key);
}

// ---- Onboarding steps, tailored per archetype -------------------------------
export interface StepField {
  name: string;
  label: string;
  help?: string;
  placeholder?: string;
  multiline?: boolean;
  list?: boolean; // comma-separated -> string[]
  type?: "text" | "color" | "select";
  options?: { value: string; label: string }[];
  source: "tenant" | "theme" | "content";
}
export interface Step {
  key: string;
  title: string;
  intro: string;
  kind: "fields" | "menu" | "review" | "photos";
  fields?: StepField[];
}

export const FIRST_STEP = "look";

const LOOK: Step = {
  key: "look",
  title: "Your look",
  intro: "Start with your name and colours. Nothing's permanent — change it any time.",
  kind: "fields",
  fields: [
    { name: "business_name", label: "Business name", help: "What your business is called.", source: "tenant" },
    { name: "primary_color", label: "Main colour", help: "Your main brand colour.", type: "color", source: "theme" },
    { name: "accent_color", label: "Highlight colour", help: "Used for buttons and accents.", type: "color", source: "theme" },
    { name: "font", label: "Font style", type: "select", source: "theme", options: [
      { value: "sans-serif", label: "Modern (clean)" },
      { value: "serif", label: "Classic (elegant)" },
    ] },
  ],
};

const STORY: Step = {
  key: "story",
  title: "Tell visitors about you",
  intro: "A friendly intro near the top of your site.",
  kind: "fields",
  fields: [
    { name: "tagline", label: "Tagline", help: "One short line that sums you up.", placeholder: "e.g. Fresh cuts, friendly faces", source: "content" },
    { name: "about", label: "About you", help: "A short paragraph — who you are and what makes you great.", multiline: true, source: "content" },
  ],
};

const CONTACT: Step = {
  key: "contact",
  title: "How can people reach you?",
  intro: "Shown in your contact section and footer.",
  kind: "fields",
  fields: [
    { name: "phone", label: "Phone number", placeholder: "0123 456 7890", source: "content" },
    { name: "email", label: "Email address", placeholder: "hello@yourbusiness.com", source: "content" },
    { name: "address", label: "Address", help: "Where you're based.", placeholder: "12 High Street, Leeds", source: "content" },
  ],
};

const PHOTOS: Step = {
  key: "photos",
  title: "Your photos",
  intro: "A great hero image makes your site feel premium. Add one now — you can add gallery photos too.",
  kind: "photos",
};

const REVIEW: Step = { key: "review", title: "Review your site", intro: "Here's how it looks. Happy with it? Publish to go live.", kind: "review" };

function menuStep(catalogLabel: string): Step {
  return {
    key: "menu",
    title: `Your ${catalogLabel.toLowerCase()}`,
    intro: `Add a few items. You can add more or edit them any time.`,
    kind: "menu",
  };
}

// Archetype-specific "what should visitors do" step.
const BOOKINGS_ACTION: Step = {
  key: "action",
  title: "How do people book?",
  intro: "Add your booking link and the main button visitors tap.",
  kind: "fields",
  fields: [
    { name: "booking_url", label: "Online booking link", help: "Paste your Fresha, Treatwell, Calendly (or similar) link. Leave blank if you don't have one yet.", placeholder: "https://…", source: "content" },
    { name: "cta_label", label: "Main button text", help: "The big button visitors tap, e.g. “Book now”.", placeholder: "Book now", source: "content" },
    { name: "cta_url", label: "Where the button goes", help: "Usually your booking link, or a phone/email link.", placeholder: "https://…", source: "content" },
  ],
};

const MENU_ACTION: Step = {
  key: "action",
  title: "Reservations & ordering",
  intro: "How guests book a table or order from you.",
  kind: "fields",
  fields: [
    { name: "reservation_url", label: "Reservations link", help: "Your OpenTable / ResDiary / booking link.", placeholder: "https://…", source: "content" },
    { name: "cta_label", label: "Main button text", placeholder: "Book a table", source: "content" },
    { name: "cta_url", label: "Where the button goes", placeholder: "https://…", source: "content" },
  ],
};

const SERVICES_ACTION: Step = {
  key: "action",
  title: "Where you work & getting quotes",
  intro: "Help local customers find and trust you.",
  kind: "fields",
  fields: [
    { name: "service_areas", label: "Areas you cover", help: "Separate with commas, e.g. Leeds, Wakefield, Bradford.", list: true, source: "content" },
    { name: "accreditations", label: "Accreditations", help: "e.g. Gas Safe, NICEIC, Which? Trusted Trader — separate with commas.", list: true, source: "content" },
    { name: "cta_label", label: "Main button text", placeholder: "Get a quote", source: "content" },
    { name: "cta_url", label: "Where the button goes", help: "A phone link, email, or contact form link.", placeholder: "tel:01234567890", source: "content" },
  ],
};

export function stepsFor(archetype: Archetype, catalogLabel = "Services"): Step[] {
  const action = archetype === "menu" ? MENU_ACTION : archetype === "bookings" ? BOOKINGS_ACTION : SERVICES_ACTION;
  return [LOOK, STORY, PHOTOS, CONTACT, menuStep(catalogLabel), action, REVIEW];
}

export function stepIndexIn(steps: Step[], key: string): number {
  return steps.findIndex((s) => s.key === key);
}
