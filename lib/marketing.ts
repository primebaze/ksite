// Shared content for the marketing site. Imported by the (marketing) pages.

export const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN ?? "localhost";
export const SITE_BASE = process.env.NODE_ENV === "production" ? APP_DOMAIN : "localhost:3000";

export const ROTATING_WORDS = [
  "restaurants",
  "salons",
  "clinics",
  "contractors",
  "cafés",
  "barbers",
  "gyms",
  "studios",
];

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/samples", label: "Samples" },
  { href: "/pricing", label: "Pricing" },
];

// `icon` is an id resolved to an SVG in the marketing pages.
export const FEATURES: { icon: string; title: string; body: string }[] = [
  { icon: "design", title: "Premium design", body: "Not a drag-and-drop template, but a site crafted for your industry that looks like it cost thousands." },
  { icon: "shield", title: "Domain & SSL included", body: "We register your domain, handle DNS and HTTPS, and keep it renewed. You never touch it." },
  { icon: "calendar", title: "Booking built in", body: "Reservations, appointments and online ordering embedded. Customers book directly, no commission." },
  { icon: "bolt", title: "Fast & mobile-first", body: "Loads instantly on a phone, where your customers are. Built for top Core Web Vitals scores." },
  { icon: "pin", title: "Found on Google", body: "Local SEO, Google Business Profile integration, and your best reviews shown front and centre." },
  { icon: "edit", title: "Edit anything, any time", body: "Change your menu, prices, photos or hours, directly on the live page. No code, no waiting." },
];

export const STEPS = [
  { n: "01", title: "Tell us about your business", body: "A short chat or form: your services, hours, photos and the look you want." },
  { n: "02", title: "We build and launch it", body: "Your site goes live on your own custom domain with booking and reviews set up, usually in under a day." },
  { n: "03", title: "You get bookings", body: "Customers find you and book. Need a change? Text us and we handle it, every month." },
];

export interface Tier {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  highlight: boolean;
}

export const TIERS: Tier[] = [
  {
    name: "Basic", price: "£99", tagline: "Get online and take bookings.",
    features: ["Bespoke-feel site + hosting", "Managed domain + SSL", "Booking embedded + Google reviews", "Direct ordering (skip delivery fees)", "Monthly content edits"],
    cta: "Start with Basic", highlight: false,
  },
  {
    name: "Standard", price: "£199", tagline: "Get found and grow.",
    features: ["Everything in Basic", "Priority 48-hour edits + menu editor", "Local SEO + Google Business Profile", "Review-collection automation", "Email capture for offers", "Events / private-hire page"],
    cta: "Choose Standard", highlight: true,
  },
  {
    name: "Premium", price: "£349", tagline: "Hands-off marketing for growth.",
    features: ["Everything in Standard", "Multiple locations", "Monthly social content + campaigns", "Gift vouchers + email marketing", "Analytics + monthly report", "Annual design refresh"],
    cta: "Go Premium", highlight: false,
  },
];

export const EXAMPLES = [
  { sub: "nonna", label: "Restaurant", name: "Nonna's Kitchen", blurb: "Menu, reservations and direct ordering for a family Italian kitchen." },
  { sub: "swift", label: "Trades", name: "Swift Plumbing & Heating", blurb: "Services, accreditations and a call-now hero for a Gas Safe plumber." },
  { sub: "lumiere", label: "Salon", name: "Lumière Hair & Beauty", blurb: "Treatment menu, stylist team and online booking for a city salon." },
];

export const FAQS = [
  { q: "Is there a contract?", a: "No. Cancel anytime. We earn your business by making the site genuinely good, not by locking you in." },
  { q: "Do I own my domain?", a: "Yes. We manage it for you, and if you ever leave we hand it over cleanly." },
  { q: "How fast can I go live?", a: "Usually within a day of getting your details: your services, hours and a few photos." },
  { q: "What if I want changes?", a: "Text or email us. Edits are included; Standard and Premium get priority turnaround." },
];
