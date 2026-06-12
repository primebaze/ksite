"use client";

import { useCallback, useEffect, useState } from "react";

const SEEN_KEY = "kova-edit-onboarding-seen";

interface Step {
  selector: string;
  title: string;
  body: string;
}

// Steps point at real elements on the page. Any whose target isn't present
// (e.g. a site with no editable photo) is skipped automatically.
const STEPS: Step[] = [
  { selector: "[data-edit]", title: "Edit any text", body: "Tap the highlighted text — your name, prices, hours, contact — and just type. It saves as you go." },
  { selector: "[data-edit-image]", title: "Swap your photos", body: "Tap any photo on the page to upload your own from your phone or computer." },
  { selector: "[data-tour='cover']", title: "Your cover photo", body: "Change the big hero photo at the top from here any time." },
  { selector: "[data-tour='done']", title: "That's it", body: "Everything saves automatically. Tap Done when you're happy and you're back on your dashboard." },
];

const PAD = 8;

export function EditOnboarding() {
  const [phase, setPhase] = useState<"hidden" | "intro" | "tour">("hidden");
  const [steps, setSteps] = useState<Step[]>([]);
  const [idx, setIdx] = useState(0);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (!localStorage.getItem(SEEN_KEY)) setPhase("intro");
      } catch {
        /* ignore */
      }
    }, 400);
    return () => clearTimeout(t);
  }, []);

  const markSeen = () => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  const startTour = () => {
    const present = STEPS.filter((s) => document.querySelector(s.selector));
    setSteps(present.length ? present : STEPS);
    setIdx(0);
    setPhase("tour");
  };

  const finish = () => {
    markSeen();
    setPhase("hidden");
    setRect(null);
  };

  const place = useCallback(() => {
    const s = steps[idx];
    const el = s ? (document.querySelector(s.selector) as HTMLElement | null) : null;
    setRect(el ? el.getBoundingClientRect() : null);
  }, [steps, idx]);

  useEffect(() => {
    if (phase !== "tour") return;
    const s = steps[idx];
    const el = s ? (document.querySelector(s.selector) as HTMLElement | null) : null;
    // Only scroll if the target isn't already on screen — otherwise a hero step
    // jumps the page down for no reason ("the step doesn't show until you scroll
    // down"). Keep clear of the top nav (~64px) and the bottom dock (~96px).
    if (el) {
      const r = el.getBoundingClientRect();
      const onScreen = r.top >= 64 && r.bottom <= window.innerHeight - 96;
      if (!onScreen) el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    const t = setTimeout(place, 320);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [phase, idx, steps, place]);

  const next = () => (idx < steps.length - 1 ? setIdx((i) => i + 1) : finish());
  const back = () => setIdx((i) => Math.max(0, i - 1));

  // Tooltip placement: below the target, or above if it's low on screen.
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const below = !rect || rect.bottom + 190 < vh;
  const tipStyle: React.CSSProperties = rect
    ? below
      ? { top: rect.bottom + 16, left: Math.min(Math.max(rect.left, 16), (typeof window !== "undefined" ? window.innerWidth : 360) - 336) }
      : { bottom: vh - rect.top + 16, left: Math.min(Math.max(rect.left, 16), (typeof window !== "undefined" ? window.innerWidth : 360) - 336) }
    : { top: "50%", left: "50%", transform: "translate(-50%,-50%)" };

  return (
    <>
      <button
        type="button"
        onClick={() => setPhase("intro")}
        className="fixed bottom-[max(5.5rem,calc(env(safe-area-inset-bottom)+5rem))] left-4 z-[220] flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/80 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-black"
        aria-label="How to edit"
      >
        ?
      </button>

      {/* Intro modal */}
      {phase === "intro" && (
        <div className="fixed inset-0 z-[230] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm" onClick={finish}>
          <div className="w-full max-w-sm rounded-2xl border border-white/12 bg-neutral-950 p-6 text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80">Your site editor</p>
            <h2 className="mt-2 text-xl font-semibold">Make it yours</h2>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              This is your live site. Take a 20-second tour and we&apos;ll show you exactly what you can change.
            </p>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={finish} className="rounded-lg border border-white/15 px-4 py-3 text-sm font-medium text-white/70 transition hover:bg-white/5">
                Skip
              </button>
              <button type="button" onClick={startTour} className="flex-1 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
                Show me around
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spotlight tour */}
      {phase === "tour" && (
        <div className="fixed inset-0 z-[230]">
          {/* Dim everything except the highlighted target (box-shadow hole). */}
          {rect ? (
            <div
              className="pointer-events-none absolute rounded-lg transition-all duration-300"
              style={{
                top: rect.top - PAD,
                left: rect.left - PAD,
                width: rect.width + PAD * 2,
                height: rect.height + PAD * 2,
                boxShadow: "0 0 0 3px rgba(16,185,129,0.9), 0 0 0 9999px rgba(0,0,0,0.74)",
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-black/74" />
          )}

          {/* Tooltip */}
          <div className="absolute w-[320px] max-w-[calc(100vw-32px)] rounded-2xl border border-white/12 bg-neutral-950 p-5 text-white shadow-2xl" style={tipStyle}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/80">Step {idx + 1} of {steps.length}</p>
            <h3 className="mt-2 text-base font-semibold">{steps[idx]?.title}</h3>
            <p className="mt-1.5 text-sm leading-snug text-white/60">{steps[idx]?.body}</p>
            <div className="mt-5 flex items-center justify-between">
              <button type="button" onClick={finish} className="text-sm text-white/45 transition hover:text-white">Skip tour</button>
              <div className="flex gap-2">
                {idx > 0 && (
                  <button type="button" onClick={back} className="rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5">Back</button>
                )}
                <button type="button" onClick={next} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90">
                  {idx < steps.length - 1 ? "Next" : "Done"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
