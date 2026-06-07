"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  "Setting up your hosting",
  "Publishing your pages",
  "Securing with HTTPS",
  "Going live",
];

export function Assembling() {
  const router = useRouter();
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const stepTimer = setInterval(() => setStepIdx((i) => Math.min(i + 1, STEPS.length - 1)), 1600);

    const poll = setInterval(async () => {
      try {
        const r = await fetch("/api/me/status", { cache: "no-store" });
        const j = await r.json();
        if (j.live) {
          setDone(true);
          clearInterval(poll);
          clearInterval(stepTimer);
          setTimeout(() => router.push("/dashboard?welcome=1"), 1400);
        }
      } catch {
        /* keep polling */
      }
    }, 2000);

    const fallback = setTimeout(() => router.push("/dashboard"), 35000);
    return () => {
      clearInterval(poll);
      clearInterval(stepTimer);
      clearTimeout(fallback);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative h-28 w-28">
        {done ? (
          <div className="flex h-full w-full items-center justify-center rounded-full border-2 border-emerald-400/40 bg-emerald-400/10 text-3xl text-emerald-300">
            ✓
          </div>
        ) : (
          <>
            <div className="absolute inset-0 rounded-full border-2 border-white/10" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-emerald-400" />
          </>
        )}
      </div>

      <h1 className="mt-8 text-2xl font-semibold">
        {done ? "Your site is live!" : "Putting your site together…"}
      </h1>
      <p className="mt-2 text-sm text-white/50">
        {done ? "Taking you to your dashboard." : "This usually takes a few seconds."}
      </p>

      {!done && (
        <ul className="mt-8 space-y-2 text-sm">
          {STEPS.map((s, i) => (
            <li key={s} className={`flex items-center justify-center gap-2 ${i <= stepIdx ? "text-white" : "text-white/30"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${i < stepIdx ? "bg-emerald-400" : i === stepIdx ? "bg-emerald-400 animate-pulse" : "bg-white/20"}`} />
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
