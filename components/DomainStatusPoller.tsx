"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// While a custom domain is still propagating, quietly poll the server to
// re-check Vercel verification/SSL. The server flips the status to "active" and
// sends the go-live email on the transition; here we just refresh the dashboard
// so the client sees the "Live" badge appear without touching anything.
export function DomainStatusPoller({ active }: { active: boolean }) {
  const router = useRouter();

  useEffect(() => {
    if (active) return;
    let stopped = false;

    const tick = async () => {
      if (stopped) return;
      try {
        const res = await fetch("/api/me/domain-check", { cache: "no-store" });
        const data = (await res.json()) as { status?: string };
        if (data.status === "active") {
          stopped = true;
          router.push("/dashboard/domains?claimed=1");
        }
      } catch {
        /* transient — keep polling */
      }
    };

    const first = setTimeout(tick, 4000);
    const interval = setInterval(tick, 15000);
    // Don't poll forever; DNS can take a while. The "Check status" button
    // remains as a manual fallback.
    const stop = setTimeout(() => {
      stopped = true;
      clearInterval(interval);
    }, 8 * 60 * 1000);

    return () => {
      stopped = true;
      clearTimeout(first);
      clearTimeout(stop);
      clearInterval(interval);
    };
  }, [active, router]);

  return null;
}
