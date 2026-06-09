import type { ComponentType } from "react";
import type { TenantSite } from "@/lib/types";
import { archetypeFor, type Archetype } from "@/lib/verticals";
import RestaurantSite from "./restaurant/RestaurantSite";
import TradesSite from "./trades/TradesSite";
import SalonSite from "./salon/SalonSite";
import BeautySite from "./beauty/BeautySite";

// Each vertical maps to a template archetype; the archetype picks the component.
const BY_ARCHETYPE: Record<Archetype, ComponentType<{ site: TenantSite }>> = {
  menu: RestaurantSite,
  services: TradesSite,
  bookings: SalonSite,
};

// Bespoke per-type templates that override the generic archetype layout — these
// types are image/portfolio-led and deserve their own design.
const BY_KEY: Record<string, ComponentType<{ site: TenantSite }>> = {
  makeup_artist: BeautySite,
  lash_brow: BeautySite,
  nail_salon: BeautySite,
  beauty_salon: BeautySite,
  aesthetics_clinic: BeautySite,
  cosmetic_clinic: BeautySite,
  tanning: BeautySite,
  waxing: BeautySite,
};

export function getPresetComponent(preset: string) {
  return BY_KEY[preset] ?? BY_ARCHETYPE[archetypeFor(preset)] ?? SalonSite;
}
