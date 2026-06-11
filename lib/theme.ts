"use client";

// Theme preference: "system" follows the OS, otherwise an explicit choice.
// Persisted in localStorage under "kova-theme" (absent = system). The no-flash
// script in app/layout.tsx reads the same key before first paint.
export type ThemePref = "system" | "light" | "dark";

const KEY = "kova-theme";

export function getStoredPref(): ThemePref {
  if (typeof window === "undefined") return "system";
  const v = window.localStorage.getItem(KEY);
  return v === "light" || v === "dark" ? v : "system";
}

export function systemIsDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function resolvePref(pref: ThemePref): "light" | "dark" {
  return pref === "system" ? (systemIsDark() ? "dark" : "light") : pref;
}

export function applyPref(pref: ThemePref): void {
  if (typeof document === "undefined") return;
  document.documentElement.classList.toggle("dark", resolvePref(pref) === "dark");
}

export function setPref(pref: ThemePref): void {
  if (pref === "system") window.localStorage.removeItem(KEY);
  else window.localStorage.setItem(KEY, pref);
  applyPref(pref);
}
