import type { ComponentType } from "react";
import type { Preset, TenantSite } from "@/lib/types";
import RestaurantSite from "./restaurant/RestaurantSite";
import TradesSite from "./trades/TradesSite";
import SalonSite from "./salon/SalonSite";

// Preset registry: tenant.preset selects the template. Adding a new vertical =
// add a component here. The engine (routing, data, domains, billing) is shared.
export const PRESETS: Record<Preset, ComponentType<{ site: TenantSite }>> = {
  restaurant: RestaurantSite,
  trades: TradesSite,
  salon: SalonSite,
};

export function getPresetComponent(preset: Preset) {
  return PRESETS[preset] ?? RestaurantSite;
}
