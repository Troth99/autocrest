"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CarFront, House, Settings, UserRound } from "lucide-react";

export default function AccountNavigation() {
  const pathname = usePathname();
  return (
    <nav
      aria-label="Account navigation"
      className="border-b border-line bg-panel px-4 py-5 lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r lg:py-10"
    >
      <div className="flex flex-wrap gap-2 lg:flex-col">
        <Link
          href="/profile"
          aria-current={
            pathname.startsWith("/profile") || pathname === "/change-password"
              ? "page"
              : undefined
          }
          className={`flex items-center gap-3 rounded-xl border-l-3 px-4 py-3.5 text-sm font-medium transition-colors ${pathname.startsWith("/profile") || pathname === "/change-password" ? "border-accent bg-info-soft text-info" : "border-transparent text-muted hover:bg-info-soft hover:text-text-primary"}`}
        >
          <UserRound className="size-5 shrink-0" />
          Profile
        </Link>
        {[
          { label: "Dashboard", icon: House },
          { label: "My Garage", icon: CarFront },
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
