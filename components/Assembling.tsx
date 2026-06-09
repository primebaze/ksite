"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

// Always let the launch sequence play for at least this long, so an instant
// activation (webhook already done) still shows the "building your site" moment.
const MIN_MS = 4200;

const STEPS = [
  "Confirming your subscription",
  "Publishing your website",
  "Connecting hosting and SSL",
  "Opening your live dashboard",
];

export function Assembling() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const stepTimer = setInterval(() => setStepIdx((i) => Math.min(i + 1, STEPS.length - 1)), 1600);

    const poll = setInterval(async () => {
      try {
        const r = await fetch("/api/me/status", { cache: "no-store" });
        const j = await r.json();
        if (j.live) {
          clearInterval(poll);
          // Hold the animation to at least MIN_MS so it's actually seen, then
          // show the "live" state briefly before handing off to the dashboard.
          const elapsed = Date.now() - startRef.current;
          const wait = Math.max(0, MIN_MS - elapsed);
          setTimeout(() => {
            setStepIdx(STEPS.length - 1);
            setDone(true);
            clearInterval(stepTimer);
            setTimeout(() => router.push("/dashboard/domains?launch=1"), 1400);
          }, wait);
        }
      } catch {
        /* keep polling */
      }
    }, 1500);

    const fallback = setTimeout(() => router.push("/dashboard/domains?launch=1"), 35000);
    return () => {
      clearInterval(poll);
      clearInterval(stepTimer);
      clearTimeout(fallback);
    };
  }, [router]);

  return (
    <div className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-[0_40px_140px_-60px_rgba(16,185,129,0.9)] sm:p-10">
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-emerald-300/60 to-transparent" />
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-300/80">Launch in progress</p>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            {done ? "Your site is live." : "We are taking your site live."}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/58">
            {done
              ? "Everything is connected. Your dashboard is ready."
              : "Your payment is confirmed and Kovasite is publishing the site, securing hosting, and preparing your domain controls."}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0">
              {done ? (
                <div className="grid h-full w-full place-items-center rounded-full border border-emerald-300/50 bg-emerald-400/15 text-3xl text-emerald-200">
                  ✓
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                  <div className="absolute inset-2 rounded-full border border-emerald-300/20 bg-emerald-300/5" />
                  <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-300" />
                  <div className="absolute inset-5 rounded-full bg-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.8)]" />
                </>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-white">{STEPS[stepIdx]}</p>
              <div className="mt-3 h-2 w-48 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-emerald-300 transition-all duration-700"
                  style={{ width: `${done ? 100 : ((stepIdx + 1) / STEPS.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/40 p-4 shadow-2xl backdrop-blur">
          <div className="rounded-2xl border border-white/10 bg-neutral-950">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/70" />
              </div>
              <span className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs text-emerald-200">secured</span>
            </div>
            <div className="space-y-3 p-4">
              {STEPS.map((s, i) => {
                const active = i === stepIdx && !done;
                const complete = i < stepIdx || done;
                return (
                  <div
                    key={s}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                      complete
                        ? "border-emerald-300/25 bg-emerald-300/10 text-white"
                        : active
                          ? "border-white/20 bg-white/[0.06] text-white"
                          : "border-white/8 bg-white/[0.02] text-white/35"
                    }`}
                  >
                    <span className={`grid h-7 w-7 place-items-center rounded-full border text-xs ${complete ? "border-emerald-300 bg-emerald-300 text-black" : "border-white/20"}`}>
                      {complete ? "✓" : i + 1}
                    </span>
                    <span>{s}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
