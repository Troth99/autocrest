import { z } from "zod";
import { vehicleDocumentSchema } from "@/features/garage/validators/vehicle-document.validator";

// Validate the Gemini response envelope; vehicle fields are validated separately.
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
// Generate the extraction format from our existing validator.
export const extractionSchema = z.toJSONSchema(vehicleDocumentSchema, {
  override: ({ jsonSchema }) => {
    // Validate the date locally with Zod instead.
    if (jsonSchema.format === "date") {
      delete jsonSchema.format;
    }
  },
});

// Validate the provider error code without exposing its raw response.
export const providerErrorSchema = z.object({
  error: z.object({
    status: z.string().optional(),
  }),
});
