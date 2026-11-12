"use client";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import ServiceAdditionalDetails from "./components/additional-details/ServiceAdditionalDetails";
import ServiceCost from "./components/ServiceCost";
import ServiceDetails from "./components/ServiceDetails";
import ServiceReminder from "./components/ServiceReminder";
import { addVehicleService } from "@/features/garage/services/vehicle-record.service";
import type {
  AddServiceFormState,
} from "@/features/garage/types/add-service-form";

type Props = {
  vehicleId: string;
};
export default function AddService({ vehicleId }: Props) {
  const router = useRouter();

  async function addServiceHandler(
    _previousState: AddServiceFormState,
    formData: FormData,
  ): Promise<AddServiceFormState> {
    try {
      const result = await addVehicleService(
        vehicleId,
        Object.fromEntries(formData.entries()),
      );
      if (result.error || Object.keys(result.fieldErrors).length > 0) {
        return result;
      }
    } catch {
      return {
        error: "Could not save the service. Please try again.",
        fieldErrors: {},
      };
    }

    router.push(`/vehicles/${vehicleId}`);
    router.refresh();
    return { error: null, fieldErrors: {} };
  }

  const [{ error: saveError, fieldErrors: errors }, formAction, isSaving] =
    useActionState<AddServiceFormState, FormData>(
      addServiceHandler,
      { error: null, fieldErrors: {} },
    );

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
          action={formAction}
          onReset={(event) => event.preventDefault()}
        >
          <fieldset disabled={isSaving} className="grid min-w-0 gap-4">
            <legend className="sr-only">Service record</legend>
            <fieldset className="content-card vehicle-form-section space-y-4">
              <legend className="sr-only">Service details</legend>
              <ServiceDetails
                errors={errors}
              />
            </fieldset>

            <fieldset className="content-card vehicle-form-section space-y-4">
              <ServiceCost errors={errors} />
            </fieldset>

            <ServiceReminder errors={errors} />

            <ServiceAdditionalDetails

              errors={errors}
            />

            {saveError && (
              <p role="alert" className="text-sm text-red-400">
                {saveError}
              </p>
            )}

            <footer className="flex justify-end gap-3 border-t border-line pt-4">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => router.push(`/vehicles/${vehicleId}`)}
                className="button-base button-secondary cursor-pointer px-5 py-2.5 disabled:cursor-not-allowed"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="button-base button-primary px-5 py-2.5 cursor-pointer disabled:cursor-not-allowed"
              >
                {isSaving ? "Saving..." : "Save service"}
              </button>
            </footer>
          </fieldset>
        </form>
      </div>
    </main>
  );
}
