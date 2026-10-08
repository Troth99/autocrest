import Link from "next/link";

export default function VehicleFormHeader() {
  return (
    <>
      <Link
        href="/garrage"
        className="text-sm font-medium text-muted hover:text-text-primary"
      >
        Back to my garage
      </Link>
      <header className="my-6">
        <span className="eyebrow">YOUR VEHICLE DETAILS</span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
          Add your car
        </h1>
        <p className="mt-2 section-description">
          Keep your car&apos;s details together. Fields marked * are required.
        </p>
        <p className="mt-2 text-sm text-muted">
          Form preview — saving is not available yet.
        </p>
      </header>
    </>
  );
}
