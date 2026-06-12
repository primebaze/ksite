"use client";

import { useState } from "react";

const SAGE = "#8ba29c";
const TAUPE = "#5c5048";
const serif = { fontFamily: "var(--font-fraunces)" } as const;

// ---- Testimonial / review carousel ----
// State-driven slider (prev / next) fed by our reviews data. Faithful to the
// reference's rotating "Reviews" band, not a static grid.
export function LineaReviews({ reviews }: { reviews: { quote: string; name: string }[] }) {
  const [i, setI] = useState(0);
  if (reviews.length === 0) return null;
  const n = reviews.length;
  const go = (d: number) => setI((p) => (p + d + n) % n);
  const r = reviews[i];

  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="inline-flex gap-1" style={{ color: SAGE }} aria-hidden>
        {[0, 1, 2, 3, 4].map((s) => (
          <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3 7.2 13.6l-5-4.6 6.8-.8z" /></svg>
        ))}
      </span>
      <blockquote style={{ ...serif, color: TAUPE }} className="mt-7 text-2xl font-medium leading-[1.5] sm:text-[28px]">
        &ldquo;{r.quote}&rdquo;
      </blockquote>
      <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500">{r.name}</p>
      {n > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button aria-label="Previous review" onClick={() => go(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-neutral-500 hover:text-neutral-900">&#8592;</button>
          <div className="flex gap-2">
            {reviews.map((_, k) => (
              <button key={k} aria-label={`Review ${k + 1}`} onClick={() => setI(k)} className="h-2 w-2 rounded-full transition" style={{ background: k === i ? SAGE : "#d4d4d4" }} />
            ))}
          </div>
          <button aria-label="Next review" onClick={() => go(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition hover:border-neutral-500 hover:text-neutral-900">&#8594;</button>
        </div>
      )}
    </div>
  );
}

// ---- Before & after slider ----
// Two-image comparison that swipes between images from the tenant's gallery,
// with a draggable-feel reveal handle (click to step). Faithful to the
// reference clinic's before/after section.
export function LineaBeforeAfter({ images }: { images: { id: string; image_url: string; caption: string | null }[] }) {
  const [pos, setPos] = useState(50);
  if (images.length < 2) return null;
  const before = images[0];
  const after = images[1];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="relative isolate aspect-[4/3] w-full select-none overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" decoding="async" src={after.image_url} alt={after.caption ?? "After"} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 h-full overflow-hidden" style={{ width: `${pos}%` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img loading="lazy" decoding="async" src={before.image_url} alt={before.caption ?? "Before"} className="absolute inset-0 h-full w-full object-cover" style={{ width: "100vw", maxWidth: "48rem" }} />
          <span className="absolute bottom-3 left-3 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">Before</span>
        </div>
        <span className="absolute bottom-3 right-3 bg-black/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">After</span>
        <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }} />
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Reveal before and after"
        className="mt-5 w-full"
        style={{ accentColor: SAGE }}
      />
    </div>
  );
}

// ---- FAQ accordion ----
export function LineaFaq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (items.length === 0) return null;
  return (
    <div className="mx-auto max-w-3xl divide-y divide-neutral-200 border-y border-neutral-200">
      {items.map((it, k) => {
        const isOpen = open === k;
        return (
          <div key={k}>
            <button
              onClick={() => setOpen(isOpen ? null : k)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left"
              aria-expanded={isOpen}
            >
              <span style={{ color: TAUPE }} className="text-lg font-medium">{it.q}</span>
              <span className="text-2xl font-light leading-none" style={{ color: SAGE }}>{isOpen ? "–" : "+"}</span>
            </button>
            {isOpen && <p className="pb-6 pr-10 text-[15px] leading-[1.8] text-neutral-600">{it.a}</p>}
          </div>
        );
      })}
    </div>
  );
}

// ---- Newsletter signup band ----
// Functional: posts to /api/site-forms as a contact lead so the owner actually
// receives the address (no dead input). Sample sites no-op to the success state.
export function LineaNewsletter({ tenantId }: { tenantId: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "")) return; // honeypot
    setStatus("sending");
    try {
      const res = await fetch("/api/site-forms", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tenantId,
          kind: "contact",
          fields: { name: "Newsletter signup", email: data.get("email") ?? "", message: "Please add me to your newsletter." },
        }),
      });
      const json = (await res.json()) as { ok?: boolean };
      setStatus(json.ok ? "sent" : "error");
      if (json.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return <p className="mx-auto mt-8 max-w-md text-center text-sm text-white/90">Thank you, you are on the list.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
      <input
        name="email"
        type="email"
        required
        placeholder="Enter your email address"
        className="flex-1 border border-white/40 bg-white/10 px-4 py-3.5 text-sm text-white placeholder:text-white/60 outline-none focus:border-white"
      />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      <button
        type="submit"
        disabled={status === "sending"}
        className="bg-white px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90 disabled:opacity-60"
        style={{ color: TAUPE }}
      >
        {status === "sending" ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
