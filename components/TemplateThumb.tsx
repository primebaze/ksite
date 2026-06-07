"use client";

import { useEffect, useRef, useState } from "react";

// Renders a live sample site as a crisp desktop "screenshot", cropped to the
// hero so every card is uniform and stylish. The site renders at `base` wide
// into a tall frame; we show only the top `aspect` slice, scaled to fit.
export function TemplateThumb({ src, base = 1280, frame = 1180, aspect = 0.62 }: { src: string; base?: number; frame?: number; aspect?: number }) {
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
    <div ref={ref} className="relative w-full overflow-hidden bg-neutral-900" style={{ aspectRatio: `1 / ${aspect}` }}>
      {scale > 0 && (
        <iframe
          src={src}
          loading="lazy"
          tabIndex={-1}
          scrolling="no"
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
          style={{ width: `${base}px`, height: `${frame}px`, transform: `scale(${scale})` }}
        />
      )}
    </div>
  );
}
