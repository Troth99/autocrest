"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();

  if (pathname === "/reset-password" || pathname === "/forgot-password") {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="mx-auto w-full max-w-[112rem] px-4 py-8 sm:px-6 sm:py-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg outline-offset-4 focus-visible:outline-2 focus-visible:outline-focus"
            >
              <svg viewBox="0 0 36 32" className="h-7 w-8 text-accent" fill="currentColor" aria-hidden="true">
                <path d="M18 3 24 10 18 17 12 10Z" />
                <path d="M10.5 12 16.5 19 8 29H0Z" opacity="0.85" />
                <path d="M25.5 12 36 29H27.5L19.5 19Z" opacity="0.7" />
                <path d="M18 22 24 29H12Z" />
              </svg>
              <span className="text-xl font-bold tracking-tight text-text-primary">AutoCrest</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted">
              One place for your vehicles, their history and whatever comes next.
            </p>
          </div>

          <nav aria-label="Product footer links">
            <h2 className="text-sm font-semibold text-text-primary">Product</h2>
            <ul className="mt-3 space-y-1">
              <li><Link href="/#modules" className="footer-link">Features</Link></li>
              <li><Link href="/#how-it-works" className="footer-link">How it works</Link></li>
              <li><span className="inline-block py-1 text-sm text-muted">Roadmap</span></li>
            </ul>
          </nav>

          <nav aria-label="Resources footer links">
            <h2 className="text-sm font-semibold text-text-primary">Resources</h2>
            <ul className="mt-3 space-y-1">
              <li><span className="inline-block py-1 text-sm text-muted">About AutoCrest</span></li>
              <li><span className="inline-block py-1 text-sm text-muted">Help Center</span></li>
            </ul>
          </nav>

          <nav aria-label="Legal footer links">
            <h2 className="text-sm font-semibold text-text-primary">Legal</h2>
            <ul className="mt-3 space-y-1">
              <li><span className="inline-block py-1 text-sm text-muted">Terms of Service</span></li>
              <li><span className="inline-block py-1 text-sm text-muted">Privacy Policy</span></li>
              <li><span className="inline-block py-1 text-sm text-muted">Cookie Information</span></li>
            </ul>
          </nav>
        </div>
        <div className="site-footer-bottom">
          <span>&copy; 2026 AutoCrest.</span>
          <span>Your vehicles. Your records. One garage.</span>
        </div>
      </div>
    </footer>
  );
}
