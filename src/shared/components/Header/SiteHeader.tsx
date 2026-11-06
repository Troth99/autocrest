"use client";

import Link from "next/link";
import GarageHeaderTools, {
  GarageSearch,
} from "@/features/garage/components/garrage-header/GarageHeaderTools";
import UserMenu from "@/shared/components/Header/UserMenu/UserMenu";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";

type SiteHeaderProps = {
  showNavigation?: boolean;
};

export default function SiteHeader({ showNavigation = true }: SiteHeaderProps) {
  const { user } = useCurrentUser();

  // Recovery sessions should not look like a normal signed-in dashboard.
  const isAccountPage = Boolean(user) && showNavigation;

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-dark-800">
      <nav
        className={`header-nav max-w-7xl ${isAccountPage ? "header-nav-account" : ""}`}
      >
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <svg
            viewBox="0 0 36 32"
            className="h-8 w-9 shrink-0 text-accent-text"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18 3 24 10 18 17 12 10Z" />
            <path d="M10.5 12 16.5 19 8 29H0Z" opacity="0.85" />
            <path d="M25.5 12 36 29H27.5L19.5 19Z" opacity="0.7" />
            <path d="M18 22 24 29H12Z" />
          </svg>
          <span className="text-xl font-semibold tracking-tight text-text-primary">
            AutoCrest
          </span>
        </Link>

        {showNavigation &&
          (isAccountPage ? (
            <div className="header-search">
              <GarageSearch />
            </div>
          ) : (
            <div className="hidden items-center gap-6 md:flex">
              <a href="#modules" className="header-nav-link">
                Modules
              </a>
              <a href="#how-it-works" className="header-nav-link">
                How it works
              </a>
              <a href="#timeline" className="header-nav-link">
                Timeline
              </a>
            </div>
          ))}

        {showNavigation && (
          <div className="flex max-w-full shrink-0 flex-wrap items-center gap-2 sm:gap-5 lg:translate-x-3">
            {isAccountPage && <GarageHeaderTools />}
            {user ? (
              <UserMenu
                username={user.username || "Account"}
                email={user.email ?? ""}
                avatarUrl={user.avatarUrl || null}
              />
            ) : (
              <>
                <Link href="/login" className="header-sign-in">
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
        )}
      </nav>
    </header>
  );
}
