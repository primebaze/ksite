import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
import { archetypeFor, type Archetype } from "@/lib/verticals";

export type { PresetProps };
import RestaurantSite from "./restaurant/RestaurantSite";
import TradesSite from "./trades/TradesSite";
import SalonSite from "./salon/SalonSite";
import BeautySite from "./beauty/BeautySite";
import FitnessSite from "./fitness/FitnessSite";
import PetsSite from "./pets/PetsSite";
import EventsSite from "./events/EventsSite";
import EducationSite from "./education/EducationSite";

// Each vertical maps to a template archetype; the archetype picks the component.
const BY_ARCHETYPE: Record<Archetype, ComponentType<PresetProps>> = {
  menu: RestaurantSite,
  services: TradesSite,
  bookings: SalonSite,
};

// Bespoke per-type templates that override the generic archetype layout — each
// sector here has its own bespoke design set.
const BEAUTY = ["makeup_artist", "lash_brow", "nail_salon", "beauty_salon", "aesthetics_clinic", "cosmetic_clinic", "tanning", "waxing"];
const FITNESS = ["gym", "yoga_studio", "pilates", "barre", "boxing_gym", "climbing_gym", "crossfit", "martial_arts", "personal_trainer", "spin_studio", "dance_studio", "bootcamp", "swim_school"];
const PETS = ["vet", "dog_groomer", "dog_walker", "dog_trainer", "cattery_kennels", "pet_shop"];
const EVENTS = ["photographer", "videographer", "wedding_planner", "event_venue", "event_caterer", "dj", "party_hire"];
const EDUCATION = ["private_tutor", "nursery", "driving_school", "music_teacher", "language_school", "dance_school"];

const BY_KEY: Record<string, ComponentType<PresetProps>> = {
  ...Object.fromEntries(BEAUTY.map((k) => [k, BeautySite])),
  ...Object.fromEntries(FITNESS.map((k) => [k, FitnessSite])),
  ...Object.fromEntries(PETS.map((k) => [k, PetsSite])),
  ...Object.fromEntries(EVENTS.map((k) => [k, EventsSite])),
  ...Object.fromEntries(EDUCATION.map((k) => [k, EducationSite])),
};

export function getPresetComponent(preset: string): ComponentType<PresetProps> {
  return BY_KEY[preset] ?? BY_ARCHETYPE[archetypeFor(preset)] ?? SalonSite;
}
