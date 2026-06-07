// Shown when a tenant is unpublished or non-paying (past_due is still live;
// suspended/canceled are not). Keeps a leaving/unpaid client off the live site
// without 404-ing their domain.
export default function HoldingPage({ businessName }: { businessName: string }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-stone-100 px-6 text-center text-stone-700">
      <h1 className="text-2xl font-semibold">{businessName}</h1>
      <p className="mt-3 max-w-md text-stone-500">
        This website is currently unavailable. Please check back soon.
      </p>
    </main>
  );
}
