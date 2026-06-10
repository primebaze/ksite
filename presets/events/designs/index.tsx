import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
import Aperture from "./Aperture";
import Verena from "./Verena";
import Pulse from "./Pulse";
import Pavilion from "./Pavilion";
import Feast from "./Feast";
import Confetti from "./Confetti";

// Bespoke full-page EVENTS & CREATIVE designs (our own names). Selected via
// content.design; each keeps its baked palette and layout and swaps in the
// tenant's own media, packages/services, gallery, hours and contact details.
// Suits: photographer, videographer, wedding_planner, event_venue,
// event_caterer, dj, party_hire.
export const EVENTS_DESIGNS: Record<string, ComponentType<PresetProps>> = {
  aperture: Aperture, // editorial photo/film portfolio
  verena: Verena, // romantic wedding & event planner
  pulse: Pulse, // bold, dark DJ / party hire
  pavilion: Pavilion, // architectural event venue / hire space
  feast: Feast, // event & wedding caterer (forest + copper)
  confetti: Confetti, // party & event hire (bright multicolour)
};

export function getEventsDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return EVENTS_DESIGNS[key] ?? null;
}
