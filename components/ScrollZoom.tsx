"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

// Sits directly under the hero. As it scrolls through the viewport it zooms in
// (grows toward filling the view) then eases back out — no sticky pinning, so it
// stays where it belongs with no empty gap.
export function ScrollZoom({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.92, 1.12, 1.12, 0.96]);

  return (
    <div ref={ref} className="mx-auto max-w-5xl px-6 pb-24 pt-4">
      <motion.div style={{ scale }} className="origin-center">
        {children}
      </motion.div>
    </div>
  );
}
