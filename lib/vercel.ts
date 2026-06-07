import "server-only";

// Client over Vercel's Domains Registrar + Project Domains APIs. Lets the app
// check availability, register a domain in-app, and attach hostnames (bought
// domains or kovasite.com subdomains) to the project so Vercel routes + issues
// SSL. Needs VERCEL_TOKEN + VERCEL_PROJECT_ID (+ VERCEL_TEAM_ID for a team).

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

// The legal registrant for domains we buy on a client's behalf (we hold them).
function registrant() {
  const e = process.env;
  const c = {
    firstName: e.REGISTRANT_FIRST_NAME,
    lastName: e.REGISTRANT_LAST_NAME,
    email: e.REGISTRANT_EMAIL,
    phone: e.REGISTRANT_PHONE,
    address1: e.REGISTRANT_ADDRESS1,
    city: e.REGISTRANT_CITY,
    state: e.REGISTRANT_STATE,
    zip: e.REGISTRANT_ZIP,
    country: e.REGISTRANT_COUNTRY,
  };
  if (Object.values(c).some((v) => !v)) return null;
  return c as Record<string, string>;
}

export function isRegistrantConfigured(): boolean {
  return registrant() !== null;
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

// --- Registrar: search + buy ------------------------------------------------
export async function checkAvailability(domain: string) {
  return api<{ available?: boolean }>(`/v1/registrar/domains/${encodeURIComponent(domain)}/availability`);
}

export async function buyDomain(domain: string) {
  const contact = registrant();
  if (!contact) {
    return { ok: false, status: 0, data: { error: { message: "Registrant contact isn't configured." } } } as ApiResult<{
      orderId?: string;
      error?: { message?: string };
    }>;
  }
  return api<{ orderId?: string; error?: { message?: string } }>(`/v1/registrar/domains/buy`, {
    method: "POST",
    body: JSON.stringify({ domains: [domain], contactInformation: contact }),
  });
}

// --- Project domains: attach + verify ---------------------------------------
export async function addProjectDomain(domain: string) {
  const c = creds()!;
  return api<{ error?: { message?: string } }>(`/v10/projects/${c.projectId}/domains`, {
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
  return api<{ verified?: boolean }>(`/v9/projects/${c.projectId}/domains/${domain}`);
}

export async function getDomainConfig(domain: string) {
  return api<{ misconfigured?: boolean }>(`/v6/domains/${domain}/config`);
}

export async function isDomainLive(domain: string): Promise<boolean> {
  const [d, cfg] = await Promise.all([getProjectDomain(domain), getDomainConfig(domain)]);
  return Boolean(d.ok && d.data.verified && cfg.ok && cfg.data.misconfigured === false);
}

// The DNS record a client must set for a domain they already own. Apex → A.
export function dnsInstructions(domain: string): { type: "A" | "CNAME"; name: string; value: string } {
  const labels = domain.split(".");
  if (labels.length <= 2) return { type: "A", name: "@", value: "76.76.21.21" };
  return { type: "CNAME", name: labels[0], value: "cname.vercel-dns.com" };
}
