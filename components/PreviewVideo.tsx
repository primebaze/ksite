"use client";

import { useEffect, useRef } from "react";

// A lightweight, mobile-safe replacement for the live-site iframes: a muted,
// looping hero video that only decodes while it's on screen and "active". This
// keeps the homepage to a couple of video decoders at most instead of mounting
// several full sample sites at once (which crashed mobile Safari's web process).
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = false;
    const sync = () => {
      if (active && inView) el.play().catch(() => {});
      else el.pause();
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    sync();
    return () => io.disconnect();
  }, [active]);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      tabIndex={-1}
      aria-hidden="true"
      className={className}
    />
  );
}
