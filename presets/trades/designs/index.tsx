import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
import Forge from "./Forge";
import Ledger from "./Ledger";
import Apex from "./Apex";
import Atelier from "./Atelier";
import Bloom from "./Bloom";
import Meridian from "./Meridian";

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
};

export function getTradesDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return TRADES_DESIGNS[key] ?? null;
}
