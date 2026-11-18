import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <main className="page-shell flex min-h-[60vh] items-center justify-center">
            <section aria-labelledby="vehicle-not-found-heading" className="section-card w-full max-w-md text-center">
                <svg
                    viewBox="0 0 180 120"
                    className="mx-auto mb-5 h-28 w-44 text-accent-text"
                    fill="none"
                    aria-hidden="true"
                >
                    <circle cx="90" cy="57" r="49" fill="currentColor" opacity="0.07" />
                    <ellipse cx="90" cy="108" rx="53" ry="5" fill="currentColor" opacity="0.1" />
                    <path d="m54 55 9-24a9 9 0 0 1 8-6h38a9 9 0 0 1 8 6l9 24" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d="m64 49 6-16h40l6 16Z" fill="currentColor" opacity="0.12" />
                    <rect x="44" y="54" width="92" height="43" rx="13" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2.5" />
                    <path d="M50 96v6a4 4 0 0 0 8 0v-5m64 0v5a4 4 0 0 0 8 0v-6M43 54h-7m101 0h7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="m57 66 14-4m38 0 14 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <ellipse cx="65" cy="74" rx="5" ry="4" fill="currentColor" />
                    <ellipse cx="115" cy="74" rx="5" ry="4" fill="currentColor" />
                    <path d="M80 87q10-10 20 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M148 22c0-5 12-6 12 0 0 4-6 4-6 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
                    <circle cx="154" cy="37" r="1.5" fill="currentColor" opacity="0.65" />
                </svg>
                <h1 id="vehicle-not-found-heading" className="section-title">
                    Vehicle not found
                </h1>
                <p className="section-description mt-2">
                    This vehicle may have been removed, or it isn&apos;t available in your garage.
                </p>
                <Link href="/garrage" className="button-base button-primary mt-6 gap-2 px-5 py-3 text-sm">
                    <ArrowLeft className="size-4" aria-hidden="true" />
                    Back to my garage
                </Link>
            </section>
        </main>
    );
}
