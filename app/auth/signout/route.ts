import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

// GET sign-out endpoint used by the auth guards to end an expired session.
// A Route Handler can clear cookies (unlike a Server Component render), so
// supabase.auth.signOut() actually removes the session here.
export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  const url = new URL(request.url);
  const dest = url.searchParams.get("to") === "admin" ? "/kmanageradmin/login" : "/login";
  return NextResponse.redirect(new URL(`${dest}?expired=1`, url.origin));
}
