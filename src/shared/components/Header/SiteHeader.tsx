import Link from "next/link";
import type { CurrentUser } from "@/shared/types/currentUser";
import UserMenu from "@/shared/components/Header/UserMenu/UserMenu";

export default function SiteHeader({
  user,
}: {
  user: CurrentUser | null;
}) {

  return (
    <header className="sticky top-0 z-10 border-b border-line bg-dark-800 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-info-soft text-sm font-bold text-info">
            AC
          </span>
          <span className="text-sm font-semibold tracking-wide text-text-primary">
            auto<span className="text-accent-text">crest</span>
          </span>
        </Link>
      
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

        <div className="flex items-center gap-3">
          {user ? (
            <UserMenu
              username={
                user.name ??
                user.email ??
                "Account"
              }
              email={user.email ?? ""}
              avatarUrl={user.avatarUrl}
            />
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-full border border-line bg-panel px-3.5 py-2 text-sm font-semibold text-text-primary shadow-sm transition-[color,background-color,border-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-info-border hover:bg-info-soft hover:text-info-strong hover:shadow-[0_8px_20px_rgb(14_165_233/14%)] sm:block motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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
