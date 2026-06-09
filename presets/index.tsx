import type { ComponentType } from "react";
import type { TenantSite } from "@/lib/types";
import { archetypeFor, type Archetype } from "@/lib/verticals";
import RestaurantSite from "./restaurant/RestaurantSite";
import TradesSite from "./trades/TradesSite";
import SalonSite from "./salon/SalonSite";
import BeautySite from "./beauty/BeautySite";
import FitnessSite from "./fitness/FitnessSite";

// Each vertical maps to a template archetype; the archetype picks the component.
const BY_ARCHETYPE: Record<Archetype, ComponentType<{ site: TenantSite }>> = {
  menu: RestaurantSite,
  services: TradesSite,
  bookings: SalonSite,
};

// Bespoke per-type templates that override the generic archetype layout — these
// types are image/portfolio-led or class-led and deserve their own design.
const BEAUTY = ["makeup_artist", "lash_brow", "nail_salon", "beauty_salon", "aesthetics_clinic", "cosmetic_clinic", "tanning", "waxing", "photographer", "videographer"];
const FITNESS = ["gym", "yoga_studio", "pilates", "barre", "boxing_gym", "climbing_gym", "crossfit", "martial_arts", "personal_trainer", "spin_studio", "dance_studio", "dance_school"];

const BY_KEY: Record<string, ComponentType<{ site: TenantSite }>> = {
  ...Object.fromEntries(BEAUTY.map((k) => [k, BeautySite])),
  ...Object.fromEntries(FITNESS.map((k) => [k, FitnessSite])),
};

export function getPresetComponent(preset: string) {
  return BY_KEY[preset] ?? BY_ARCHETYPE[archetypeFor(preset)] ?? SalonSite;
}
