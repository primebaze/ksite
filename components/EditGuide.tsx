"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "kova-edit-guide-seen";

const TIPS = [
  { icon: "✏️", title: "Edit any text", body: "Tap the highlighted text — your name, services, prices, contact details — and type." },
  { icon: "🖼️", title: "Change photos", body: "Tap a photo, or the “Cover photo” button, to upload your own." },
  { icon: "🎨", title: "Restyle it", body: "Tap the 🎨 button to switch the look, colours and section layouts." },
  { icon: "✓", title: "It saves itself", body: "Changes save automatically. Tap “Done” when you’re happy." },
];

// First-run on-screen guide for the site editor. Shows once (remembered in
// localStorage); the “?” button reopens it any time.
export function EditGuide() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        if (!localStorage.getItem(SEEN_KEY)) setOpen(true);
      } catch {
        /* ignore */
      }
    }, 0);
    return () => clearTimeout(t);
  }, []);

  const close = () => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed right-5 top-5 z-[220] flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/80 text-sm font-semibold text-white shadow-lg backdrop-blur transition hover:bg-black"
        aria-label="How to edit"
      >
        ?
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[230] flex items-center justify-center bg-black/60 p-5 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/12 bg-neutral-950 p-6 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-300/80">Your site editor</p>
            <h2 className="mt-2 text-xl font-semibold">Make it yours</h2>
            <ul className="mt-5 space-y-4">
              {TIPS.map((t) => (
                <li key={t.title} className="flex gap-3">
                  <span className="text-lg leading-none">{t.icon}</span>
                  <span>
                    <span className="block text-sm font-medium">{t.title}</span>
                    <span className="mt-0.5 block text-sm leading-snug text-white/55">{t.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={close}
              className="mt-6 w-full rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
