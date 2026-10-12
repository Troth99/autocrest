//this component is used to select the vehicle type in the add vehicle form

import Link from "next/link";
import type { VehicleType } from "@/features/garage/types/vehicle";

const vehicleOptions: { value: VehicleType; label: string }[] = [
  { value: "car", label: "Car" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "atv", label: "ATV" },
  { value: "van", label: "Van" },
  { value: "truck", label: "Truck" },
  { value: "camper", label: "Camper" },
  { value: "trailer", label: "Trailer" },
  { value: "other", label: "Other" },
];

export default function VehicleTypeSelection() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/garrage"
        className="text-sm font-medium text-muted hover:text-text-primary"
      >
        Back to my garage
      </Link>

      <header className="my-6">
        <span className="eyebrow">ADD A VEHICLE</span>
        <h1 className="mt-3 text-3xl font-semibold text-text-primary">
          What vehicle are you adding?
        </h1>
        <p className="mt-2 section-description">
          Choose a type to open the appropriate form.
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        {vehicleOptions.map(({ value, label }) =>
          value === "car" ? (
            <Link
              key={value}
              href={`/vehicles/add?type=${value}`}
              className="content-card rounded-2xl p-5 font-medium text-text-primary hover:bg-info-soft"
            >
              {label}
            </Link>
          ) : (
            <div
              key={value}
              className="content-card flex items-center justify-between rounded-2xl p-5 text-muted"
            >
              <span>{label}</span>
              <span className="text-xs">Coming soon</span>
            </div>
          ),
        )}
      </div>
    </main>
  );
}
