"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform, useMotionValueEvent, animate } from "motion/react";

// Always let the launch sequence play for at least this long, so an instant
// activation (webhook already done) still shows the "building your site" moment.
const MIN_MS = 4200;

// Each step ticks complete once the ring passes `at`. The final step is gated on
// real completion (`done`), so the ring eases toward ~90% and waits there until
// the site is actually live rather than faking the finish.
const STEPS = [
  { label: "Confirming your subscription", at: 22 },
  { label: "Publishing your website", at: 50 },
  { label: "Connecting hosting and SSL", at: 78 },
  { label: "Opening your live dashboard", at: 999 },
];

const R = 54;
const CIRC = 2 * Math.PI * R;

export function Assembling() {
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [pct, setPct] = useState(0); // integer mirror of the ring, for step + a11y
  const startRef = useRef(0);

  // The ring is driven by a single motion value so the fill is continuous and
  // eased, not stepped. `pct` only re-renders when the rounded percent changes.
  const progress = useMotionValue(0);
  const dashoffset = useTransform(progress, (p) => CIRC * (1 - p / 100));
  useMotionValueEvent(progress, "change", (v) => setPct(Math.round(v)));

  useEffect(() => {
    startRef.current = Date.now();
    // Climb smoothly toward 90% and slow as it approaches — the "almost there"
    // feel — then hold until activation completes.
    const climb = animate(progress, 90, { duration: 9, ease: [0.16, 1, 0.3, 1] });

    const poll = setInterval(async () => {
      try {
        const r = await fetch("/api/me/status", { cache: "no-store" });
        const j = await r.json();
        if (j.live) {
          clearInterval(poll);
          // Hold to at least MIN_MS so the moment is actually seen, then finish
          // the ring and show the live state before handing off to the dashboard.
          const wait = Math.max(0, MIN_MS - (Date.now() - startRef.current));
          setTimeout(() => {
            climb.stop();
            setDone(true);
            animate(progress, 100, { duration: 0.7, ease: [0.16, 1, 0.3, 1] });
            setTimeout(() => router.push("/dashboard/domains?launch=1"), 1500);
          }, wait);
        }
      } catch {
        /* keep polling */
      }
    }, 1500);

    const fallback = setTimeout(() => router.push("/dashboard/domains?launch=1"), 35000);
    return () => {
      climb.stop();
      clearInterval(poll);
      clearTimeout(fallback);
    };
  }, [router, progress]);

  const activeIdx = done ? -1 : STEPS.findIndex((s) => pct < s.at);

  return (
    <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-ink/10 bg-panel p-8 text-center shadow-[0_40px_120px_-60px_color-mix(in_srgb,var(--accent)_70%,transparent)] sm:p-10">
      {/* Soft accent glow behind the ring — theme-aware via the accent token. */}
      <div className="pointer-events-none absolute inset-x-0 -top-20 h-48 bg-[radial-gradient(circle_at_center,color-mix(in_srgb,var(--accent)_22%,transparent),transparent_70%)]" />

      <p className="relative text-[11px] font-semibold uppercase tracking-[0.35em] text-accent">
        {done ? "Launch complete" : "Launch in progress"}
      </p>

      {/* Hero ring */}
      <div className="relative mx-auto mt-7 h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={R} fill="none" strokeWidth="5" className="stroke-ink/10" />
          <motion.circle
            cx="60"
            cy="60"
            r={R}
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            className="stroke-accent"
            style={{ strokeDasharray: CIRC, strokeDashoffset: dashoffset }}
          />
        </svg>

        {/* Center: live percent while building, springs to a check when live. */}
        <div className="absolute inset-0 grid place-items-center">
          <AnimatePresence mode="wait">
            {done ? (
              <motion.span
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 360, damping: 15 }}
                className="text-accent"
              >
                <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M5 12.5l4.5 4.5L19 7" />
                </svg>
              </motion.span>
            ) : (
              <motion.span
                key="pct"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-3xl font-semibold tabular-nums tracking-tight text-ink"
              >
                {pct}
                <span className="text-lg text-ink/40">%</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      <h1 className="relative mt-7 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {done ? "Your site is live." : "Taking your site live."}
      </h1>

      {/* Single crossfading status line — the one thing to read. */}
      <div className="relative mx-auto mt-2 h-6 max-w-xs">
        <AnimatePresence mode="wait">
          <motion.p
            key={done ? "done" : activeIdx}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-sm text-ink/55"
          >
            {done ? "Everything's connected — opening your dashboard." : `${STEPS[activeIdx]?.label}…`}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Step checklist */}
      <ul className="relative mx-auto mt-7 max-w-xs space-y-1 text-left">
        {STEPS.map((s, i) => {
          const complete = done || pct >= s.at;
          const active = !done && i === activeIdx;
          return (
            <li
              key={s.label}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${active ? "bg-ink/[0.05]" : ""}`}
            >
              <span className="grid h-6 w-6 shrink-0 place-items-center">
                {complete ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    className="grid h-6 w-6 place-items-center rounded-full bg-accent text-paper"
                  >
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <path d="M5 12.5l4.5 4.5L19 7" />
                    </svg>
                  </motion.span>
                ) : active ? (
                  <svg className="h-5 w-5 animate-spin text-accent" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.2" strokeWidth="3" />
                    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                ) : (
                  <span className="h-2 w-2 rounded-full bg-ink/20" />
                )}
              </span>
              <span className={complete ? "text-ink/80" : active ? "font-medium text-ink" : "text-ink/35"}>{s.label}</span>
            </li>
          );
        })}
      </ul>

      <p className="relative mt-7 text-xs text-ink/35">
        {done ? "Redirecting…" : "This usually takes a few seconds."}
      </p>
    </div>
  );
}
