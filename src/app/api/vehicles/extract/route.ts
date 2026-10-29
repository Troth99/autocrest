import { createClient } from "@/lib/supabase/server";
import { vehicleDocumentSchema } from "@/features/garage/validators/vehicle-document.validator";
import { extractDocumentWithGemini, getGeminiError } from "./gemini";
import { responseSchema } from "./schemas";

export const runtime = "nodejs";
export const maxDuration = 70;

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp"];
export async function POST(request: Request) {
  // Allow scanning only for an authenticated Supabase user.
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return Response.json(
      { error: "Please sign in to scan a document." },
      { status: 401 },
    );
  }

  // Check whether this session still requires two-factor verification.
  const { data: assurance, error: assuranceError } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  // Stop scanning if the session security check fails.
  if (assuranceError) {
    return Response.json(
      { error: "Could not verify your session. Please try again." },
      { status: 503 },
    );
  }

  // Block scanning until the user completes their enabled 2FA.
  if (assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2") {
    return Response.json(
      { error: "Please complete two-factor authentication first." },
      { status: 403 },
    );
  }

  // Read the API key on the server without exposing it to the browser.
  const apiKey = process.env.GEMINI_API_KEY || process.env.OPEN_GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Document scanning is not configured." },
      { status: 503 },
    );
  }

  // Read the uploaded photo from FormData and validate it again on the server.
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json({ error: "Invalid upload request." }, { status: 400 });
  }

  const document = formData.get("document");

  if (!(document instanceof File) || document.size === 0) {
    return Response.json(
      { error: "Please select a document image." },
      { status: 400 },
    );
  }

  if (!ACCEPTED_TYPES.includes(document.type)) {
    return Response.json(
      { error: "Choose a JPEG, PNG or WebP image." },
      { status: 400 },
    );
  }

  if (document.size > MAX_FILE_SIZE) {
    return Response.json(
      { error: "The image must be 5 MB or smaller." },
      { status: 413 },
    );
  }

  try {
    const response = await extractDocumentWithGemini(document, apiKey);

    // Convert provider errors into messages the interface can display.
    if (!response.ok) {
      const { message, status } = await getGeminiError(response);
      return Response.json({ error: message }, { status });
    }

    // Validate the Gemini response and reject incomplete generation.
    const result = responseSchema.parse(await response.json());
    const candidate = result.candidates?.[0];
    if (candidate?.finishReason && candidate.finishReason !== "STOP") {
      return Response.json(
        { error: "The scan did not finish. Please try again." },
        { status: 502 },
      );
    }

    // Collect the result text, excluding parts marked as internal reasoning.
    const text = (candidate?.content?.parts ?? [])
      .filter((item) => !item.thought)
      .map((item) => item.text ?? "")
      .join("");

    if (!text) {
      return Response.json(
        { error: "Could not read the document. Try a clearer photo." },
        { status: 422 },
      );
    }

    // Validate extracted fields with the same Zod schema used by the client.
    const details = vehicleDocumentSchema.safeParse(JSON.parse(text));
    if (!details.success) {
      return Response.json(
        { error: "Could not validate the extracted details." },
        { status: 422 },
      );
    }
    if (Object.values(details.data).every((value) => value === null)) {
      return Response.json(
        { error: "No vehicle details were readable in this photo." },
        { status: 422 },
      );
    }

    // Return details for autofill; this endpoint does not save the vehicle or photo.
    return Response.json({ details: details.data });
  } catch (error) {
    if (
      error instanceof Error &&
      ["TimeoutError", "AbortError"].includes(error.name)
    ) {
      return Response.json(
        { error: "The scanning service took too long. Please try again." },
        { status: 504 },
      );
    }
    return Response.json(
      { error: "Could not process the document. Please try again." },
      { status: 502 },
    );
  }
}
