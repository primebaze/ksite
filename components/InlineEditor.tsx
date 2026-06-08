"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Wraps the live site and makes any [data-edit] text editable in place.
// Edits save automatically on blur. Public sites never use this; the
// attributes are inert until this wrapper hydrates them.
export function InlineEditor({
  children,
  save,
}: {
  children: ReactNode;
  save: (changes: Record<string, string>) => Promise<{ ok: boolean }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-edit]"));
    const cleanups: (() => void)[] = [];

    for (const el of els) {
      el.setAttribute("contenteditable", "true");
      el.spellcheck = false;
      el.dataset.orig = el.innerText;

      const onBlur = async () => {
        const val = el.innerText.replace(/\s+/g, " ").trim();
        if (val === el.dataset.orig) return;
        if (!val) {
          el.innerText = el.dataset.orig || "";
          return;
        }
        el.dataset.orig = val;
        setStatus("saving");
        const r = await save({ [el.getAttribute("data-edit")!]: val });
        setStatus(r?.ok ? "saved" : "idle");
        window.setTimeout(() => setStatus("idle"), 1500);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          el.blur();
        } else if (e.key === "Escape") {
          el.innerText = el.dataset.orig || "";
          el.blur();
        }
      };

      el.addEventListener("blur", onBlur);
      el.addEventListener("keydown", onKey);
      cleanups.push(() => {
        el.removeEventListener("blur", onBlur);
        el.removeEventListener("keydown", onKey);
      });
    }
    return () => cleanups.forEach((c) => c());
  }, [save]);

  return (
    <div ref={ref} className="kova-edit">
      <style>{`
        .kova-edit [data-edit]{outline:1px dashed rgba(16,185,129,0);outline-offset:4px;border-radius:4px;transition:outline-color .15s}
        .kova-edit [data-edit]:hover{outline-color:rgba(16,185,129,.55);cursor:text}
        .kova-edit [data-edit]:focus{outline:2px solid rgba(16,185,129,.9)}
      `}</style>

      <div className="fixed bottom-5 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/85 px-5 py-2.5 text-sm text-white shadow-2xl backdrop-blur">
        <span className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${status === "saving" ? "animate-pulse bg-amber-400" : "bg-emerald-400"}`} />
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : "Tap any text to edit"}
        </span>
        <a href="/dashboard" className="rounded-full bg-white px-4 py-1.5 font-semibold text-black transition hover:bg-white/90">Done</a>
      </div>

      {children}
    </div>
  );
}
