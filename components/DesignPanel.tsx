"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { PALETTES } from "@/lib/palettes";
import { saveDesign } from "@/app/preview/actions";

const LOOKS: { value: string; label: string }[] = [
  { value: "editorial", label: "Editorial" },
  { value: "warm", label: "Warm" },
  { value: "bold", label: "Bold" },
  { value: "minimal", label: "Minimal" },
  { value: "luxe", label: "Luxe" },
  { value: "classic", label: "Classic" },
];

// On-screen design controls for the owner: switch the overall look and the
// brand colours (curated palettes or custom). Each change saves and refreshes
// the live preview so they see it instantly.
export function DesignPanel({
  style,
  primary,
  accent,
  footerVariant,
}: {
  style?: string;
  primary: string;
  accent: string;
  footerVariant?: string;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [look, setLook] = useState(style ?? "classic");
  const [pri, setPri] = useState(primary);
  const [acc, setAcc] = useState(accent);
  const [footer, setFooter] = useState(footerVariant === "minimal" ? "minimal" : "detailed");

  const apply = (input: {
    style?: string;
    primary?: string;
    accent?: string;
    footer_variant?: "detailed" | "minimal";
  }) => {
    start(async () => {
      await saveDesign(input);
      router.refresh();
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[210] flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/85 text-lg shadow-2xl backdrop-blur transition hover:bg-black"
        aria-label="Design options"
      >
        🎨
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-[210] max-h-[70vh] w-[300px] overflow-y-auto rounded-2xl border border-white/12 bg-neutral-950/95 p-5 text-white shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Design</p>
            {pending && <span className="text-xs text-emerald-300">Applying…</span>}
          </div>

          {/* Look */}
          <p className="mt-4 text-xs font-medium uppercase tracking-widest text-white/40">Look</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {LOOKS.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => {
                  setLook(l.value);
                  apply({ style: l.value });
                }}
                className={`rounded-lg border px-2 py-2 text-xs transition ${
                  look === l.value ? "border-emerald-400/70 bg-emerald-400/10 text-white" : "border-white/10 text-white/60 hover:border-white/25"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Colour schemes */}
          <p className="mt-5 text-xs font-medium uppercase tracking-widest text-white/40">Colour scheme</p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {PALETTES.map((p) => {
              const active = p.primary.toLowerCase() === pri.toLowerCase() && p.accent.toLowerCase() === acc.toLowerCase();
              return (
                <button
                  key={p.name}
                  type="button"
                  title={p.name}
                  onClick={() => {
                    setPri(p.primary);
                    setAcc(p.accent);
                    apply({ primary: p.primary, accent: p.accent });
                  }}
                  className={`flex h-9 overflow-hidden rounded-lg border ${active ? "border-emerald-400/80 ring-1 ring-emerald-400/50" : "border-white/10"}`}
                >
                  <span className="h-full w-1/2" style={{ background: p.primary }} />
                  <span className="h-full w-1/2" style={{ background: p.accent }} />
                </button>
              );
            })}
          </div>

          {/* Footer layout */}
          <p className="mt-5 text-xs font-medium uppercase tracking-widest text-white/40">Footer</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {([["detailed", "Detailed"], ["minimal", "Minimal"]] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setFooter(value);
                  apply({ footer_variant: value });
                }}
                className={`rounded-lg border px-2 py-2 text-xs transition ${
                  footer === value ? "border-emerald-400/70 bg-emerald-400/10 text-white" : "border-white/10 text-white/60 hover:border-white/25"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Custom colours */}
          <p className="mt-5 text-xs font-medium uppercase tracking-widest text-white/40">Custom colours</p>
          <div className="mt-2 flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-white/60">
              <input
                type="color"
                value={pri}
                onChange={(e) => setPri(e.target.value)}
                onBlur={() => apply({ primary: pri })}
                className="h-8 w-8 cursor-pointer rounded border border-white/15 bg-transparent"
              />
              Brand
            </label>
            <label className="flex items-center gap-2 text-xs text-white/60">
              <input
                type="color"
                value={acc}
                onChange={(e) => setAcc(e.target.value)}
                onBlur={() => apply({ accent: acc })}
                className="h-8 w-8 cursor-pointer rounded border border-white/15 bg-transparent"
              />
              Accent
            </label>
          </div>
        </div>
      )}
    </>
  );
}
