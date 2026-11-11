"use client";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import useAddVehicleController from "@/features/garage/hooks/useAddVehicleController";
import useForm from "@/shared/hooks/useForm";
import { initialValues } from "@/features/garage/constants/add-vehicle-form";
import VehicleFormHeader from "./components/VehicleFormHeader";
import VehicleDocumentScan from "./components/VehicleDocumentScan";
import VehiclePhotoFields from "../vehicle-fields/VehiclePhotoFields";
import VehicleBasicFields from "../vehicle-fields/VehicleBasicFields";
import VehicleRegistrationFields from "../vehicle-fields/VehicleRegistrationFields";
import VehicleTechnicalFields from "../vehicle-fields/VehicleTechnicalFields";
import VehicleMileageFields from "../vehicle-fields/VehicleMileageFields";
import VehiclePurchaseFields from "../vehicle-fields/VehiclePurchaseFields";
import VehicleAdditionalDetails from "../vehicle-fields/VehicleAdditionalDetails";
import type { VehicleMake } from "@/features/garage/types/vehicle-catalog";

export default function AddVehicleForm({
  makes: initialMakes,
}: {
  makes: VehicleMake[];
}) {
  const { autofill, submission } = useAddVehicleController(initialMakes);

  // Keep input registration and submission wiring in the form component.
  const { register, registerCheckbox, formHandler } = useForm(
    submission.handleAddCar,
    initialValues,
  );

  return (
    <main className="page-shell">
      <VehicleFormHeader />

      <form
        noValidate
        className="vehicle-form grid gap-4"
        onSubmit={formHandler}
        onChange={submission.handleFormChange}
      >
        <input type="hidden" name="vehicleType" value="car" />

        <fieldset
          disabled={submission.isSubmitting || Boolean(submission.savedVehicleId)}
          className="contents"
        >
          <VehicleDocumentScan onExtracted={autofill.handleDocumentExtracted} />
        </fieldset>

        <VehiclePhotoFields
          photoFile={submission.photoFile}
          photoError={submission.photoError}
          onPhotoChange={submission.setPhotoFile}
          onPhotoError={submission.setPhotoError}
        />
        <fieldset
          disabled={submission.isSubmitting || Boolean(submission.savedVehicleId)}
          className="grid min-w-0 gap-5 border-0 p-0 xl:grid-cols-2"
        >
          <VehicleBasicFields
            errors={submission.fieldErrors}
            register={register}
            values={autofill.documentValues}
            onFieldChange={autofill.handleFieldChange}
            makes={autofill.makes}
            selectedMake={autofill.selectedMake}
            onMakeChange={autofill.handleMakeChange}
            models={autofill.models}
            selectedModel={autofill.selectedModel}
            onModelChange={autofill.handleModelChange}
            isLoadingModels={autofill.isLoadingModels}
            modelsError={autofill.modelsError}
          />
          <VehicleRegistrationFields
            errors={submission.fieldErrors}
            register={register}
            values={autofill.documentValues}
            onFieldChange={autofill.handleFieldChange}
          />
          <VehicleTechnicalFields
            errors={submission.fieldErrors}
            register={register}
            values={autofill.documentValues}
            onFieldChange={autofill.handleFieldChange}
          />
          <VehicleMileageFields errors={submission.fieldErrors} register={register} />
          <VehiclePurchaseFields errors={submission.fieldErrors} register={register} />
          <VehicleAdditionalDetails
            errors={submission.fieldErrors}
            register={register}
            registerCheckbox={registerCheckbox}
          />
        </fieldset>

        {submission.submitError && (
          <p role="alert" className="text-sm text-destructive">
            {submission.submitError}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            href="/garrage"
            className={buttonVariants({
              variant: "outline",
              className: "h-12 gap-2.5 px-6 text-base",
            })}
          >
            <X className="size-5" aria-hidden="true" />
            {submission.savedVehicleId ? "Continue to garage" : "Cancel"}
          </Link>
          <Button
            type="submit"
            disabled={submission.isSubmitting}
            className="h-12 cursor-pointer gap-2.5 bg-accent px-6 text-base text-ink hover:bg-accent-strong"
          >
            <Check className="size-5" aria-hidden="true" />
            {submission.isSubmitting
              ? "Saving..."
              : submission.savedVehicleId
                ? submission.photoFile
                  ? "Retry photo upload"
                  : "Continue to garage"
                : "Add vehicle"}
          </Button>
        </div>
      </form>
    </main>
  );
}
