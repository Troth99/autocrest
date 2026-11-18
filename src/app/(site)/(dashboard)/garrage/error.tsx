"use client";

import { Angry } from "lucide-react";

export default function Error() {
    return (
        <main className="page-shell flex min-h-[60vh] items-center justify-center">
            <section
                role="alert"
                aria-labelledby="garage-error-heading"
                className="section-card w-full max-w-md text-center"
            >
        <div className="mx-auto mb-5 flex size-24 -rotate-6 items-center justify-center rounded-full bg-info-soft text-info-strong">
          <Angry className="size-16" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h1 id="garage-error-heading" className="section-title">
          Even garages have bad days.
                </h1>
        <p className="section-description mt-2">
          Yours won&apos;t start right now. Please try again later.
        </p>
            </section>
        </main>
    );
}
