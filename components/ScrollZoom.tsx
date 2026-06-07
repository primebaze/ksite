"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// As this scrolls into view it zooms up to fill the screen, holds, then zooms
// back out as it leaves — then the page keeps scrolling normally.
export function ScrollZoom({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0.12, 0.45, 0.62, 0.92], [0.86, 1.22, 1.22, 0.94]);

  return (
    <div ref={ref} className="relative h-[200vh]">
      {/* overflow-hidden here clips the zoomed reel to the viewport (so it fills
          edge-to-edge); it's on the sticky element itself, which doesn't break sticky. */}
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        <motion.div style={{ scale }} className="w-full max-w-5xl">
          {children}
        </motion.div>
      </div>
    </div>
  );
}
