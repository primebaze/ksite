"use client";

import { useState } from "react";

const GREEN = "#2f4a3c";
const GOLD = "#a98b54";

// FAQ accordion for the Radiance design: one open row at a time, animated chevron.
export function RadianceFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  if (items.length === 0) return null;

  return (
    <div className="divide-y" style={{ borderColor: "#ece6d8" }}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-t first:border-t-0" style={{ borderColor: "#ece6d8" }}>
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span style={{ fontFamily: "var(--font-fraunces)", color: GREEN }} className="text-lg">{it.q}</span>
              <span
                className="flex h-7 w-7 flex-none items-center justify-center rounded-full text-sm transition-transform"
                style={{ background: isOpen ? GREEN : "transparent", color: isOpen ? "#fff" : GOLD, border: `1px solid ${isOpen ? GREEN : GOLD}`, transform: isOpen ? "rotate(45deg)" : "none" }}
              >
                +
              </span>
            </button>
            {isOpen && <p className="pb-6 text-[15px] leading-relaxed text-neutral-600">{it.a}</p>}
          </div>
        );
      })}
    </div>
  );
}
