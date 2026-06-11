"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type IconKey = "home" | "edit" | "content" | "support" | "more" | "inbox" | "domains" | "billing";

const ICONS: Record<IconKey, React.ReactNode> = {
  home: <path d="M3 11.5L12 4l9 7.5M5.5 10v9.5h13V10" />,
  edit: <path d="M4 20h4l10-10a2.83 2.83 0 10-4-4L4 16v4z" />,
  content: <path d="M4 6h16M4 12h16M4 18h10" />,
  support: <path d="M12 19a7 7 0 100-14 7 7 0 000 14zM9.5 9.5a2.5 2.5 0 113.5 2.3c-.8.4-1 .8-1 1.7M12 16.5h.01" />,
  more: <path d="M5 12h.01M12 12h.01M19 12h.01" />,
  inbox: <path d="M4 5h16v12H7l-3 3V5z" />,
  domains: <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />,
  billing: <path d="M3 7h18v10H3zM3 11h18" />,
};

function Icon({ name, className }: { name: IconKey; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {ICONS[name]}
    </svg>
  );
}

const TABS: { href: string; label: string; icon: IconKey; match: string }[] = [
  { href: "/dashboard", label: "Home", icon: "home", match: "/dashboard" },
  { href: "/preview?edit=1", label: "Edit", icon: "edit", match: "/preview" },
  { href: "/dashboard/edit", label: "Content", icon: "content", match: "/dashboard/edit" },
  { href: "/dashboard/support", label: "Support", icon: "support", match: "/dashboard/support" },
];

const MORE: { href: string; label: string; icon: IconKey }[] = [
  { href: "/dashboard/inbox", label: "Enquiries", icon: "inbox" },
  { href: "/dashboard/domains", label: "Domains", icon: "domains" },
  { href: "/dashboard/billing", label: "Billing", icon: "billing" },
];

function isActive(pathname: string, match: string) {
  return match === "/dashboard" ? pathname === "/dashboard" : pathname.startsWith(match);
}

export function MobileTabBar({ onSignOut }: { onSignOut: (formData: FormData) => Promise<void> }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const moreActive = MORE.some((m) => pathname.startsWith(m.href));

  const tabCls = (active: boolean) =>
    `flex flex-1 flex-col items-center gap-1 py-2 text-[10px] font-medium transition ${active ? "text-ink" : "text-ink/45"}`;

  return (
    <>
      {/* More sheet */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-paper/60 backdrop-blur-sm" />
          <div
            className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-ink/10 bg-panel p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-ink/15" />
            <div className="grid gap-2">
              {MORE.map((m) => (
                <Link
                  key={m.href}
                  href={m.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-ink/[0.08] bg-ink/[0.03] px-4 py-3.5 text-sm font-medium text-ink/85 transition active:scale-[0.99]"
                >
                  <Icon name={m.icon} className="size-5 text-ink/60" />
                  {m.label}
                </Link>
              ))}
              <form action={onSignOut}>
                <button className="mt-1 w-full rounded-2xl border border-ink/[0.08] px-4 py-3.5 text-sm font-medium text-ink/55 transition active:scale-[0.99]">
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Tab bar */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-ink/10 bg-paper/80 backdrop-blur-xl pb-[env(safe-area-inset-bottom)] lg:hidden">
        <div className="flex items-stretch px-1">
          {TABS.map((t) => {
            const active = isActive(pathname, t.match);
            return (
              <Link key={t.href} href={t.href} className={tabCls(active)}>
                <Icon name={t.icon} className="size-[22px]" />
                {t.label}
              </Link>
            );
          })}
          <button type="button" onClick={() => setOpen(true)} className={tabCls(moreActive)}>
            <Icon name="more" className="size-[22px]" />
            More
          </button>
        </div>
      </nav>
    </>
  );
}
