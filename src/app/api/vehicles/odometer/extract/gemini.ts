import { extractPhotoWithGemini } from "@/features/garage/services/gemini-extraction.service";
import { odometerExtractionInstructions } from "./instructions";
import { extractionSchema } from "./schema";

export async function extractOdometerWithGemini(photo: File, apiKey: string) {
  return await extractPhotoWithGemini({
    photo,
    apiKey,
    instructions: odometerExtractionInstructions,
    prompt: "Read the total odometer reading and its unit.",
    responseSchema: extractionSchema,
  });
}
