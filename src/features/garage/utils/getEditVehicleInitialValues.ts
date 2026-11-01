import { initialValues } from "@/features/garage/constants/add-vehicle-form";
import type { EditVehicleFormValues } from "@/features/garage/types/edit-vehicle-form";
import type { Vehicle } from "@/features/garage/types/vehicle";

// Inputs use strings, while checkbox values must remain booleans.
export function getEditVehicleInitialValues(vehicle: Vehicle): EditVehicleFormValues {
  return {
    ...initialValues,
    ...Object.fromEntries(
      Object.entries(vehicle).map(([key, value]) => [
        key,
        typeof value === "boolean" ? value : String(value ?? ""),
      ]),
    ),
    mileageRecordedAt: vehicle.mileageRecordedAt?.slice(0, 10) ?? "",
    customMake: vehicle.make,
    customModel: vehicle.model,
  } as EditVehicleFormValues;
}
