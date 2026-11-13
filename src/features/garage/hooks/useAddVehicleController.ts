"use client";

import useAddVehicle from "@/features/garage/hooks/useAddVehicle";
import useVehicleDocumentAutofill from "@/features/garage/hooks/useVehicleDocumentAutofill";
import type { VehicleMake } from "@/features/garage/types/vehicle-catalog";

export default function useAddVehicleController(makes: VehicleMake[]) {
  const autofill = useVehicleDocumentAutofill(makes);
  const submission = useAddVehicle(autofill);

  return { autofill, submission };
}
