import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
import Hearth from "./Hearth";
import Romp from "./Romp";
import Hollow from "./Hollow";
import Fetch from "./Fetch";

// Bespoke full-page PET designs (our own names). Selected via content.design;
// each keeps its own baked palette/typography and swaps in the tenant's media,
// copy, catalog, hours and contact details. Lowercase keys.
export const PETS_DESIGNS: Record<string, ComponentType<PresetProps>> = {
  hearth: Hearth,
  romp: Romp,
  hollow: Hollow,
  fetch: Fetch,
};
