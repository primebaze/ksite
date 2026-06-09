import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
import Ember from "./Ember";
import Drift from "./Drift";
import Laurel from "./Laurel";
import Lantern from "./Lantern";
import Marble from "./Marble";
import Daybreak from "./Daybreak";

// Bespoke full-page restaurant designs (our own names). Selected via
// content.design; each keeps its layout and swaps in the client's own media.
export const RESTAURANT_DESIGNS: Record<string, ComponentType<PresetProps>> = {
  ember: Ember,
  drift: Drift,
  laurel: Laurel,
  lantern: Lantern,
  marble: Marble,
  daybreak: Daybreak,
};

export function getRestaurantDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return RESTAURANT_DESIGNS[key] ?? null;
}
