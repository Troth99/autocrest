"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import useEditVehicleCatalog from "@/features/garage/hooks/useEditVehicleCatalog";
import { updateVehicle } from "@/features/garage/services/vehicles.service";
import { resolveVehicleMakeModel } from "@/features/garage/utils/resolveVehicleMakeModel";
import { getVehicleFieldErrors } from "@/features/garage/validators/getVehicleFieldErrors";
import type { Vehicle } from "@/features/garage/types/vehicle";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import type { EditVehicleFormValues } from "@/features/garage/types/edit-vehicle-form";
import type { VehicleMake, VehicleModel } from "@/features/garage/types/vehicle-catalog";

export default function useEditVehicleForm(
  vehicle: Vehicle,
  makes: VehicleMake[],
  models: VehicleModel[],
) {
  const router = useRouter();
  const catalog = useEditVehicleCatalog(vehicle, makes, models);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<VehicleFormErrors>({});

  async function handleEditVehicle(values: EditVehicleFormValues) {
    if (isSaving || catalog.isLoadingModels) return;
    setIsSaving(true);
    setSaveError(null);
    setFieldErrors({});
    try {
      const names = resolveVehicleMakeModel(values, catalog);
      const result = await updateVehicle(vehicle.id, { ...values, ...names });
      if (result.error !== null) {
        setFieldErrors(result.fieldErrors ?? {});
        throw new Error(result.error);
      }
    } catch (error) {
      if (error instanceof ZodError) {
        setFieldErrors(getVehicleFieldErrors(error));
        setSaveError("Please correct the highlighted fields.");
      } else {
        setSaveError(
          error instanceof Error
            ? error.message
            : "Could not update the vehicle.",
        );
      }
      setIsSaving(false);
      return;
    }
    router.push(`/vehicles/${vehicle.id}`);
    router.refresh();
  }

  return {
    ...catalog,
    isSaving,
    saveError,
    fieldErrors,
    handleEditVehicle,
  };
}
