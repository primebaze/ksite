"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import {
  deleteMyCatalogItem,
  deleteMyGalleryImage,
  deleteMyTeamMember,
  getMyTenant,
  getMyTenantFull,
  updateMyContent,
  updateMyTenant,
  updateMyTheme,
  upsertMyCatalogItem,
  upsertMyGalleryImage,
  upsertMyTeamMember,
} from "@/lib/my-site";
import { getStripe, priceForPlan, type Plan } from "@/lib/stripe";
import type { SiteContent } from "@/lib/types";

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

export async function saveContentRaw(formData: FormData) {
  const raw = String(formData.get("content_json") ?? "");
  let parsed: SiteContent;
  try {
    parsed = JSON.parse(raw);
  } catch {
    redirect("/dashboard/edit?error=Invalid+JSON");
  }
  await updateMyContent(parsed!);
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
  const plan = (String(formData.get("plan") ?? "standard") as Plan) || "standard";
  const stripe = getStripe();
  const price = priceForPlan(plan);
  if (!stripe || !price) redirect("/dashboard/publish?error=Billing+is+not+configured+yet");

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
      metadata: { tenant_id: tenant!.id, plan },
      subscription_data: { metadata: { tenant_id: tenant!.id, plan } },
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
