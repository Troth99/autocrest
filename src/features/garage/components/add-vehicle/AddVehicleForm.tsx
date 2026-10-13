"use client";

import Link from "next/link";
import VehicleBasicFields from "@/features/garage/components/add-vehicle/fields/VehicleBasicFields";
import VehicleRegistrationFields from "@/features/garage/components/add-vehicle/fields/VehicleRegistrationFields";
import VehicleTechnicalFields from "@/features/garage/components/add-vehicle/fields/VehicleTechnicalFields";
import VehicleMileageFields from "@/features/garage/components/add-vehicle/fields/VehicleMileageFields";
import VehiclePurchaseFields from "@/features/garage/components/add-vehicle/fields/VehiclePurchaseFields";
import VehicleFormHeader from "@/features/garage/components/add-vehicle/VehicleFormHeader";
import VehicleAdditionalDetails from "@/features/garage/components/add-vehicle/fields/VehicleAdditionalDetails";
import { useState } from "react";
import useVehicleDocumentAutofill from "@/features/garage/hooks/useVehicleDocumentAutofill";
import VehiclePhotoFields from "@/features/garage/components/add-vehicle/fields/VehiclePhotoFields";
import VehicleDocumentScan from "@/features/garage/components/add-vehicle/VehicleDocumentScan";
import useForm from "@/shared/hooks/useForm";
import { initialValues } from "@/features/garage/constants/add-vehicle-form";
import { createClient } from "@/lib/supabase/client";
import { addVehicle } from "@/features/garage/services/vehicles.service";
import { useRouter } from "next/navigation";
import type { AddVehicleFormValues } from "@/features/garage/types/add-vehicle-form";


export default function AddVehicleForm() {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    makes, isLoadingMakes, makesError, selectedMake,
    models, selectedModel, isLoadingModels, modelsError,
    documentValues, handleFieldChange, handleDocumentExtracted,
    handleMakeChange, handleModelChange,
  } = useVehicleDocumentAutofill();

  const {
    register,
    registerCheckbox,
    formHandler,
  } = useForm(handleAddCar, initialValues);

  async function handleAddCar(values: AddVehicleFormValues) {
    if (isSubmitting) return;

    // Catalog selection and document autofill already own these fields.
    // Include their current values when submitting the registered inputs.
    const submittedValues: AddVehicleFormValues = {
      ...values,
      ...documentValues,
      make_id: selectedMake,
      model_id: selectedMake === "other" ? "" : selectedModel,
      custom_make: selectedMake === "other" ? documentValues.custom_make : "",
      custom_model:
        selectedMake === "other" || selectedModel === "other"
          ? documentValues.custom_model
          : "",
    };

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const make =
        selectedMake === "other"
          ? submittedValues.custom_make
          : makes.find((item) => item.id === selectedMake)?.name ?? "";

      const model =
        selectedMake === "other" || selectedModel === "other"
          ? submittedValues.custom_model
          : models.find((item) => item.id === selectedModel)?.name ?? "";

      const supabase = createClient();

      await addVehicle(supabase, {
        ...submittedValues,
        make,
        model,
      });

      router.push("/garrage");
      router.refresh();
    } catch {
      setSubmitError(
        "Could not save the car. Check your details and try again.",
      );
    } finally {
      setIsSubmitting(false);
    }


  }
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <VehicleFormHeader />

      {makesError && (
        <p role="alert" className="mb-4 text-sm text-destructive">
          {makesError}
        </p>
      )}
      <form className="vehicle-form grid gap-4" onSubmit={formHandler}>

        <input type="hidden" name="vehicle_type" value="car" />

        <VehicleDocumentScan onExtracted={handleDocumentExtracted} />

        <VehiclePhotoFields
          photoFile={photoFile}
          photoError={photoError}
          onPhotoChange={setPhotoFile}
          onPhotoError={setPhotoError}
        />

        <VehicleBasicFields
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
        <VehicleRegistrationFields register={register} values={documentValues} onFieldChange={handleFieldChange} />
        <VehicleTechnicalFields register={register}
          values={documentValues}
          onFieldChange={handleFieldChange}
        />
        <VehicleMileageFields register={register} />
        <VehiclePurchaseFields register={register} />
        <VehicleAdditionalDetails register={register} registerCheckbox={registerCheckbox} />
        {submitError && (
          <p role="alert" className="text-sm text-destructive">
            {submitError}
          </p>
        )}
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            href="/garrage"
            className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-text-secondary hover:bg-input/45"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="action-button cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Add car"}
          </button>
        </div>
      </form>
    </main>
  );
}
