import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
// Hair & beauty
import Indigo from "./Indigo";
import Halo from "./Halo";
import Verve from "./Verve";
import Atelier from "./Atelier";
import Fade from "./Fade";
import Lumiere from "./Lumiere";
// Health & wellness (aesthetics clinics)
import Aurelia from "./Aurelia";
import Seren from "./Seren";
import Lustre from "./Lustre";
import Linea from "./Linea";
import Radiance from "./Radiance";
import Lumina from "./Lumina";

// Bespoke full-page salon / hair & beauty / health & wellness designs (our own
// names, real-world inspired). Selected via content.design; each keeps its layout
// and swaps in the tenant's own media, treatments, stylists, hours and contact.
export const SALON_DESIGNS: Record<string, ComponentType<PresetProps>> = {
  indigo: Indigo,
  halo: Halo,
  verve: Verve,
  atelier: Atelier,
  fade: Fade,
  lumiere: Lumiere,
  aurelia: Aurelia,
  seren: Seren,
  lustre: Lustre,
  linea: Linea,
  radiance: Radiance,
  lumina: Lumina,
};

export function getSalonDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return SALON_DESIGNS[key] ?? null;
}
