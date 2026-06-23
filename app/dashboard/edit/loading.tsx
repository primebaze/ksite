// Content & menu — a stack of editor form cards.
export default function Loading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="mb-6 flex items-center justify-between">
        <div className="h-7 w-44 rounded-lg bg-ink/10" />
        <div className="h-4 w-20 rounded bg-ink/[0.07]" />
      </div>
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-6">
            <div className="h-4 w-32 rounded bg-ink/10" />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="h-10 rounded-lg bg-ink/[0.06]" />
              <div className="h-10 rounded-lg bg-ink/[0.06]" />
            </div>
            <div className="mt-3 h-10 rounded-lg bg-ink/[0.06]" />
          </div>
        ))}
      </div>
    </div>
  );
}
