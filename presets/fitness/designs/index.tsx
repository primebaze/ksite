import type { ComponentType } from "react";
import type { PresetProps } from "@/lib/site-pages";
import Forge from "./Forge";
import Flow from "./Flow";
import Pulse from "./Pulse";
import Apex from "./Apex";
import Box from "./Box";
import Tempo from "./Tempo";
import Haven from "./Haven";
import Ironclad from "./Ironclad";
import Cadence from "./Cadence";
import Crag from "./Crag";
import Reverie from "./Reverie";
import Dojo from "./Dojo";
import Lane from "./Lane";

// Bespoke full-page fitness designs (our own names). Selected via
// content.design; each keeps its layout and swaps in the client's own media,
// classes, hours and copy.
//  - forge:    bold dark high-energy gym / strength & conditioning
//  - flow:     calm light editorial yoga / pilates / barre studio
//  - pulse:    vibrant modern boutique studio (spin / HIIT / dance)
//  - apex:     premium editorial personal training / performance coaching
//  - box:      gritty industrial CrossFit / functional-fitness box
//  - tempo:    neon boutique indoor cycling / HIIT studio (club energy)
//  - haven:    calm spa-like wellness & recovery studio
//  - ironclad: disciplined combat / martial-arts gym (boxing / MMA / BJJ)
//  - cadence:  editorial dance / movement studio
export const FITNESS_DESIGNS: Record<string, ComponentType<PresetProps>> = {
  forge: Forge,
  flow: Flow,
  pulse: Pulse,
  apex: Apex,
  box: Box,
  tempo: Tempo,
  haven: Haven,
  ironclad: Ironclad,
  cadence: Cadence,
  crag: Crag, // indoor climbing & bouldering gym
  reverie: Reverie, // dance studio (ballet / contemporary)
  dojo: Dojo, // martial arts academy
  lane: Lane, // swim school
};

export function getFitnessDesign(key?: string): ComponentType<PresetProps> | null {
  if (!key) return null;
  return FITNESS_DESIGNS[key] ?? null;
}
