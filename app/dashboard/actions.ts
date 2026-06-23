"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import {
  cancelMySubscription,
  deleteMyCatalogItem,
  deleteMyGalleryImage,
  deleteMyTeamMember,
  getMyTenant,
  getMyTenantFull,
  resumeMySubscription,
  submitMyKyc,
  updateMyContent,
  updateMyTenant,
  updateMyTheme,
  upsertMyCatalogItem,
  upsertMyGalleryImage,
  upsertMyTeamMember,
} from "@/lib/my-site";
import { getStripe, priceForBilling, type BillingPeriod, type Plan } from "@/lib/stripe";
import type { SiteContent } from "@/lib/types";

const trimOrNull = (f: FormData, k: string) => {
  const v = String(f.get(k) ?? "").trim();
  return v === "" ? null : v;
};

export async function cancelSubscriptionAction() {
  let failed: string | null = null;
  try {
    await cancelMySubscription();
  } catch (e) {
    // No Stripe subscription on file (e.g. a comped/admin-published site) — never 500.
    failed = e instanceof Error ? e.message : "Couldn't cancel right now.";
  }
  revalidatePath("/dashboard/billing");
  redirect(failed ? `/dashboard/billing?error=${encodeURIComponent(failed)}` : "/dashboard/billing?canceled=1");
}

export async function resumeSubscriptionAction() {
  await resumeMySubscription();
  revalidatePath("/dashboard/billing");
  redirect("/dashboard/billing?resumed=1");
}

export async function submitKycAction(formData: FormData) {
  const legal_name = String(formData.get("legal_name") ?? "").trim();
  if (!legal_name) redirect("/dashboard/verify?error=Add+your+registered+business+name");
  await submitMyKyc({
    legal_name,
    business_type: trimOrNull(formData, "business_type"),
    registration_no: trimOrNull(formData, "registration_no"),
    address: trimOrNull(formData, "address"),
    contact_name: trimOrNull(formData, "contact_name"),
    contact_phone: trimOrNull(formData, "contact_phone"),
    notes: trimOrNull(formData, "notes"),
  });
  redirect("/dashboard/verify?done=1");
}

const str = (f: FormData, k: string) => {
  const v = String(f.get(k) ?? "").trim();
  return v === "" ? null : v;
};
const refresh = () => revalidatePath("/dashboard/edit");

export async function saveBasics(formData: FormData) {
  await updateMyTenant({
    business_name: String(formData.get("business_name") ?? "").trim(),
    meta_title: str(formData, "meta_title"),
    meta_description: str(formData, "meta_description"),
  });
  await updateMyTheme({
    primary_color: String(formData.get("primary_color") ?? "#111111"),
    accent_color: String(formData.get("accent_color") ?? "#c8a24a"),
    font: str(formData, "font"),
  });
  // Design style lives in content; merge so other content fields aren't lost.
  const style = str(formData, "style");
  if (style) {
    const site = await getMyTenantFull();
    if (site) await updateMyContent({ ...site.content, style: style as SiteContent["style"] });
  }
  refresh();
}

export async function saveContent(formData: FormData) {
  const site = await getMyTenantFull();
  if (!site) return;
  const merged: SiteContent = {
    ...site.content,
    tagline: str(formData, "tagline") ?? undefined,
    about: str(formData, "about") ?? undefined,
    phone: str(formData, "phone") ?? undefined,
    email: str(formData, "email") ?? undefined,
    address: str(formData, "address") ?? undefined,
    reservation_url: str(formData, "reservation_url") ?? undefined,
    booking_url: str(formData, "booking_url") ?? undefined,
    cta_label: str(formData, "cta_label") ?? undefined,
    cta_url: str(formData, "cta_url") ?? undefined,
  };
  await updateMyContent(merged);
  refresh();
}

// Zip repeated form fields (col[0..n]) into row objects, dropping fully-empty rows.
function zipRows(formData: FormData, cols: string[]): Record<string, string>[] {
  const colVals = cols.map((c) => formData.getAll(c).map((v) => String(v).trim()));
  const len = Math.max(0, ...colVals.map((a) => a.length));
  const rows: Record<string, string>[] = [];
  for (let i = 0; i < len; i++) {
    const row: Record<string, string> = {};
    let hasValue = false;
    cols.forEach((c, ci) => {
      const v = colVals[ci][i] ?? "";
      row[c] = v;
      if (v) hasValue = true;
    });
    if (hasValue) rows.push(row);
  }
  return rows;
}

