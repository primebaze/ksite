import Link from "next/link";
import { notFound } from "next/navigation";
import { getTenantFull, getTenantBilling, getLatestKyc, getClientAuth } from "@/lib/admin";
import { SITE_BASE } from "@/lib/marketing";
import { VERTICALS, verticalFor } from "@/lib/verticals";
import { SiteEditor, type EditorActions } from "@/components/SiteEditor";
import {
  cancelSubscriptionAction,
  catalogDelete,
  catalogSave,
  emailClientAction,
  galleryDelete,
  gallerySave,
  requestKycAction,
  reviewKycAction,
  saveBasics,
  saveContent,
  saveContentRaw,
  saveHours,
  saveOrderingLinks,
  saveSettings,
  saveSocials,
  setAccountStatusAction,
  teamDelete,
  teamSave,
  togglePublish,
  updateClientAuthAction,
} from "./actions";

export const dynamic = "force-dynamic";

const card = "rounded-2xl border border-ink/10 bg-ink/[0.03] p-6";
const input =
  "mt-1 w-full rounded-lg border border-ink/10 bg-ink/[0.03] px-3 py-2 text-sm text-ink placeholder-ink/30 outline-none focus:border-ink/30 [&>option]:bg-panel-2";
const label = "text-xs text-ink/40";
const btn = "rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400";

// Shared editor uses the staff (service-role) actions so any tenant is editable.
const editorActions: EditorActions = {
  saveBasics,
  saveContent,
  saveHours,
  saveSocials,
  saveOrderingLinks,
  catalogSave,
  catalogDelete,
  gallerySave,
  galleryDelete,
  teamSave,
  teamDelete,
};

// Group verticals for the preset picker (150+ entries).
const PRESET_GROUPS = VERTICALS.reduce<Record<string, { key: string; label: string }[]>>((acc, v) => {
  (acc[v.group] ??= []).push({ key: v.key, label: v.label });
  return acc;
}, {});

