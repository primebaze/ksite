"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Wraps the live site and makes editing happen in place:
//  - any [data-edit] text is editable (saves on blur)
//  - any [data-edit-image] picture is replaceable (click it, or the toolbar)
// Editable areas are softly highlighted so the owner can see what they can
// change. Public sites never use this; the attributes are inert until this
// wrapper hydrates them.
export function InlineEditor({
  children,
  save,
}: {
  children: ReactNode;
  save: (changes: Record<string, string>) => Promise<{ ok: boolean }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<string>("hero");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const flash = (s: "saved" | "error") => {
    setStatus(s);
    window.setTimeout(() => setStatus("idle"), 1800);
  };

  const pickImage = (field: string) => {
    fieldRef.current = field;
    fileRef.current?.click();
  };

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups: (() => void)[] = [];

    // --- editable text ---
    for (const el of Array.from(root.querySelectorAll<HTMLElement>("[data-edit]"))) {
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
        flash(r?.ok ? "saved" : "error");
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

    // --- replaceable images ---
    for (const el of Array.from(root.querySelectorAll<HTMLElement>("[data-edit-image]"))) {
      const onClick = (e: Event) => {
        e.preventDefault();
        pickImage(el.getAttribute("data-edit-image") || "hero");
      };
      el.addEventListener("click", onClick);
      cleanups.push(() => el.removeEventListener("click", onClick));
    }

    return () => cleanups.forEach((c) => c());
  }, [save]);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    const field = fieldRef.current;
    setStatus("saving");
    try {
      const fd = new FormData();
      fd.append("field", field);
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      if (data.ok && data.url) {
        const imgs = ref.current?.querySelectorAll<HTMLImageElement>(`[data-edit-image="${field}"]`);
        if (imgs && imgs.length) imgs.forEach((img) => (img.src = data.url!));
        else window.location.reload();
        flash("saved");
      } else {
        flash("error");
      }
    } catch {
      flash("error");
    }
  };

  return (
    <div ref={ref} className="kova-edit">
      <style>{`
        .kova-edit [data-edit]{outline:1px dashed rgba(16,185,129,.45);outline-offset:3px;border-radius:4px;background:rgba(16,185,129,.06);transition:outline-color .15s,background .15s}
        .kova-edit [data-edit]:hover{outline-color:rgba(16,185,129,.85);background:rgba(16,185,129,.13);cursor:text}
        .kova-edit [data-edit]:focus{outline:2px solid rgba(16,185,129,.95);background:transparent}
        .kova-edit [data-edit-image]{cursor:pointer;outline:2px dashed rgba(16,185,129,.55);outline-offset:-8px;transition:outline-color .15s}
        .kova-edit [data-edit-image]:hover{outline-color:rgba(16,185,129,.95)}
      `}</style>

      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />

      <div className="fixed bottom-5 left-1/2 z-[200] flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/85 px-5 py-2.5 text-sm text-white shadow-2xl backdrop-blur">
        <span className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${status === "saving" ? "animate-pulse bg-amber-400" : status === "error" ? "bg-red-400" : "bg-emerald-400"}`} />
          {status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : status === "error" ? "Couldn’t save" : "Tap text to edit · tap a photo to change it"}
        </span>
        <button
          type="button"
          onClick={() => pickImage("hero")}
          className="rounded-full border border-white/20 px-3 py-1.5 font-medium text-white transition hover:bg-white/10"
        >
          Cover photo
        </button>
        <a href="/dashboard" className="rounded-full bg-white px-4 py-1.5 font-semibold text-black transition hover:bg-white/90">Done</a>
      </div>

      {children}
    </div>
  );
}
