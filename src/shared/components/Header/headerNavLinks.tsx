"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNavLinks() {
    const path = usePathname()

    return (
        <div className="header-marketing-links">
            <Link
                href="/why-autocrest"
                className={`header-nav-link ${path.startsWith("/why-autocrest") ? "text-accent" : ""
                    }`}
            >
                Why AutoCrest
            </Link>
            <Link href="/how-it-works"
                className={`header-nav-link ${path.startsWith('/how-it-works') ? "text-accent" : ""}`}>
                How it works
            </Link>
            <Link href="/help"
                className={`header-nav-link ${path.startsWith('/help') ? "text-accent" : ""}`}>
                Help
            </Link>
            <Link href="/contacts"
                className={`header-nav-link ${path.startsWith('/contacts') ? "text-accent" : ""}`}>
                Contacts
            </Link>
        </div>
    );
}
