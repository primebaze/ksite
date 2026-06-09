// Curated brand colour schemes. `primary` is the deep brand colour (headings,
// buttons, dark hero); `accent` is the highlight. Clients pick one of these or
// set custom colours. Rendered via the --primary / --accent CSS vars.
export interface Palette {
  name: string;
  primary: string;
  accent: string;
}

export const PALETTES: Palette[] = [
  { name: "Charcoal & Gold", primary: "#141414", accent: "#c8a24a" },
  { name: "Emerald", primary: "#0f3d2e", accent: "#3ec98b" },
  { name: "Midnight & Sky", primary: "#0f2742", accent: "#5b9bd5" },
  { name: "Plum & Blush", primary: "#3b1f33", accent: "#e29ab8" },
  { name: "Terracotta", primary: "#3a2218", accent: "#d98b5f" },
  { name: "Forest & Sage", primary: "#1c2b22", accent: "#9cc08b" },
  { name: "Burgundy", primary: "#3a0f1c", accent: "#c2546a" },
  { name: "Ink & Slate", primary: "#1a1a1a", accent: "#7c8aa0" },
];

export function isHexColor(value: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(value);
}
