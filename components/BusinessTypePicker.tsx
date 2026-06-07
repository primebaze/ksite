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
  "mt-1 flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-white/30";

export function BusinessTypePicker({ groups, defaultKey = "restaurant" }: { groups: Group[]; defaultKey?: string }) {
  const flat = useMemo(() => groups.flatMap((g) => g.builds), [groups]);
  const [selKey, setSelKey] = useState(defaultKey);
  const [selLabel, setSelLabel] = useState(flat.find((b) => b.key === defaultKey)?.label ?? "Restaurant");
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
  const filtered = useMemo(
    () =>
      groups
        .map((g) => ({
          group: g.group,
          builds: ql ? g.builds.filter((b) => b.label.toLowerCase().includes(ql) || g.group.toLowerCase().includes(ql)) : g.builds,
        }))
        .filter((g) => g.builds.length),
    [groups, ql],
  );

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
        <span className={isOther ? "text-white/60" : ""}>{isOther ? "Other (type below)" : selLabel}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white/40"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl">
          <div className="border-b border-white/10 p-2">
            {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search 150+ business types…"
              className="w-full rounded-lg bg-white/[0.05] px-3 py-2 text-sm text-white placeholder-white/30 outline-none"
            />
          </div>
          <div className="max-h-72 overflow-y-auto py-1">
            {filtered.map((g) => (
              <div key={g.group}>
                <p className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-white/35">{g.group}</p>
                {g.builds.map((b) => (
                  <button
                    key={b.key}
                    type="button"
                    onClick={() => choose(b.key, b.label)}
                    className={`flex w-full items-center px-3 py-2 text-left text-sm transition hover:bg-white/10 ${b.key === selKey ? "text-white" : "text-white/80"}`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="px-3 py-3 text-sm text-white/40">No matches — pick “Other” below to type your own.</p>
            )}
            <button
              type="button"
              onClick={() => choose("other", "Other")}
              className="mt-1 flex w-full items-center border-t border-white/10 px-3 py-2.5 text-left text-sm text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              Other — type your own
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
