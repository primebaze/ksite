"use client";

import { useState } from "react";

// Danger-zone delete with a typed confirmation: staff must type the business
// name exactly before the permanent-delete button enables. The server action
// re-checks the typed value, so this is UX, not the only guard.
export function DeleteAccountButton({
  id,
  businessName,
  action,
}: {
  id: string;
  businessName: string;
  action: (formData: FormData) => void | Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const match = typed.trim() === businessName.trim();

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/10"
      >
        Delete account
      </button>
    );
  }

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="id" value={id} />
      <p className="text-sm text-ink/60">
        This permanently deletes <span className="font-semibold text-ink">{businessName}</span> — its site, content,
        enquiries and login — and cancels any subscription. This cannot be undone.
      </p>
      <label className="block text-xs font-medium text-ink/50">
        Type <span className="font-semibold text-ink">{businessName}</span> to confirm
        <input
          value={typed}
          onChange={(e) => setTyped(e.target.value)}
          autoFocus
          className="mt-1 w-full rounded-lg border border-ink/15 bg-ink/[0.03] px-3 py-2 text-sm text-ink outline-none focus:border-ink/30"
        />
      </label>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!match}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Delete permanently
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setTyped(""); }}
          className="rounded-lg border border-ink/15 px-4 py-2 text-sm text-ink/70 transition hover:bg-ink/5"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
