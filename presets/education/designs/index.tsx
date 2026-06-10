import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
import Sprout from "./Sprout";
import Summit from "./Summit";
import Ignition from "./Ignition";
import Conservatoire from "./Conservatoire";
import Lingua from "./Lingua";
import Plie from "./Plie";

// Bespoke full-page education designs (our own names). Selected via
// content.design; each keeps its layout and swaps in the client's own media.
// Built for the EDUCATION sector (private_tutor, nursery, driving_school,
// music_teacher, language_school, dance_school) so it no longer falls back to
// hair-salon designs.
export const EDUCATION_DESIGNS: Record<string, ComponentType<PresetProps>> = {
  sprout: Sprout,
  summit: Summit,
  ignition: Ignition,
  conservatoire: Conservatoire,
  lingua: Lingua, // language school (teal + coral + speech bubbles)
  plie: Plie, // children's dance school (coral + peach + turquoise)
};

export function getEducationDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return EDUCATION_DESIGNS[key] ?? null;
}
