// Application-level session time-box. Supabase Free has no dashboard session
// controls, so we cap sessions here: a login is valid for at most
// SESSION_MAX_AGE_DAYS from the user's last real sign-in. Token refresh does NOT
// reset `last_sign_in_at`, so this is a true ceiling — after it, the auth
// guards force a fresh sign-in. Override via SESSION_MAX_AGE_DAYS env.
const days = (value: string | undefined, fallback: number) => Math.max(1, Number(value || fallback)) * 24 * 60 * 60 * 1000;

// Tenant dashboard sessions (longer) and staff console sessions (shorter, since
// staff can touch every tenant). Override either via env on the host.
export const SESSION_MAX_AGE_MS = days(process.env.SESSION_MAX_AGE_DAYS, 30);
export const ADMIN_SESSION_MAX_AGE_MS = days(process.env.ADMIN_SESSION_MAX_AGE_DAYS, 1);

export function sessionExpired(lastSignInAt: string | null | undefined, maxAgeMs: number = SESSION_MAX_AGE_MS): boolean {
  if (!lastSignInAt) return false; // unknown → don't lock the user out
  const t = Date.parse(lastSignInAt);
  if (Number.isNaN(t)) return false;
  return Date.now() - t > maxAgeMs;
}
