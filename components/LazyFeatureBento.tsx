"use client";

import dynamic from "next/dynamic";

// Below-the-fold on the homepage. Loading it lazily keeps the homepage's
// initial JS light, so the hero is interactive immediately on load/navigation;
// the feature stack streams in just after. A min-height placeholder reserves
// space to avoid a layout jump.
const FeatureBento = dynamic(() => import("./FeatureBento").then((m) => m.FeatureBento), {
  ssr: false,
  loading: () => <div className="min-h-screen" aria-hidden />,
});

export function LazyFeatureBento() {
  return <FeatureBento />;
}
