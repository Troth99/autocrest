"use server";

import {
  vehicleDocumentSchema,
  type VehicleDocumentDetails,
} from "@/features/garage/validators/vehicle-document.validator";
import {
  extractDocumentWithGemini,
  getGeminiError,
} from "@/features/garage/services/vehicle-document/gemini";
import { responseSchema } from "@/features/garage/services/vehicle-document/schemas";
import requireUserWithMfa from "@/shared/services/auth-session.service";

type ScanResult =
  | { data: VehicleDocumentDetails; error: null }
  | { data: null; error: string };

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function extractVehicleDocument(
  document: File,
): Promise<ScanResult> {
  try {
    await requireUserWithMfa();
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "Could not verify your session.",
    };
  }

  // Read the API key on the server without exposing it to the browser.
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPEN_GEMINI_API_KEY;
  if (!apiKey) {
    return { data: null, error: "Document scanning is not configured." };
  }

  // Validate uploads on the server even when the browser already checked them.
  if (!(document instanceof File) || document.size === 0) {
    return { data: null, error: "Please select a document image." };
  }

  if (!ACCEPTED_TYPES.includes(document.type)) {
    return { data: null, error: "Choose a JPEG, PNG or WebP image." };
  }

  if (document.size > MAX_FILE_SIZE) {
    return { data: null, error: "The image must be 5 MB or smaller." };
  }

  try {
    const response = await extractDocumentWithGemini(document, apiKey);

    // Convert provider errors into messages the interface can display.
    if (!response.ok) {
      const { message } = await getGeminiError(response);
      return { data: null, error: message };
    }

    // Validate the Gemini response and reject incomplete generation.
    const result = responseSchema.parse(await response.json());
    const candidate = result.candidates?.[0];
    if (candidate?.finishReason && candidate.finishReason !== "STOP") {
      return {
        data: null,
        error: "The scan did not finish. Please try again.",
      };
    }

    // Collect the result text, excluding parts marked as internal reasoning.
    const text = (candidate?.content?.parts ?? [])
      .filter((item) => !item.thought)
      .map((item) => item.text ?? "")
      .join("");

    if (!text) {
      return {
        data: null,
        error: "Could not read the document. Try a clearer photo.",
      };
    }

    // Validate extracted fields with the same Zod schema used by the client.
    const details = vehicleDocumentSchema.safeParse(JSON.parse(text));
    if (!details.success) {
      return { data: null, error: "Could not validate the extracted details." };
    }
    if (Object.values(details.data).every((value) => value === null)) {
      return {
        data: null,
        error: "No vehicle details were readable in this photo.",
      };
    }

    // Return details for autofill without saving the vehicle or photo.
    return { data: details.data, error: null };
  } catch (error) {
    if (
      error instanceof Error &&
      ["TimeoutError", "AbortError"].includes(error.name)
    ) {
      return {
        data: null,
        error: "The scanning service took too long. Please try again.",
      };
    }
    return {
      data: null,
      error: "Could not process the document. Please try again.",
    };
  }
}
