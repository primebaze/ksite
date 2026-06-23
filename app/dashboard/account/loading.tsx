// Account — settings/password form cards.
export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="h-9 w-40 rounded-lg bg-ink/10" />
      <div className="mt-6 space-y-5">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-6">
            <div className="h-5 w-40 rounded bg-ink/10" />
            <div className="mt-4 space-y-3">
              <div className="h-10 rounded-lg bg-ink/[0.06]" />
              <div className="h-10 rounded-lg bg-ink/[0.06]" />
              <div className="h-10 w-32 rounded-lg bg-ink/10" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
