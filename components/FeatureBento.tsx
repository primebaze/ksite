"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { FEATURES } from "@/lib/marketing";
import { WINDOWS, DesignWindow } from "./feature-windows";

// Base44-style stack: numbered text on the left, and on the right a single app
// "window" that fills the card. Each card pins at the same spot so the next
// fully replaces it. The "window" demos live in feature-windows.tsx (motion-
// free); this file only adds the scroll-driven layout (homepage only).

const pad = (n: number) => String(n).padStart(2, "0");
const SHOWN = FEATURES.slice(0, 4);

// Mobile: a pinned scroll-story. The section is tall; its inner card pins to the
// screen and the features cross-fade from 01 → 04 as you scroll. Everything is
// driven directly off scroll progress (not a stepped index), so every bit of
// scroll moves something — it tracks your finger instead of snapping.
function MobileFeatureScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    // ≈0.95 screen of scroll per feature.
    <div ref={ref} className="mt-10 lg:hidden" style={{ height: `${SHOWN.length * 95}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col gap-7 py-20">
        <Pills progress={scrollYProgress} />
        <div className="relative flex-1 overflow-hidden">
          {SHOWN.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Progress pills — the active one (nearest card centre) stretches.
function Pills({ progress }: { progress: MotionValue<number> }) {
  const [active, setActive] = useState(0);
  const last = SHOWN.length - 1;
  useMotionValueEvent(progress, "change", (p) => {
    setActive(Math.max(0, Math.min(last, Math.round(p * last))));
  });
  return (
    <div className="flex shrink-0 items-center gap-2">
      {SHOWN.map((s, i) => (
        <span
          key={s.title}
          className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-emerald-400" : "w-3 bg-ink/15"}`}
        />
      ))}
    </div>
  );
}

// One feature card in the mobile carousel. Card i is centred at i/(N-1) of
// scroll progress and slides horizontally: it sits centred while you read it,
// then as you scroll it slides off to the left while the next slides in from
// the right — they tile side-by-side during the swipe, so they never overlap.
function FeatureCard({
  feature,
  index,
  progress,
}: {
  feature: (typeof SHOWN)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const last = Math.max(1, SHOWN.length - 1);
  const w = 1 / last;
  const c = index / last;
  const isFirst = index === 0;
  const isLast = index === last;

  // Horizontal position with a still reading plateau:
  //  • centred (0%) and stationary while |d| ≤ P, so the text never clips;
  //  • then slides to ±100% (off-screen) by |d| = S, where S = 1 − P.
  // Because the slide completes exactly as the neighbour reaches its own plateau,
  // at a boundary the outgoing card sits at −50% (left half) and the incoming at
  // +50% (right half): perfectly tiled, no overlap, no gap. (d = (progress−c)/w)
  const P = 0.28;
  const S = 1 - P;
  const x = useTransform(
    progress,
    isFirst
      ? [c + P * w, c + S * w]
      : isLast
        ? [c - S * w, c - P * w]
        : [c - S * w, c - P * w, c + P * w, c + S * w],
    isFirst ? ["0%", "-100%"] : isLast ? ["100%", "0%"] : ["100%", "0%", "0%", "-100%"],
  );

  const Visual = WINDOWS[feature.icon] ?? DesignWindow;
  return (
    <motion.div style={{ x }} className="absolute inset-0 flex flex-col justify-center gap-7">
      <div>
        <p className="text-sm font-medium tracking-[0.2em] text-ink/30">
          {pad(index + 1)} <span className="text-ink/15">/ {pad(SHOWN.length)}</span>
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight">{feature.title}</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-ink/55">{feature.body}</p>
      </div>
      <div className="h-[42vh] min-h-[300px]">
        <Visual />
      </div>
    </motion.div>
  );
}

export function FeatureBento() {
  return (
    <>
      {/* Desktop: numbered text scrolls past a window that pins at the same spot */}
      <div className="mt-14 hidden gap-12 lg:grid lg:grid-cols-2 lg:gap-20">
        {/* LEFT: numbered text */}
        <div>
          {SHOWN.map((f, i) => (
            <div key={f.title} className="flex min-h-[54vh] flex-col justify-center">
              <p className="text-sm font-medium tracking-[0.2em] text-ink/30">
                {pad(i + 1)} <span className="text-ink/15">/ {pad(SHOWN.length)}</span>
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{f.title}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink/55">{f.body}</p>
            </div>
          ))}
        </div>

        {/* RIGHT: app window that fills the card; each pins at the same spot */}
        <div>
          {SHOWN.map((f) => {
            const Visual = WINDOWS[f.icon] ?? DesignWindow;
            return (
              <div key={f.title} className="sticky top-28 h-[54vh]">
                <Visual />
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: the same content as a pinned, scroll-driven story */}
      <MobileFeatureScroll />
    </>
  );
}
