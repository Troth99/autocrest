import Link from "next/link";
import { ArrowRight, CarFront, Gauge, Wrench } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <main className="marketing-home w-full py-10 text-text-primary sm:py-14">
      <section className="marketing-section" aria-labelledby="how-it-works-heading">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          How it works
        </p>
        <h1 id="how-it-works-heading" className="mt-4 max-w-4xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          Your vehicle. Its story. One place.
        </h1>
        <p className="section-description mt-5 max-w-2xl sm:text-lg">
          Keep vehicle details, mileage and service records together.
          Start with the essentials and build your history as you go.
        </p>
      </section>

      <section className="marketing-section" aria-labelledby="steps-heading">
        <h2 id="steps-heading" className="marketing-section-title">
          Three steps to a more organised garage.
        </h2>
        <ol className="mt-6 grid gap-5 md:grid-cols-3">
          <li className="section-card h-full">
            <div className="flex items-center justify-between gap-4">
              <CarFront className="size-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-sm font-semibold text-muted">Step 1</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold">Add your vehicle</h3>
            <p className="section-description mt-3">
              Save its details, upload a photo and make it part of your garage. Registration-document scanning can help fill in the form. Review the results before saving.
            </p>
            <p className="mt-4 border-t border-line pt-4 text-sm leading-6 text-text-secondary">
              Managing several vehicles? Choose a primary vehicle and search by make, model, nickname or plate.
            </p>
          </li>
          <li className="section-card h-full">
            <div className="flex items-center justify-between gap-4">
              <Wrench className="size-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-sm font-semibold text-muted">Step 2</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold">Keep it up to date</h3>
            <p className="section-description mt-3">
              Update the mileage and record maintenance, repairs and costs. Keep the work performed, replaced parts and workshop details together.
            </p>
            <p className="mt-4 border-t border-line pt-4 text-sm leading-6 text-text-secondary">
              Add the service date, mileage, parts and labour costs so each visit is easy to look back on.
            </p>
          </li>
          <li className="section-card h-full">
            <div className="flex items-center justify-between gap-4">
              <Gauge className="size-7 text-accent" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-sm font-semibold text-muted">Step 3</span>
            </div>
            <h3 className="mt-5 text-xl font-semibold">Know what comes next</h3>
            <p className="section-description mt-3">
              See upcoming service dates and mileage from your saved records. Download a PDF summary of your vehicle details whenever you need it.
            </p>
            <p className="mt-4 border-t border-line pt-4 text-sm leading-6 text-text-secondary">
              Include the next recommended date or mileage in a service record to see it on the vehicle page.
            </p>
          </li>
        </ol>
      </section>

      <section className="marketing-section" aria-labelledby="get-started-heading">
        <div className="section-card flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 id="get-started-heading" className="section-title">
              Start with one vehicle. Build from there.
            </h2>
            <p className="section-description mt-2">
              Your next update is the start of a better record.
            </p>
          </div>
          <Link href="/garrage" className="button-base button-primary gap-2 px-5 py-3">
            Open your garage <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
