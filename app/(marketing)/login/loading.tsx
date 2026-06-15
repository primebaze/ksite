// "Sign in" is on the homepage and /login is dynamic, so give the click instant
// feedback while the route loads. Mirrors the login form card; the marketing
// Nav/Footer (in the layout) stay put.
export default function Loading() {
  return (
    <section className="mx-auto max-w-md px-6 pb-20 pt-24">
      <div className="animate-pulse" aria-busy="true" aria-label="Loading">
        <div className="mx-auto h-9 w-48 rounded-lg bg-ink/10" />
        <div className="mt-3 h-4 w-56 max-w-full rounded bg-ink/[0.07] mx-auto" />
        <div className="mt-10 space-y-4 rounded-2xl border border-ink/10 bg-ink/[0.02] p-8">
          <div className="h-4 w-16 rounded bg-ink/[0.07]" />
          <div className="h-11 rounded-lg bg-ink/10" />
          <div className="h-4 w-20 rounded bg-ink/[0.07]" />
          <div className="h-11 rounded-lg bg-ink/10" />
          <div className="h-11 rounded-lg bg-ink/15" />
        </div>
      </div>
    </section>
  );
}
