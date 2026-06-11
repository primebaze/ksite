"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
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
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

// A consistent app-window frame that fills the card.
function Window({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.95)]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-2 truncate text-xs text-white/40">{label}</span>
      </div>
      <div className="flex flex-1 flex-col justify-center gap-5 p-6 sm:p-8">{children}</div>
    </div>
  );
}

function DesignWindow() {
  return (
    <Window label="yoursite.com">
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 rounded bg-white/25" />
        <div className="flex gap-2">
          <div className="h-2.5 w-10 rounded bg-white/10" />
          <div className="h-2.5 w-10 rounded bg-white/10" />
          <div className="h-2.5 w-10 rounded bg-white/10" />
        </div>
      </div>
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/25 via-neutral-800 to-neutral-900 p-6">
        <div className="h-3.5 w-2/3 rounded-full bg-white/35" />
        <div className="mt-2.5 h-3.5 w-1/2 rounded-full bg-white/20" />
        <div className="mt-5 h-8 w-28 rounded-md bg-white" />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div className="h-14 rounded-lg border border-white/5 bg-white/[0.04]" />
        <div className="h-14 rounded-lg border border-white/5 bg-white/[0.04]" />
        <div className="h-14 rounded-lg border border-white/5 bg-white/[0.04]" />
      </div>
    </Window>
  );
}

function ShieldWindow() {
  const tld = useTypewriter(TLDS);
  return (
    <Window label="Domains & SSL">
      <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-neutral-900 px-4 py-3.5">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-emerald-400">
          <path d="M6 10V8a6 6 0 1112 0v2m-9 0h6a3 3 0 013 3v5a3 3 0 01-3 3H9a3 3 0 01-3-3v-5a3 3 0 013-3z" />
        </svg>
        <span className="truncate text-sm text-white/75">
          yourbusiness<span className="text-emerald-300">{tld}</span>
          <Cursor />
        </span>
        <span className="ml-auto shrink-0 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300">SSL</span>
      </div>
      <div className="space-y-3">
        {["Domain registered", "HTTPS certificate active", "DNS configured for you", "Renews automatically"].map((s) => (
          <div key={s} className="flex items-center gap-2.5 text-sm text-white/65">
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

function BookingWindow() {
  const [sel, setSel] = useState(2);
  useEffect(() => {
    let k = 0;
    const t = setInterval(() => { k = (k + 1) % SLOT_ORDER.length; setSel(SLOT_ORDER[k]); }, 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <Window label="Reservations">
      <div className="flex items-center justify-between text-xs text-white/40">
        <span>Book a table · Today</span>
        <span>2 guests</span>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {SLOTS.map((t, i) => (
          <div
            key={t}
            className={`rounded-lg border px-2 py-2.5 text-center text-sm transition-colors duration-300 ${
              i === sel ? "border-emerald-400/60 bg-emerald-400/15 font-medium text-emerald-200" : "border-white/10 text-white/55"
            }`}
          >
            {t}
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-white py-3 text-center text-sm font-semibold text-black">Confirm booking</div>
    </Window>
  );
}

const METRICS: [string, string, number][] = [
  ["Largest paint", "0.9s", 94],
  ["Layout shift", "0.01", 97],
  ["Interaction", "12ms", 99],
];

function SpeedWindow() {
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
          <div className="grid h-[60px] w-[60px] place-items-center rounded-full bg-neutral-950 text-xl font-bold text-emerald-300">{score}</div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Performance</p>
          <p className="mt-0.5 text-xs text-white/45">Core Web Vitals</p>
          <p className="mt-2 text-xs text-emerald-300">Loads in 0.4s</p>
        </div>
      </div>
      <div className="space-y-3">
        {METRICS.map(([name, val, pct]) => (
          <div key={name} className="flex items-center gap-3 text-xs">
            <span className="w-24 shrink-0 text-white/45">{name}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <span className="block h-full rounded-full bg-emerald-400/70" style={{ width: `${pct}%` }} />
            </span>
            <span className="w-12 shrink-0 text-right text-white/70">{val}</span>
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
// screen and the active feature (number, title, body + live window) steps from
// 01 → 04 as you scroll, the same fixed-scroll feel as the hero and the
// "See what you get" section.
function MobileFeatureScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const idx = Math.max(0, Math.min(SHOWN.length - 1, Math.floor(p * SHOWN.length - 1e-4)));
    setActive(idx);
  });

  const f = SHOWN[active];
  const Visual = WINDOWS[f.icon] ?? DesignWindow;

  return (
    <div ref={ref} className="mt-10 lg:hidden" style={{ height: `${SHOWN.length * 100}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-7 py-20">
        {/* progress: one pill per feature, the active one stretched */}
        <div className="flex items-center gap-2">
          {SHOWN.map((s, i) => (
            <span
              key={s.title}
              className={`h-1 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-emerald-400" : "w-3 bg-white/15"}`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col gap-7"
          >
            <div>
              <p className="text-sm font-medium tracking-[0.2em] text-white/30">
                {pad(active + 1)} <span className="text-white/15">/ {pad(SHOWN.length)}</span>
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-white/55">{f.body}</p>
            </div>
            <div className="h-[42vh] min-h-[300px]">
              <Visual />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
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
              <p className="text-sm font-medium tracking-[0.2em] text-white/30">
                {pad(i + 1)} <span className="text-white/15">/ {pad(SHOWN.length)}</span>
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">{f.title}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-white/55">{f.body}</p>
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
