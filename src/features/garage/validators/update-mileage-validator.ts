import { z } from "zod";

// Compare valid YYYY-MM-DD dates without converting them across time zones.
export function getMileageDateError(date: string, previousDate: string | null) {
  // Use today's local calendar date, matching the date shown in the form.
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

  if (date > today) return "Recorded date cannot be in the future.";
  // Same-day readings are allowed; corrections can omit the previous date.
  if (previousDate && date < previousDate.slice(0, 10)) {
    return "Recorded date cannot be earlier than the last mileage update.";
  }
  return null;
}

// Shared input validation used before saving a mileage update.
export const updateMileageSchema = z.object({
  mileage_km: z
    .string()
    .trim()
    .min(1, "Enter the new mileage.")
    .regex(/^\d+$/, "Mileage must be a whole positive number or zero.")
    // Inputs supply strings. Convert to a number and enforce the database integer limit.
    .transform(Number)
    .pipe(z.number().int().min(0).max(2147483647, "Mileage is too large.")),
  // Require a real calendar date in YYYY-MM-DD format.
  mileage_recorded_at: z.iso.date({
    error: "Choose a valid recorded date.",
  }),
  mode: z.enum(["reading", "correction", "replacement"]).default("reading"),
  reason: z
    .string()
    .trim()
    .max(500, "Keep the reason under 500 characters.")
    .default(""),
  confirmed: z.boolean().default(false),
});

// Add the vehicle-specific rule: an update cannot decrease the saved mileage.
export function createUpdateMileageSchema(
  currentMileage: number,
  previousDate: string | null = null,
) {
  return updateMileageSchema.superRefine((values, context) => {
    if (values.mode === "reading" && values.mileage_km < currentMileage) {
      context.addIssue({
        code: "custom",
        message: `Mileage cannot be lower than ${currentMileage.toLocaleString()} km.`,
        path: ["mileage_km"],
      });
    }
    const dateError = getMileageDateError(
      values.mileage_recorded_at,
      values.mode === "correction" ? null : previousDate,
    );
    if (dateError)
      context.addIssue({
        code: "custom",
        message: dateError,
        path: ["mileage_recorded_at"],
      });
    if (values.mode !== "reading") {
      if (!values.reason)
        context.addIssue({
          code: "custom",
          message: "Enter a reason for this adjustment.",
          path: ["reason"],
        });
      if (!values.confirmed)
        context.addIssue({
          code: "custom",
          message: "Confirm this mileage adjustment before saving.",
          path: ["confirmed"],
        });
    }
  });
}
