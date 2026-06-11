"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  cancelSubscriptionForTenant,
  deleteCatalogItem,
  deleteGalleryImage,
  deleteTeamMember,
  emailClient,
  getTenantFull,
  requestKyc,
  requireStaff,
  reviewKyc,
  setAccountStatus,
  setPublished,
  updateContent,
  updateTenantFields,
  updateTheme,
  upsertCatalogItem,
  upsertGalleryImage,
  upsertTeamMember,
} from "@/lib/admin";
import type { AccountStatus } from "@/lib/types";
import { isVertical } from "@/lib/verticals";
import type { SiteContent, Tenant } from "@/lib/types";

const str = (f: FormData, k: string) => {
  const v = String(f.get(k) ?? "").trim();
  return v === "" ? null : v;
};
const refresh = (id: string) => revalidatePath(`/admin/${id}`);

// Zip repeated form fields (col[0..n]) into row objects, dropping empty rows.
// Mirrors the client dashboard so the shared <SiteEditor> works identically.
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

// --- shared <SiteEditor> actions (parity with the client dashboard) --------
// Basics posts: business_name, colours, font, design style, SEO title/desc.
// It must NOT touch custom_domain / og_image / plan — those live in the
// staff-only settings form, so saving here can't silently wipe them.
export async function saveBasics(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  await updateTenantFields(id, {
    business_name: String(formData.get("business_name") ?? "").trim(),
    meta_title: str(formData, "meta_title"),
    meta_description: str(formData, "meta_description"),
  });
  await updateTheme(id, {
    primary_color: String(formData.get("primary_color") ?? "#111111"),
    accent_color: String(formData.get("accent_color") ?? "#c8a24a"),
    font: str(formData, "font"),
  });
  const style = str(formData, "style");
  if (style) {
    const site = await getTenantFull(id);
    if (site) await updateContent(id, { ...site.content, style: style as SiteContent["style"] });
  }
  refresh(id);
}

export async function saveContent(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const site = await getTenantFull(id);
  if (!site) redirect("/admin");
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
  await updateContent(id, merged);
  refresh(id);
}

export async function saveHours(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const site = await getTenantFull(id);
  if (!site) redirect("/admin");
  const hours = zipRows(formData, ["day", "open"]) as { day: string; open: string }[];
  await updateContent(id, { ...site.content, hours });
  refresh(id);
}

export async function saveSocials(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const site = await getTenantFull(id);
  if (!site) redirect("/admin");
  const socials = zipRows(formData, ["label", "url"]).filter((r) => r.url) as { label: string; url: string }[];
  await updateContent(id, { ...site.content, socials });
  refresh(id);
}

export async function saveOrderingLinks(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const site = await getTenantFull(id);
  if (!site) redirect("/admin");
  const ordering_links = zipRows(formData, ["label", "url"]).filter((r) => r.url) as { label: string; url: string }[];
  await updateContent(id, { ...site.content, ordering_links });
  refresh(id);
}

// --- staff-only: site settings & status ------------------------------------
export async function saveSettings(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const preset = String(formData.get("preset") ?? "").trim();
  const plan = (str(formData, "plan") as Tenant["plan"]) ?? null;
  await updateTenantFields(id, {
    ...(isVertical(preset) ? { preset } : {}),
    plan,
    custom_domain: str(formData, "custom_domain"),
    og_image_url: str(formData, "og_image_url"),
    analytics_id: str(formData, "analytics_id"),
  });
  // Bespoke design override + lead-form toggles live in the content blob.
  const site = await getTenantFull(id);
  if (site) {
    await updateContent(id, {
      ...site.content,
      design: str(formData, "design") ?? undefined,
      booking_enabled: formData.get("booking_enabled") === "on",
      contact_form_enabled: formData.get("contact_form_enabled") === "on",
    });
  }
  refresh(id);
}

// --- account actions (staff) -----------------------------------------------
export async function emailClientAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!subject || !body) redirect(`/admin/${id}?error=Add+a+subject+and+message`);
  try {
    await emailClient(id, subject, body);
  } catch (e) {
    redirect(`/admin/${id}?error=${encodeURIComponent(e instanceof Error ? e.message : "Email failed")}`);
  }
  redirect(`/admin/${id}?notice=Email+sent`);
}

export async function setAccountStatusAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const status = String(formData.get("status") ?? "") as AccountStatus;
  if (status !== "active" && status !== "suspended") return;
  await setAccountStatus(id, status);
  refresh(id);
}

export async function requestKycAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  await requestKyc(id);
  redirect(`/admin/${id}?notice=KYC+requested`);
}

export async function reviewKycAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const submissionId = String(formData.get("submission_id") ?? "");
  const approve = String(formData.get("decision")) === "approve";
  const note = String(formData.get("review_note") ?? "").trim() || null;
  if (submissionId) await reviewKyc(id, submissionId, approve, note);
  refresh(id);
}

export async function cancelSubscriptionAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  try {
    await cancelSubscriptionForTenant(id);
  } catch (e) {
    redirect(`/admin/${id}?error=${encodeURIComponent(e instanceof Error ? e.message : "Cancel failed")}`);
  }
  redirect(`/admin/${id}?notice=Subscription+set+to+cancel+at+period+end`);
}

export async function togglePublish(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const publish = String(formData.get("publish")) === "true";
  await setPublished(id, publish);
  refresh(id);
}

export async function saveContentRaw(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const raw = String(formData.get("content_json") ?? "");
  let parsed: SiteContent;
  try {
    parsed = JSON.parse(raw);
  } catch {
    redirect(`/admin/${id}?error=Invalid+JSON`);
  }
  await updateContent(id, parsed!);
  refresh(id);
}

// --- catalog / gallery / team (shared <SiteEditor> item forms) -------------
export async function catalogSave(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  await upsertCatalogItem(id, {
    id: str(formData, "item_id") ?? undefined,
    section: str(formData, "section"),
    category: str(formData, "category"),
    name: String(formData.get("name") ?? "").trim(),
    description: str(formData, "description"),
    price: str(formData, "price"),
    is_available: String(formData.get("is_available")) === "on",
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  refresh(id);
}
export async function catalogDelete(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  await deleteCatalogItem(id, String(formData.get("item_id")));
  refresh(id);
}

export async function gallerySave(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  await upsertGalleryImage(id, {
    id: str(formData, "item_id") ?? undefined,
    image_url: String(formData.get("image_url") ?? "").trim(),
    caption: str(formData, "caption"),
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  refresh(id);
}
export async function galleryDelete(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  await deleteGalleryImage(id, String(formData.get("item_id")));
  refresh(id);
}

export async function teamSave(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  await upsertTeamMember(id, {
    id: str(formData, "item_id") ?? undefined,
    name: String(formData.get("name") ?? "").trim(),
    role: str(formData, "role"),
    credentials: str(formData, "credentials"),
    photo_url: str(formData, "photo_url"),
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  refresh(id);
}
export async function teamDelete(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  await deleteTeamMember(id, String(formData.get("item_id")));
  refresh(id);
}
