import Link from "next/link";
import HeaderNavigation from "@/shared/components/Header/HeaderNavigation";
import HeaderNavLinks from "@/shared/components/Header/headerNavLinks";


export default function SiteHeader() {

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

        <div className="header-marketing-links">
          <HeaderNavLinks href="/why-autocrest">Why AutoCrest</HeaderNavLinks>
          <HeaderNavLinks href="/how-it-works">How it works</HeaderNavLinks>
          <HeaderNavLinks href="/help">Help</HeaderNavLinks>
          <HeaderNavLinks href="/contacts">Contacts</HeaderNavLinks>
        </div>

        <HeaderNavigation />
      </nav>
    </header>
  );
}
