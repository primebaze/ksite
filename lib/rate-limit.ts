import "server-only";
import { headers } from "next/headers";
import { getServiceClient } from "./supabase";

// Fixed-window rate limit backed by Postgres (migration 0008). Returns true if
// the request is allowed. Fail-open: if the limiter errors or isn't configured,
// allow the request rather than break the feature.
export async function rateLimit(key: string, max: number, windowSeconds: number): Promise<boolean> {
  const svc = getServiceClient();
  if (!svc) return true;
  try {
    const { data, error } = await svc.rpc("rate_limit_check", { p_key: key, p_max: max, p_window: windowSeconds });
    if (error) return true;
    return data !== false;
  } catch {
    return true;
  }
}

// Best-effort client IP from the proxy headers (Vercel sets x-forwarded-for).
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Same, for Server Actions (no Request object — read the request headers).
export async function ipFromHeaders(): Promise<string> {
  const h = await headers();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return h.get("x-real-ip") || "unknown";
}
