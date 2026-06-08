"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { TemplateThumb } from "./TemplateThumb";

interface Ex {
  key: string;
  style: string;
}

// Real sample sites rendered live inside a browser frame, in a range of design
// styles. They act as a cover that parts on scroll to reveal the pricing panel.
const EXAMPLES: Ex[] = [
  { key: "cocktail_bar", style: "luxe" },
  { key: "florist", style: "editorial" },
  { key: "gym", style: "bold" },
  { key: "cafe", style: "warm" },
];

function srcFor(e: Ex) {
  return `/samples/${e.key}?embed=1&style=${e.style}`;
}

function BrowserCard({ e }: { e: Ex }) {
  return (
    <Link
      href={`/samples/${e.key}`}
      className="group relative block overflow-hidden rounded-xl border border-white/15 bg-neutral-950 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] transition duration-300 hover:scale-[1.03] hover:border-white/30"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="h-2 w-2 rounded-full bg-white/15" />
        <span className="ml-2 h-5 flex-1 rounded-md bg-white/[0.06]" />
      </div>
      <TemplateThumb src={srcFor(e)} base={1280} aspect={0.62} />
    </Link>
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
  const k = [0.06, 0.26, 0.44, 0.6] as const;
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
    <section ref={ref} className="relative h-[300vh] border-t border-white/5 bg-white/[0.015]">
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
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 p-10 text-center shadow-[0_40px_140px_-40px_rgba(0,0,0,0.9)] sm:p-14">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-72 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />
            <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-emerald-400/80">One simple plan</p>
            <h2 className="relative mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">One price, everything included.</h2>
            <p className="relative mx-auto mt-4 max-w-md text-base leading-relaxed text-white/55">
              Site, hosting, domain, SSL and booking, all in one flat monthly price from £99.
            </p>
            <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link href="/get-started" className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
                Get your site
              </Link>
              <Link href="/pricing" className="rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-white/80 transition hover:bg-white/5">
                See pricing →
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
              className="absolute w-[240px] sm:w-[320px] md:w-[380px] lg:w-[440px]"
            >
              <BrowserCard e={e} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
