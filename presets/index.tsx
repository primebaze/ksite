import type { ComponentType } from "react";
import type { TenantSite } from "@/lib/types";
import { archetypeFor, type Archetype } from "@/lib/verticals";
import RestaurantSite from "./restaurant/RestaurantSite";
import TradesSite from "./trades/TradesSite";
import SalonSite from "./salon/SalonSite";

// Each vertical maps to a template archetype; the archetype picks the component.
const BY_ARCHETYPE: Record<Archetype, ComponentType<{ site: TenantSite }>> = {
  menu: RestaurantSite,
  services: TradesSite,
  bookings: SalonSite,
};

export function getPresetComponent(preset: string) {
  return BY_ARCHETYPE[archetypeFor(preset)] ?? SalonSite;
}
