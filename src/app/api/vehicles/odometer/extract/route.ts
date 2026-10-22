import { createClient } from "@/lib/supabase/server";
import { odometerScanSchema } from "@/features/garage/validators/odometer-scan-validator";
import { getGeminiError } from "@/features/garage/services/gemini-extraction.service";
import { extractOdometerWithGemini } from "./gemini";
import { responseSchema } from "./schema";

// The Gemini helper uses Node's Buffer to encode the image.
export const runtime = "nodejs";
// Allow time for the provider helper's 60-second timeout and response handling.
export const maxDuration = 70;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: Request) {
  // Authenticate before allowing access to the external scanning service.
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return Response.json(
      { error: "Please sign in to scan an odometer." },
      { status: 401 },
    );
  }

  // Read credentials only on the server; never send them to the browser.
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPEN_GEMINI_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Odometer scanning is not configured." },
      { status: 503 },
    );
  }

  // Read the multipart upload; malformed requests may fail before file validation.
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid upload request." }, { status: 400 });
  }

  // The client must upload the file under the "photo" field.
  const photo = formData.get("photo");

  if (!(photo instanceof File) || photo.size === 0) {
    return Response.json(
      { error: "Please select an odometer photo." },
      { status: 400 },
    );
  }

  // Check the declared format and size on the server, regardless of client checks.
  if (!ACCEPTED_TYPES.includes(photo.type)) {
    return Response.json(
      { error: "Choose a JPEG, PNG or WebP image." },
      { status: 400 },
    );
  }

  if (photo.size > MAX_FILE_SIZE) {
    return Response.json(
      { error: "The image must be 5 MB or smaller." },
      { status: 413 },
    );
  }

  try {
    // Send the validated upload to Gemini using the odometer prompt and schema.
    const response = await extractOdometerWithGemini(photo, apiKey);

    // Convert provider failures into safe messages without exposing raw responses.
    if (!response.ok) {
      const { message, status } = await getGeminiError(response);
      return Response.json({ error: message }, { status });
    }

    // Validate the response envelope before accessing generated content.
    const result = responseSchema.parse(await response.json());
    const candidate = result.candidates?.[0];

    // Reject blocked or truncated generations rather than accepting partial output.
    if (candidate?.finishReason && candidate.finishReason !== "STOP") {
      return Response.json(
        { error: "The scan did not finish. Please try again." },
        { status: 502 },
      );
    }

    // Combine result text while excluding any parts marked as internal reasoning.
    const text = (candidate?.content?.parts ?? [])
      .filter((part) => !part.thought)
      .map((part) => part.text ?? "")
      .join("");

    if (!text) {
      return Response.json(
        { error: "Could not read the odometer. Try a clearer photo." },
        { status: 422 },
      );
    }

    // Treat generated JSON as untrusted until it passes the odometer validator.
    let extracted: unknown;

    try {
      extracted = JSON.parse(text);
    } catch {
      return Response.json(
        { error: "The scan returned an invalid result. Please try again." },
        { status: 502 },
      );
    }

    const reading = odometerScanSchema.safeParse(extracted);

    if (!reading.success) {
      return Response.json(
        { error: "Could not validate the odometer reading." },
        { status: 422 },
      );
    }

    // Require both fields so an unclear unit cannot silently become kilometres.
    if (reading.data.mileage === null || reading.data.unit === null) {
      return Response.json(
        {
          error:
            "Could not clearly read the total mileage and its unit. Enter the reading manually or try a clearer photo.",
        },
        { status: 422 },
      );
    }

    // Return a suggestion only; saving requires user confirmation.
    return Response.json({ reading: reading.data });
  } catch (error) {
    // Distinguish provider timeouts from other processing failures.
    const timedOut =
      error instanceof Error &&
      ["TimeoutError", "AbortError"].includes(error.name);

    return Response.json(
      {
        error: timedOut
          ? "Scanning took too long. Please try again."
          : "Could not process the photo. Please try again.",
      },
      { status: timedOut ? 504 : 502 },
    );
  }
}
