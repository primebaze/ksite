import { checkAvailability, getDomainPrice, isVercelConfigured } from "@/lib/vercel";
import { getMyTenant } from "@/lib/my-site";
import { rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const tenant = await getMyTenant();
  if (!tenant) return Response.json({ error: "Please sign in." }, { status: 401 });
  if (!(await rateLimit(`domsearch:${tenant.id}`, 30, 60))) {
    return Response.json({ error: "Too many searches. Please wait a moment." }, { status: 429 });
  }
  if (!isVercelConfigured()) return Response.json({ error: "Domain search isn't switched on yet." }, { status: 503 });

  const name = (new URL(req.url).searchParams.get("name") ?? "").trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]*\.[a-z][a-z.]{1,}$/.test(name)) {
    return Response.json({ error: "Enter a full domain, e.g. yourbusiness.com" });
  }

  const avail = await checkAvailability(name);
  if (!avail.ok) return Response.json({ error: "Couldn't check that domain right now." });
  if (avail.data.available !== true) return Response.json({ name, available: false });

  // Whether Vercel can actually register this TLD (e.g. .co.uk cannot be — the
  // client would connect one they own instead).
  const price = await getDomainPrice(name);
  return Response.json({ name, available: true, supported: price.supported });
}
