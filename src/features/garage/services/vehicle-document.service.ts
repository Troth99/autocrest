import {
  vehicleDocumentSchema,
  type VehicleDocumentDetails,
} from "@/features/garage/validators/vehicle-document.validator";

export async function extractVehicleDocument(
  file: File,
): Promise<VehicleDocumentDetails> {
  const formData = new FormData();
  formData.append("document", file);

  const response = await fetch("/api/vehicles/extract", {
    method: "POST",
    body: formData,
    signal: AbortSignal.timeout(75_000),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      typeof result.error === "string"
        ? result.error
        : "Could not scan the document.",
    );
  }

  const details = vehicleDocumentSchema.safeParse(result.details);

  if (!details.success) {
    throw new Error("The server returned invalid vehicle details.");
  }

  return details.data;
}
