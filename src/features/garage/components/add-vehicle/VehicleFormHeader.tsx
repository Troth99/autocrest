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
      <header className="mb-6 mt-4">
        <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
          Add your vehicle
        </h1>
        <p className="mt-2 section-description">
          Keep your vehicle&apos;s details together. Fields marked * are required.</p>
      </header>
    </>
  );
}
