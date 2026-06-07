import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { parseHost } from "@/lib/host";

// Resolve the incoming hostname to a tenant and rewrite tenant traffic into the
// /sites/[host] render route. On the platform's own domain, keep the Supabase
// auth session fresh for the signed-in areas (this is what prevents sign-in /
// session flakiness after sign-out, token expiry, etc.).
export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};

export async function proxy(req: NextRequest) {
  const parsed = parseHost(req.headers.get("host") ?? "");

  // Tenant site → rewrite to the render route.
  if (parsed.kind !== "root") {
    const url = req.nextUrl.clone();
    const suffix = url.pathname === "/" ? "" : url.pathname;
    url.pathname = `/sites/${parsed.host}${suffix}`;
    return NextResponse.rewrite(url);
  }

  // Platform host. Refresh the auth session on the signed-in areas so the
  // access token is rotated and written back to cookies on every request.
  const path = req.nextUrl.pathname;
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if ((path.startsWith("/dashboard") || path.startsWith("/admin")) && supabaseUrl && supabaseKey) {
    const res = NextResponse.next({ request: req });
    const supabase = createServerClient(supabaseUrl, supabaseKey, {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options)),
      },
    });
    await supabase.auth.getUser();
    return res;
  }

  return NextResponse.next();
}
