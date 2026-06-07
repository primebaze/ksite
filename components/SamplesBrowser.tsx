"use client";

import { useState } from "react";
import Link from "next/link";
import { TemplateThumb } from "./TemplateThumb";

export interface BrowserItem {
  key: string;
  label: string;
  style: string;
}
export interface BrowserGroup {
  group: string;
  builds: BrowserItem[];
}

export function SamplesBrowser({ groups }: { groups: BrowserGroup[] }) {
  const [selected, setSelected] = useState(groups[0]?.group);
  const active = groups.find((g) => g.group === selected) ?? groups[0];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row lg:gap-12">
      {/* Sidebar / category filter */}
      <aside className="lg:w-52 lg:shrink-0">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Category</p>
        <ul className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {groups.map((g) => {
            const on = g.group === active.group;
            return (
              <li key={g.group} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setSelected(g.group)}
                  className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm transition lg:w-full ${
                    on ? "bg-white/10 font-medium text-white" : "text-white/55 hover:bg-white/5 hover:text-white"
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
          {active.group} <span className="text-white/35">({active.builds.length})</span>
        </h2>
        <div className="mt-7 grid grid-cols-1 gap-7 lg:grid-cols-2">
          {active.builds.map((b) => (
            <Link
              key={b.key}
              href={`/samples/${b.key}`}
              aria-label={`${b.label} template`}
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_28px_70px_-18px_rgba(0,0,0,0.75)]"
            >
              <TemplateThumb src={`/samples/${b.key}?embed=1`} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
