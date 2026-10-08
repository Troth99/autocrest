"use client";

import Link from "next/link";
import VehicleFormSection from "@/features/garage/components/add-vehicle/VehicleFormSection";
import VehicleFormHeader from "@/features/garage/components/add-vehicle/VehicleFormHeader";
import VehicleAdditionalDetails from "@/features/garage/components/add-vehicle/VehicleAdditionalDetails";
import { sections } from "@/features/garage/components/add-vehicle/vehicle-form-fields";

export default function AddVehicleForm() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <VehicleFormHeader />
      <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
        <input type="hidden" name="vehicle_type" value="car" />
        {sections.map((section) => (
          <VehicleFormSection key={section.title} section={section} />
        ))}
        <VehicleAdditionalDetails />
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            href="/garrage"
            className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-text-secondary hover:bg-input/45"
          >
            Cancel
          </Link>
          <button
            type="button"
            disabled
            className="action-button cursor-not-allowed opacity-50"
          >
            Add car
          </button>
        </div>
      </form>
    </main>
  );
}
