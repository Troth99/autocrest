export function formatVehicleValue(
  value: string | number | null | undefined,
): string {
  if (value == null || (typeof value === "string" && value.trim() === "")) {
    return "Not provided";
  }

  return String(value);
}
