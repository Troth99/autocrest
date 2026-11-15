"use client";
import { useState } from "react";
import Link from "next/link";
import ServiceAdditionalDetails from "./components/additional-details/ServiceAdditionalDetails";
import ServiceCost from "./components/ServiceCost";
import ServiceDetails from "./components/ServiceDetails";
import ServiceReminder from "./components/ServiceReminder";
import { addVehicleService } from "@/features/garage/services/vehicle-record.service";
import type {
  AddServiceFormState,
} from "@/features/garage/types/add-service-form";
import { useRouter } from "next/navigation";
import AddServiceButton from "./components/AddServiceButton";

type Props = {
  vehicleId: string;
};
export default function AddService({ vehicleId }: Props) {
  const router = useRouter();
  const [errors, setErrors] = useState<AddServiceFormState>({
    error: null,
    fieldErrors: {},
  });

  async function addServiceHandler(
    formData: FormData,
  ): Promise<void> {

    const values = Object.fromEntries(formData.entries());

    try {

      const result = await addVehicleService(
        vehicleId,
        values
      );
      if (result.error || Object.keys(result.fieldErrors).length > 0) {
        setErrors(result);
        return;
      }
    } catch {
      setErrors({
        error: "Could not save the service. Please try again.",
        fieldErrors: {},
      });
      return;
    }

    router.replace(`/vehicles/${vehicleId}`);
    router.refresh();
  }


  return (
    <main className="mx-auto w-full min-w-0 max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="min-w-0">
        <header className="mb-6">
          <p className="vehicle-heading-eyebrow">My garage / Service</p>
          <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
            Add car service
          </h1>
          <p className="mt-2 text-sm text-muted">
            Record maintenance or a repair. Start with the service type, date
            and mileage.
          </p>
        </header>
        <form
          className="vehicle-form grid min-w-0 gap-4"
          noValidate
          action={addServiceHandler}
          onReset={(event) => event.preventDefault()}
        >

          <fieldset className="content-card vehicle-form-section space-y-4">
            <legend className="sr-only">Service details</legend>
            <ServiceDetails
              errors={errors.fieldErrors}
            />
          </fieldset>

          <fieldset className="content-card vehicle-form-section space-y-4">
            <ServiceCost errors={errors.fieldErrors} />
          </fieldset>

          <ServiceReminder errors={errors.fieldErrors} />

          <ServiceAdditionalDetails

            errors={errors.fieldErrors}
          />

          {errors.error && (
            <p role="alert" className="text-sm text-red-400">
              {errors.error}
            </p>
          )}

          <footer className="flex justify-end gap-3 border-t border-line pt-4">
            <Link
              href={`/vehicles/${vehicleId}`}
              className="button-base button-secondary cursor-pointer px-5 py-2.5"
            >
              Cancel
            </Link>
            <AddServiceButton />
          </footer>
        </form>
      </div>
    </main>
  );
}
