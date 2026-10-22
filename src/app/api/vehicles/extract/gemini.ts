import { extractPhotoWithGemini } from "@/features/garage/services/gemini-extraction.service";
import { extractionInstructions } from "./instructions";
import { extractionSchema } from "./schemas";

export { getGeminiError } from "@/features/garage/services/gemini-extraction.service";

export async function extractDocumentWithGemini(document: File, apiKey: string) {
  return await extractPhotoWithGemini({
    photo: document,
    apiKey,
    instructions: extractionInstructions,
    prompt: "Extract the visible vehicle registration details.",
    responseSchema: extractionSchema,
  });
}
