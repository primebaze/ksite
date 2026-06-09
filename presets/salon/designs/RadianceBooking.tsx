"use client";

import { useState } from "react";

const GREEN = "#2f4a3c";
const GOLD = "#a98b54";

const fieldCls =
  "mt-1.5 w-full rounded-none border border-[#d8d2c6] bg-white px-3.5 py-3 text-[15px] text-neutral-800 outline-none transition focus:border-[#2f4a3c]";
const labelCls = "block text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500";

// Consultation booking widget for the Radiance aesthetics-clinic design. Posts
// to the shared /api/site-forms pipeline (kind "booking"), which emails the
// owner; sample/preview sites no-op with a success state. Honeypot field
// "company". Treatments come from the catalog so the form reflects real services.
export function RadianceBooking({
  tenantId,
  name,
  treatments = [],
}: {
  tenantId: string;
  name: string;
  treatments?: string[];
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "")) return; // honeypot
    const treatment = String(data.get("treatment") ?? "");
    const note = String(data.get("notes") ?? "");
    const payload = {
      tenantId,
      kind: "booking",
      fields: {
        name: data.get("cust_name") ?? "",
        contact: data.get("contact") ?? "",
        date: data.get("date") ?? "",
        time: data.get("time") ?? "",
        party: treatment,
        notes: treatment ? (note ? `Treatment: ${treatment}. ${note}` : `Treatment: ${treatment}`) : note,
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

  return (
    <div id="book" className="h-fit bg-[#faf8f3] p-8 sm:p-10" style={{ borderTop: `3px solid ${GOLD}` }}>
      <p style={{ fontFamily: "var(--font-fraunces)", color: GREEN }} className="text-2xl">Request a consultation</p>
      <p className="mt-2 text-sm text-neutral-500">Tell us what suits and our team will confirm your appointment.</p>

      {status === "sent" ? (
        <p className="mt-7 border border-[#d8d2c6] bg-white px-5 py-6 text-sm leading-relaxed text-neutral-700">
          Thank you, your consultation request is in. Our clinic team will be in touch shortly to confirm.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-7 space-y-5">
          <label className="block">
            <span className={labelCls}>Clinic</span>
            <input className={fieldCls} value={name} readOnly />
          </label>
          {treatments.length > 0 && (
            <label className="block">
              <span className={labelCls}>Treatment of interest</span>
              <select name="treatment" className={fieldCls} defaultValue="">
                <option value="">Not sure yet, advise me</option>
                {treatments.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          )}
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className={labelCls}>Preferred date</span>
              <input name="date" type="date" required className={fieldCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Preferred time</span>
              <select name="time" className={fieldCls} defaultValue="10:00 AM">
                {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className={labelCls}>Your name</span>
            <input name="cust_name" required className={fieldCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Phone or email</span>
            <input name="contact" required className={fieldCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Anything we should know?</span>
            <textarea name="notes" rows={3} className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {status === "error" && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 block w-full py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: GREEN }}
          >
            {status === "sending" ? "Sending..." : "Request consultation"}
          </button>
        </form>
      )}
    </div>
  );
}
