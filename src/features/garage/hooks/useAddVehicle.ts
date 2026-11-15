"use client";

import { resolveVehicleMakeModel } from "@/features/garage/utils/resolveVehicleMakeModel";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { addVehicle } from "@/features/garage/services/vehicles.service";
import { uploadVehiclePhoto } from "@/features/garage/services/vehicle-photo.service";
import type {
  VehicleFormErrors,
  VehicleFormState,
} from "@/features/garage/types/add-vehicle-form";
import type { VehicleDocumentFormValues } from "@/features/garage/types/vehicle-document-form";
import type {
  VehicleMake,
  VehicleModel,
} from "@/features/garage/types/vehicle-catalog";

type AddVehicleState = Omit<VehicleFormState, "fieldErrors"> & {
  photoError: string | null;
  savedVehicleId: string | null;
};

type Props = {
  documentValues: VehicleDocumentFormValues;
  selectedMake: string;
  selectedModel: string;
  makes: VehicleMake[];
  models: VehicleModel[];
};

export default function useAddVehicle({
  documentValues,
  selectedMake,
  selectedModel,
  makes,
  models,
}: Props) {
  const router = useRouter();
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  // File selection can fail before the form is submitted.
  const [photoError, setPhotoError] = useState<string | null>(null);
  // Field errors can be cleared individually while editing.
  const [fieldErrors, setFieldErrors] = useState<VehicleFormErrors>({});

  function clearFieldError(field: keyof VehicleFormErrors) {
    setFieldErrors((errors) => ({ ...errors, [field]: undefined }));
  }
  async function handleAddCar(
    previousState: AddVehicleState,
    formData: FormData,
  ): Promise<AddVehicleState> {
    setFieldErrors({});
    let vehicleId = previousState.savedVehicleId;
    const emptyState: AddVehicleState = {
      error: null,
      photoError: null,
      savedVehicleId: vehicleId,
    };

    if (
      photoFile &&
      (photoFile.size === 0 || photoFile.size > 2 * 1024 * 1024)
    ) {
      return {
        ...emptyState,
        photoError: "Choose a JPG, PNG or WebP image under 2 MB.",
      };
    }

    try {
      // A retry after a photo error must not insert another vehicle.
      if (!vehicleId) {
        const values = {
          ...Object.fromEntries(formData),
          ...documentValues,
          isPrimary: formData.has("isPrimary"),
          makeId: selectedMake,
          modelId: selectedMake === "other" ? "" : selectedModel,
          customMake: selectedMake === "other" ? documentValues.customMake : "",
          customModel:
            selectedMake === "other" || selectedModel === "other"
              ? documentValues.customModel
              : "",
        };
        const { make, model } = resolveVehicleMakeModel(values, {
          selectedMake,
          selectedModel,
          makes,
          models,
        });
        // The service validates the input and returns field errors.
        const result = await addVehicle({ ...values, make, model });

        if (result.error !== null) {
          setFieldErrors(result.fieldErrors ?? {});
          return {
            ...emptyState,
            error: result.error,
          };
        }
        vehicleId = result.data;
      }

      if (photoFile) {
        const result = await uploadVehiclePhoto(vehicleId, photoFile);
        if (result.error !== null) throw new Error(result.error);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Could not save the vehicle. Please try again.";
      return {
        ...emptyState,
        savedVehicleId: vehicleId,
        error: vehicleId
          ? "Your vehicle is saved, but its photo could not be uploaded. Retry below or continue to the garage."
          : message,
        photoError: vehicleId ? message : null,
      };
    }

    router.replace("/garrage");
    router.refresh();
    return { ...emptyState, savedVehicleId: vehicleId };
  }

  const [state, formAction, isSubmitting] = useActionState(handleAddCar, {
    error: null,
    photoError: null,
    savedVehicleId: null,
  });

  return {
    state,
    formAction,
    isSubmitting,
    photoFile,
    setPhotoFile,
    photoError: photoError ?? state.photoError,
    setPhotoError,
    fieldErrors,
    clearFieldError,
  };
}
