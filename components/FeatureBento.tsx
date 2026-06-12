"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { FEATURES } from "@/lib/marketing";

// Base44-style stack: numbered text on the left, and on the right a single app
// "window" that fills the card. Each card pins at the same spot so the next
// fully replaces it. Four of the windows animate to feel live.

const TLDS = [".com", ".co.uk", ".co", ".net", ".org", ".shop"];

function useTypewriter(words: string[]) {
  const [text, setText] = useState(words[0]);
  const state = useRef({ wi: 0, ci: words[0].length, deleting: false });
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const s = state.current;
      const word = words[s.wi];
      if (!s.deleting) {
        if (s.ci < word.length) { s.ci++; setText(word.slice(0, s.ci)); timer = setTimeout(tick, 85); }
        else { s.deleting = true; timer = setTimeout(tick, 1600); }
      } else {
        if (s.ci > 0) { s.ci--; setText(word.slice(0, s.ci)); timer = setTimeout(tick, 45); }
        else { s.deleting = false; s.wi = (s.wi + 1) % words.length; timer = setTimeout(tick, 300); }
      }
    };
    timer = setTimeout(tick, 1600);
    return () => clearTimeout(timer);
  }, [words]);
  return text;
}

function Cursor() {
  return <span className="ml-0.5 inline-block h-[1em] w-0.5 translate-y-[0.12em] animate-pulse bg-emerald-400 align-middle" />;
}

function Check() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

// A consistent app-window frame that fills the card.
function Window({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-ink/10 bg-panel shadow-[0_24px_70px_-30px_rgba(0,0,0,0.95)]">
      <div className="flex items-center gap-1.5 border-b border-ink/10 bg-ink/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-2 truncate text-xs text-ink/40">{label}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-5 p-6 sm:p-8">{children}</div>
    </div>
  );
}

export function DesignWindow() {
  return (
    <Window label="yoursite.com">
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 rounded bg-ink/25" />
        <div className="flex gap-2">
          <div className="h-2.5 w-10 rounded bg-ink/10" />
          <div className="h-2.5 w-10 rounded bg-ink/10" />
          <div className="h-2.5 w-10 rounded bg-ink/10" />
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/25 via-neutral-800 to-neutral-900 p-6">
        <div className="h-3.5 w-2/3 rounded-full bg-ink/35" />
        <div className="mt-2.5 h-3.5 w-1/2 rounded-full bg-ink/20" />
        <div className="mt-5 h-8 w-28 rounded-md bg-ink" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-14 rounded-lg border border-ink/5 bg-ink/[0.04]" />
        <div className="h-14 rounded-lg border border-ink/5 bg-ink/[0.04]" />
        <div className="h-14 rounded-lg border border-ink/5 bg-ink/[0.04]" />
      </div>
    </Window>
  );
}

export function ShieldWindow() {
  const tld = useTypewriter(TLDS);
  return (
    <Window label="Domains & SSL">
      <div className="flex items-center gap-2.5 rounded-full border border-ink/10 bg-panel-2 px-4 py-3.5">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-accent">
          <path d="M6 10V8a6 6 0 1112 0v2m-9 0h6a3 3 0 013 3v5a3 3 0 01-3 3H9a3 3 0 01-3-3v-5a3 3 0 013-3z" />
        </svg>
        <span className="truncate text-sm text-ink/75">
          yourbusiness<span className="text-accent">{tld}</span>
          <Cursor />
        </span>
        <span className="ml-auto shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">SSL</span>
      </div>
      <div className="space-y-3">
        {["Domain registered", "HTTPS certificate active", "DNS configured for you", "Renews automatically"].map((s) => (
          <div key={s} className="flex items-center gap-2.5 text-sm text-ink/65">
            <Check />
            {s}
          </div>
        ))}
      </div>
    </Window>
  );
}

const SLOTS = ["9:00", "9:30", "10:00", "10:30", "11:00", "11:30"];
const SLOT_ORDER = [2, 4, 0, 5, 1, 3];

export function BookingWindow() {
  const [sel, setSel] = useState(2);
  useEffect(() => {
    let k = 0;
    const t = setInterval(() => { k = (k + 1) % SLOT_ORDER.length; setSel(SLOT_ORDER[k]); }, 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <Window label="Reservations">
      <div className="flex items-center justify-between text-xs text-ink/40">
        <span>Book a table · Today</span>
        <span>2 guests</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {SLOTS.map((t, i) => (
          <div
            key={t}
            className={`rounded-lg border px-2 py-2.5 text-center text-sm transition-colors duration-300 ${
              i === sel ? "border-emerald-400/60 bg-emerald-400/15 font-medium text-accent" : "border-ink/10 text-ink/55"
            }`}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-ink py-3 text-center text-sm font-semibold text-paper">Confirm booking</div>
    </Window>
  );
}

const METRICS: [string, string, number][] = [
  ["Largest paint", "0.9s", 94],
  ["Layout shift", "0.01", 97],
  ["Interaction", "12ms", 99],
];

export function SpeedWindow() {
  const [score, setScore] = useState(99);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      let n = 0;
      setScore(0);
      const step = () => {
        n += 3;
        if (n >= 99) { setScore(99); timer = setTimeout(run, 4500); }
        else { setScore(n); timer = setTimeout(step, 20); }
      };
      timer = setTimeout(step, 250);
    };
    timer = setTimeout(run, 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Window label="PageSpeed">
      <div className="flex items-center gap-5">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full" style={{ background: `conic-gradient(#34d399 0 ${score}%, rgba(255,255,255,0.08) 0)` }}>
          <div className="grid h-[60px] w-[60px] place-items-center rounded-full bg-panel text-xl font-bold text-accent">{score}</div>
        </div>
        <div>
          <p className="text-sm font-semibold text-ink">Performance</p>
          <p className="mt-0.5 text-xs text-ink/45">Core Web Vitals</p>
          <p className="mt-2 text-xs text-accent">Loads in 0.4s</p>
        </div>
      </div>
      <div className="space-y-3">
        {METRICS.map(([name, val, pct]) => (
          <div key={name} className="flex items-center gap-3 text-xs">
            <span className="w-24 shrink-0 text-ink/45">{name}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
              <span className="block h-full rounded-full bg-emerald-400/70" style={{ width: `${pct}%` }} />
            </span>
            <span className="w-12 shrink-0 text-right text-ink/70">{val}</span>
          </div>
        ))}
      </div>
    </Window>
  );
}

const WINDOWS: Record<string, () => React.ReactNode> = {
  design: DesignWindow,
  shield: ShieldWindow,
  calendar: BookingWindow,
  bolt: SpeedWindow,
};

const pad = (n: number) => String(n).padStart(2, "0");
const SHOWN = FEATURES.slice(0, 4);
const EASE = [0.22, 0.61, 0.36, 1] as const;

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
