import "server-only";

// Thin client over the Vercel Domains API. Lets the app attach a customer's
// domain (or their kovasite.com subdomain) to the project so Vercel routes it
// and issues SSL automatically. Needs VERCEL_TOKEN + VERCEL_PROJECT_ID
// (+ VERCEL_TEAM_ID for team projects).

const BASE = "https://api.vercel.com";

function creds() {
  const token = process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  if (!token || !projectId) return null;
  return { token, projectId, teamId };
}

export function isVercelConfigured(): boolean {
  return creds() !== null;
}

interface ApiResult<T = Record<string, unknown>> {
  ok: boolean;
  status: number;
  data: T;
}

async function api<T = Record<string, unknown>>(path: string, init?: RequestInit): Promise<ApiResult<T>> {
  const c = creds();
  if (!c) throw new Error("Vercel API not configured");
  const sep = path.includes("?") ? "&" : "?";
  const url = `${BASE}${path}${c.teamId ? `${sep}teamId=${c.teamId}` : ""}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${c.token}`,
      "content-type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  const data = (await res.json().catch(() => ({}))) as T;
  return { ok: res.ok, status: res.status, data };
}

export async function addProjectDomain(domain: string) {
  const c = creds()!;
  return api(`/v10/projects/${c.projectId}/domains`, {
    method: "POST",
    body: JSON.stringify({ name: domain }),
  });
}

export async function removeProjectDomain(domain: string) {
  const c = creds()!;
  return api(`/v9/projects/${c.projectId}/domains/${domain}`, { method: "DELETE" });
}

export async function getProjectDomain(domain: string) {
  const c = creds()!;
  return api<{ verified?: boolean; verification?: { type: string; domain: string; value: string }[] }>(
    `/v9/projects/${c.projectId}/domains/${domain}`,
  );
}

export async function getDomainConfig(domain: string) {
  return api<{ misconfigured?: boolean }>(`/v6/domains/${domain}/config`);
}

// --- Buying a domain in-app -------------------------------------------------
export async function checkAvailability(domain: string) {
  return api<{ available?: boolean }>(`/v4/domains/status?name=${encodeURIComponent(domain)}`);
}

export async function getDomainPrice(domain: string) {
  return api<{ price?: number; period?: number }>(`/v4/domains/price?name=${encodeURIComponent(domain)}`);
}

export async function buyDomain(domain: string, expectedPrice?: number) {
  return api<{ error?: { message?: string } }>(`/v4/domains/buy`, {
    method: "POST",
    body: JSON.stringify({ name: domain, expectedPrice, renew: true }),
  });
}

// True when Vercel reports the domain verified and DNS correctly pointed.
export async function isDomainLive(domain: string): Promise<boolean> {
  const [d, cfg] = await Promise.all([getProjectDomain(domain), getDomainConfig(domain)]);
  return Boolean(d.ok && d.data.verified && cfg.ok && cfg.data.misconfigured === false);
}

// The DNS record the customer must set. Apex → A record; subdomain → CNAME.
export function dnsInstructions(domain: string): { type: "A" | "CNAME"; name: string; value: string } {
  const labels = domain.split(".");
  const isApex = labels.length <= 2;
  if (isApex) return { type: "A", name: "@", value: "76.76.21.21" };
  return { type: "CNAME", name: labels[0], value: "cname.vercel-dns.com" };
}
