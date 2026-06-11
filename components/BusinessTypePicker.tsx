"use client";

import { useEffect, useMemo, useRef, useState } from "react";

interface Item {
  key: string;
  label: string;
}
interface Group {
  group: string;
  builds: Item[];
}

const FIELD =
  "mt-1 flex w-full items-center justify-between rounded-lg border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink outline-none transition focus:border-ink/30";

// A short, friendly default list, not all 150+.
const POPULAR = [
  "restaurant",
  "cafe",
  "barber",
  "hair_salon",
  "beauty_salon",
  "gym",
  "plumber",
  "electrician",
  "photographer",
  "dentist",
  "cleaner",
];

export function BusinessTypePicker({ groups, defaultKey = "restaurant" }: { groups: Group[]; defaultKey?: string }) {
  const flat = useMemo(() => groups.flatMap((g) => g.builds), [groups]);
  const byKey = useMemo(() => new Map(flat.map((b) => [b.key, b])), [flat]);

  const [selKey, setSelKey] = useState(defaultKey);
  const [selLabel, setSelLabel] = useState(byKey.get(defaultKey)?.label ?? "Restaurant");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const ql = q.trim().toLowerCase();
  const results: Item[] = useMemo(() => {
    if (ql) return flat.filter((b) => b.label.toLowerCase().includes(ql)).slice(0, 40);
    return POPULAR.map((k) => byKey.get(k)).filter(Boolean) as Item[];
  }, [ql, flat, byKey]);

  const isOther = selKey === "other";

  function choose(key: string, label: string) {
    setSelKey(key);
    setSelLabel(label);
    setOpen(false);
    setQ("");
  }

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name="preset" value={selKey} />
      <button type="button" onClick={() => setOpen((o) => !o)} className={FIELD} aria-haspopup="listbox" aria-expanded={open}>
        <span className={isOther ? "text-ink/60" : ""}>{isOther ? "Other (type below)" : selLabel}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-ink/40"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {open && (
        <div className="absolute z-30 mt-2 flex w-full flex-col overflow-hidden rounded-xl border border-ink/10 bg-zinc-900 shadow-2xl" style={{ maxHeight: "min(60vh, 420px)" }}>
          {/* Search */}
          <div className="flex shrink-0 items-center gap-3 border-b border-ink/10 px-4 py-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-ink/40">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.2-3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for your business type"
              className="w-full bg-transparent text-base text-ink placeholder-ink/35 outline-none"
            />
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
            <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wider text-ink/35">
              {ql ? "Results" : "Popular"}
            </p>
            {results.map((b) => (
              <button
                key={b.key}
                type="button"
                onClick={() => choose(b.key, b.label)}
                className={`flex w-full items-center rounded-lg px-2 py-2.5 text-left text-[15px] transition hover:bg-ink/10 ${b.key === selKey ? "text-ink" : "text-ink/80"}`}
              >
                {b.label}
              </button>
            ))}
            {ql && results.length === 0 && (
              <p className="px-2 py-3 text-sm text-ink/40">No matches. Pick “Other” below to type your own.</p>
            )}
            <button
              type="button"
              onClick={() => choose("other", "Other")}
              className="mt-1 flex w-full items-center rounded-lg border-t border-ink/10 px-2 py-2.5 text-left text-[15px] text-ink/55 transition hover:bg-ink/10 hover:text-ink"
            >
              Other (type your own)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
