"use client";

import Script from "next/script";

// Cloudflare Turnstile bot check. The widget injects a hidden input named
// "cf-turnstile-response" into the surrounding form, which the server action
// verifies. Renders nothing if no site key is configured.
export function Turnstile({ siteKey }: { siteKey?: string }) {
  if (!siteKey) return null;
  return (
    <div>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      <div className="cf-turnstile" data-sitekey={siteKey} data-theme="dark" />
    </div>
  );
}
