import type { EmailOtpType, User, SupabaseClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
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
    // verifyOtp establishes a fresh session for THIS link's user, replacing
    // any stale session in the browser. Use the user it returns directly.
    const { data, error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error && data.user) {
      await ensureSite(supabase, data.user);
      // New clients land in the guided setup wizard.
      return NextResponse.redirect(`${origin}/dashboard/setup/look`);
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
    // Subdomain collision (rare race) — retry once with a suffix.
    const alt = `${md.subdomain}-${Date.now().toString().slice(-4)}`;
    ({ data, error } = await supabase.from("tenants").insert(row(alt)).select("id").single());
  }
  if (error || !data) return;

  await supabase.from("themes").insert({ tenant_id: data.id });
  await supabase.from("site_content").insert({ tenant_id: data.id, content: {} });
}
