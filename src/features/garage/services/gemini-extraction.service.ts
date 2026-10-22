import "server-only";

import { z } from "zod";
import { requestDocumentExtraction } from "@/features/garage/services/document-provider.service";

const providerErrorSchema = z.object({
  error: z.object({ status: z.string().optional() }),
});

// Build the Gemini request on the server; the route validates the file and API key first.
type ExtractionOptions = {
  photo: File;
  apiKey: string;
  instructions: string;
  prompt: string;
  responseSchema: Record<string, unknown>;
};

export async function extractPhotoWithGemini({
  photo, apiKey, instructions, prompt, responseSchema,
}: ExtractionOptions) {
  // Read the photo as bytes, then encode it as Base64 for the Gemini request below.
  const imageBuffer = Buffer.from(await photo.arrayBuffer());
  const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";
  const fallbackModel =
    process.env.GEMINI_FALLBACK_MODEL || "gemini-3.5-flash-lite";
  // The helper handles retries and the fallback model within a shared timeout.
  return await requestDocumentExtraction(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
    {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: instructions }] },
        contents: [
          {
            role: "user",
            parts: [
              {
                text: prompt,
              },
              {
                inlineData: {
                  mimeType: photo.type,
                  data: imageBuffer.toString("base64"),
                },
              },
            ],
          },
        ],
        // Request JSON matching our schema; 4096 limits output tokens, not scan count.
        generationConfig: {
          responseMimeType: "application/json",
          responseJsonSchema: responseSchema,
          maxOutputTokens: 4096,
        },
      }),
      signal: AbortSignal.timeout(60_000),
    },
    fallbackModel !== model
      ? `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(fallbackModel)}:generateContent`
      : undefined,
  );
}

// Parse a failed provider response and map it to a safe message and HTTP status.
export async function getGeminiError(response: Response) {
  let providerCode: string | null = null;
  try {
    const parsed = providerErrorSchema.safeParse(await response.json());
    if (parsed.success) {
      providerCode = parsed.data.error.status ?? null;
    }
  } catch {
    // A provider error may have a non-JSON body.
  }
  // Never log the key, image, extracted data or raw provider response.
  console.error("Vehicle document provider request failed", {
    status: response.status,
    code: providerCode,
    requestId: response.headers.get("x-request-id"),
  });
  let message = "Document scanning failed. Please try again later.";
  if ([500, 502, 503, 504].includes(response.status)) {
    message =
      "Gemini is temporarily unavailable. Automatic retries did not succeed. Please try again shortly.";
  } else if (response.status === 401) {
    message =
      "The scanning API key is invalid or expired. Check the server configuration.";
  } else if (response.status === 403) {
    message =
      "The scanning API key or project does not have permission to use this service.";
  } else if (response.status === 429) {
    message =
      "The Gemini project has reached its quota or rate limit. Check Google AI Studio usage or try again later.";
  } else if (response.status === 400) {
    message =
      "The scanning service rejected the image or extraction format. Check the server request configuration.";
  } else if (response.status === 404) {
    message =
      "The configured scanning model is unavailable for this API project.";
  }

  return {
    message,
    status: response.status === 429 ? 429 : response.status === 503 ? 503 : 502,
  };
}
