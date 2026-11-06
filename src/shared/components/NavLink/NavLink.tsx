"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type NavLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  additionalActivePaths?: string[];
};

export default function NavLink({
  href,
  additionalActivePaths = [],
  children,
  ...props
}: NavLinkProps) {
  const pathname = usePathname();

  const isActive =
    pathname === href ||
    (href !== "/" && pathname.startsWith(`${href}/`)) ||
    additionalActivePaths.includes(pathname);

  return (
    <Link
      {...props}
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center gap-3 rounded-lg border-l-3 px-4 py-3 text-sm font-medium transition-colors ${
        isActive
          ? "border-accent bg-info-soft text-info"
          : "border-transparent text-muted hover:bg-info-soft hover:text-text-primary"
      }`}
    >
      {children}
    </Link>
  );
}
