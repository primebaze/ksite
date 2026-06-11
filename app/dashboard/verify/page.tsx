import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyKyc, getMyTenant } from "@/lib/my-site";
import { submitKycAction } from "../actions";

export const dynamic = "force-dynamic";

const input =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-white/25 focus:bg-white/[0.05]";
const label = "mb-1.5 block text-[13px] font-medium text-white/55";

export default async function VerifyPage({ searchParams }: { searchParams: Promise<{ done?: string; error?: string }> }) {
  const { done, error } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");
  const latest = await getMyKyc();
  const status = tenant.kyc_status;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Verification</h1>
        <Link href="/dashboard" className="text-sm text-white/50 hover:text-white">← Home</Link>
      </div>
      <p className="mt-1 text-sm text-white/45">Confirm your business details so we can keep your account in good standing.</p>

      {error && <p className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

      {status === "approved" ? (
        <div className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-400/10 p-6 text-emerald-200">
          <p className="font-semibold">You&apos;re verified ✓</p>
          <p className="mt-1 text-sm text-emerald-200/80">Thanks — no further action needed.</p>
        </div>
      ) : status === "submitted" || done ? (
        <div className="mt-6 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
          <p className="font-semibold text-white">Under review</p>
          <p className="mt-1 text-sm text-white/55">We&apos;ve received your details and will confirm shortly. We&apos;ll email you when it&apos;s done.</p>
        </div>
      ) : (
        <>
          {status === "rejected" && latest?.review_note && (
            <p className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
              Your last submission needs changes: {latest.review_note}
            </p>
          )}
          <form action={submitKycAction} className="mt-6 space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
            <div>
              <label className={label}>Registered business name *</label>
              <input name="legal_name" required defaultValue={latest?.legal_name ?? ""} className={input} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={label}>Business type</label><input name="business_type" placeholder="Ltd, sole trader…" defaultValue={latest?.business_type ?? ""} className={input} /></div>
              <div><label className={label}>Company / registration no.</label><input name="registration_no" defaultValue={latest?.registration_no ?? ""} className={input} /></div>
            </div>
            <div><label className={label}>Registered address</label><input name="address" defaultValue={latest?.address ?? ""} className={input} /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><label className={label}>Contact name</label><input name="contact_name" defaultValue={latest?.contact_name ?? ""} className={input} /></div>
              <div><label className={label}>Contact phone</label><input name="contact_phone" defaultValue={latest?.contact_phone ?? ""} className={input} /></div>
            </div>
            <div><label className={label}>Anything else</label><textarea name="notes" rows={2} defaultValue={latest?.notes ?? ""} className={input} /></div>
            <div className="flex justify-end">
              <button className="rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90">Submit for review</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
