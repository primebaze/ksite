"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from "motion/react";
import { PreviewVideo } from "./PreviewVideo";

// The reel zooms up to fill the screen, then softens into an ambient backdrop
// while a short scroll-driven story plays over it: each line drifts up and
// cross-fades as the user scrolls, building to the closing call to action.
// Timings live inside the pinned band (~0.22 to ~0.78 of progress for a 360vh
// track), so the whole story plays while the reel is held full-screen.
const CAPTIONS = [
  { text: "Tell us about your business.", start: 0.22, end: 0.42 },
  { text: "We design and build it.", start: 0.4, end: 0.57 },
  { text: "You go live in a day.", start: 0.55, end: 0.7 },
];

function Caption({
  progress,
  start,
  end,
  children,
}: {
  progress: MotionValue<number>;
  start: number;
  end: number;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, [start, start + 0.04, end - 0.04, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, end], [60, -60]);
  return (
    <motion.div style={{ opacity, y }} className="pointer-events-none absolute inset-0 flex items-center justify-center px-6">
      <p className="max-w-3xl text-center text-4xl font-semibold tracking-tight text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.6)] sm:text-6xl">
        {children}
      </p>
    </motion.div>
  );
}

export function ScrollZoom({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // The reel is a 16:9 browser mockup. On a wide desktop it fills the screen at
  // ~1.04; on a tall phone it must zoom much further to COVER the portrait
  // viewport (so the blurred backdrop fills the screen and the story text writes
  // over the video, never onto black). Compute the cover scale from the screen.
  // On mobile the centred reel sits below the fold, leaving a dark void under
  // the hero. Lift the small reel up so it peeks into that space.
  const [liftPx, setLiftPx] = useState(0);
  useEffect(() => {
    const compute = () => {
      const mobile = window.innerWidth < 640;
      setLiftPx(mobile ? -window.innerHeight * 0.26 : 0);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // Gentle settle as the section pins (no big zoom). The reel just eases to its
  // natural size; on mobile a full-screen video backdrop crossfades in for the
  // story (below) so the text writes over the video without a jarring zoom.
  const scale = useTransform(scrollYProgress, [0.1, 0.22, 1], [0.9, 1.04, 1.04]);
  const lift = useTransform(scrollYProgress, [0, 0.1, 0.22], [liftPx, liftPx, 0]);
  const radius = useTransform(scrollYProgress, [0.1, 0.22], [16, 0]);
  const pad = useTransform(scrollYProgress, [0.1, 0.22], [24, 0]);

  // Mobile only: a full-bleed blurred video backdrop fades in as the story
  // starts, so captions overlay the video (not black) — no zoom needed.
  const bgOpacity = useTransform(scrollYProgress, [0.12, 0.26], [0, 1]);

  // Once it fills, blur the reel into a soft backdrop so the sample site's own
  // headline stops competing with the story text.
  const blurPx = useTransform(scrollYProgress, [0.2, 0.32], [0, 18]);
  const reelFilter = useMotionTemplate`blur(${blurPx}px)`;

  // Darken the reel so the white story text and the CTA card stay legible.
  const scrim = useTransform(scrollYProgress, [0.2, 0.3, 0.64, 0.78], [0, 0.55, 0.6, 0.78]);

  // The closing call to action rises in as the last caption clears.
  const ctaOpacity = useTransform(scrollYProgress, [0.66, 0.73], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.66, 0.78], [60, 0]);

  return (
    <div ref={ref} className="relative h-[360vh]">
      {/* Reel is centred so the scroll-story captions overlay it (the reel zooms
          to cover the viewport, so the text writes over the video, not black). */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <motion.div
          style={{ scale, y: lift, borderRadius: radius, padding: pad, width: "100%", maxWidth: "100vw" }}
          className="origin-center"
        >
          <motion.div style={{ borderRadius: radius, filter: reelFilter }} className="overflow-hidden">
            {children}
          </motion.div>
        </motion.div>

        {/* Mobile-only full-screen video backdrop — crossfades in for the story
            so the text writes over the video without zooming the reel. */}
        <motion.div style={{ opacity: bgOpacity }} className="pointer-events-none absolute inset-0 sm:hidden">
          <PreviewVideo src="/hero/box.mp4" className="h-full w-full scale-105 object-cover blur-lg" />
        </motion.div>

        {/* Legibility scrim over the filled reel / backdrop */}
        <motion.div style={{ opacity: scrim }} className="pointer-events-none absolute inset-0 bg-black" />

        {/* Scroll-driven story */}
        {CAPTIONS.map((c) => (
          <Caption key={c.text} progress={scrollYProgress} start={c.start} end={c.end}>
            {c.text}
          </Caption>
        ))}

        {/* Closing call to action — content blended on the reel, no card box */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="mx-auto max-w-md text-lg leading-relaxed text-white/70">
            Design, hosting, domain and booking, all done for you. One flat price from £99 a month.
          </p>
          <Link
            href="/get-started"
            className="pointer-events-auto mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
          >
            Get started
            <span aria-hidden>→</span>
          </Link>
          <p className="mt-4 text-xs text-white/45">No setup fee · No contract · Cancel anytime</p>
        </motion.div>
      </div>
    </div>
  );
}
