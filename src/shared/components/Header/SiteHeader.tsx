"use client";

import Link from "next/link";
import GarageHeaderTools, {
  GarageSearch,
} from "@/features/garage/components/GarageHeaderTools";
import type { CurrentUser } from "@/shared/types/currentUser";
import UserMenu from "@/shared/components/Header/UserMenu/UserMenu";

export default function SiteHeader({ user }: { user: CurrentUser | null }) {
  const isAccountPage = Boolean(user);

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-dark-800">
      <nav
        className={`mx-auto flex items-center justify-between gap-4 px-4 py-4 sm:px-6 ${isAccountPage ? "max-w-7xl flex-wrap" : "max-w-6xl"}`}
      >
        <Link href="/" className="flex items-center gap-2">
          <svg viewBox="0 0 36 32" className="h-8 w-9 shrink-0 text-accent-text" fill="currentColor" aria-hidden="true">
            <path d="M18 3 24 10 18 17 12 10Z" />
            <path d="M10.5 12 16.5 19 8 29H0Z" opacity="0.85" />
            <path d="M25.5 12 36 29H27.5L19.5 19Z" opacity="0.7" />
            <path d="M18 22 24 29H12Z" />
          </svg>
          <span className="text-xl font-semibold tracking-tight text-text-primary">AutoCrest</span>
        </Link>

        {isAccountPage ? (
          <div className="order-last flex w-full min-w-0 items-center gap-2 sm:order-0 sm:w-auto sm:flex-1 sm:gap-4">
            <div className="ml-auto min-w-0 flex-1"><GarageSearch /></div>
          </div>
        ) : (
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#modules"
              className="relative rounded-lg px-2 py-1.5 text-sm font-medium text-text-secondary transition-[color,background-color,transform] duration-200 after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-info after:transition-transform after:duration-200 hover:-translate-y-0.5 hover:bg-info-soft hover:text-info-strong hover:after:scale-x-100 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:after:transition-none"
            >
              Modules
            </a>
            <a
              href="#how-it-works"
              className="relative rounded-lg px-2 py-1.5 text-sm font-medium text-text-secondary transition-[color,background-color,transform] duration-200 after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-info after:transition-transform after:duration-200 hover:-translate-y-0.5 hover:bg-info-soft hover:text-info-strong hover:after:scale-x-100 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:after:transition-none"
            >
              How it works
            </a>
            <a
              href="#timeline"
              className="relative rounded-lg px-2 py-1.5 text-sm font-medium text-text-secondary transition-[color,background-color,transform] duration-200 after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-info after:transition-transform after:duration-200 hover:-translate-y-0.5 hover:bg-info-soft hover:text-info-strong hover:after:scale-x-100 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:after:transition-none"
            >
              Timeline
            </a>
          </div>
        )}

        <div className="flex items-center gap-3">
          {isAccountPage && <GarageHeaderTools />}
          {user ? (
            <UserMenu
              username={user.name ?? user.email ?? "Account"}
              email={user.email ?? ""}
              avatarUrl={user.avatarUrl}
            />
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-line bg-panel px-3.5 py-2 text-sm font-semibold text-text-primary shadow-sm transition-[color,background-color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-info-border hover:bg-info-soft hover:text-info-strong hover:shadow-[0_8px_20px_rgb(166_154_232/14%)] sm:block motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="button-primary button-base px-4 py-2 text-sm font-semibold hover:scale-105"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
