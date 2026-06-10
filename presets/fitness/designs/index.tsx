import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
import Forge from "./Forge";
import Flow from "./Flow";
import Pulse from "./Pulse";
import Apex from "./Apex";

// Bespoke full-page fitness designs (our own names). Selected via
// content.design; each keeps its layout and swaps in the client's own media,
// classes, hours and copy.
//  - forge: bold dark high-energy gym / strength & conditioning
//  - flow:  calm light editorial yoga / pilates / barre studio
//  - pulse: vibrant modern boutique studio (spin / HIIT / dance)
//  - apex:  premium editorial personal training / performance coaching
export const FITNESS_DESIGNS: Record<string, ComponentType<PresetProps>> = {
  forge: Forge,
  flow: Flow,
  pulse: Pulse,
  apex: Apex,
};

export function getFitnessDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return FITNESS_DESIGNS[key] ?? null;
}
