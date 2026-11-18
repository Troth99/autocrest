"use client";

import Link from "next/link";
import GarageHeaderTools from "@/features/garage/components/garrage-header/GarageHeaderTools";
import UserMenu from "@/shared/components/Header/UserMenu/UserMenu";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";

export default function HeaderNavigation() {
  const { user } = useCurrentUser();

  return (
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
  );
}
