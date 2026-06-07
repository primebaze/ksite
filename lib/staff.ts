// Operator allowlist. Staff (you) get the /admin override; everyone else who
// signs up is a client and is sent to their own /dashboard.
export function isStaff(email?: string | null): boolean {
  if (!email) return false;
  const list = (process.env.STAFF_EMAILS ?? "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}
