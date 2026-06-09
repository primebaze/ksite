"use client";

import { useState } from "react";

interface Field {
  key: string;
  label: string;
  type?: "text" | "email" | "date" | "time" | "number" | "textarea";
  required?: boolean;
  half?: boolean;
}

const BOOKING_FIELDS: Field[] = [
  { key: "name", label: "Your name", required: true, half: true },
  { key: "contact", label: "Phone or email", required: true, half: true },
  { key: "date", label: "Date", type: "date", half: true },
  { key: "time", label: "Time", type: "time", half: true },
  { key: "party", label: "People", type: "number", half: true },
  { key: "notes", label: "Anything else?", type: "textarea" },
];

const CONTACT_FIELDS: Field[] = [
  { key: "name", label: "Your name", required: true, half: true },
  { key: "email", label: "Email", type: "email", required: true, half: true },
  { key: "message", label: "Message", type: "textarea", required: true },
];

const inputCls =
  "mt-1.5 w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/15";

function LeadForm({
  tenantId,
  kind,
  title,
  blurb,
  submitLabel,
  fields,
  btnClass,
}: {
  tenantId: string;
  kind: "booking" | "contact";
  title: string;
  blurb: string;
  submitLabel: string;
  fields: Field[];
  btnClass: string;
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
      kind,
      fields: Object.fromEntries(fields.map((f) => [f.key, data.get(f.key) ?? ""])),
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
      setError("Network error — please try again.");
    }
  }

  return (
    <div className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-7">
      <h3 className="font-display text-xl font-semibold text-neutral-900">{title}</h3>
      <p className="mt-1 text-sm text-neutral-500">{blurb}</p>

      {status === "sent" ? (
        <p className="mt-5 rounded-lg border border-emerald-300/50 bg-emerald-50 px-4 py-4 text-sm font-medium text-emerald-700">
          Thanks — we&apos;ve received it and will be in touch shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5">
          <div className="grid grid-cols-2 gap-3">
            {fields.map((f) => (
              <label key={f.key} className={f.half ? "col-span-1 block text-xs font-medium text-neutral-600" : "col-span-2 block text-xs font-medium text-neutral-600"}>
                {f.label}
                {f.type === "textarea" ? (
                  <textarea name={f.key} required={f.required} rows={3} className={inputCls} />
                ) : (
                  <input name={f.key} type={f.type ?? "text"} required={f.required} className={inputCls} />
                )}
              </label>
            ))}
          </div>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className={btnClass}
          >
            {status === "sending" ? "Sending…" : submitLabel}
          </button>
        </form>
      )}
    </div>
  );
}

// Built-in lead forms shown on a tenant site (and as a live demo on samples).
export function SiteContactForms({
  tenantId,
  booking,
  contact,
  bookingTitle = "Request a booking",
  bookingBlurb = "Tell us when suits and we'll confirm.",
  bookingCta = "Send request",
}: {
  tenantId: string;
  booking: boolean;
  contact: boolean;
  bookingTitle?: string;
  bookingBlurb?: string;
  bookingCta?: string;
}) {
  if (!booking && !contact) return null;
  const btnClass =
    "mt-5 w-full rounded-lg bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white transition active:scale-[0.99] hover:opacity-90 disabled:opacity-60";

  return (
    <div className="mx-auto grid max-w-xl gap-5">
      {booking && (
        <LeadForm
          tenantId={tenantId}
          kind="booking"
          title={bookingTitle}
          blurb={bookingBlurb}
          submitLabel={bookingCta}
          fields={BOOKING_FIELDS}
          btnClass={btnClass}
        />
      )}
      {contact && (
        <LeadForm
          tenantId={tenantId}
          kind="contact"
          title="Send a message"
          blurb="Questions or anything else — we'd love to hear from you."
          submitLabel="Send message"
          fields={CONTACT_FIELDS}
          btnClass={btnClass}
        />
      )}
    </div>
  );
}