function Badge({ tone, children }: { tone: "green" | "amber" | "red" | "neutral"; children: React.ReactNode }) {
  const tones = {
    green: "bg-emerald-400/15 text-accent",
    amber: "bg-amber-400/15 text-amber-300",
    red: "bg-red-400/15 text-red-300",
    neutral: "bg-ink/10 text-ink/60",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

const PLAN_TONE: Record<string, "green" | "amber" | "red" | "neutral"> = {
  active: "green",
  trialing: "green",
  past_due: "amber",
  suspended: "red",
  canceled: "red",
};
const DOMAIN_TONE: Record<string, "green" | "amber" | "red" | "neutral"> = {
  active: "green",
  error: "red",
  pending: "amber",
  registering: "amber",
  verifying: "amber",
};

export default async function EditTenant({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string; notice?: string }>;
}) {
  const { id } = await params;
  const { error, notice } = await searchParams;
  const site = await getTenantFull(id);
  if (!site) notFound();
  const { tenant, content } = site;
  const [billing, kyc, clientAuth] = await Promise.all([getTenantBilling(id), getLatestKyc(id), getClientAuth(id)]);
  const subscribed = tenant.plan_status === "active" || tenant.plan_status === "trialing" || tenant.published;
  const fmtDay = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  const proto = SITE_BASE.includes("localhost") ? "http" : "https";
  const liveHost = tenant.custom_domain ?? `${tenant.subdomain}.${SITE_BASE}`;
  const liveUrl = tenant.custom_domain ? `https://${tenant.custom_domain}` : `${proto}://${tenant.subdomain}.${SITE_BASE}`;
  const verticalLabel = verticalFor(tenant.preset)?.label ?? tenant.preset;

  return (
    <div className="space-y-6">
      <Link href="/kmanageradmin" className="text-sm text-ink/45 hover:text-ink">← Clients</Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold">{tenant.business_name}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink/45">
            <span className="uppercase tracking-wide">{verticalLabel}</span>
            <span>·</span>
            <a href={liveUrl} target="_blank" rel="noreferrer" className="text-accent hover:underline">{liveHost} ↗</a>
          </p>
        </div>
        <form action={togglePublish}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="publish" value={(!tenant.published).toString()} />
          <button className={tenant.published ? "rounded-lg border border-ink/15 px-4 py-2 text-sm font-medium text-ink/80 transition hover:bg-ink/5" : btn}>
            {tenant.published ? "Unpublish" : "Publish"}
          </button>
        </form>
      </div>

      {/* Status */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={tenant.published ? "green" : "neutral"}>{tenant.published ? "Published" : "Draft"}</Badge>
        <Badge tone={PLAN_TONE[tenant.plan_status] ?? "neutral"}>
          {tenant.plan ? `${tenant.plan} · ` : ""}{tenant.plan_status}
        </Badge>
        <Badge tone={DOMAIN_TONE[tenant.domain_status] ?? "neutral"}>
          domain: {tenant.domain_status}
        </Badge>
        {tenant.account_status === "suspended" && <Badge tone="red">suspended</Badge>}
        {tenant.kyc_status && tenant.kyc_status !== "none" && (
          <Badge tone={tenant.kyc_status === "approved" ? "green" : tenant.kyc_status === "rejected" ? "red" : "amber"}>KYC: {tenant.kyc_status}</Badge>
        )}
      </div>

      {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}
      {notice && <p className="rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-accent">{notice}</p>}

      {/* Account & billing (staff) */}
      <section className={card}>
        <h2 className="text-lg font-semibold">Account &amp; billing <span className="ml-1 align-middle text-xs font-normal text-ink/35">staff only</span></h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {/* Account status */}
          <div className="rounded-xl border border-ink/[0.08] p-4">
            <p className="text-sm font-medium text-ink/80">Account status</p>
            <p className="mt-0.5 text-xs text-ink/45">
              {tenant.account_status === "suspended" ? "Site offline + dashboard blocked." : "Active and editable."}
            </p>
            <form action={setAccountStatusAction} className="mt-3">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="status" value={tenant.account_status === "suspended" ? "active" : "suspended"} />
              <button className={tenant.account_status === "suspended" ? btn : "rounded-lg border border-red-400/30 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/10"}>
                {tenant.account_status === "suspended" ? "Reactivate account" : "Suspend account"}
              </button>
            </form>
          </div>

          {/* Subscription */}
          <div className="rounded-xl border border-ink/[0.08] p-4">
            <p className="text-sm font-medium text-ink/80">Subscription</p>
            <p className="mt-0.5 text-xs text-ink/45">
              {!subscribed
                ? "No active subscription."
                : billing?.cancel_at
                  ? `Cancels on ${fmtDay(billing.cancel_at)} (period end).`
                  : "Active · renews automatically."}
            </p>
            {subscribed && !billing?.cancel_at && (
              <form action={cancelSubscriptionAction} className="mt-3">
                <input type="hidden" name="id" value={id} />
                <button className="rounded-lg border border-red-400/30 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/10">Cancel at period end</button>
              </form>
            )}
          </div>

          {/* KYC */}
          <div className="rounded-xl border border-ink/[0.08] p-4 sm:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-medium text-ink/80">Verification (KYC)</p>
              <Badge tone={tenant.kyc_status === "approved" ? "green" : tenant.kyc_status === "rejected" ? "red" : tenant.kyc_status === "none" ? "neutral" : "amber"}>{tenant.kyc_status}</Badge>
            </div>
            {kyc && (
              <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
                <div className="flex gap-2"><dt className="text-ink/40">Legal name</dt><dd className="text-ink/80">{kyc.legal_name}</dd></div>
                {kyc.business_type && <div className="flex gap-2"><dt className="text-ink/40">Type</dt><dd className="text-ink/80">{kyc.business_type}</dd></div>}
                {kyc.registration_no && <div className="flex gap-2"><dt className="text-ink/40">Reg no.</dt><dd className="text-ink/80">{kyc.registration_no}</dd></div>}
                {kyc.address && <div className="flex gap-2"><dt className="text-ink/40">Address</dt><dd className="text-ink/80">{kyc.address}</dd></div>}
                {kyc.contact_name && <div className="flex gap-2"><dt className="text-ink/40">Contact</dt><dd className="text-ink/80">{kyc.contact_name} {kyc.contact_phone}</dd></div>}
                {kyc.notes && <div className="flex gap-2 sm:col-span-2"><dt className="text-ink/40">Notes</dt><dd className="text-ink/80">{kyc.notes}</dd></div>}
              </dl>
            )}
            <div className="mt-3 flex flex-wrap items-end gap-2">
              <form action={requestKycAction}>
                <input type="hidden" name="id" value={id} />
                <button className="rounded-lg border border-ink/15 px-4 py-2 text-sm font-medium text-ink/80 transition hover:bg-ink/5">
                  {tenant.kyc_status === "none" ? "Request KYC" : "Re-request KYC"}
                </button>
              </form>
              {kyc && kyc.status === "submitted" && (
                <form action={reviewKycAction} className="flex flex-1 flex-wrap items-end gap-2">
                  <input type="hidden" name="id" value={id} />
                  <input type="hidden" name="submission_id" value={kyc.id} />
                  <input name="review_note" placeholder="Note (optional, shown if rejected)" className={`${input} mt-0 flex-1`} />
                  <button name="decision" value="approve" className={btn}>Approve</button>
                  <button name="decision" value="reject" className="rounded-lg border border-red-400/30 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/10">Reject</button>
                </form>
              )}
            </div>
          </div>

          {/* Client login (staff override) */}
          <div className="rounded-xl border border-ink/[0.08] p-4 sm:col-span-2">
            <p className="text-sm font-medium text-ink/80">Client login</p>
            <p className="mt-0.5 text-xs text-ink/45">
              {clientAuth ? "Change their sign-in email or set a new password for them." : "No client account is linked to this site."}
            </p>
            {clientAuth && (
              <form action={updateClientAuthAction} className="mt-3 grid gap-3 sm:grid-cols-2">
                <input type="hidden" name="id" value={id} />
                <div>
                  <label className={label}>Login email</label>
                  <input name="client_email" type="email" defaultValue={clientAuth.email ?? ""} className={input} />
                </div>
                <div>
                  <label className={label}>New password (optional)</label>
                  <input name="client_password" type="text" placeholder="Leave blank to keep" className={input} />
                </div>
                <div className="sm:col-span-2"><button className={btn}>Update client login</button></div>
              </form>
            )}
          </div>

          {/* Email the client */}
          <div className="rounded-xl border border-ink/[0.08] p-4 sm:col-span-2">
            <p className="text-sm font-medium text-ink/80">Email the client</p>
            <form action={emailClientAction} className="mt-3 space-y-3">
              <input type="hidden" name="id" value={id} />
              <input name="subject" placeholder="Subject" className={`${input} mt-0`} />
              <textarea name="body" rows={3} placeholder="Write a message…" className={`${input} mt-0`} />
              <div className="flex justify-end"><button className={btn}>Send email</button></div>
            </form>
          </div>
        </div>
      </section>

      {/* Staff-only settings */}
      <section className={card}>
        <h2 className="text-lg font-semibold">Settings &amp; status <span className="ml-1 align-middle text-xs font-normal text-ink/35">staff only</span></h2>
        <p className="mt-0.5 text-sm text-ink/45">Plan, vertical, domain and the bespoke design override. Clients can&apos;t change these.</p>
        <form action={saveSettings} className="mt-5 space-y-4">
          <input type="hidden" name="id" value={id} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Business type (preset)</label>
              <select name="preset" defaultValue={tenant.preset} className={input}>
                {Object.entries(PRESET_GROUPS).map(([group, items]) => (
                  <optgroup key={group} label={group}>
                    {items.map((it) => (
                      <option key={it.key} value={it.key}>{it.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Plan</label>
              <select name="plan" defaultValue={tenant.plan ?? ""} className={input}>
                <option value="">None</option>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Custom domain</label>
              <input name="custom_domain" defaultValue={tenant.custom_domain ?? ""} placeholder="example.com" className={input} />
            </div>
            <div>
              <label className={label}>Design override (bespoke key)</label>
              <input name="design" defaultValue={content.design ?? ""} placeholder="e.g. ember (overrides style)" className={input} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>OG image URL</label>
              <input name="og_image_url" defaultValue={tenant.og_image_url ?? ""} className={input} />
            </div>
            <div>
              <label className={label}>Analytics ID</label>
              <input name="analytics_id" defaultValue={tenant.analytics_id ?? ""} className={input} />
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2 text-sm text-ink/70">
              <input type="checkbox" name="booking_enabled" defaultChecked={content.booking_enabled !== false} /> Booking form enabled
            </label>
            <label className="flex items-center gap-2 text-sm text-ink/70">
              <input type="checkbox" name="contact_form_enabled" defaultChecked={content.contact_form_enabled !== false} /> Contact form enabled
            </label>
          </div>
          <button className={btn}>Save settings</button>
        </form>
      </section>

      {/* Full content editor — same component the client dashboard uses */}
      <SiteEditor site={site} actions={editorActions} />

      {/* Advanced raw JSON */}
      <section className={card}>
        <h2 className="text-lg font-semibold">Advanced: full content JSON</h2>
        <p className="mt-0.5 text-sm text-ink/45">Direct edit of the whole content blob (hours, links, variants, anything not above). Replaces it entirely.</p>
        <form action={saveContentRaw} className="mt-4">
          <input type="hidden" name="id" value={id} />
          <textarea name="content_json" rows={12} defaultValue={JSON.stringify(content, null, 2)} className={`${input} font-mono text-xs`} />
          <button className={`${btn} mt-3`}>Save JSON</button>
        </form>
      </section>
    </div>
  );
}
