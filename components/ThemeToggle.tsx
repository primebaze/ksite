"use client";

import { useEffect, useState } from "react";
import { applyPref, getStoredPref, setPref } from "@/lib/theme";

const SUN = (
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>
);
const MOON = <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />;

// Simple light/dark switch. The first visit still follows the OS (resolved by
// the no-flash script in app/layout.tsx); clicking sets an explicit preference.
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
    // If still on the system default, follow OS changes live.
    if (getStoredPref() === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const onChange = () => {
        applyPref("system");
        setIsDark(document.documentElement.classList.contains("dark"));
      };
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    }
  }, []);

  function toggle() {
    const next = document.documentElement.classList.contains("dark") ? "light" : "dark";
    setPref(next);
    setIsDark(next === "dark");
  }

  const dark = mounted ? isDark : false;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-ink/15 text-ink/70 transition hover:bg-ink/[0.06] hover:text-ink ${className}`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
        {dark ? MOON : SUN}
      </svg>
    </button>
  );
}