export async function saveHours(formData: FormData) {
  const site = await getMyTenantFull();
  if (!site) return;
  const hours = zipRows(formData, ["day", "open"]) as { day: string; open: string }[];
  await updateMyContent({ ...site.content, hours });
  refresh();
}

export async function saveSocials(formData: FormData) {
  const site = await getMyTenantFull();
  if (!site) return;
  const socials = zipRows(formData, ["label", "url"]).filter((r) => r.url) as { label: string; url: string }[];
  await updateMyContent({ ...site.content, socials });
  refresh();
}

export async function saveReviews(formData: FormData) {
  const site = await getMyTenantFull();
  if (!site) return;
  const reviews = zipRows(formData, ["quote", "name", "meta"]).filter((r) => r.quote) as { quote: string; name?: string; meta?: string }[];
  await updateMyContent({ ...site.content, reviews });
  refresh();
}

export async function saveOrderingLinks(formData: FormData) {
  const site = await getMyTenantFull();
  if (!site) return;
  const ordering_links = zipRows(formData, ["label", "url"]).filter((r) => r.url) as { label: string; url: string }[];
  await updateMyContent({ ...site.content, ordering_links });
  refresh();
}

export async function catalogSave(formData: FormData) {
  await upsertMyCatalogItem({
    id: str(formData, "item_id") ?? undefined,
    section: str(formData, "section"),
    category: str(formData, "category"),
    name: String(formData.get("name") ?? "").trim(),
    description: str(formData, "description"),
    price: str(formData, "price"),
    is_available: String(formData.get("is_available")) === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  refresh();
}
export async function catalogDelete(formData: FormData) {
  await deleteMyCatalogItem(String(formData.get("item_id")));
  refresh();
}

export async function gallerySave(formData: FormData) {
  await upsertMyGalleryImage({
    id: str(formData, "item_id") ?? undefined,
    image_url: String(formData.get("image_url") ?? "").trim(),
    caption: str(formData, "caption"),
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  refresh();
}
export async function galleryDelete(formData: FormData) {
  await deleteMyGalleryImage(String(formData.get("item_id")));
  refresh();
}

export async function teamSave(formData: FormData) {
  await upsertMyTeamMember({
    id: str(formData, "item_id") ?? undefined,
    name: String(formData.get("name") ?? "").trim(),
    role: str(formData, "role"),
    credentials: str(formData, "credentials"),
    photo_url: str(formData, "photo_url"),
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  refresh();
}
export async function teamDelete(formData: FormData) {
  await deleteMyTeamMember(String(formData.get("item_id")));
  refresh();
}

// Publish = subscribe. Opens Stripe Checkout for the chosen plan; the webhook
// flips the site live once payment succeeds.
export async function startCheckout(formData: FormData) {
  // Single plan now, billed monthly or yearly. Stored plan stays "basic" so the
  // webhook and existing subscribers are unaffected; the period only chooses the
  // Stripe price.
  const plan: Plan = "basic";
  const period: BillingPeriod = String(formData.get("period") ?? "monthly") === "yearly" ? "yearly" : "monthly";
  const stripe = getStripe();
  const price = priceForBilling(period);
  if (!stripe || !price) {
    redirect(
      period === "yearly"
        ? "/dashboard/publish?error=Yearly+billing+is+not+configured+yet"
        : "/dashboard/publish?error=Billing+is+not+configured+yet",
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const tenant = await getMyTenant();
  if (!user || !tenant) redirect("/login");
  // Already subscribed, never start a second checkout.
  if (tenant.plan_status === "active" || tenant.published) redirect("/dashboard");

  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  let url: string | null = null;
  try {
    const session = await stripe!.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: price!, quantity: 1 }],
      customer_email: user!.email ?? undefined,
      client_reference_id: tenant!.id,
      // Shows an "Add promotion code" field on Stripe Checkout. Create the
      // codes/coupons in the Stripe Dashboard → Stripe validates + applies them.
      allow_promotion_codes: true,
      metadata: { tenant_id: tenant!.id, plan, period },
      subscription_data: { metadata: { tenant_id: tenant!.id, plan, period } },
      success_url: `${base}/dashboard/finishing?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/dashboard/publish?canceled=1`,
    });
    url = session.url;
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Checkout failed";
    redirect(`/dashboard/publish?error=${encodeURIComponent(msg)}`);
  }
  if (!url) redirect("/dashboard/publish?error=Could+not+start+checkout");
  redirect(url);
}

export async function clientLogout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
