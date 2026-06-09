import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
import Ember from "./Ember";

// Bespoke full-page restaurant designs (our own names). Selected via
// content.design; each keeps its layout and swaps in the client's own media.
export const RESTAURANT_DESIGNS: Record<string, ComponentType<PresetProps>> = {
  ember: Ember,
};

export function getRestaurantDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return RESTAURANT_DESIGNS[key] ?? null;
}
