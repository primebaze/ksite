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
// Health & wellness (clinical: dental, ortho, physio, chiro, osteo, optical)
import Enamel from "./Enamel";
import Align from "./Align";
import Kinetic from "./Kinetic";
import Axis from "./Axis";
import Pivot from "./Pivot";
import Lumen from "./Lumen";
// Health & wellness (spa / massage / acupuncture / podiatry / IV / audiology)
import Thermae from "./Thermae";
import Stillwater from "./Stillwater";
import Lotus from "./Lotus";
import Stride from "./Stride";
import Aurora from "./Aurora";
import Clarity from "./Clarity";

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
  enamel: Enamel, // dentist
  align: Align, // orthodontist
  kinetic: Kinetic, // physio
  axis: Axis, // chiropractor
  pivot: Pivot, // osteopath
  lumen: Lumen, // optician
  thermae: Thermae, // day spa
  stillwater: Stillwater, // massage therapy
  lotus: Lotus, // acupuncture
  stride: Stride, // podiatry
  aurora: Aurora, // IV therapy
  clarity: Clarity, // audiology / hearing
};

export function getSalonDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return SALON_DESIGNS[key] ?? null;
}
