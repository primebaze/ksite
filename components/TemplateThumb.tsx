"use client";

import { useEffect, useRef, useState } from "react";

// Renders a live sample site as a crisp, full-width desktop "screenshot":
// a 1280px-wide render scaled to fit the card, measured responsively.
export function TemplateThumb({ src, base = 1280, aspect = 0.66 }: { src: string; base?: number; aspect?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / base);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [base]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden bg-neutral-100" style={{ aspectRatio: `1 / ${aspect}` }}>
      {scale > 0 && (
        <iframe
          src={src}
          loading="lazy"
          tabIndex={-1}
          scrolling="no"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
          style={{ width: `${base}px`, height: `${base * aspect}px`, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}
