"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TemplateThumb } from "./TemplateThumb";

export interface BrowserItem {
  key: string;
  label: string;
  style: string;
  /** Bespoke full-page design to preview under this build (e.g. "ember"). */
  design?: string;
  /** Demo business name override for the preview. */
  name?: string;
  /** Short descriptor shown under the design name on the card. */
  sublabel?: string;
}
export interface BrowserGroup {
  group: string;
  builds: BrowserItem[];
}

export function SamplesBrowser({ groups }: { groups: BrowserGroup[] }) {
  const [selected, setSelected] = useState(groups[0]?.group);
  const active = groups.find((g) => g.group === selected) ?? groups[0];
  const topRef = useRef<HTMLDivElement>(null);

  // Keep the chosen category in the URL (?cat=) so navigating into a sample and
  // coming Back restores the same section instead of resetting to Popular.
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get("cat");
    if (cat && groups.some((g) => g.group === cat)) setSelected(cat);
  }, [groups]);

  function pick(group: string) {
    setSelected(group);
    const url = new URL(window.location.href);
    url.searchParams.set("cat", group);
    window.history.replaceState(null, "", url);
    // Switching category swaps the grid in place; scroll back to the top of the
    // section so the new category's samples are viewed from the start. The
    // section top sits just below the page hero (a stable position), and we
    // offset by the sticky header. A direct window scroll is used because a
    // smooth scrollIntoView gets cancelled as the grid reflows.
    const el = topRef.current;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 96;
      // Instant (not smooth): the grid reflows as its previews load, which
      // cancels an in-flight smooth scroll and leaves the user mid-list.
      window.scrollTo({ top: Math.max(0, top), behavior: "auto" });
    }
  }

  return (
    <div ref={topRef} className="mx-auto flex max-w-6xl scroll-mt-24 flex-col gap-8 px-6 py-12 lg:flex-row lg:gap-12">
      {/* Sidebar / category filter */}
      <aside className="lg:sticky lg:top-24 lg:w-52 lg:shrink-0 lg:self-start">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/40">Category</p>
        <ul className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groups.map((g) => {
            const on = g.group === active.group;
            return (
              <li key={g.group} className="shrink-0">
                <button
                  type="button"
                  onClick={() => pick(g.group)}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition lg:w-full ${
                    on ? "bg-ink/10 font-medium text-ink" : "text-ink/55 hover:bg-ink/5 hover:text-ink"
                  }`}
                >
                  {g.group}
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      {/* Grid */}
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-medium tracking-tight">
          {active.group} <span className="text-ink/35">({active.builds.length})</span>
        </h2>
        <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-2">
          {active.builds.map((b) => {
            const extra =
              (b.design ? `&design=${b.design}` : "") +
              (b.name ? `&name=${encodeURIComponent(b.name)}` : "");
            // `from` tells the sample page which tab to return to (← All samples).
            const href = `/samples/${b.key}?from=${encodeURIComponent(active.group)}${extra}`;
            return (
              <Link
                key={`${b.key}-${b.design ?? ""}`}
                href={href}
                aria-label={`${b.label} sample`}
                className="group block overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.02] transition duration-300 hover:-translate-y-1 hover:border-ink/25 hover:shadow-[0_28px_70px_-18px_rgba(0,0,0,0.75)]"
              >
                <TemplateThumb src={`/samples/${b.key}?embed=1${extra}`} />
                {b.design && (
                  <div className="flex items-baseline justify-between gap-3 px-5 pb-4 pt-3.5">
                    <span className="text-base font-semibold tracking-tight text-ink">{b.label}</span>
                    {b.sublabel && <span className="shrink-0 text-xs text-ink/45">{b.sublabel}</span>}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
