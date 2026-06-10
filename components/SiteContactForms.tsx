"use client";

import { useState } from "react";

interface Field {
  key: string;
  label: string;
  type?: "text" | "email" | "date" | "time" | "number" | "textarea";
  required?: boolean;
  half?: boolean;
}

// Visual theme so each design can skin the form to its palette instead of the
// same white card everywhere. All optional; omitted values fall back to a clean
// light look (used by the generic preset).
export interface FormTheme {
  card?: string;
  cardBorder?: string;
  heading?: string;
  blurb?: string;
  label?: string;
  fieldBg?: string;
  fieldBorder?: string;
  fieldText?: string;
  button?: string;
  buttonText?: string;
  radius?: string;
  font?: string;
}

const DEFAULT_THEME: Required<FormTheme> = {
  card: "#ffffff",
  cardBorder: "rgba(0,0,0,0.07)",
  heading: "#171717",
  blurb: "#737373",
  label: "#525252",
  fieldBg: "#ffffff",
  fieldBorder: "#d4d4d4",
  fieldText: "#171717",
  button: "var(--primary)",
  buttonText: "#ffffff",
  radius: "1rem",
  font: "inherit",
};

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

function LeadForm({
  tenantId,
  kind,
  title,
  blurb,
  submitLabel,
  fields,
  t,
}: {
  tenantId: string;
  kind: "booking" | "contact";
  title: string;
  blurb: string;
  submitLabel: string;
  fields: Field[];
  t: Required<FormTheme>;
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
      setError("Network error. Please try again.");
    }
  }

  const inputStyle = { background: t.fieldBg, borderColor: t.fieldBorder, color: t.fieldText } as const;
  const inputCls = "mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition focus:border-current";

  return (
    <div className="border p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-7" style={{ background: t.card, borderColor: t.cardBorder, borderRadius: t.radius }}>
      {title && <h3 className="text-xl font-semibold" style={{ color: t.heading, fontFamily: t.font }}>{title}</h3>}
      {blurb && <p className={`text-sm ${title ? "mt-1" : ""}`} style={{ color: t.blurb }}>{blurb}</p>}

      {status === "sent" ? (
        <p className="mt-5 rounded-lg border border-emerald-300/50 bg-emerald-50 px-4 py-4 text-sm font-medium text-emerald-700">
          Thanks, we&apos;ve received it and will be in touch shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-5">
          <div className="grid grid-cols-2 gap-3">
            {fields.map((f) => (
              <label key={f.key} className={`${f.half ? "col-span-1" : "col-span-2"} block text-xs font-medium`} style={{ color: t.label }}>
                {f.label}
                {f.type === "textarea" ? (
                  <textarea name={f.key} required={f.required} rows={3} className={inputCls} style={inputStyle} />
                ) : (
                  <input name={f.key} type={f.type ?? "text"} required={f.required} className={inputCls} style={inputStyle} />
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
            className="mt-5 w-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition active:scale-[0.99] hover:opacity-90 disabled:opacity-60"
            style={{ background: t.button, color: t.buttonText, borderRadius: t.radius === "0" ? "0" : "0.6rem" }}
          >
            {status === "sending" ? "Sending..." : submitLabel}
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
  contactTitle = "Send a message",
  contactBlurb = "Questions or anything else? We'd love to hear from you.",
  contactCta = "Send message",
  theme,
}: {
  tenantId: string;
  booking: boolean;
  contact: boolean;
  bookingTitle?: string;
  bookingBlurb?: string;
  bookingCta?: string;
  contactTitle?: string;
  contactBlurb?: string;
  contactCta?: string;
  theme?: FormTheme;
}) {
  if (!booking && !contact) return null;
  const t: Required<FormTheme> = { ...DEFAULT_THEME, ...theme };

  // Both requested → one card with a Book / Message toggle, never two stacked
  // forms (which reads as duplicate, cluttered UI).
  if (booking && contact) {
    return (
      <DualForms
        tenantId={tenantId}
        t={t}
        bookingTitle={bookingTitle}
        bookingBlurb={bookingBlurb}
        bookingCta={bookingCta}
        contactTitle={contactTitle}
        contactBlurb={contactBlurb}
        contactCta={contactCta}
      />
    );
  }

  // Single form.
  return (
    <div className="mx-auto w-full max-w-xl">
      {booking ? (
        <LeadForm tenantId={tenantId} kind="booking" title={bookingTitle} blurb={bookingBlurb} submitLabel={bookingCta} fields={BOOKING_FIELDS} t={t} />
      ) : (
        <LeadForm tenantId={tenantId} kind="contact" title={contactTitle} blurb={contactBlurb} submitLabel={contactCta} fields={CONTACT_FIELDS} t={t} />
      )}
    </div>
  );
}

// Booking + contact in one place: a segmented toggle picks which single form is
// shown, so a page never stacks two full forms on top of each other.
function DualForms({
  tenantId,
  t,
  bookingTitle,
  bookingBlurb,
  bookingCta,
  contactTitle,
  contactBlurb,
  contactCta,
}: {
  tenantId: string;
  t: Required<FormTheme>;
  bookingTitle: string;
  bookingBlurb: string;
  bookingCta: string;
  contactTitle: string;
  contactBlurb: string;
  contactCta: string;
}) {
  const [tab, setTab] = useState<"booking" | "contact">("booking");
  const tabs: { key: "booking" | "contact"; label: string }[] = [
    { key: "booking", label: bookingTitle },
    { key: "contact", label: contactTitle },
  ];
  return (
    <div className="mx-auto w-full max-w-xl">
      <div className="mb-4 grid grid-cols-2 gap-1.5 border p-1.5" style={{ background: t.card, borderColor: t.cardBorder, borderRadius: t.radius }}>
        {tabs.map((tb) => {
          const on = tab === tb.key;
          return (
            <button
              key={tb.key}
              type="button"
              onClick={() => setTab(tb.key)}
              aria-pressed={on}
              className="px-3 py-2.5 text-sm font-semibold transition"
              style={{
                background: on ? t.button : "transparent",
                color: on ? t.buttonText : t.label,
                borderRadius: t.radius === "0" ? "0" : "0.55rem",
              }}
            >
              {tb.label}
            </button>
          );
        })}
      </div>
      {tab === "booking" ? (
        <LeadForm tenantId={tenantId} kind="booking" title="" blurb={bookingBlurb} submitLabel={bookingCta} fields={BOOKING_FIELDS} t={t} />
      ) : (
        <LeadForm tenantId={tenantId} kind="contact" title="" blurb={contactBlurb} submitLabel={contactCta} fields={CONTACT_FIELDS} t={t} />
      )}
    </div>
  );
}
