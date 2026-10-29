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


export default function AddVehicleForm() {
  const {
    makes, isLoadingMakes, makesError, selectedMake,
    models, selectedModel, isLoadingModels, modelsError,
    documentValues, handleFieldChange, handleDocumentExtracted,
    handleMakeChange, handleModelChange, handleFormChange,
    photoFile, setPhotoFile, photoError, setPhotoError,
    isSubmitting, submitError, fieldErrors, savedVehicleId,
    handleAddCar,
  } = useAddVehicleController();

  // Keep input registration and submission wiring in the form component.
  const { register, registerCheckbox, formHandler } = useForm(
    handleAddCar,
    initialValues,
  );

  return (
    <main className="page-shell">
      <VehicleFormHeader />

      {makesError && (
        <p role="alert" className="mb-4 text-sm text-destructive">
          {makesError}
        </p>
      )}
      <form
        noValidate
        className="vehicle-form grid gap-4"
        onSubmit={formHandler}
        onChange={handleFormChange}
      >

        <input type="hidden" name="vehicle_type" value="car" />

        <fieldset disabled={isSubmitting || Boolean(savedVehicleId)} className="contents">
          <VehicleDocumentScan onExtracted={handleDocumentExtracted} />
        </fieldset>

        <VehiclePhotoFields
          photoFile={photoFile}
          photoError={photoError}
          onPhotoChange={setPhotoFile}
          onPhotoError={setPhotoError}
        />
        <fieldset disabled={isSubmitting || Boolean(savedVehicleId)} className="grid min-w-0 gap-5 border-0 p-0 xl:grid-cols-2">
          <VehicleBasicFields
            errors={fieldErrors}
            register={register}
            values={documentValues}
            onFieldChange={handleFieldChange}
            makes={makes}
            selectedMake={selectedMake}
            onMakeChange={handleMakeChange}
            isLoadingMakes={isLoadingMakes}
            models={models}
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
            isLoadingModels={isLoadingModels}
            modelsError={modelsError}
          />
          <VehicleRegistrationFields errors={fieldErrors} register={register} values={documentValues} onFieldChange={handleFieldChange} />
          <VehicleTechnicalFields errors={fieldErrors} register={register}
            values={documentValues}
            onFieldChange={handleFieldChange}
          />
          <VehicleMileageFields errors={fieldErrors} register={register} />
          <VehiclePurchaseFields errors={fieldErrors} register={register} />
          <VehicleAdditionalDetails errors={fieldErrors} register={register} registerCheckbox={registerCheckbox} />
        </fieldset>

        {submitError && (
          <p role="alert" className="text-sm text-destructive">
            {submitError}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            href="/garrage"
            className={buttonVariants({ variant: "outline", className: "h-12 gap-2.5 px-6 text-base" })}
          >
            <X className="size-5" aria-hidden="true" />
            {savedVehicleId ? "Continue to garage" : "Cancel"}
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 cursor-pointer gap-2.5 bg-accent px-6 text-base text-ink hover:bg-accent-strong"
          >
            <Check className="size-5" aria-hidden="true" />
            {isSubmitting ? "Saving..." : savedVehicleId ? photoFile ? "Retry photo upload" : "Continue to garage" : "Add vehicle"}
          </Button>
        </div>
      </form>
    </main>
  );
}
