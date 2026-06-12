// Shown when a tenant is unpublished or non-paying (past_due is still live;
// suspended/canceled are not). Keeps a leaving/unpaid client off the live site
// without 404-ing their domain, and gives the owner a clear path to publish.
const APEX = (process.env.NEXT_PUBLIC_SITE_URL || "https://kovasite.com").replace(/\/$/, "");

export default function HoldingPage({ businessName }: { businessName: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-neutral-50 px-6 text-center text-neutral-700">
      <span className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium tracking-wide text-neutral-500">
        Coming soon
      </span>
      <h1 className="mt-5 text-3xl font-semibold text-neutral-900">{businessName}</h1>
      <p className="mt-3 max-w-md text-neutral-500">This website isn&apos;t live yet. Please check back soon.</p>

      <div className="mt-8 w-full max-w-sm rounded-2xl border border-neutral-200 bg-white px-6 py-5 shadow-sm">
        <p className="text-sm font-medium text-neutral-700">Is this your site?</p>
        <p className="mt-1 text-sm text-neutral-500">Publish your site first to take it live on this address.</p>
        <a
          href={`${APEX}/dashboard/publish`}
          className="mt-4 inline-block rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          Publish your site →
        </a>
      </div>

      <a href={APEX} className="mt-8 text-xs text-neutral-400 transition hover:text-neutral-600">
        Powered by Kovasite
      </a>
    </main>
  );
}
