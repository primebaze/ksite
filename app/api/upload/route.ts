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

// Image upload. Node runtime + extra time for processing big photos. Every path
// returns JSON (never an unhandled 500), and sharp re-encodes to a clean,
// resized webp, which sanitises the file and keeps memory/time bounded.
export const runtime = "nodejs";
export const maxDuration = 60;

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];
const MAX_BYTES = 12 * 1024 * 1024;

sharp.cache(false);
sharp.concurrency(1);

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const field = String(form.get("field") ?? "hero");
    const file = form.get("file");

    const tenant = await getMyTenant();
    if (!tenant) return Response.json({ ok: false, error: "Please sign in again." }, { status: 401 });
    if (!(file instanceof File) || file.size === 0) return Response.json({ ok: false, error: "No file selected." });
    if (file.size > MAX_BYTES) return Response.json({ ok: false, error: "That image is too large. Please use one under 12MB." });
    if (!ALLOWED.includes(file.type)) return Response.json({ ok: false, error: "Please use a JPG, PNG, WEBP, AVIF or GIF." });

    let clean: Buffer;
    try {
      const input = Buffer.from(await file.arrayBuffer());
      clean = await sharp(input, { limitInputPixels: 80_000_000, failOn: "none" })
        .rotate()
        .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();
    } catch {
      return Response.json({ ok: false, error: "That image couldn't be processed. Try a JPG or PNG." });
    }

    const svc = getServiceClient();
    if (!svc) return Response.json({ ok: false, error: "Storage isn't configured yet." });

    const path = `${tenant.id}/${field}-${Date.now()}.webp`;
    const { error: upErr } = await svc.storage.from("media").upload(path, clean, { contentType: "image/webp", upsert: true });
    if (upErr) return Response.json({ ok: false, error: upErr.message });

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
    return Response.json({ ok: true, url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Upload failed. Please try again.";
    return Response.json({ ok: false, error: message }, { status: 500 });
  }
}
