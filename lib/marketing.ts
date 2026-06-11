// Shared content for the marketing site. Imported by the (marketing) pages.

export const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN ?? "localhost";
export const SITE_BASE = process.env.NODE_ENV === "production" ? APP_DOMAIN : "localhost:3000";

// Types shown after the "Businesses:" label in the hero (capitalised to match,
// kept short so "Businesses: <type>" fits one line on a phone).
export const ROTATING_WORDS = [
  "Restaurants",
  "Cafés",
  "Salons",
  "Gyms",
  "Barbers",
  "Clinics",
  "Shops",
  "Studios",
  "Garages",
];

export const NAV_LINKS = [
  { href: "/features", label: "Features" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/samples", label: "Samples" },
  { href: "/pricing", label: "Pricing" },
  { href: "/support", label: "Support" },
];

// `icon` is an id resolved to an SVG in the marketing pages.
export const FEATURES: { icon: string; title: string; body: string }[] = [
  { icon: "design", title: "Premium design", body: "Not a drag-and-drop template, but a site crafted for your industry that looks like it cost thousands." },
  { icon: "shield", title: "Free domain & SSL included", body: "We register your custom domain free, handle DNS and HTTPS, and keep it renewed. You never touch it." },
  { icon: "calendar", title: "Booking built in", body: "Reservations, appointments and online ordering embedded. Customers book directly, no commission." },
  { icon: "bolt", title: "Fast & mobile-first", body: "Loads instantly on a phone, where your customers are. Built for top Core Web Vitals scores." },
  { icon: "pin", title: "Found on Google", body: "Local SEO, Google Business Profile integration, and your best reviews shown front and centre." },
  { icon: "edit", title: "Edit anything, any time", body: "Tap any text on your live site to change your menu, prices, photos or hours. No code, no waiting." },
];

export const STEPS = [
  { n: "01", title: "Tell us about your business", body: "A short chat or form: your services, hours, photos and the look you want." },
  { n: "02", title: "We build and launch it", body: "Your site goes live on your own custom domain with booking and reviews set up, in about 5 minutes." },
  { n: "03", title: "You get bookings", body: "Customers find you and book. Need a change? Text us and we handle it, every month." },
];

// Format a GBP amount: whole pounds drop the decimals, otherwise show pence.
export const gbp = (n: number) =>
  `£${n.toLocaleString("en-GB", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 })}`;

// One simple plan. Monthly is £99; yearly gives 2 months free (pay for 10).
export const PLAN = {
  monthly: 99,
  /** The headline yearly hook. */
  yearlyHook: "2 months free",
  /** Total billed once a year (12 months for the price of 10). */
  yearlyTotal: 99 * 10, // 990
  /** Effective per-month cost when billed yearly. */
  yearlyPerMonth: +((99 * 10) / 12).toFixed(2), // 82.50
  /** What you save over a year vs paying monthly. */
  yearlySaving: 99 * 12 - 99 * 10, // 198
  /** Equivalent discount, for a percentage badge. */
  yearlyDiscountPct: Math.round((1 - (99 * 10) / (99 * 12)) * 100), // 17
  features: [
    "Bespoke design built for your business",
    "Free custom domain + SSL, registered & renewed",
    "Fast, mobile-first hosting",
    "Booking & online ordering — no commission",
    "Local SEO + Google Business Profile",
    "Google reviews shown & collected",
    "Tap any text to edit — change anything, anytime",
    "Monthly edits, done for you",
  ],
};

export const EXAMPLES = [
  { sub: "nonna", label: "Restaurant", name: "Nonna's Kitchen", blurb: "Menu, reservations and direct ordering for a family Italian kitchen." },
  { sub: "swift", label: "Trades", name: "Swift Plumbing & Heating", blurb: "Services, accreditations and a call-now hero for a Gas Safe plumber." },
  { sub: "lumiere", label: "Salon", name: "Lumière Hair & Beauty", blurb: "Treatment menu, stylist team and online booking for a city salon." },
];

export const FAQS = [
  { q: "Is there a contract?", a: "No. Cancel anytime. We earn your business by making the site genuinely good, not by locking you in." },
  { q: "Do I own my domain?", a: "Yes. We manage it for you, and if you ever leave we hand it over cleanly." },
  { q: "How fast can I go live?", a: "About 5 minutes: add your business details, services, hours and a few photos, and your site is live on your own domain." },
  { q: "What if I want changes?", a: "Text or email us. Edits are included; Standard and Premium get priority turnaround." },
];
