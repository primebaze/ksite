// Canonical SEO config. The production site is served on www (apex 308s to it),
// so canonical URLs + metadataBase use www. Set NEXT_PUBLIC_SITE_URL on the host
// to override (use the same canonical host you serve on).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.kovasite.com").replace(/\/$/, "");
export const SITE_NAME = "Kovasite";
export const SITE_TAGLINE = "Websites for local businesses";
export const SITE_DESCRIPTION =
  "Kovasite designs, builds and hosts a premium website for your local business — live in under 5 minutes, with online booking, a free custom domain, SSL and local SEO built in. One simple plan, cancel anytime.";

// Absolute URL helper for canonical / OG.
export const absoluteUrl = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
