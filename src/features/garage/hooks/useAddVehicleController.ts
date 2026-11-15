"use client";

import type { ChangeEvent } from "react";
import type { VehicleDocumentFormValues } from "@/features/garage/types/vehicle-document-form";
import useAddVehicle from "@/features/garage/hooks/useAddVehicle";
import useVehicleDocumentAutofill from "@/features/garage/hooks/useVehicleDocumentAutofill";
import type { VehicleMake } from "@/features/garage/types/vehicle-catalog";

export default function useAddVehicleController(makes: VehicleMake[]) {
  const autofill = useVehicleDocumentAutofill(makes);
  const submission = useAddVehicle(autofill);

  function handleRegistrationChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    const field = name as keyof VehicleDocumentFormValues;
    autofill.handleFieldChange(field, value);
    submission.clearFieldError(field);
  }

  return { autofill, submission, handleRegistrationChange };
}
