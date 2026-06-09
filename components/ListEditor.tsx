"use client";

import { useState } from "react";

type Col = { name: string; label: string; type?: string };

const input =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-white/30";

// Generic add/remove-row editor for repeatable content lists (opening hours,
// socials, ordering links). Rows are managed in client state; on submit the
// server action reads the repeated fields with FormData.getAll and rebuilds the
// array. Removing every row and saving clears the list.
export function ListEditor({
  action,
  columns,
  initial,
  tenantId,
  addLabel = "+ Add row",
}: {
  action: (formData: FormData) => Promise<void>;
  columns: Col[];
  initial: Record<string, string>[];
  tenantId: string;
  addLabel?: string;
}) {
  const blank = () => Object.fromEntries(columns.map((c) => [c.name, ""])) as Record<string, string>;
  const [rows, setRows] = useState<Record<string, string>[]>(initial.length ? initial : [blank()]);

  const update = (i: number, key: string, val: string) =>
    setRows((rs) => rs.map((r, ri) => (ri === i ? { ...r, [key]: val } : r)));
  const remove = (i: number) => setRows((rs) => rs.filter((_, ri) => ri !== i));
  const add = () => setRows((rs) => [...rs, blank()]);

  return (
    <form action={action} className="space-y-2">
      <input type="hidden" name="id" value={tenantId} />
      {rows.map((row, i) => (
        <div key={i} className="flex items-center gap-2">
          {columns.map((c) => (
            <input
              key={c.name}
              name={c.name}
              type={c.type ?? "text"}
              value={row[c.name] ?? ""}
              placeholder={c.label}
              onChange={(e) => update(i, c.name, e.target.value)}
              className={input}
            />
          ))}
          <button
            type="button"
            onClick={() => remove(i)}
            aria-label="Remove row"
            className="shrink-0 rounded-lg border border-red-400/30 px-3 py-2 text-sm leading-none text-red-300 transition hover:bg-red-400/10"
          >
            ✕
          </button>
        </div>
      ))}
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={add}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/80 transition hover:bg-white/5"
        >
          {addLabel}
        </button>
        <button type="submit" className="rounded-lg bg-white px-4 py-1.5 text-sm font-semibold text-black transition hover:bg-white/90">
          Save
        </button>
      </div>
    </form>
  );
}
