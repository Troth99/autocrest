"use client";

import { getVehicleFieldErrors } from "@/features/garage/validators/getVehicleFieldErrors";
import { resolveVehicleMakeModel } from "@/features/garage/utils/resolveVehicleMakeModel";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { initialValues } from "@/features/garage/constants/add-vehicle-form";
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
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<VehicleFormErrors>({});
  const [savedVehicleId, setSavedVehicleId] = useState<string | null>(null);

  async function handleAddCar(formData: FormData) {
    const values: AddVehicleFormValues = {
      ...initialValues,
      ...Object.fromEntries(
        Array.from(formData.entries()).filter(
          ([, value]) => typeof value === "string",
        ),
      ),
      isPrimary: formData.has("isPrimary"),
    };
    if (photoFile && (photoFile.size === 0 || photoFile.size > 2 * 1024 * 1024)) {
      setPhotoError("Choose a JPG, PNG or WebP image under 2 MB.");
      return;
    }

    // A retry after a photo error must not insert another vehicle.
    if (savedVehicleId) {
      setSubmitError(null);
      setPhotoError(null);
      try {
        if (photoFile) {
          const result = await uploadVehiclePhoto(savedVehicleId, photoFile);
          if (result.error !== null) throw new Error(result.error);
        }
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
      }
      return;
    }

    // Catalog selection and document autofill already own these fields.
    // Include their current values alongside the native form inputs.
    const submittedValues: AddVehicleFormValues = {
      ...values,
      ...documentValues,
      makeId: selectedMake,
      modelId: selectedMake === "other" ? "" : selectedModel,
      customMake: selectedMake === "other" ? documentValues.customMake : "",
      customModel:
        selectedMake === "other" || selectedModel === "other"
          ? documentValues.customModel
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
      const result = await addVehicle({
        ...submittedValues,
        make,
        model,
      });
      if (result.error !== null) {
        setFieldErrors(result.fieldErrors ?? {});
        throw new Error(result.error);
      }
      const vehicleId = result.data;
      setSavedVehicleId(vehicleId);

      if (photoFile) {
        try {
          const photoResult = await uploadVehiclePhoto(vehicleId, photoFile);
          if (photoResult.error !== null) throw new Error(photoResult.error);
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
    }
  }

  const [, formAction, isSubmitting] = useActionState(
    async (_previousState: null, formData: FormData) => {
      await handleAddCar(formData);
      return null;
    },
    null,
  );

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
    formAction,
  };
}
