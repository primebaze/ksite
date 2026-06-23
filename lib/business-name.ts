// Business-name rules.
//
// Names must stay plain ASCII. Look-alike accented characters (é can be a
// single code point OR "e" + a combining accent) have several valid Unicode
// encodings, which silently breaks exact-match flows like the delete-account
// "type the name to confirm" gate. So we allow letters, numbers, spaces and a
// few common business punctuation marks, and reject everything else (accents,
// emoji, smart quotes, other symbols).

const ALLOWED = /^[A-Za-z0-9 &'.,-]+$/;

// HTML `pattern` attribute mirror (the browser anchors it for you). Used on the
// name inputs so bad characters are flagged before the form is even submitted.
export const BUSINESS_NAME_PATTERN = "[A-Za-z0-9 &'.,-]+";

export const BUSINESS_NAME_HINT =
  "Use letters, numbers and spaces only — & ' - . , are allowed, but accents and symbols are not.";

// Normalise whitespace and validate. Throws with a friendly message on bad
// input; returns the cleaned name on success.
export function cleanBusinessName(raw: string): string {
  const name = raw.trim().replace(/\s+/g, " ");
  if (!name) throw new Error("Please add your business name.");
  if (name.length > 80) throw new Error("Business name must be 80 characters or fewer.");
  if (!ALLOWED.test(name)) throw new Error(BUSINESS_NAME_HINT);
  return name;
}
