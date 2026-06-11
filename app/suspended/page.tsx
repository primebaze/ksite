import { redirect } from "next/navigation";
import { getMyTenant, getMyUser } from "@/lib/my-site";
import { isStaff } from "@/lib/staff";
import { clientLogout } from "../dashboard/actions";

export const dynamic = "force-dynamic";
export const metadata: import("next").Metadata = { robots: { index: false, follow: false } };

export default async function SuspendedPage() {
  const user = await getMyUser();
  if (!user) redirect("/login");
  if (isStaff(user.email)) redirect("/kmanageradmin");
  // If they're not actually suspended, send them back to the dashboard.
  const tenant = await getMyTenant();
  if (tenant && tenant.account_status !== "suspended") redirect("/dashboard");

  return (
    <main className="grid min-h-screen place-items-center bg-panel px-4 py-10 text-ink">
      <div className="w-full max-w-md rounded-2xl border border-ink/10 bg-ink/[0.03] p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-amber-400/15 text-amber-300">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-6"><path d="M12 9v4m0 4h.01M10.3 3.86l-8 14A1 1 0 003.16 19h17.68a1 1 0 00.86-1.5l-8-14a1 1 0 00-1.74 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="mt-5 text-xl font-semibold">Your account is on hold</h1>
        <p className="mt-2 text-sm leading-relaxed text-ink/55">
          Access to your dashboard is paused and your site is temporarily offline. This is usually about billing or
          verification. Email us at <a href="mailto:hello@kovasite.com" className="text-accent underline">hello@kovasite.com</a> and we&apos;ll sort it quickly.
        </p>
        <form action={clientLogout} className="mt-6">
          <button className="rounded-xl border border-ink/15 px-4 py-2.5 text-sm font-medium text-ink/70 transition hover:bg-ink/[0.06]">Sign out</button>
        </form>
      </div>
    </main>
  );
}
