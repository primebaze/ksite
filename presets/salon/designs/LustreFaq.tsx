"use client";

import { useState } from "react";

export interface LustreFaqItem {
  q: string;
  a: string;
}

// FAQ accordion for the Lustre aesthetics design: matches the reference's FAQ
// list where each question expands to reveal its answer. One item open at a time.
export function LustreFaq({ items }: { items: LustreFaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (items.length === 0) return null;

  return (
    <div className="divide-y divide-white/25">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-6 py-5 text-left"
            >
              <span className="text-base uppercase tracking-[0.12em] text-white sm:text-lg">{item.q}</span>
              <span className="shrink-0 text-2xl font-light leading-none text-white/80" aria-hidden>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p className="pb-6 text-sm leading-relaxed text-white/75 sm:text-[15px]">{item.a}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
