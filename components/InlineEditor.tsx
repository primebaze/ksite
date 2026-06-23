"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { EditOnboarding } from "./EditOnboarding";
import { DesignPanel, type DesignProps } from "./DesignPanel";

// Wraps the live site and makes editing happen in place:
//  - any [data-edit] text is editable (saves on blur)
//  - any [data-edit-image] picture is replaceable (click it, or the toolbar)
// Editable areas are softly highlighted so the owner can see what they can
// change. Public sites never use this; the attributes are inert until this
// wrapper hydrates them.
export function InlineEditor({
  children,
  save,
  design,
  addItem,
  deleteItem,
}: {
  children: ReactNode;
  save: (changes: Record<string, string>) => Promise<{ ok: boolean }>;
  design?: DesignProps;
  /** Add a blank catalog item (lessons/services/menu) and reload. */
  addItem?: () => Promise<{ ok: boolean }>;
  /** Delete a catalog item by id and reload. */
  deleteItem?: (id: string) => Promise<{ ok: boolean }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<string>("hero");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [designOpen, setDesignOpen] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [hasCatalog, setHasCatalog] = useState(false);
  const [busy, setBusy] = useState(false);

  const flash = (s: "saved" | "error") => {
    setStatus(s);
    window.setTimeout(() => setStatus("idle"), 1800);
  };

  const pickImage = (field: string) => {
    fieldRef.current = field;
    fileRef.current?.click();
  };

  const onAddItem = async () => {
    if (!addItem || busy) return;
    setBusy(true);
    const res = await addItem();
    if (res.ok) window.location.reload();
    else {
      setBusy(false);
      window.alert("Couldn’t add an item. Please try again.");
    }
  };

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const cleanups: (() => void)[] = [];

    // Multi-page editing: keep ?edit=1 when the in-site nav moves between pages
    // so the editor stays on every page.
    const keepEdit = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (a instanceof HTMLAnchorElement && a.pathname.startsWith("/preview") && !/(?:^|[?&])edit=/.test(a.search)) {
        a.search = a.search ? `${a.search}&edit=1` : "?edit=1";
      }
    };
    document.addEventListener("click", keepEdit, true);
    cleanups.push(() => document.removeEventListener("click", keepEdit, true));

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

    // --- catalog items: a delete control per row (and detect that this page
    // has a list, so the dock can show "Add item"). Every design names items
    // with data-edit="item:<id>:name", so we anchor off that.
    let itemCount = 0;
    if (deleteItem) {
      const seen = new Set<string>();
      for (const el of Array.from(root.querySelectorAll<HTMLElement>("[data-edit]"))) {
        const m = /^item:([^:]+):name$/.exec(el.getAttribute("data-edit") || "");
        if (!m) continue;
        const id = m[1];
        if (seen.has(id)) continue;
        seen.add(id);
        const row = (el.closest("li,tr") as HTMLElement | null) ?? el.parentElement;
        if (!row) continue;
        if (getComputedStyle(row).position === "static") row.style.position = "relative";
        const del = document.createElement("button");
        del.type = "button";
        del.title = "Delete this item";
        del.setAttribute("aria-label", "Delete this item");
        del.textContent = "✕";
        del.style.cssText =
          "position:absolute;top:-8px;right:-8px;z-index:60;width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:9999px;background:#dc2626;color:#fff;font-size:12px;line-height:1;border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.35);cursor:pointer;";
        const onDel = async (ev: Event) => {
          ev.preventDefault();
          ev.stopPropagation();
          if (!window.confirm("Delete this item? This can’t be undone.")) return;
          del.disabled = true;
          del.style.opacity = "0.5";
          const res = await deleteItem(id);
          if (res.ok) window.location.reload();
          else {
            del.disabled = false;
            del.style.opacity = "1";
            window.alert("Couldn’t delete that. Please try again.");
          }
        };
        del.addEventListener("click", onDel);
        row.appendChild(del);
        cleanups.push(() => del.remove());
      }
      itemCount = seen.size;
    }
    setHasCatalog(itemCount > 0);

    return () => cleanups.forEach((c) => c());
  }, [save, deleteItem]);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;
    const field = fieldRef.current;
    // Dim the photo(s) being replaced so it's obvious where the new image lands.
    const targets = Array.from(ref.current?.querySelectorAll<HTMLImageElement>(`[data-edit-image="${field}"]`) ?? []);
    const prev = targets.map((t) => ({ opacity: t.style.opacity, filter: t.style.filter, transition: t.style.transition }));
    targets.forEach((t) => {
      t.style.transition = "opacity .2s, filter .2s";
      t.style.opacity = "0.4";
      t.style.filter = "blur(2px)";
    });
    setUploadingImg(true);
    setStatus("saving");
    try {
      const fd = new FormData();
      fd.append("field", field);
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      if (data.ok && data.url) {
        if (targets.length) targets.forEach((img) => (img.src = data.url!));
        else window.location.reload();
        flash("saved");
      } else {
        flash("error");
      }
    } catch {
      flash("error");
    } finally {
      targets.forEach((t, i) => {
        t.style.opacity = prev[i].opacity;
        t.style.filter = prev[i].filter;
        t.style.transition = prev[i].transition;
      });
      setUploadingImg(false);
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

      <EditOnboarding />
      <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />

      {/* Photo-upload feedback — unmissable while the file uploads + resizes. */}
      {uploadingImg && (
        <div className="pointer-events-none fixed inset-0 z-[300] flex items-center justify-center px-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/85 px-5 py-3.5 text-sm font-semibold text-white shadow-2xl backdrop-blur">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Uploading photo…
          </div>
        </div>
      )}

      {/* Edit dock — one responsive bar for status + design + photo + done */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[200] flex justify-center px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="pointer-events-auto flex max-w-[calc(100vw-1.5rem)] items-center gap-1.5 rounded-full border border-white/10 bg-black/85 p-1.5 pl-3.5 text-sm text-white shadow-2xl backdrop-blur">
          <span className="flex shrink-0 items-center gap-2 pr-0.5">
            <span className={`h-2 w-2 rounded-full ${status === "saving" ? "animate-pulse bg-amber-400" : status === "error" ? "bg-red-400" : "bg-emerald-400"}`} />
            <span className="text-white/65">
              <span className="sm:hidden">{status === "saving" ? "Saving" : status === "saved" ? "Saved" : status === "error" ? "Error" : "Editing"}</span>
              <span className="hidden sm:inline">{status === "saving" ? "Saving…" : status === "saved" ? "Saved ✓" : status === "error" ? "Couldn’t save" : "Tap text or a photo to edit"}</span>
            </span>
          </span>

          {design && (
            <button
              type="button"
              onClick={() => setDesignOpen(true)}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 font-medium text-white transition hover:bg-white/10"
            >
              <span aria-hidden>🎨</span> Design
            </button>
          )}

          <button
            type="button"
            data-tour="cover"
            onClick={() => pickImage("hero")}
            className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 font-medium text-white transition hover:bg-white/10"
          >
            <span aria-hidden>🖼️</span> Photo
          </button>

          {hasCatalog && addItem && (
            <button
              type="button"
              onClick={onAddItem}
              disabled={busy}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 font-medium text-white transition hover:bg-white/10 disabled:opacity-60"
            >
              <span aria-hidden>＋</span> {busy ? "Adding…" : "Add item"}
            </button>
          )}

          <a href="/dashboard" data-tour="done" className="shrink-0 rounded-full bg-white px-4 py-1.5 font-semibold text-black transition hover:bg-white/90">Done</a>
        </div>
      </div>

      {design && <DesignPanel open={designOpen} onClose={() => setDesignOpen(false)} {...design} />}

      {children}
    </div>
  );
}
