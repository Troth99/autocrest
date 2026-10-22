import { z } from "zod";
import { odometerScanSchema } from "@/features/garage/validators/odometer-scan-validator";

// Tell Gemini which JSON structure to return.
export const extractionSchema = z.toJSONSchema(odometerScanSchema);

// Validate the provider response before reading its generated text.
export const responseSchema = z.object({
  candidates: z
    .array(
      z.object({
        finishReason: z.string().optional(),
        content: z
          .object({
            parts: z.array(
              z.object({
                text: z.string().optional(),
                thought: z.boolean().optional(),
              }),
            ),
          })
          .optional(),
      }),
    )
    .optional(),
});
