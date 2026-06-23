"use client";

import dynamic from "next/dynamic";

// Below-the-fold scroll/drag showcase on the homepage. Lazy-loaded so its
// scroll-and-drag setup never blocks the homepage's initial interactivity. The
// placeholder matches the section's scroll height (200vh) to avoid a jump.
const LiveExamples = dynamic(() => import("./LiveExamples").then((m) => m.LiveExamples), {
  ssr: false,
  loading: () => <div className="h-[200vh]" aria-hidden />,
});

export function LazyLiveExamples() {
  return <LiveExamples />;
}
