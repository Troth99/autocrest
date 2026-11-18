"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();


  const isGaragePage = pathname === "/garrage";
  const showMarketingLinks = !user || pathname === "/";

  return (
    <header className="site-header">
      <nav
        aria-label="Main navigation"
        className="header-nav"
      >
        <Link href="/" className="flex shrink-0 items-center gap-2 rounded-lg outline-offset-4 focus-visible:outline-2 focus-visible:outline-focus">
          <svg
            viewBox="0 0 36 32"
            className="h-7 w-8 shrink-0 text-accent"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M18 3 24 10 18 17 12 10Z" />
            <path d="M10.5 12 16.5 19 8 29H0Z" opacity="0.85" />
            <path d="M25.5 12 36 29H27.5L19.5 19Z" opacity="0.7" />
            <path d="M18 22 24 29H12Z" />
          </svg>
          <span className="text-xl font-bold tracking-tight text-text-primary">
            AutoCrest
          </span>
        </Link>

        {showNavigation && user && isGaragePage && (
          <div className="header-search">
            <GarageSearch />
          </div>
        )}

        {showNavigation && showMarketingLinks && (
            <div className="header-marketing-links">
              <Link href="/#modules" className="header-nav-link">
                Features
              </Link>
              <Link href="/#how-it-works" className="header-nav-link">
                How it works
              </Link>
              <Link href="/#timeline" className="header-nav-link">
                Why AutoCrest
              </Link>
            </div>
        )}

        {showNavigation && (
          <div className="ml-auto flex max-w-full flex-wrap items-center justify-end gap-2 sm:gap-3">
            {user ? (
              <>
                <GarageHeaderTools />
                <UserMenu
                  username={user.username || "Account"}
                  email={user.email ?? ""}
                  avatarUrl={user.avatarUrl || null}
                />
              </>
            ) : (
              <>
                <Link href="/login" className="header-sign-in">
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="button-primary button-base px-4 py-2.5 text-sm shadow-none"
                >
                  Start your garage
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
