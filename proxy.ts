import { NextResponse, type NextRequest } from "next/server";
import { parseHost } from "@/lib/host";

// Resolve the incoming hostname to a tenant and rewrite tenant traffic into
// the /sites/[host] render route. The platform's own domain (root) is served
// as-is (dev index now; dashboard/marketing later).
// (Next 16 "proxy" convention — formerly "middleware".)
export const config = {
  matcher: ["/((?!_next/|api/|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};

export function proxy(req: NextRequest) {
  const rawHost = req.headers.get("host") ?? "";
  const parsed = parseHost(rawHost);

  if (parsed.kind === "root") {
    return NextResponse.next();
  }

  // Carry the (port-stripped) hostname so the data layer can re-derive whether
  // it's a subdomain or a custom domain.
  const url = req.nextUrl.clone();
  const suffix = url.pathname === "/" ? "" : url.pathname;
  url.pathname = `/sites/${parsed.host}${suffix}`;
  return NextResponse.rewrite(url);
}
