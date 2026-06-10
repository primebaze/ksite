import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
import Ember from "./Ember";
import Drift from "./Drift";
import Laurel from "./Laurel";
import Lantern from "./Lantern";
import Marble from "./Marble";
import Daybreak from "./Daybreak";
import Tide from "./Tide";
import Botanica from "./Botanica";
import Lacquer from "./Lacquer";
import Cinder from "./Cinder";
import Meadow from "./Meadow";
import Forno from "./Forno";
import Crumb from "./Crumb";
import Stack from "./Stack";
import Vialetto from "./Vialetto";
import Saffron from "./Saffron";
import Agave from "./Agave";
import Lemongrass from "./Lemongrass";
import Tavern from "./Tavern";
import Larder from "./Larder";
import Gateau from "./Gateau";
import Cellar from "./Cellar";
import Sobremesa from "./Sobremesa";
import Sundae from "./Sundae";
import Reuben from "./Reuben";
import Gilded from "./Gilded";
import Pulp from "./Pulp";
import Kona from "./Kona";
import Fern from "./Fern";
import Comptoir from "./Comptoir";
import Camellia from "./Camellia";
import Curbside from "./Curbside";

// Bespoke full-page restaurant designs (our own names). Selected via
// content.design; each keeps its layout and swaps in the client's own media.
export const RESTAURANT_DESIGNS: Record<string, ComponentType<PresetProps>> = {
  ember: Ember,
  drift: Drift,
  laurel: Laurel,
  lantern: Lantern,
  marble: Marble,
  daybreak: Daybreak,
  tide: Tide,
  botanica: Botanica,
  lacquer: Lacquer,
  cinder: Cinder,
  meadow: Meadow,
  // Type-specific designs so common food types own a distinct look.
  forno: Forno, // pizzeria
  crumb: Crumb, // bakery
  stack: Stack, // burger joint
  vialetto: Vialetto, // italian trattoria
  saffron: Saffron, // indian
  agave: Agave, // mexican
  lemongrass: Lemongrass, // thai
  tavern: Tavern, // traditional pub
  larder: Larder, // modern gastropub
  gateau: Gateau, // french patisserie
  cellar: Cellar, // wine bar
  sobremesa: Sobremesa, // spanish tapas
  sundae: Sundae, // ice cream parlour
  reuben: Reuben, // deli
  gilded: Gilded, // cocktail bar
  pulp: Pulp, // juice bar
  kona: Kona, // poke
  fern: Fern, // vegan
  comptoir: Comptoir, // parisian bistro
  camellia: Camellia, // english tearoom
  curbside: Curbside, // food truck
};

export function getRestaurantDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return RESTAURANT_DESIGNS[key] ?? null;
}
