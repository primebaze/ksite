"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  deleteCatalogItem,
  deleteGalleryImage,
  deleteTeamMember,
  getTenantFull,
  requireStaff,
  setPublished,
  updateContent,
  updateTenantFields,
  updateTheme,
  upsertCatalogItem,
  upsertGalleryImage,
  upsertTeamMember,
} from "@/lib/admin";
import type { SiteContent } from "@/lib/types";

const str = (f: FormData, k: string) => {
  const v = String(f.get(k) ?? "").trim();
  return v === "" ? null : v;
};
const refresh = (id: string) => revalidatePath(`/admin/${id}`);

export async function saveBasics(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  await updateTenantFields(id, {
    business_name: String(formData.get("business_name") ?? "").trim(),
    meta_title: str(formData, "meta_title"),
    meta_description: str(formData, "meta_description"),
    og_image_url: str(formData, "og_image_url"),
    custom_domain: str(formData, "custom_domain"),
  });
  await updateTheme(id, {
    primary_color: String(formData.get("primary_color") ?? "#111111"),
    accent_color: String(formData.get("accent_color") ?? "#c8a24a"),
    font: str(formData, "font"),
  });
  refresh(id);
}

export async function togglePublish(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id"));
  const publish = String(formData.get("publish")) === "true";
  await setPublished(id, publish);
  refresh(id);
}

export async function saveContentFields(formData: FormData) {
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

// --- catalog ---------------------------------------------------------------
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

// --- gallery ---------------------------------------------------------------
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

// --- team ------------------------------------------------------------------
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
