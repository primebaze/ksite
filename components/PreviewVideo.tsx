"use client";

import { useEffect, useRef, useState } from "react";

// A lightweight, mobile-safe replacement for the live-site iframes: a muted,
// looping hero video. It only *loads* once near the viewport (and, for rotating
// hero slides, only the active one), and only decodes while on screen + active —
// so the homepage doesn't fetch ~17MB of video up front.
export function PreviewVideo({
  src,
  poster,
  active = true,
  className,
}: {
  src: string;
  poster?: string;
  active?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = false;
    const sync = () => {
      if (active && inView && load) el.play().catch(() => {});
      else el.pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        // Start downloading only when the slide is near the viewport AND is the
        // one being shown; once loaded it stays loaded.
        if (inView && active) setLoad(true);
        sync();
      },
      { threshold: 0.1, rootMargin: "300px" },
    );
    io.observe(el);
    sync();
    return () => io.disconnect();
  }, [active, load]);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      aria-hidden="true"
      className={className}
    />
  );
}
