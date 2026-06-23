"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Client sidebar nav for the dashboard. Highlights the item matching the
// current route (the old layout hard-coded the green highlight onto "Edit site"
// so it never moved). "Edit site" opens the on-page editor (/preview), which is
// outside this layout, so it's never the active item — it just keeps a subtle
// accent to mark it as the primary action.
export interface DashNavItem {
  href: string;
  label: string;
  primary?: boolean;
}

function isActive(pathname: string, href: string) {
  const path = href.split("?")[0];
  if (path === "/dashboard") return pathname === "/dashboard";
  return pathname === path || pathname.startsWith(path + "/");
}

export function DashNav({ items }: { items: DashNavItem[] }) {
  const pathname = usePathname();
  return (
    <nav className="mt-16 space-y-1">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        const cls = active
          ? "block rounded-xl bg-emerald-400/10 px-3 py-2.5 text-sm font-semibold text-accent ring-1 ring-inset ring-emerald-400/25"
          : item.primary
            ? "block rounded-xl px-3 py-2.5 text-sm font-semibold text-accent transition hover:bg-emerald-400/10"
            : "block rounded-xl px-3 py-2.5 text-sm font-medium text-ink/50 transition hover:bg-ink/[0.06] hover:text-ink";
        return (
          <Link key={item.href} href={item.href} className={cls}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
