import type { VehicleServiceRecord } from "@/features/garage/types/vehicle-service-record";

// Map stored visit reasons to the labels displayed in service details.
export const visitReasonLabels: Record<NonNullable<VehicleServiceRecord["visitReason"]>, string> = {
  scheduled: "Scheduled maintenance",
  repair: "Repair",
  diagnostics: "Diagnostics",
  recall: "Manufacturer recall",
  other: "Other",
};
