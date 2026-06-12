import "server-only";
import { getServiceClient } from "./supabase";

// Who counts as staff (the /kmanageradmin override). Two sources, OR'd:
//  1. STAFF_EMAILS env — bootstrap superadmins, always staff, can't be removed
//     in the UI (so you can never lock yourself out).
//  2. staff_members table — managed from the admin console (migration 0009).

function envStaff(): string[] {
  return (process.env.STAFF_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isStaffEnv(email?: string | null): boolean {
  return Boolean(email) && envStaff().includes(email!.toLowerCase());
}

export async function isStaff(email?: string | null): Promise<boolean> {
  if (!email) return false;
  const e = email.toLowerCase();
  if (envStaff().includes(e)) return true;
  const svc = getServiceClient();
  if (!svc) return false;
  try {
    const { data } = await svc.from("staff_members").select("email").eq("email", e).maybeSingle();
    return Boolean(data);
  } catch {
    return false; // table missing (pre-migration) → env-only, fail-safe
  }
}

export interface StaffEntry {
  email: string;
  isEnv: boolean; // env/bootstrap entries can't be removed from the UI
}

export async function listStaff(): Promise<StaffEntry[]> {
  const env = envStaff();
  const entries: StaffEntry[] = env.map((email) => ({ email, isEnv: true }));
  const svc = getServiceClient();
  if (svc) {
    try {
      const { data } = await svc.from("staff_members").select("email").order("email");
      for (const row of data ?? []) {
        const email = String((row as { email: string }).email);
        if (!env.includes(email)) entries.push({ email, isEnv: false });
      }
    } catch {
      /* table missing → env only */
    }
  }
  return entries;
}

export async function addStaff(email: string, addedBy?: string | null): Promise<void> {
  const e = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) throw new Error("Enter a valid email address.");
  const svc = getServiceClient();
  if (!svc) throw new Error("Not configured.");
  const { error } = await svc.from("staff_members").upsert({ email: e, added_by: addedBy ?? null });
  if (error) throw new Error(error.message);
}

export async function removeStaff(email: string): Promise<void> {
  const e = email.trim().toLowerCase();
  if (envStaff().includes(e)) throw new Error("Bootstrap admins (STAFF_EMAILS) can't be removed here.");
  const svc = getServiceClient();
  if (!svc) return;
  await svc.from("staff_members").delete().eq("email", e);
}
