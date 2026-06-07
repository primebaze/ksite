"use client";

import { useState } from "react";

// Pick an image; it uploads to /api/upload (sanitised + resized server-side)
// and shows a live preview. `locked` shows an upsell instead (e.g. video).
export function ImageUploader({
  field,
  current,
  aspect = "aspect-[16/9]",
  label,
  locked,
  lockedNote,
}: {
  field: "hero" | "logo" | "gallery";
  current?: string | null;
  aspect?: string;
  label: string;
  locked?: boolean;
  lockedNote?: string;
}) {
  const [url, setUrl] = useState<string | null>(current ?? null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPending(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.set("field", field);
      fd.set("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.ok) setUrl(data.url);
      else setError(data.error ?? "Upload failed.");
    } catch {
      setError("Upload failed — please try again.");
    } finally {
      setPending(false);
    }
  }

  if (locked) {
    return (
      <div className={`flex ${aspect} w-full flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] text-center`}>
        <span className="text-sm font-medium text-white/60">{label}</span>
        <span className="mt-1 max-w-xs px-4 text-xs text-white/35">{lockedNote}</span>
      </div>
    );
  }

  return (
    <div>
      <label className={`group relative flex ${aspect} w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.02] text-center transition hover:border-white/30`}>
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt={label} className="h-full w-full object-cover" />
        ) : (
          <span className="px-4 text-sm text-white/40">
            {label}
            <br />
            <span className="text-xs text-white/25">Tap to upload (JPG, PNG, WEBP)</span>
          </span>
        )}
        {url && !pending && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-sm font-medium text-white opacity-0 transition group-hover:opacity-100">
            Change photo
          </span>
        )}
        {pending && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </span>
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
          className="hidden"
          disabled={pending}
          onChange={onChange}
        />
      </label>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}
