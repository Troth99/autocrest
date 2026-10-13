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
import type { AddVehicleFormValues, VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import { addVehicleSchema } from "@/features/garage/validators/add-vehicle-validator";
import { uploadVehiclePhoto } from "@/features/garage/services/vehicle-photo.service";


export default function AddVehicleForm() {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<VehicleFormErrors>({});
  const [savedVehicleId, setSavedVehicleId] = useState<string | null>(null);

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

    // A retry after a photo error must not insert another vehicle.
    if (savedVehicleId) {
      setIsSubmitting(true);
      setSubmitError(null);
      setPhotoError(null);
      try {
        if (photoFile) await uploadVehiclePhoto(createClient(), savedVehicleId, photoFile);
        router.push("/garrage");
        router.refresh();
      } catch (error) {
        setPhotoError(error instanceof Error ? error.message : "Photo upload failed. Please try again.");
        setSubmitError("Your car is already saved. Retry the photo upload or continue to the garage.");
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

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

    setSubmitError(null);
    setFieldErrors({});

    try {
      const make =
        selectedMake === "other"
          ? submittedValues.custom_make
          : makes.find((item) => item.id === selectedMake)?.name ?? "";

      const model =
        selectedMake === "other" || selectedModel === "other"
          ? submittedValues.custom_model
          : models.find((item) => item.id === selectedModel)?.name ?? "";

      const input = { ...submittedValues, make, model };
      const validation = addVehicleSchema.safeParse(input);

      if (!validation.success) {
        const errors: VehicleFormErrors = {};
        for (const issue of validation.error.issues) {
          const field = issue.path[0] as keyof VehicleFormErrors;
          if (!errors[field]) errors[field] = issue.message;
        }
        setFieldErrors(errors);
        setSubmitError("Please correct the highlighted fields.");
        return;
      }

      setIsSubmitting(true);
      const supabase = createClient();

      const vehicleId = await addVehicle(supabase, {
        ...submittedValues,
        make,
        model,
      });
      setSavedVehicleId(vehicleId);

      if (photoFile) {
        try {
          await uploadVehiclePhoto(supabase, vehicleId, photoFile);
        } catch (error) {
          setPhotoError(error instanceof Error ? error.message : "Photo upload failed. Please try again.");
          setSubmitError("Your car is saved, but its photo could not be uploaded. Retry below or continue to the garage.");
          return;
        }
      }

      router.push("/garrage");
      router.refresh();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Could not save the car. Please try again.",
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
      <form
        noValidate
        className="vehicle-form grid gap-4"
        onSubmit={formHandler}
        onChange={(event) => {
          const target = event.target;
          if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
          const field = target.name === "custom_make" ? "make" : target.name === "custom_model" ? "model" : target.name;
          setFieldErrors((current) => ({ ...current, [field]: undefined }));
          setSubmitError(null);
        }}
      >

        <input type="hidden" name="vehicle_type" value="car" />

        <fieldset disabled={isSubmitting || Boolean(savedVehicleId)} className="contents">
          <VehicleDocumentScan onExtracted={(details) => {
            handleDocumentExtracted(details);
            setFieldErrors({});
            setSubmitError(null);
          }} />
        </fieldset>

        <VehiclePhotoFields
          photoFile={photoFile}
          photoError={photoError}
          onPhotoChange={setPhotoFile}
          onPhotoError={setPhotoError}
        />

        <fieldset disabled={isSubmitting || Boolean(savedVehicleId)} className="grid min-w-0 gap-4 border-0 p-0">
          <VehicleBasicFields
            errors={fieldErrors}
            register={register}
            values={documentValues}
            onFieldChange={handleFieldChange}
            makes={makes}
            selectedMake={selectedMake}
            onMakeChange={(makeId) => {
              handleMakeChange(makeId);
              setFieldErrors((current) => ({ ...current, make: undefined, model: undefined }));
              setSubmitError(null);
            }}
            isLoadingMakes={isLoadingMakes}
            models={models}
            selectedModel={selectedModel}
            onModelChange={(modelId) => {
              handleModelChange(modelId);
              setFieldErrors((current) => ({ ...current, model: undefined }));
              setSubmitError(null);
            }}
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
            className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-text-secondary hover:bg-input/45"
          >
            {savedVehicleId ? "Continue to garage" : "Cancel"}
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="action-button cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : savedVehicleId ? photoFile ? "Retry photo upload" : "Continue to garage" : "Add car"}
          </button>
        </div>
      </form>
    </main>
  );
}
