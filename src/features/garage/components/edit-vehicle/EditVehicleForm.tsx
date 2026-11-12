"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import useEditVehicleCatalog from "@/features/garage/hooks/useEditVehicleCatalog";
import { updateVehicle } from "@/features/garage/services/vehicles.service";
import { resolveVehicleMakeModel } from "@/features/garage/utils/resolveVehicleMakeModel";
import { ArrowLeft, X } from "lucide-react";
import { buttonVariants } from "@/shared/components/ui/button";
import type { Vehicle } from "@/features/garage/types/vehicle";
import type { VehicleFormState } from "@/features/garage/types/add-vehicle-form";
import type { VehicleDocumentFormValues } from "@/features/garage/types/vehicle-document-form";
import VehicleBasicFields from "@/features/garage/components/vehicle-fields/VehicleBasicFields";
import VehicleRegistrationFields from "@/features/garage/components/vehicle-fields/VehicleRegistrationFields";
import VehicleTechnicalFields from "@/features/garage/components/vehicle-fields/VehicleTechnicalFields";
import VehiclePurchaseFields from "@/features/garage/components/vehicle-fields/VehiclePurchaseFields";
import VehicleAdditionalDetails from "@/features/garage/components/vehicle-fields/VehicleAdditionalDetails";
import type { VehicleMake, VehicleModel } from "@/features/garage/types/vehicle-catalog";
import SubmitEditVehicleButton from "./SubmittingEditVehicleButton";

type Props = {
  makes: VehicleMake[];
  models: VehicleModel[];
  vehicle: Vehicle;
};

export function EditVehicleForm({
  vehicle,
  makes: initialMakes,
  models: initialModels,
}: Props) {
  const detailsUrl = `/vehicles/${vehicle.id}`;

  const name = `${vehicle.make} ${vehicle.model}`;

  const catalog = useEditVehicleCatalog(vehicle, initialMakes, initialModels);

  const [manualNames, setManualNames] = useState({
    customMake: vehicle.make,
    customModel: vehicle.model,
  });

  function handleMakeChange(makeId: string) {

    if (makeId === catalog.selectedMake) return;

    catalog.handleMakeChange(makeId);
    setManualNames((current) => ({ ...current, customModel: "" }));
  }

  function handleFieldChange(field: keyof VehicleDocumentFormValues, value: string) {
    if (field === "customMake" || field === "customModel") {
      setManualNames((current) => ({ ...current, [field]: value }));
    }
  }

  const names = resolveVehicleMakeModel(manualNames, catalog);

  async function saveVehicle(previousState: VehicleFormState, formData: FormData) {
    return await updateVehicle(vehicle.id, previousState, formData);
  }

  const [{ error: saveError, fieldErrors }, formAction, pending] = useActionState(
    saveVehicle,
    { error: null, fieldErrors: {} },
  );

  return (
    <main className="page-shell">
      <Link
        href={detailsUrl}
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-info"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to vehicle
        details
      </Link>
      <header className="mb-6">
        <p className="vehicle-heading-eyebrow">My garage / Edit vehicle</p>
        <h1 className="vehicle-heading-title">Edit {name}</h1>
        <p className="mt-2 text-sm text-muted">
          Keep your vehicle details up to date.
        </p>
      </header>

      <form
        className="vehicle-form grid gap-5"
        action={formAction}
        // Preserve native input values when the action returns validation errors.
        onReset={(event) => event.preventDefault()}
      >
        <input type="hidden" name="make" value={names.make} />
        <input type="hidden" name="model" value={names.model} />
        <fieldset disabled={pending} className="contents">
          <div className="grid min-w-0 gap-5 xl:grid-cols-2">
            <VehicleBasicFields
              defaultValues={vehicle}
              errors={fieldErrors}
              values={manualNames}
              onFieldChange={handleFieldChange}
              makes={catalog.makes}
              selectedMake={catalog.selectedMake}
              onMakeChange={handleMakeChange}
              models={catalog.models}
              selectedModel={catalog.selectedModel}
              onModelChange={catalog.handleModelChange}
              isLoadingModels={catalog.isLoadingModels}
              modelsError={catalog.modelsError}
            />

            <VehicleRegistrationFields
              defaultValues={vehicle}
              errors={fieldErrors}
            />

            <VehicleTechnicalFields
              defaultValues={vehicle}
              errors={fieldErrors}
            />

            <div className="grid content-start gap-5">
              <VehiclePurchaseFields defaultValues={vehicle} errors={fieldErrors} />
            </div>

            <VehicleAdditionalDetails
              defaultValues={vehicle}
              errors={fieldErrors}
            />
          </div>
        </fieldset>
        {saveError && (
          <p role="alert" className="text-sm text-destructive">
            {saveError}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            href={detailsUrl}
            className={buttonVariants({
              variant: "outline",
              className: "h-12 gap-2.5 px-6 text-base",
            })}
          >
            <X className="size-5" aria-hidden="true" /> Cancel
          </Link>
          <SubmitEditVehicleButton isLoadingModels={catalog.isLoadingModels} />
        </div>
      </form>
    </main>
  );
}
