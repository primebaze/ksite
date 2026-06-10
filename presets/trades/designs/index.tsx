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
import Render from "./Render";
import Tessera from "./Tessera";
import Parquet from "./Parquet";
import Kerbside from "./Kerbside";
import Palisade from "./Palisade";
import Pane from "./Pane";
import Riser from "./Riser";
import Canopy from "./Canopy";
import Boxwell from "./Boxwell";
import Radiate from "./Radiate";
import Zephyr from "./Zephyr";
import Terrace from "./Terrace";
import Sentry from "./Sentry";

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
  render: Render, // plasterer (plaster off-white + steel-blue)
  tessera: Tessera, // tiler (glazed white + Moroccan blue tile-grid)
  parquet: Parquet, // flooring (greige + espresso herringbone)
  kerbside: Kerbside, // driveways & paving (asphalt + sandstone + teal)
  palisade: Palisade, // fencing & decking (pine + cedar slats)
  pane: Pane, // window cleaning (sky-blue + glass-navy)
  riser: Riser, // scaffolding (hi-vis yellow + steel)
  canopy: Canopy, // tree surgeon (woodland green + bark)
  boxwell: Boxwell, // removals & storage (navy + coral + kraft)
  radiate: Radiate, // heating engineer (charcoal + ember + copper)
  zephyr: Zephyr, // HVAC / air-con (slate + crisp cyan airflow)
  terrace: Terrace, // landscaper / garden design (slate-green + stone)
  sentry: Sentry, // pest control (protective teal + amber shield)
};

export function getTradesDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return TRADES_DESIGNS[key] ?? null;
}
