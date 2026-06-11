// Details every legal page reads, sourced from env so you fill them once (in
// .env.local locally and in your host's env in production). Blank optional
// fields simply hide their line. Server-only (legal pages are server
// components), so these don't need the NEXT_PUBLIC prefix.
export const LEGAL = {
  /** Trading / brand name, e.g. "Kovasite". */
  brand: process.env.LEGAL_TRADING_NAME || "Kovasite",
  /** Registered company name, e.g. "Kovasite Ltd". Blank = use the brand name. */
  entity: process.env.LEGAL_COMPANY_NAME || "",
  /** Companies House number. Blank = line hidden. */
  companyNumber: process.env.LEGAL_COMPANY_NUMBER || "",
  /** Registered office / business address. Blank = line hidden. */
  address: process.env.LEGAL_ADDRESS || "",
  /** Email used across all legal pages (privacy, terms, cookies, acceptable use). */
  email: process.env.LEGAL_EMAIL || "legal@kovasite.com",
  /** Public website shown in the policy. */
  website: process.env.LEGAL_WEBSITE || "kovasite.com",
  governingLaw: process.env.LEGAL_GOVERNING_LAW || "England and Wales",
  /** Shown as "Last updated" on each policy. */
  lastUpdated: process.env.LEGAL_LAST_UPDATED || "11 June 2026",
} as const;

// How to refer to the operator in prose (registered entity if set, else brand).
export const LEGAL_NAME = LEGAL.entity || LEGAL.brand;
