import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
import Forge from "./Forge";
import Ledger from "./Ledger";
import Apex from "./Apex";
import Atelier from "./Atelier";
import Bloom from "./Bloom";
import Meridian from "./Meridian";
import Mason from "./Mason";
import Marigold from "./Marigold";
import Drafthouse from "./Drafthouse";
import Velocity from "./Velocity";
import Juniper from "./Juniper";
import Summit from "./Summit";
// Contractors & home (trade-specific)
import Pipeworks from "./Pipeworks";
import Livewire from "./Livewire";
import Greenscape from "./Greenscape";
import Ridgeline from "./Ridgeline";
import Rollwell from "./Rollwell";
import Latchkey from "./Latchkey";
import Cornerstone from "./Cornerstone";
import Heartwood from "./Heartwood";
import Sparkle from "./Sparkle";
import Culina from "./Culina";
import Lagoon from "./Lagoon";
import Mendwell from "./Mendwell";

// Bespoke full-page services designs (our own names) for the TradesSite preset.
// Selected via content.design; each keeps its layout and swaps in the client's
// own media, copy, services and accreditations. Covers contractors & home,
// automotive, professional services and retail & shops.
export const TRADES_DESIGNS: Record<string, ComponentType<PresetProps>> = {
  forge: Forge, // bold industrial contractor / trade (dark)
  ledger: Ledger, // clean, credentials-led professional services (light)
  apex: Apex, // sleek automotive / performance garage (dark)
  atelier: Atelier, // warm editorial retail / boutique (light)
  bloom: Bloom, // soft botanical florist / lifestyle shop (light)
  meridian: Meridian, // refined, photo-led premium general services (light)
  mason: Mason, // bold builder / construction & home improvement (dark, amber)
  marigold: Marigold, // fresh, friendly cleaning / home services (light, teal)
  drafthouse: Drafthouse, // premium architecture / design studio (paper & ink, serif)
  velocity: Velocity, // sharp modern garage / EV & detailing (dark, electric cyan)
  juniper: Juniper, // warm gift / concept retail shop (cream & terracotta)
  summit: Summit, // confident corporate consultancy / agency (light, indigo)
  pipeworks: Pipeworks, // plumber (marine navy + water-blue)
  livewire: Livewire, // electrician (charcoal + electric yellow)
  greenscape: Greenscape, // gardener (garden green)
  ridgeline: Ridgeline, // roofer (slate + terracotta tile)
  rollwell: Rollwell, // painter & decorator (white + cobalt swatches)
  latchkey: Latchkey, // locksmith (midnight blue + brass)
  cornerstone: Cornerstone, // builder (concrete + hi-vis orange)
  heartwood: Heartwood, // carpenter (walnut + oak)
  sparkle: Sparkle, // cleaner (aqua-teal + lemon)
  culina: Culina, // kitchen fitter (forest + brass marble)
  lagoon: Lagoon, // bathroom fitter (seafoam + brass)
  mendwell: Mendwell, // handyman (royal blue + amber)
};

export function getTradesDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return TRADES_DESIGNS[key] ?? null;
}
