// Host parsing shared by middleware and the data layer.
// APP_DOMAIN is the platform's own domain (the dashboard / marketing host).
// Anything under it is a tenant subdomain; anything else is a custom domain.

export const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN ?? "localhost";

export interface ParsedHost {
  kind: "root" | "subdomain" | "custom";
  host: string; // hostname without port
  subdomain?: string;
}

export function parseHost(rawHost: string, appDomain: string = APP_DOMAIN): ParsedHost {
  const host = rawHost.split(":")[0].toLowerCase();
  const root = appDomain.split(":")[0].toLowerCase();

  if (host === root || host === `www.${root}`) {
    return { kind: "root", host };
  }
  if (host.endsWith(`.${root}`)) {
    const sub = host.slice(0, host.length - root.length - 1);
    if (sub && sub !== "www") return { kind: "subdomain", host, subdomain: sub };
    return { kind: "root", host };
  }
  return { kind: "custom", host };
}
