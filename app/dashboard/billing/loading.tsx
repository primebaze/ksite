// Billing — a single subscription card.
export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="flex items-center justify-between">
        <div className="h-9 w-40 rounded-lg bg-ink/10" />
        <div className="h-4 w-16 rounded bg-ink/[0.07]" />
      </div>
      <div className="mt-6 rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="h-5 w-40 rounded bg-ink/10" />
            <div className="mt-2 h-3 w-56 max-w-full rounded bg-ink/[0.07]" />
          </div>
          <div className="h-6 w-16 rounded-full bg-ink/[0.07]" />
        </div>
        <div className="mt-6 border-t border-ink/[0.08] pt-5">
          <div className="h-3 w-72 max-w-full rounded bg-ink/[0.07]" />
          <div className="mt-4 h-10 w-32 rounded-xl bg-ink/10" />
        </div>
      </div>
    </div>
  );
}
