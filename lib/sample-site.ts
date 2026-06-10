import { buildFor, galleryFor, heroFor, videoFor } from "./builds";
import { starterContent } from "./starter";
import type { TenantSite } from "./types";

// Sample stylists / practitioners for bookings-archetype demos (salons, barbers,
// clinics, studios) so team sections are populated. Generic portraits + roles.
const SAMPLE_TEAM = [
  { name: "Sofia Bennett", role: "Senior Stylist", credentials: null, photo_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=70&auto=format&fit=crop" },
  { name: "Amara Okafor", role: "Colour Specialist", credentials: null, photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=70&auto=format&fit=crop" },
  { name: "James Carter", role: "Stylist", credentials: null, photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=70&auto=format&fit=crop" },
  { name: "Daniel Reed", role: "Practitioner", credentials: null, photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=70&auto=format&fit=crop" },
];

// Which bespoke full-page design is the default for a given build key. Lets the
// samples (and sub-page navigation, which carries no ?design query) render the
// right design automatically. ?design= still overrides this for previews.
// EVERY Food & drink build key is mapped to one of the 6 designs (by closest
// aesthetic) so the whole sector uses the new designs, not the old template.
export const BUILD_DESIGN: Record<string, string> = {
  // ember — dark, luxe, premium steakhouse
  steakhouse: "ember",
  // marble — charcoal & gold grill / lounge
  bbq: "marble",
  // drift — light, photo-led, fresh (Japanese / Nordic)
  sushi: "drift",
  poke: "drift",
  juice_bar: "drift",
  vegan: "drift",
  deli: "drift",
  // laurel — elegant modern-European fine dining
  fine_dining: "laurel",
  restaurant: "cinder",
  bistro: "laurel",
  italian: "laurel",
  tapas: "laurel",
  wine_bar: "laurel",
  patisserie: "laurel",
  // lantern — dark, moody, bold (Asian / bar / pub)
  bar: "lantern",
  pub: "lantern",
  gastropub: "lantern",
  thai: "lantern",
  indian: "lantern",
  mexican: "lantern",
  // daybreak — bright, energetic, all-day / casual
  brunch_cafe: "daybreak",
  coffee_shop: "daybreak",
  tearoom: "daybreak",
  bakery: "daybreak",
  ice_cream: "daybreak",
  burger_joint: "daybreak",
  food_truck: "daybreak",
  pizzeria: "daybreak",
  // 5 newer screenshot-faithful designs
  japanese: "tide",
  brasserie: "botanica",
  chinese: "lacquer",
  cocktail_bar: "cinder",
  cafe: "meadow",
  // Hair & beauty — EVERY key mapped, each to a DIFFERENT design (12 keys, 12
  // salon designs) so the gallery tab never repeats a layout.
  hair_salon: "indigo",
  beauty_salon: "halo",
  nail_salon: "verve",
  bridal_hair: "atelier",
  barber: "fade",
  makeup_artist: "lumiere",
  tattoo: "aurelia",
  tanning: "seren",
  waxing: "lustre",
  lash_brow: "linea",
  piercing: "radiance",
  mens_grooming: "lumina",
  // Health & wellness — EVERY key mapped (by closest aesthetic)
  aesthetics_clinic: "aurelia",
  skin_clinic: "seren",
  cosmetic_clinic: "lustre",
  dermatology: "linea",
  wellness_clinic: "radiance",
  hair_removal: "lumina",
  day_spa: "lustre",
  spa: "radiance",
  massage: "lustre",
  acupuncture: "seren",
  osteopath: "seren",
  podiatry: "seren",
  chiropractor: "linea",
  physio: "linea",
  optician: "linea",
  hearing_clinic: "linea",
  dental: "lumina",
  dentist: "lumina",
  orthodontist: "lumina",
  iv_therapy: "aurelia",
  // Fitness
  barre: "cadence",
  bootcamp: "box",
  boxing_gym: "ironclad",
  climbing_gym: "forge",
  crossfit: "box",
  dance_studio: "cadence",
  gym: "forge",
  martial_arts: "ironclad",
  personal_trainer: "apex",
  pilates: "haven",
  spin_studio: "tempo",
  swim_school: "ironclad",
  yoga_studio: "flow",
  // Contractors & home
  hvac: "forge",
  bathroom_fitter: "mason",
  builder: "marigold",
  carpenter: "meridian",
  cleaner: "drafthouse",
  driveways: "summit",
  electrician: "forge",
  fencing: "atelier",
  flooring: "bloom",
  gardener: "juniper",
  handyman: "ledger",
  heating_engineer: "apex",
  kitchen_fitter: "forge",
  landscaper: "mason",
  locksmith: "marigold",
  painter_decorator: "meridian",
  pest_control: "drafthouse",
  plasterer: "summit",
  plumber: "velocity",
  removals: "atelier",
  roofer: "bloom",
  scaffolding: "juniper",
  tiler: "ledger",
  tree_surgeon: "apex",
  window_cleaner: "forge",
  // Automotive
  bodyshop: "apex",
  car_dealer: "velocity",
  car_detailing: "forge",
  car_wash: "meridian",
  garage: "apex",
  mot_centre: "mason",
  tyre_shop: "drafthouse",
  // Professional services
  accountant: "ledger",
  architect: "summit",
  bookkeeper: "drafthouse",
  business_consultant: "meridian",
  financial_advisor: "juniper",
  insurance_broker: "atelier",
  it_support: "forge",
  marketing_agency: "bloom",
  mortgage_broker: "ledger",
  recruitment: "summit",
  solicitor: "drafthouse",
  surveyor: "meridian",
  web_design: "juniper",
  // Retail & shops
  bookshop: "atelier",
  boutique: "atelier",
  butcher: "juniper",
  florist: "meridian",
  gift_shop: "drafthouse",
  greengrocer: "mason",
  homeware: "forge",
  jeweller: "summit",
  off_licence: "atelier",
  vape_shop: "bloom",
  // Pets
  cattery_kennels: "hollow",
  dog_groomer: "romp",
  dog_trainer: "romp",
  dog_walker: "romp",
  pet_shop: "fetch",
  vet: "hearth",
  // Events & creative
  dj: "pulse",
  event_caterer: "verena",
  event_venue: "pavilion",
  party_hire: "pulse",
  photographer: "aperture",
  videographer: "aperture",
  wedding_planner: "verena",
  // Education
  dance_school: "conservatoire",
  driving_school: "ignition",
  language_school: "summit",
  music_teacher: "conservatoire",
  nursery: "sprout",
  private_tutor: "summit",
};

// All bespoke designs available per sector, for pickers (e.g. the get-started
// design step): any design in the group works for any build key in that group
// because they share the archetype's data model.
export const GROUP_DESIGNS: Record<string, string[]> = {
  "Food & drink": ["ember", "drift", "laurel", "lantern", "marble", "daybreak", "tide", "botanica", "lacquer", "cinder", "meadow"],
  "Hair & beauty": ["indigo", "halo", "verve", "atelier", "fade", "lumiere", "aurelia", "seren", "lustre", "linea", "radiance", "lumina"],
  "Health & wellness": ["aurelia", "seren", "lustre", "linea", "radiance", "lumina", "indigo", "halo", "verve", "atelier", "fade", "lumiere"],
  Fitness: ["forge", "box", "ironclad", "apex", "tempo", "flow", "haven", "cadence", "pulse"],
  "Contractors & home": ["forge", "mason", "marigold", "meridian", "drafthouse", "summit", "velocity", "atelier", "bloom", "juniper", "ledger", "apex"],
  Automotive: ["apex", "velocity", "forge", "meridian", "summit", "mason", "drafthouse"],
  "Professional services": ["ledger", "summit", "drafthouse", "meridian", "juniper", "atelier", "forge", "bloom"],
  "Retail & shops": ["atelier", "bloom", "juniper", "meridian", "drafthouse", "mason", "forge", "summit"],
  Pets: ["hearth", "romp", "hollow", "fetch"],
  "Events & creative": ["aperture", "verena", "pulse", "pavilion"],
  Education: ["sprout", "summit", "ignition", "conservatoire"],
};

// Turn a build into a fully-populated TenantSite for the public samples gallery,
// so anyone can preview what a given business type's site looks like.
export function sampleSiteFor(key: string): TenantSite | null {
  const build = buildFor(key);
  if (!build) return null;
  const starter = starterContent(key);

  return {
    tenant: {
      id: `sample-${key}`,
      business_name: build.label,
      preset: key,
      subdomain: key,
      custom_domain: null,
      domain_status: "active",
      published: true,
      plan: "premium",
      plan_status: "active",
      meta_title: null,
      meta_description: null,
      og_image_url: null,
      favicon_url: null,
      analytics_id: null,
    },
    theme: {
      logo_url: null,
      primary_color: starter.theme.primary_color,
      accent_color: starter.theme.accent_color,
      font: starter.theme.font,
    },
    content: {
      ...starter.content,
      ...(BUILD_DESIGN[key] ? { design: BUILD_DESIGN[key] } : {}),
      hero_image_url: heroFor(key),
      ...(videoFor(key) ? { hero_video_url: videoFor(key) } : {}),
      phone: "020 7946 0123",
      email: "hello@example.com",
      address: "48 Northgate Street\nLondon EC1A 4EN",
      map_url: "https://maps.google.com/?q=48+Northgate+Street+London",
      // Sample sites are shown as if the owner already filled everything in.
      socials: [
        { label: "Instagram", url: "https://instagram.com" },
        { label: "Facebook", url: "https://facebook.com" },
        { label: "TikTok", url: "https://tiktok.com" },
      ],
      ...(build.archetype === "menu"
        ? {
            ordering_links: [
              { label: "Order on Deliveroo", url: "https://deliveroo.co.uk" },
              { label: "Order on Uber Eats", url: "https://ubereats.com" },
            ],
          }
        : {}),
    },
    catalog: starter.items.map((it, i) => ({
      id: `${key}-item-${i}`,
      section: it.section ?? null,
      category: it.category ?? null,
      name: it.name,
      description: it.description ?? null,
      price: it.price ?? null,
      tags: [],
      is_available: true,
      sort_order: i + 1,
    })),
    gallery: galleryFor(key).map((url, i) => ({
      id: `${key}-img-${i}`,
      image_url: url,
      caption: null,
      sort_order: i + 1,
    })),
    team:
      build.archetype === "bookings"
        ? SAMPLE_TEAM.map((m, i) => ({ ...m, id: `${key}-team-${i}`, sort_order: i + 1 }))
        : [],
  };
}
