"use client";

import Link from "next/link";
import { useState } from "react";
import { SubmitButton } from "./SubmitButton";

const STYLES: { value: string; label: string; blurb: string }[] = [
  { value: "editorial", label: "Editorial", blurb: "Elegant, magazine-like" },
  { value: "warm", label: "Warm", blurb: "Soft & welcoming" },
  { value: "bold", label: "Bold", blurb: "Big & high-energy" },
  { value: "minimal", label: "Minimal", blurb: "Clean & calm" },
  { value: "luxe", label: "Luxe", blurb: "Dark & premium" },
  { value: "classic", label: "Classic", blurb: "Balanced & timeless" },
];

export function StylePicker({
  presetKey,
  current,
  action,
}: {
  presetKey: string;
  current?: string;
  action: (formData: FormData) => void;
}) {
  const [style, setStyle] = useState(current && STYLES.some((s) => s.value === current) ? current : "classic");

  return (
    <form action={action} className="mt-8">
      <input type="hidden" name="style" value={style} />

      {/* Live preview of THIS business type in the chosen look */}
      <div className="overflow-hidden rounded-2xl border border-ink/10 bg-paper">
        <div className="flex items-center gap-1.5 border-b border-ink/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
          <span className="ml-3 text-xs text-ink/40">Live preview · {STYLES.find((s) => s.value === style)?.label}</span>
        </div>
        <iframe
          key={style}
          src={`/samples/${presetKey}?style=${style}&embed=1`}
          title="Design preview"
          className="h-[460px] w-full bg-ink"
        />
      </div>

      {/* Choose a look */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {STYLES.map((s) => {
          const active = s.value === style;
          return (
            <button
              type="button"
              key={s.value}
              onClick={() => setStyle(s.value)}
              className={`rounded-xl border px-4 py-3 text-left transition active:scale-[0.98] ${
                active ? "border-emerald-400/70 bg-emerald-400/10" : "border-ink/10 bg-ink/[0.02] hover:border-ink/25"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-emerald-400" : "bg-ink/20"}`} />
                <span className="text-sm font-medium text-ink">{s.label}</span>
              </span>
              <span className="mt-1 block text-xs text-ink/45">{s.blurb}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link href="/dashboard/setup/look" className="text-sm text-ink/45 hover:text-ink">← Back</Link>
        <SubmitButton
          className="rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90"
          pendingText="Saving…"
        >
          Use this design →
        </SubmitButton>
      </div>
    </form>
  );
}
