"use client";

import { getVehicleFieldErrors } from "@/features/garage/validators/getVehicleFieldErrors";
import { resolveVehicleMakeModel } from "@/features/garage/utils/resolveVehicleMakeModel";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { addVehicle } from "@/features/garage/services/vehicles.service";
import { uploadVehiclePhoto } from "@/features/garage/services/vehicle-photo.service";
import { addVehicleSchema } from "@/features/garage/validators/add-vehicle-validator";
import type {
  AddVehicleFormValues,
  VehicleFormErrors,
} from "@/features/garage/types/add-vehicle-form";
import type { VehicleDocumentFormValues } from "@/features/garage/types/vehicle-document-form";
import type {
  VehicleMake,
  VehicleModel,
} from "@/features/garage/types/vehicle-catalog";

type Props = {
  documentValues: VehicleDocumentFormValues;
  selectedMake: string;
  selectedModel: string;
  makes: VehicleMake[];
  models: VehicleModel[];
};

export default function useAddVehicleForm({
  documentValues,
  selectedMake,
  selectedModel,
  makes,
  models,
}: Props) {
  const router = useRouter();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<VehicleFormErrors>({});
  const [savedVehicleId, setSavedVehicleId] = useState<string | null>(null);

  async function handleAddCar(values: AddVehicleFormValues) {
    if (isSubmitting) return;

    // A retry after a photo error must not insert another vehicle.
    if (savedVehicleId) {
      setIsSubmitting(true);
      setSubmitError(null);
      setPhotoError(null);
      try {
        if (photoFile)
          await uploadVehiclePhoto(createClient(), savedVehicleId, photoFile);
        router.push("/garrage");
        router.refresh();
      } catch (error) {
        setPhotoError(
          error instanceof Error
            ? error.message
            : "Photo upload failed. Please try again.",
        );
        setSubmitError(
          "Your vehicle is already saved. Retry the photo upload or continue to the garage.",
        );
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
      const { make, model } = resolveVehicleMakeModel(submittedValues, {
        selectedMake,
        selectedModel,
        makes,
        models,
      });

      const input = { ...submittedValues, make, model };
      const validation = addVehicleSchema.safeParse(input);

      if (!validation.success) {
        setFieldErrors(getVehicleFieldErrors(validation.error));
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
          setPhotoError(
            error instanceof Error
              ? error.message
              : "Photo upload failed. Please try again.",
          );
          setSubmitError(
            "Your vehicle is saved, but its photo could not be uploaded. Retry below or continue to the garage.",
          );
          return;
        }
      }

      router.push("/garrage");
      router.refresh();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Could not save the vehicle. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    photoFile,
    setPhotoFile,
    photoError,
    setPhotoError,
    isSubmitting,
    submitError,
    setSubmitError,
    fieldErrors,
    setFieldErrors,
    savedVehicleId,
    handleAddCar,
  };
}
