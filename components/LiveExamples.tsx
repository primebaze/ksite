"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PreviewVideo } from "./PreviewVideo";

interface Ex {
  key: string;
  name: string;
  tag: string;
  domain: string;
  video: string;
}

// Sample business sites shown as looping video heros inside a browser frame.
// They act as a cover that parts on scroll to reveal the pricing panel.
const EXAMPLES: Ex[] = [
  { key: "cocktail_bar", name: "Velvet & Oak", tag: "Cocktail Bar", domain: "velvetandoak.com", video: "/hero/restaurant.mp4" },
  { key: "restaurant", name: "Saffron & Sage", tag: "Restaurant", domain: "saffronandsage.com", video: "/hero/cafe.mp4" },
  { key: "gym", name: "Ironworks Gym", tag: "Fitness Studio", domain: "ironworks.gym", video: "/hero/gym.mp4" },
  { key: "barber_shop", name: "Fade & Co.", tag: "Barbershop", domain: "fadeandco.co.uk", video: "/hero/barber.mp4" },
];

const PLAN_INCLUDES = [
  "Bespoke design & hosting",
  "Free custom domain & SSL",
  "Booking & online ordering",
  "Local SEO & Google reviews",
  "Mobile-first & lightning fast",
  "Monthly edits, done for you",
];

function Check() {
  return (
    <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

// Decorative only: these are part of a scroll-driven reveal, not links. Making
// them anchors caused the global navigation indicator ("Loading…") to fire on
// taps that the pinned-scroll section then swallowed, so it looked stuck.
function BrowserCard({ e }: { e: Ex }) {
  return (
    <div
      className="relative block overflow-hidden rounded-xl border border-white/15 bg-neutral-950 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 flex h-5 flex-1 items-center truncate rounded-md bg-white/[0.06] px-2.5 text-[10px] text-white/40">
          {e.domain}
        </span>
      </div>
      <div className="relative w-full overflow-hidden bg-neutral-900" style={{ aspectRatio: "1 / 0.62" }}>
        <PreviewVideo src={e.video} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-4 sm:p-5">
          <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/65">{e.tag}</p>
          <p className="text-lg font-semibold tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)] sm:text-xl">
            {e.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export function LiveExamples() {
  const ref = useRef<HTMLElement>(null);
  const [win, setWin] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useEffect(() => {
    const update = () => setWin(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Fan spread (capped like a max-w container) and how far cards fly off to part.
  const contentW = Math.min(win || 1152, 1152);
  const outer = contentW * 0.3;
  const inner = outer * 0.42;
  const partL = -((win || 1152) * 0.62 + 260);
  const partR = (win || 1152) * 0.62 + 260;

  // Phase stops: assemble (fan in) -> hold -> part (fly out) -> reveal pricing.
  const k = [0.06, 0.26, 0.44, 0.6];
  const x0 = useTransform(scrollYProgress, k, [0, -outer, -outer, partL]);
  const x1 = useTransform(scrollYProgress, k, [0, -inner, -inner, partL]);
  const x2 = useTransform(scrollYProgress, k, [0, inner, inner, partR]);
  const x3 = useTransform(scrollYProgress, k, [0, outer, outer, partR]);
  const xVals = [x0, x1, x2, x3];

  const r0 = useTransform(scrollYProgress, k, [0, -4, -4, -12]);
  const r1 = useTransform(scrollYProgress, k, [0, -1.5, -1.5, -7]);
  const r2 = useTransform(scrollYProgress, k, [0, 1.5, 1.5, 7]);
  const r3 = useTransform(scrollYProgress, k, [0, 4, 4, 12]);
  const rVals = [r0, r1, r2, r3];

  const yIn0 = useTransform(scrollYProgress, [0.06, 0.26], [48, 0]);
  const yIn1 = useTransform(scrollYProgress, [0.06, 0.26], [26, 0]);
  const yVals = [yIn0, yIn1, yIn1, yIn0];

  const cardsOpacity = useTransform(scrollYProgress, [0.46, 0.6], [1, 0]);
  const groupScale = useTransform(scrollYProgress, [0.05, 0.26], [0.9, 1]);
  const cardsPE = useTransform(scrollYProgress, (p) => (p < 0.5 ? "auto" : "none"));

  const headingOpacity = useTransform(scrollYProgress, [0.36, 0.46], [1, 0]);

  const pricingOpacity = useTransform(scrollYProgress, [0.48, 0.62], [0, 1]);
  const pricingScale = useTransform(scrollYProgress, [0.48, 0.64], [0.92, 1]);
  const pricingY = useTransform(scrollYProgress, [0.48, 0.64], [40, 0]);
  const pricingPE = useTransform(scrollYProgress, (p) => (p > 0.58 ? "auto" : "none"));

  const layout = [
    { z: 1, scale: 0.9 },
    { z: 3, scale: 0.96 },
    { z: 3, scale: 0.96 },
    { z: 1, scale: 0.9 },
  ];

  return (
    <section ref={ref} className="relative z-10 h-[200vh] rounded-b-[2.5rem] border-t border-white/5 bg-black sm:rounded-b-[3.5rem]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Heading (fades as the cards part) */}
        <motion.div style={{ opacity: headingOpacity }} className="absolute inset-x-0 top-0 z-10 mx-auto max-w-6xl px-6 pt-[11vh] text-center">
          <p className="text-xs font-medium uppercase tracking-widest text-emerald-400/80">Live examples</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">See what you get.</h2>
          <p className="mt-2 text-sm text-white/45">Real sample sites. Keep scrolling.</p>
        </motion.div>

        {/* Revealed pricing panel (behind the cards) */}
        <motion.div
          style={{ opacity: pricingOpacity, scale: pricingScale, y: pricingY, pointerEvents: pricingPE }}
          className="absolute inset-0 z-0 flex items-center justify-center px-6"
        >
          <div className="w-full max-w-xl text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400/80">One simple plan</p>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-semibold tracking-tight sm:text-6xl">£99</span>
              <span className="text-lg text-white/45">/month</span>
              <span className="ml-1 rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-semibold text-emerald-300">or 2 months free yearly</span>
            </div>
            <p className="mt-3 text-base text-white/55">Everything included — free domain, hosting, booking. No setup fee, no contract, cancel anytime.</p>
            <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {PLAN_INCLUDES.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-snug text-white/75">
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/get-started" className="inline-block rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-black transition hover:bg-white/90">
                Get your site
              </Link>
            </div>
          </div>
        </motion.div>

        {/* The cards: a cover that parts to reveal the panel above */}
        <motion.div style={{ scale: groupScale, pointerEvents: cardsPE }} className="absolute inset-0 z-20 flex items-center justify-center">
          {EXAMPLES.map((e, i) => (
            <motion.div
              key={e.key}
              style={{ x: xVals[i], y: yVals[i], rotate: rVals[i], scale: layout[i].scale, opacity: cardsOpacity, zIndex: layout[i].z }}
              className="absolute w-[300px] sm:w-[420px] md:w-[520px] lg:w-[600px]"
            >
              <BrowserCard e={e} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
