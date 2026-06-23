"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fade + rise into view on scroll. Used across the marketing pages for a
// high-end, composed feel.
//
// Implemented with IntersectionObserver + a CSS transition rather than a motion
// library: this is the most-used wrapper on the marketing site, so keeping it
// dependency-free keeps those pages' JS tiny and their navigation instant. The
// API (children, delay, y, className) is unchanged.
const EASE = "cubic-bezier(0.21, 0.47, 0.32, 0.98)";

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin: "-80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0.7,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: `opacity 0.6s ${EASE} ${delay}s, transform 0.6s ${EASE} ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
