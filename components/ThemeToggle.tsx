"use client";

import { useEffect, useState } from "react";
import { applyPref, getStoredPref, setPref, type ThemePref } from "@/lib/theme";

const ORDER: ThemePref[] = ["system", "light", "dark"];

const ICONS: Record<ThemePref, React.ReactNode> = {
  system: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  light: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </>
  ),
  dark: <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />,
};

const LABEL: Record<ThemePref, string> = { system: "System", light: "Light", dark: "Dark" };

// Cycles System → Light → Dark. "System" follows the OS and live-updates when
// the OS theme changes. Compact icon button so it fits navs and sidebars.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [pref, setPrefState] = useState<ThemePref>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setPrefState(getStoredPref());
    setMounted(true);
  }, []);

  // While on "system", react to OS theme changes.
  useEffect(() => {
    if (pref !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyPref("system");
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [pref]);

  function cycle() {
    const next = ORDER[(ORDER.indexOf(pref) + 1) % ORDER.length];
    setPref(next);
    setPrefState(next);
  }

  // Render a stable placeholder until mounted so SSR markup matches.
  const current: ThemePref = mounted ? pref : "system";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${LABEL[current]}. Click to change.`}
      title={`Theme: ${LABEL[current]}`}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink/15 text-ink/70 transition hover:bg-ink/[0.06] hover:text-ink ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        {ICONS[current]}
      </svg>
    </button>
  );
}
