"use client";

import { useEffect, useRef } from "react";

// Cloudflare Turnstile bot check. Rendered EXPLICITLY (not via implicit
// auto-render) because in a React app the auto-scan often misses a
// client-rendered widget — the .cf-turnstile div ends up in the DOM but never
// initialises, so no token is produced and the form fails verification.
//
// On mount we load the API once, then call turnstile.render() ourselves. The
// widget injects a hidden input named "cf-turnstile-response" inside our host
// div (which sits inside the surrounding form), so existing FormData reads keep
// working. Renders nothing when no site key is configured.

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string;
      remove: (id: string) => void;
      reset: (id?: string) => void;
    };
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

// Load the Turnstile script once and resolve when window.turnstile is ready.
// Gives up after ~10s so a blocked script can't poll forever.
function whenReady(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject();
    if (window.turnstile) return resolve();
    if (!document.querySelector("script[data-cf-turnstile]")) {
      const s = document.createElement("script");
      s.src = SRC;
      s.async = true;
      s.defer = true;
      s.setAttribute("data-cf-turnstile", "");
      document.head.appendChild(s);
    }
    let tries = 0;
    const tick = () => {
      if (window.turnstile) resolve();
      else if (tries++ > 100) reject();
      else window.setTimeout(tick, 100);
    };
    tick();
  });
}

export function Turnstile({ siteKey }: { siteKey?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey) return;
    let active = true;
    whenReady()
      .then(() => {
        if (!active || !ref.current || idRef.current || !window.turnstile) return;
        idRef.current = window.turnstile.render(ref.current, { sitekey: siteKey, theme: "dark" });
      })
      .catch(() => {
        /* script blocked/unavailable — nothing renders, submit stays rejected */
      });
    return () => {
      active = false;
      if (idRef.current && window.turnstile?.remove) {
        try {
          window.turnstile.remove(idRef.current);
        } catch {
          /* widget already gone */
        }
      }
      idRef.current = null;
    };
  }, [siteKey]);

  if (!siteKey) return null;
  return <div ref={ref} />;
}
