import Link from "next/link";

export default function HelpPage() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="page-title">Help</h1>
      <p className="mt-3 section-description">
        Get started by adding a vehicle to your garage. Open its details to update
        mileage and keep your service records together.
      </p>
      <Link href="/garrage" className="button-base button-primary mt-6">
        Go to My Garage
      </Link>
    </main>
  );
}
