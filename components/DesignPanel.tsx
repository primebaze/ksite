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

export interface DesignProps {
  style?: string;
  primary: string;
  accent: string;
  footerVariant?: string;
  bodyVariant?: string;
  bookingEnabled?: boolean;
  contactEnabled?: boolean;
}

// On-screen design controls for the owner: switch the overall look and the
// brand colours (curated palettes or custom). Each change saves and refreshes
// the live preview so they see it instantly. Controlled by the edit dock —
// mobile renders it as a bottom sheet, desktop as a right-side popover.
export function DesignPanel({
  open,
  onClose,
  style,
  primary,
  accent,
  footerVariant,
  bodyVariant,
  bookingEnabled = true,
  contactEnabled = true,
}: DesignProps & { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [look, setLook] = useState(style ?? "classic");
  const [pri, setPri] = useState(primary);
  const [acc, setAcc] = useState(accent);
  const [footer, setFooter] = useState(footerVariant === "minimal" ? "minimal" : "detailed");
  const [body, setBody] = useState(bodyVariant === "cards" ? "cards" : "list");
  const [booking, setBooking] = useState(bookingEnabled);
  const [contactForm, setContactForm] = useState(contactEnabled);

  const apply = (input: {
    style?: string;
    primary?: string;
    accent?: string;
    footer_variant?: "detailed" | "minimal";
    body_variant?: "list" | "cards";
    booking_enabled?: boolean;
    contact_form_enabled?: boolean;
  }) => {
    start(async () => {
      await saveDesign(input);
      router.refresh();
    });
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop (mobile dismiss) */}
      <div className="fixed inset-0 z-[230] bg-black/50 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-0" onClick={onClose} />

      <div className="fixed inset-x-0 bottom-0 z-[240] max-h-[68vh] overflow-y-auto rounded-t-3xl border-t border-white/12 bg-neutral-950/95 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] text-white shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-24 sm:right-5 sm:max-h-[70vh] sm:w-[320px] sm:rounded-2xl sm:border">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-white/15 sm:hidden" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-base font-semibold">Design</p>
            {pending && <span className="text-xs text-emerald-300">Applying…</span>}
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="grid size-8 place-items-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10">✕</button>
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

          {/* Body layout */}
          <p className="mt-5 text-xs font-medium uppercase tracking-widest text-white/40">Body</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {([["list", "List"], ["cards", "Cards"]] as const).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setBody(value);
                  apply({ body_variant: value });
                }}
                className={`rounded-lg border px-2 py-2 text-xs transition ${
                  body === value ? "border-emerald-400/70 bg-emerald-400/10 text-white" : "border-white/10 text-white/60 hover:border-white/25"
                }`}
              >
                {label}
              </button>
            ))}
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

          {/* Features */}
          <p className="mt-5 text-xs font-medium uppercase tracking-widest text-white/40">Features</p>
          <div className="mt-2 space-y-2">
            {([
              ["Booking form", booking, (v: boolean) => { setBooking(v); apply({ booking_enabled: v }); }],
              ["Contact form", contactForm, (v: boolean) => { setContactForm(v); apply({ contact_form_enabled: v }); }],
            ] as const).map(([label, on, set]) => (
              <button
                key={label}
                type="button"
                onClick={() => set(!on)}
                className="flex w-full items-center justify-between rounded-lg border border-white/10 px-3 py-2 text-sm text-white/80 transition hover:border-white/25"
              >
                <span>{label}</span>
                <span className={`relative h-5 w-9 rounded-full transition ${on ? "bg-emerald-400" : "bg-white/15"}`}>
                  <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
                </span>
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
    </>
  );
}
