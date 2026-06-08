// Lightweight content moderation for user-typed fields (business name, custom
// business type, etc.). Blocks profanity/slurs and obvious spam. Not a
// replacement for a full moderation service, but stops the worst at the door.

// Offensive-word blocklist (profanity + slurs). Matched against normalised,
// de-leetspeaked text. Keep lowercase.
const BLOCKED = [
  "fuck", "shit", "bitch", "bastard", "asshole", "dick", "piss", "cunt", "cock",
  "pussy", "slut", "whore", "wank", "bollocks", "prick", "twat",
  "nigger", "nigga", "faggot", "fag", "retard", "spastic", "kike", "chink",
  "spic", "wetback", "tranny", "paki", "coon", "dyke",
  "rape", "rapist", "pedophile", "paedophile", "nazi",
];

// Common leetspeak substitutions so "sh1t" / "f@ck" still get caught.
function normalise(input: string): string {
  return input
    .toLowerCase()
    .replace(/[@4]/g, "a")
    .replace(/[3]/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/[0]/g, "o")
    .replace(/[$5]/g, "s")
    .replace(/[7]/g, "t")
    .replace(/[^a-z\s]/g, " ");
}

export interface ModerationResult {
  ok: boolean;
  reason?: string;
}

export function containsOffensive(text: string): boolean {
  const norm = normalise(text);
  const collapsed = norm.replace(/\s+/g, ""); // catch spaced-out attempts
  return BLOCKED.some((w) => {
    const re = new RegExp(`\\b${w}\\b`);
    return re.test(norm) || collapsed.includes(w);
  });
}

export function looksLikeSpam(text: string): boolean {
  const t = text.trim();
  if (/(https?:\/\/|www\.)/i.test(t)) return true; // links in a name/type
  if (/(.)\1{5,}/.test(t)) return true; // 6+ repeated chars
  if ((t.match(/[^\p{L}\p{N}\s'&.\-,]/gu) ?? []).length > 4) return true; // lots of symbols
  if (t.length > 80) return true;
  return false;
}

// Validate a short, user-facing field (name / business type).
export function moderate(text: string): ModerationResult {
  if (containsOffensive(text)) {
    return { ok: false, reason: "Please remove offensive language." };
  }
  if (looksLikeSpam(text)) {
    return { ok: false, reason: "That doesn't look valid. Please enter a real business name." };
  }
  return { ok: true };
}
