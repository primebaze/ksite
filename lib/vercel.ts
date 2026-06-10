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
  const phone = normalizeE164Phone(e.REGISTRANT_PHONE, e.REGISTRANT_COUNTRY);
  const c = {
    firstName: e.REGISTRANT_FIRST_NAME,
    lastName: e.REGISTRANT_LAST_NAME,
    email: e.REGISTRANT_EMAIL,
    phone,
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

function normalizeE164Phone(phone: string | undefined, country: string | undefined): string | undefined {
  const raw = phone?.trim();
  if (!raw) return undefined;

  const compact = raw.replace(/[^\d+]/g, "");
  if (compact.startsWith("+")) return compact;
  if (compact.startsWith("00")) return `+${compact.slice(2)}`;

  const countryCode = country?.trim().toUpperCase();
  if (countryCode === "GB" || countryCode === "UK" || countryCode === "UNITED KINGDOM") {
    return `+44${compact.replace(/^0+/, "")}`;
  }

  return compact;
}

function isE164Phone(phone: string): boolean {
  return /^\+[1-9]\d{1,14}$/.test(phone);
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

// --- Registrar: search, price, buy ------------------------------------------
export async function checkAvailability(domain: string) {
  return api<{ available?: boolean }>(`/v1/registrar/domains/${encodeURIComponent(domain)}/availability`);
}

export interface DomainPrice {
  supported: boolean; // false when Vercel can't sell this TLD (e.g. .co.uk, .uk)
  price: number | null; // purchase price (USD) for `years`
  years: number;
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "string") {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
  }
  if (value && typeof value === "object") {
    const o = value as Record<string, unknown>;
    return toNumber(o.amount ?? o.value ?? o.price);
  }
  return null;
}

// Vercel requires an expectedPrice on purchase and only sells a limited set of
// TLDs. A non-OK response here (e.g. 400 "tld_not_supported") means we can't
// register it for the client — they must bring their own and connect it.
export async function getDomainPrice(domain: string, years = 1): Promise<DomainPrice> {
  const res = await api<{ purchasePrice?: unknown; years?: number }>(
    `/v1/registrar/domains/${encodeURIComponent(domain)}/price?years=${years}`,
  );
  if (!res.ok) return { supported: false, price: null, years };
  return { supported: true, price: toNumber(res.data.purchasePrice), years: res.data.years ?? years };
}

interface BuyResult {
  orderId?: string;
  message?: string;
  error?: { message?: string };
}

export async function buyDomain(domain: string, expectedPrice: number) {
  const contact = registrant();
  if (!contact) {
    return { ok: false, status: 0, data: { message: "Registrant contact isn't configured." } } as ApiResult<BuyResult>;
  }
  if (!isE164Phone(contact.phone)) {
    return {
      ok: false,
      status: 0,
      data: { message: "Registrant phone must be in international E.164 format, for example +447234345654." },
    } as ApiResult<BuyResult>;
  }
  return api<BuyResult>(`/v1/registrar/domains/${encodeURIComponent(domain)}/buy`, {
    method: "POST",
    body: JSON.stringify({ autoRenew: true, years: 1, expectedPrice, contactInformation: contact }),
  });
}

export async function createApexDnsRecord(domain: string) {
  return api<{ uid?: string; updated?: number }>(`/v2/domains/${encodeURIComponent(domain)}/records`, {
    method: "POST",
    body: JSON.stringify({
      name: "",
      type: "A",
      value: dnsInstructions(domain).value,
      ttl: 60,
      comment: "Routes the managed domain to the Vercel project.",
    }),
  });
}

// Pull a human-readable message out of a registrar error response.
export function registrarErrorMessage(res: ApiResult<BuyResult>): string | null {
  return res.data?.error?.message ?? res.data?.message ?? null;
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
  if (labels.length <= 2) return { type: "A", name: "@", value: "216.198.79.1" };
  return { type: "CNAME", name: labels[0], value: "cname.vercel-dns.com" };
}
