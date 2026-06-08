import type { EmailOtpType, User, SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { starterContent } from "@/lib/starter";

export const runtime = "nodejs";

// Email confirmation lands here. Verify the token, then (first time only)
// create the client's site from the details they gave at signup, and send
// them to their dashboard.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;

  const supabase = await createSupabaseServerClient();

  if (token_hash && type) {
    // verifyOtp establishes a fresh session for THIS link's user, replacing
    // any stale session in the browser. Use the user it returns directly.
    const { data, error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error && data.user) {
      await ensureSite(supabase, data.user);
      // New clients land directly on the site so they can edit the chosen
      // design on-screen before publishing.
      return NextResponse.redirect(`${origin}/preview?edit=1`);
    }
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent("That confirmation link is invalid or expired. Please sign in.")}`,
  );
}

// Create the site for the exact user the link verified, from the details they
// gave at signup (stored in user_metadata). Idempotent.
async function ensureSite(supabase: SupabaseClient, user: User) {
  const md = user.user_metadata ?? {};
  if (!md.business_name || !md.preset || !md.subdomain) return;

  // This user already has a site? Don't make a second one.
  const { data: existing } = await supabase
    .from("tenants")
    .select("id")
    .eq("owner_id", user.id)
    .limit(1);
  if (existing && existing.length > 0) return;

  const row = (subdomain: string) => ({
    business_name: md.business_name,
    preset: md.preset,
    subdomain,
    owner_id: user.id,
    published: false,
  });

  let { data, error } = await supabase.from("tenants").insert(row(md.subdomain)).select("id").single();
  if (error) {
    // Subdomain collision (rare race). Retry once with a suffix.
    const alt = `${md.subdomain}-${Date.now().toString().slice(-4)}`;
    ({ data, error } = await supabase.from("tenants").insert(row(alt)).select("id").single());
  }
  if (error || !data) return;

  // Seed a complete, editable starter site for the business type.
  const starter = starterContent(md.selected_design || md.preset);
  if (["editorial", "warm", "bold", "minimal", "luxe", "classic"].includes(md.selected_style)) {
    starter.content.style = md.selected_style;
  }
  await supabase.from("themes").insert({
    tenant_id: data.id,
    primary_color: starter.theme.primary_color,
    accent_color: starter.theme.accent_color,
    font: starter.theme.font,
  });
  await supabase.from("site_content").insert({ tenant_id: data.id, content: starter.content });
  if (starter.items.length) {
    await supabase.from("catalog_items").insert(
      starter.items.map((it, i) => ({
        tenant_id: data!.id,
        section: it.section ?? null,
        category: it.category ?? null,
        name: it.name,
        description: it.description ?? null,
        price: it.price ?? null,
        is_available: true,
        sort_order: i + 1,
      })),
    );
  }
}
