import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Two clients, two privilege levels:
//
//  - getPublicClient():  PUBLISHABLE (anon) key. RLS-enforced. Used by the
//    public site renderer. Can only read published, public content — safe even
//    if exposed. This is the only client the public site touches.
//
//  - getServiceClient(): SECRET (service_role) key. Bypasses RLS. Server-only.
//    Reserved for the admin panel + Stripe webhooks (Phase 4/5). Never import
//    into anything that renders public pages, and never expose to the browser.
//
// Both return null when their env is missing, so the app falls back to built-in
// demo data (see lib/tenant.ts) and runs with zero setup.

let publicClient: SupabaseClient | null = null;
let serviceClient: SupabaseClient | null = null;

export function getPublicClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) return null;
  if (!publicClient) {
    publicClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return publicClient;
}

export function getServiceClient(): SupabaseClient | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return null;
  if (!serviceClient) {
    serviceClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return serviceClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_PUBLISHABLE_KEY);
}
