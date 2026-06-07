import { checkAvailability, getDomainPrice, isVercelConfigured } from "@/lib/vercel";
import { getMyTenant } from "@/lib/my-site";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const tenant = await getMyTenant();
  if (!tenant) return Response.json({ error: "Please sign in." }, { status: 401 });
  if (!isVercelConfigured()) return Response.json({ error: "Domain search isn't switched on yet." }, { status: 503 });

  const name = (new URL(req.url).searchParams.get("name") ?? "").trim().toLowerCase();
  if (!/^[a-z0-9][a-z0-9-]*\.[a-z][a-z.]{1,}$/.test(name)) {
    return Response.json({ error: "Enter a full domain, e.g. yourbusiness.com" });
  }

  const avail = await checkAvailability(name);
  if (!avail.ok) return Response.json({ error: "Couldn't check that domain right now." });
  if (!avail.data.available) return Response.json({ name, available: false });

  const price = await getDomainPrice(name);
  return Response.json({ name, available: true, price: price.data.price ?? null, period: price.data.period ?? 1 });
}
