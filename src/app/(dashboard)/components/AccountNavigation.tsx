"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CarFront, House, Settings, UserRound } from "lucide-react";

export default function AccountNavigation() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Account navigation"
      className="account-navigation"
    >
      <p className="mb-5 hidden px-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-subtle lg:block">YOUR WORKSPACE</p>
      <div className="flex flex-wrap gap-2 lg:flex-col">
        <Link
          href="/profile"
          aria-current={
            pathname.startsWith("/profile") || pathname === "/change-password"
              ? "page"
              : undefined
          }
          className={`flex items-center gap-3 rounded-lg border-l-3 px-4 py-3 text-sm font-medium transition-colors ${pathname.startsWith("/profile") || pathname === "/change-password" ? "border-accent bg-info-soft text-info" : "border-transparent text-muted hover:bg-info-soft hover:text-text-primary"}`}
        >
          <UserRound className="size-5 shrink-0" />
          Profile
        </Link>
        <Link
          href="/garrage"
          aria-current={pathname.startsWith("/garrage") ? "page" : undefined}
          className={`flex items-center gap-3 rounded-lg border-l-3 px-4 py-3 text-sm font-medium transition-colors ${pathname.startsWith("/garrage")
              ? "border-accent bg-info-soft text-info"
              : "border-transparent text-muted hover:bg-info-soft hover:text-text-primary"
            }`}
        >
          <CarFront className="size-5 shrink-0" />
          My Garage
        </Link>
        {[
          { label: "Dashboard", icon: House },
          { label: "Settings", icon: Settings },
        ].map(({ label, icon: Icon }) => (
          <span
            key={label}
            aria-disabled="true"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-subtle"
          >
            <Icon className="size-5 shrink-0" />
            <span>
              {label}
              <span className="block text-[10px]">Coming soon</span>
            </span>
          </span>
        ))}
      </div>
    </nav>
  );
}
