"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { claimDomain } from "@/app/dashboard/domains/actions";

interface Result {
  name?: string;
  available?: boolean;
  supported?: boolean; // false → Vercel can't register this TLD (e.g. .co.uk)
  error?: string;
}

// Strip a typed value down to a domain-safe base (no TLD, no spaces/punctuation).
function toBase(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\.[a-z.]+$/, "") // drop a trailing ".com" / ".co.uk" etc.
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 28);
}

export function DomainSearch({ base = "" }: { base?: string }) {
  const [name, setName] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(false);

  // Suggestions follow what's being typed (falling back to the business name),
  // and we only ever suggest .com — .co.uk and friends go through support.
  const suggestions = useMemo(() => {
    const root = toBase(name) || base;
    if (!root) return [];
    const current = name.trim().toLowerCase();
    return [...new Set([`${root}.com`, `${root}studio.com`, `hello${root}.com`, `get${root}.com`])]
      .filter((s) => s !== current)
      .slice(0, 4);
  }, [name, base]);

  async function search() {
    const q = name.trim().toLowerCase();
    if (!q) return;
    setLoading(true);
    setResult(null);
    try {
      const r = await fetch(`/api/domains/search?name=${encodeURIComponent(q)}`, { cache: "no-store" });
      setResult(await r.json());
    } catch {
      setResult({ error: "Something went wrong. Try again." });
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
          className="w-full rounded-lg border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink placeholder-ink/30 outline-none focus:border-ink/30"
        />
        <button
          onClick={search}
          disabled={loading}
          className="shrink-0 rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90 disabled:opacity-60"
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
              className="rounded-full border border-ink/10 px-3 py-1.5 text-xs text-ink/55 transition hover:border-emerald-400/40 hover:text-accent"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {result?.error && <p className="mt-3 text-sm text-red-400">{result.error}</p>}

      {result && !result.error && result.available === false && (
        <p className="mt-3 rounded-lg border border-ink/10 bg-ink/[0.02] px-4 py-3 text-sm text-ink/55">
          <span className="text-ink">{result.name}</span> is taken. Try another name.
        </p>
      )}

      {result && result.available && result.supported === false && (
        <p className="mt-3 rounded-lg border border-ink/10 bg-ink/[0.02] px-4 py-3 text-sm text-ink/60">
          <span className="text-ink">{result.name}</span> is available. To register a{" "}
          <span className="text-ink">.co.uk</span> (or another ending we don&apos;t sell directly),{" "}
          <Link href="/dashboard/support" className="font-medium text-accent underline-offset-2 hover:underline">
            contact support
          </Link>{" "}
          and we&apos;ll set it up for you — or try a <span className="text-ink">.com</span> above.
        </p>
      )}

      {result && result.available && result.supported !== false && (
        <form action={claimDomain} className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-emerald-400/30 bg-emerald-400/5 px-4 py-3">
          <div className="text-sm">
            <span className="font-medium text-ink">{result.name}</span>
            <span className="ml-2 text-accent">available</span>
            <p className="mt-0.5 text-xs text-ink/45">Included with your plan. This name must be unique, and we launch it for you.</p>
          </div>
          <input type="hidden" name="domain" value={result.name} />
          <button className="shrink-0 rounded-lg bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-300">
            Claim &amp; go live
          </button>
        </form>
      )}
    </div>
  );
}
