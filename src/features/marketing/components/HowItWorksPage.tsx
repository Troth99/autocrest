import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-12 text-text-primary sm:px-8 sm:py-16">
      <section aria-labelledby="how-it-works-heading" className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          How it works
        </p>
        <h1 id="how-it-works-heading" className="mt-5 marketing-page-title">
          Keep track of your vehicle, one update at a time.
        </h1>
        <p className="mt-6 text-lg leading-8 sm:text-xl">
          Add your vehicle, record the work done and check when the next
          service is recommended.
        </p>
      </section>

      <section aria-labelledby="add-vehicle-heading" className="mt-12 marketing-about-section">
        <h2 id="add-vehicle-heading" className="text-2xl font-semibold tracking-tight">
          1. Add your vehicle
        </h2>
        <div className="max-w-2xl space-y-4 text-lg leading-8 text-text-secondary">
          <p>
            Save your vehicle details and add a photo. You can enter the
            information yourself or scan a registration document to help fill
            in the form. Review the scanned details before saving.
          </p>
          <p>
            If you manage more than one vehicle, choose a primary vehicle and
            find the others by make, model, nickname or registration plate.
          </p>
        </div>
      </section>

      <section aria-labelledby="record-service-heading" className="marketing-about-section">
        <h2 id="record-service-heading" className="text-2xl font-semibold tracking-tight">
          2. Record maintenance
        </h2>
        <div className="max-w-2xl space-y-4 text-lg leading-8 text-text-secondary">
          <p>
            After a service or repair, add the date, mileage and work performed.
            Include replaced parts, workshop details and parts and labour costs
            so you have a record of the visit.
          </p>
          <p>
            You can also update the vehicle mileage between services to keep
            the reading current.
          </p>
        </div>
      </section>

      <section aria-labelledby="next-service-heading" className="marketing-about-section">
        <h2 id="next-service-heading" className="text-2xl font-semibold tracking-tight">
          3. Check what is due
        </h2>
        <div className="max-w-2xl space-y-4 text-lg leading-8 text-text-secondary">
          <p>
            When adding a service record, include the next recommended service
            date or mileage. Those details appear on the vehicle page for you
            to refer to later.
          </p>
          <p>
            Your saved records stay together in the garage. You can look back
            at previous work or download a PDF summary of your vehicle details.
          </p>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-5 border-t border-line pt-8">
        <p className="text-xl font-semibold">Ready to add your first vehicle?</p>
        <Link href="/garrage" className="button-base button-primary gap-2 px-5 py-3">
          Open your garage <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </main>
  );
}
