import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase-server";

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
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) {
      await ensureSite(supabase);
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  }

  return NextResponse.redirect(
    `${origin}/login?error=${encodeURIComponent("That confirmation link is invalid or expired. Please sign in.")}`,
  );
}

async function ensureSite(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const md = user.user_metadata ?? {};
  if (!md.business_name || !md.preset || !md.subdomain) return;

  // Don't double-create if they click the link twice.
  const { data: existing } = await supabase.from("tenants").select("id").limit(1);
  if (existing && existing.length > 0) return;

  const { data, error } = await supabase
    .from("tenants")
    .insert({
      business_name: md.business_name,
      preset: md.preset,
      subdomain: md.subdomain,
      owner_id: user.id,
      published: false,
    })
    .select("id")
    .single();
  if (error || !data) return; // e.g. subdomain taken — dashboard will route them to /get-started

  await supabase.from("themes").insert({ tenant_id: data.id });
  await supabase.from("site_content").insert({ tenant_id: data.id, content: {} });
}
