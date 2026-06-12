"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface AdminNavItem {
  href: string;
  label: string;
  badge?: number;
  icon: "overview" | "clients" | "enquiries" | "support" | "promos";
}

const ICONS: Record<AdminNavItem["icon"], React.ReactNode> = {
  overview: <path d="M3 12l9-8 9 8M5 10v10h14V10" />,
  clients: <path d="M4 20a8 8 0 0116 0M12 11a4 4 0 100-8 4 4 0 000 8z" />,
  enquiries: <path d="M4 5h16v12H7l-3 3V5z" />,
  support: <path d="M12 19a7 7 0 100-14 7 7 0 000 14zM9.5 9.5a2.5 2.5 0 113.5 2.3c-.8.4-1 .8-1 1.7M12 16.5h.01" />,
  promos: <path d="M9 7h6l5 5-8 8-8-8 5-5zM9.5 11.5h.01" />,
};

function isActive(pathname: string, href: string) {
  return href === "/kmanageradmin" ? pathname === "/kmanageradmin" : pathname.startsWith(href);
}

export function AdminNav({ items, orientation = "vertical" }: { items: AdminNavItem[]; orientation?: "vertical" | "horizontal" }) {
  const pathname = usePathname();
  return (
    <nav className={orientation === "vertical" ? "space-y-1" : "flex gap-1 overflow-x-auto"}>
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active ? "bg-ink/[0.08] text-ink" : "text-ink/50 hover:bg-ink/[0.05] hover:text-ink"
            } ${orientation === "horizontal" ? "shrink-0" : ""}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-[18px] shrink-0">
              {ICONS[item.icon]}
            </svg>
            <span className="flex-1">{item.label}</span>
            {item.badge ? (
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-xs font-semibold text-accent">{item.badge}</span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}
