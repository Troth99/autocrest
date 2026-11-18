"use client";

import { Angry } from "lucide-react";

export default function Error() {
  return (
    <main className="page-shell flex min-h-[60vh] items-center justify-center">
      <section
        role="alert"
        aria-labelledby="profile-error-heading"
        className="section-card w-full max-w-md text-center"
      >
        <div className="mx-auto mb-5 flex size-24 -rotate-6 items-center justify-center rounded-full bg-info-soft text-info-strong">
          <Angry className="size-16" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <h1 id="profile-error-heading" className="section-title">
          Your profile hit a speed bump.
        </h1>
        <p className="section-description mt-2">
          We couldn&apos;t load your details. Please try again later.
        </p>
      </section>
    </main>
  );
}
