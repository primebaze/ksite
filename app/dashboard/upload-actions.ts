"use server";

import sharp from "sharp";
import { revalidatePath } from "next/cache";
import { getServiceClient } from "@/lib/supabase";
import {
  getMyTenant,
  getMyTenantFull,
  updateMyContent,
  updateMyTheme,
  upsertMyGalleryImage,
} from "@/lib/my-site";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
const MAX_BYTES = 10 * 1024 * 1024;

export interface UploadState {
  ok: boolean;
  url?: string;
  error?: string;
}

// Sanitised image upload. Validates type/size, then re-encodes through sharp —
// which proves the bytes are a real image, strips all metadata/EXIF, and
// neutralises any embedded payload. SVGs and non-images are rejected. Stored
// server-side via the service key, scoped to the owner's tenant folder.
export async function uploadTenantImage(_prev: UploadState, formData: FormData): Promise<UploadState> {
  const field = String(formData.get("field") ?? "hero"); // hero | logo | gallery
  const file = formData.get("file");

  const tenant = await getMyTenant();
  if (!tenant) return { ok: false, error: "Please sign in again." };
  if (!(file instanceof File) || file.size === 0) return { ok: false, error: "No file selected." };
  if (file.size > MAX_BYTES) return { ok: false, error: "Image is too large (max 10MB)." };
  if (!ALLOWED.includes(file.type)) return { ok: false, error: "Use a JPG, PNG, WEBP, AVIF or GIF image." };

  let clean: Buffer;
  try {
    const input = Buffer.from(await file.arrayBuffer());
    clean = await sharp(input)
      .rotate()
      .resize({ width: 2200, height: 2200, fit: "inside", withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer();
  } catch {
    return { ok: false, error: "That file isn't a valid image." };
  }

  const svc = getServiceClient();
  if (!svc) return { ok: false, error: "Storage isn't configured yet." };

  const path = `${tenant.id}/${field}-${Date.now()}.webp`;
  const { error: upErr } = await svc.storage
    .from("media")
    .upload(path, clean, { contentType: "image/webp", upsert: true });
  if (upErr) return { ok: false, error: upErr.message };

  const url = svc.storage.from("media").getPublicUrl(path).data.publicUrl;

  if (field === "logo") {
    await updateMyTheme({ logo_url: url });
  } else if (field === "gallery") {
    const site = await getMyTenantFull();
    await upsertMyGalleryImage({ image_url: url, caption: null, sort_order: (site?.gallery.length ?? 0) + 1 });
  } else {
    const site = await getMyTenantFull();
    await updateMyContent({ ...(site?.content ?? {}), hero_image_url: url });
  }

  revalidatePath("/dashboard/setup/photos");
  revalidatePath("/dashboard/edit");
  return { ok: true, url };
}
