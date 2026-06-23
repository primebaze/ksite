// Domains — the free address + custom domain cards.
export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="h-4 w-24 rounded bg-ink/[0.07]" />
      <div className="mt-2 h-9 w-56 max-w-[70%] rounded-lg bg-ink/10" />
      <div className="mt-8 space-y-5">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-6">
            <div className="flex items-center justify-between gap-3">
              <div className="h-3 w-28 rounded bg-ink/[0.07]" />
              <div className="h-6 w-16 rounded-full bg-ink/[0.07]" />
            </div>
            <div className="mt-3 h-5 w-64 max-w-[70%] rounded bg-ink/10" />
            <div className="mt-4 h-4 w-24 rounded bg-ink/[0.07]" />
          </div>
        ))}
      </div>
    </div>
  );
}
