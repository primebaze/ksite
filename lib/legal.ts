// Central place for the details every legal page references, so they stay in
// sync. IMPORTANT: fill in `entity`, `companyNumber` and `address` with your
// real registered details before relying on these, and have a solicitor review
// the policies. Leaving entity/number/address blank simply hides those lines.
export const LEGAL = {
  brand: "Kovasite",
  /** Registered company name, e.g. "Kovasite Ltd". Blank = use the brand name. */
  entity: "",
  /** Companies House number, e.g. "12345678". Blank = line hidden. */
  companyNumber: "",
  /** Registered office address. Blank = line hidden. */
  address: "",
  email: "hello@kovasite.com",
  governingLaw: "England and Wales",
  /** Shown as "Last updated" on each policy. */
  lastUpdated: "11 June 2026",
} as const;

// How to refer to the operator in prose (registered entity if set, else brand).
export const LEGAL_NAME = LEGAL.entity || LEGAL.brand;
