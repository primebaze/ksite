"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Themeable "Book a class" widget shared across the fitness designs. Posts to
// the shared /api/site-forms pipeline (kind "booking"), which emails the
// business owner; sample/preview sites no-op with a success state. Honeypot
// field "company". Each design passes its own palette so the form blends in.
export interface BookingSkin {
  card: string;
  cardBorder: string;
  heading: string;
  sub: string;
  label: string;
  fieldBg: string;
  fieldBorder: string;
  fieldText: string;
  button: string;
  buttonText: string;
  radius: string;
  font?: string;
  /** color-scheme hint for native date/time pickers. */
  scheme?: "dark" | "light";
}

export function FitnessBooking({
  tenantId,
  name,
  skin,
  classes,
  title = "Book a class",
  sub = "Tell us when suits and we'll confirm your spot by phone or email.",
}: {
  tenantId: string;
  name: string;
  skin: BookingSkin;
  /** Optional list of class names to populate the dropdown. */
  classes?: string[];
  title?: string;
  sub?: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "")) return; // honeypot
    const payload = {
      tenantId,
      kind: "booking",
      token: String(data.get("cf-turnstile-response") ?? ""),
      fields: {
        name: data.get("cust_name") ?? "",
        contact: data.get("contact") ?? "",
        class: data.get("session") ?? "",
        date: data.get("date") ?? "",
        time: data.get("time") ?? "",
        notes: data.get("notes") ?? "",
      },
    };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/site-forms", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (json.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(json.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  const fieldStyle = { background: skin.fieldBg, borderColor: skin.fieldBorder, color: skin.fieldText, borderRadius: skin.radius } as const;
  const fieldCls = "mt-1.5 w-full border px-3.5 py-2.5 text-sm outline-none transition focus:border-current";
  const labelCls = "text-[11px] font-semibold uppercase tracking-[0.18em]";

  return (
    <div
      id="book"
      className="h-fit p-7 sm:p-9"
      style={{ background: skin.card, border: `1px solid ${skin.cardBorder}`, borderRadius: skin.radius, fontFamily: skin.font }}
    >
      <p className="text-2xl font-bold" style={{ color: skin.heading }}>{title}</p>
      <p className="mt-2 text-sm" style={{ color: skin.sub }}>{sub}</p>

      {status === "sent" ? (
        <p className="mt-7 px-4 py-5 text-center text-sm leading-relaxed" style={{ border: `1px solid ${skin.cardBorder}`, color: skin.sub, borderRadius: skin.radius }}>
          You&apos;re in — we&apos;ve received your request and will confirm your spot shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          {classes && classes.length > 0 && (
            <label className="block">
              <span className={labelCls} style={{ color: skin.label }}>Class</span>
              <select name="session" className={`${fieldCls} [&>option]:text-neutral-900`} style={fieldStyle} defaultValue={classes[0]}>
                {classes.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
          )}
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className={labelCls} style={{ color: skin.label }}>Date</span>
              <input name="date" type="date" required className={`${fieldCls} ${skin.scheme === "dark" ? "[color-scheme:dark]" : ""}`} style={fieldStyle} />
            </label>
            <label className="block">
              <span className={labelCls} style={{ color: skin.label }}>Time</span>
              <input name="time" type="time" className={`${fieldCls} ${skin.scheme === "dark" ? "[color-scheme:dark]" : ""}`} style={fieldStyle} />
            </label>
          </div>
          <label className="block">
            <span className={labelCls} style={{ color: skin.label }}>Your name</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls} style={{ color: skin.label }}>Phone or email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls} style={{ color: skin.label }}>Goals or anything else?</span>
            <textarea name="notes" rows={2} className={fieldCls} style={fieldStyle} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 block w-full py-4 text-center text-xs font-bold uppercase tracking-[0.22em] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: skin.button, color: skin.buttonText, borderRadius: skin.radius }}
          >
            {status === "sending" ? "Sending..." : title}
          </button>
        </form>
      )}
    </div>
  );
}
