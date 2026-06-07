import { getMyTenant } from "@/lib/my-site";

export const runtime = "nodejs";

// Lightweight status poll for the post-payment "assembling" screen.
export async function GET() {
  const tenant = await getMyTenant();
  if (!tenant) return Response.json({ found: false, live: false });
  const live = tenant.published || tenant.plan_status === "active";
  return Response.json({ found: true, live, subdomain: tenant.subdomain });
}
