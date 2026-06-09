import { refreshMyDomainStatus } from "@/lib/my-site";

export const runtime = "nodejs";

// Polled by the dashboard while a custom domain is propagating. Re-checks the
// domain against Vercel, persists the status, and (on the go-live edge) sends
// the "your domain is live" email. Runs as the signed-in client via RLS.
export async function GET() {
  const result = await refreshMyDomainStatus();
  return Response.json(result);
}
