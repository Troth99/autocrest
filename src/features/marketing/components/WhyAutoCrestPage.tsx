import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function WhyAutoCrestPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 text-text-primary sm:px-8 sm:py-16">
      <section aria-labelledby="why-autocrest-heading" className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          About AutoCrest
        </p>
        <h1 id="why-autocrest-heading" className="mt-5 marketing-page-title">
          Vehicle ownership, better organised.
        </h1>
        <p className="mt-6 text-lg leading-8 sm:text-xl">
          One place for your vehicles, the work they need and the history
          you want to keep.
        </p>
      </section>

      <section aria-labelledby="about-heading" className="mt-12 marketing-about-section">
        <h2 id="about-heading" className="text-2xl font-semibold tracking-tight">Who we are</h2>
        <div className="max-w-2xl space-y-4 text-lg leading-8 text-text-secondary">
          <p>
            AutoCrest is a personal vehicle management platform. We help owners
            keep vehicle information, mileage, photos and service records
            organised in one digital garage.
          </p>
          <p>
            Whether you are checking your last service or updating a vehicle
            after a workshop visit, the information should be easy to find
            and simple to maintain.
          </p>
        </div>
      </section>

      <section aria-labelledby="mission-heading" className="marketing-about-section">
        <h2 id="mission-heading" className="text-2xl font-semibold tracking-tight">Why we built it</h2>
        <div className="max-w-2xl space-y-4 text-lg leading-8 text-text-secondary">
          <p>
            A service date on a receipt. A mileage reading in a photo.
            Important details you meant to write down. Over time, keeping
            track of a vehicle can become harder than it needs to be.
          </p>
          <p>
            AutoCrest brings those details together, so you can look back at
            completed work and see the next recommended service without
            piecing everything together from memory.
          </p>
        </div>
      </section>

      <section aria-labelledby="approach-heading" className="marketing-about-section">
        <h2 id="approach-heading" className="text-2xl font-semibold tracking-tight">What matters to us</h2>
        <div className="max-w-2xl space-y-7">
          <div>
            <h3 className="text-xl font-semibold">Useful records</h3>
            <p className="mt-2 text-lg leading-8 text-text-secondary">
              Save the details that help later: what was done, when it happened,
              the mileage and the cost.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">Simple everyday use</h3>
            <p className="mt-2 text-lg leading-8 text-text-secondary">
              Start with the essentials and add more over time. Your garage
              should fit into ownership, without becoming another chore.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">A personal garage</h3>
            <p className="mt-2 text-lg leading-8 text-text-secondary">
              Vehicle records belong to your account. Photos are stored
              privately, and optional two-factor authentication adds an
              extra sign-in check.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="future-heading" className="marketing-about-section">
        <h2 id="future-heading" className="text-2xl font-semibold tracking-tight">Where we are heading</h2>
        <p className="max-w-2xl text-lg leading-8 text-text-secondary">
          We are building on vehicle details and service history, with plans
          for dedicated expense tracking, document storage and more reminders.
          The goal stays the same: make everyday ownership easier to manage.
        </p>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-line pt-8">
        <p className="text-xl font-semibold">Your vehicles. Your records. One garage.</p>
        <Link href="/how-it-works" className="button-base button-primary gap-2 px-5 py-3">
          See how it works <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
