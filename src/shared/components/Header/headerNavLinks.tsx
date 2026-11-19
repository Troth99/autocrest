"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavLinks({ href }: { href: string }) {
    const path = usePathname()

    return (
        <div className="header-marketing-links">
            <Link
                href="/why-autocrest"
                className={`header-nav-link ${path.startsWith(href) ? "text-accent" : ""
                    }`}
            >
                Why AutoCrest
            </Link>
            <Link href="/how-it-works"
                className={`header-nav-link ${path.startsWith(href) ? "text-accent" : ""}`}>
                How it works
            </Link>
            <Link href="/help"
                className={`header-nav-link ${path.startsWith(href) ? "text-accent" : ""}`}>
                Help
            </Link>
            <Link href="/contacts"
                className={`header-nav-link ${path.startsWith(href) ? "text-accent" : ""}`}>
                Contacts
            </Link>
        </div>
    );
}
