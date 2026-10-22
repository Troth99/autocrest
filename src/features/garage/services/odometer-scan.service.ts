import { odometerScanSchema } from "@/features/garage/validators/odometer-scan-validator";

export async function scanOdometerPhoto(photo: File): Promise<number> {
  const formData = new FormData();
  formData.append("photo", photo);

  const response = await fetch("/api/vehicles/odometer/extract", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Could not scan the photo.");
  }

  const reading = odometerScanSchema.parse(result.reading);

  if (reading.mileage === null || reading.unit === null) {
    throw new Error("Could not clearly read the mileage and unit.");
  }

  // The mileage form saves whole kilometres, including for photos showing miles.
  return Math.round(
    reading.unit === "mi" ? reading.mileage * 1.609344 : reading.mileage,
  );
}
