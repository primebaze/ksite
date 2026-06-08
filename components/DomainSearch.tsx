"use client";

import { useState } from "react";
import { claimDomain } from "@/app/dashboard/domains/actions";

interface Result {
  name?: string;
  available?: boolean;
  price?: number | null;
  error?: string;
}

export function DomainSearch({ suggestions = [] }: { suggestions?: string[] }) {
  const [name, setName] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  async function search() {
    const q = name.trim().toLowerCase();
    if (!q) return;
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch(`/api/domains/search?name=${encodeURIComponent(q)}`, { cache: "no-store" });
      setResult(await r.json());
    } catch {
      setResult({ error: "Something went wrong — try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), search())}
          placeholder="yourbusiness.com"
          className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30"
        />
        <button
          onClick={search}
          disabled={loading}
          className="shrink-0 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
        >
          {loading ? "Checking…" : "Search"}
        </button>
      </div>
      {suggestions.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setName(s)}
              className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/55 transition hover:border-emerald-400/40 hover:text-emerald-300"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {result?.error && <p className="mt-3 text-sm text-red-400">{result.error}</p>}

      {result && !result.error && result.available === false && (
        <p className="mt-3 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/55">
          <span className="text-white">{result.name}</span> is taken — try another name.
        </p>
      )}

      {result && result.available && (
        <form action={claimDomain} className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-emerald-400/30 bg-emerald-400/5 px-4 py-3">
          <div className="text-sm">
            <span className="font-medium text-white">{result.name}</span>
            <span className="ml-2 text-emerald-300">available</span>
            <p className="mt-0.5 text-xs text-white/45">Included with your plan — this name must be unique, and we launch it for you.</p>
          </div>
          <input type="hidden" name="domain" value={result.name} />
          <button className="shrink-0 rounded-lg bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-emerald-300">
            Claim &amp; go live
          </button>
        </form>
      )}
    </div>
  );
}
