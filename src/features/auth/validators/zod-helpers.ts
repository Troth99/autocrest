import { z } from "zod";
import { getFieldErrors } from "@/shared/validators/getFieldErrors";

// Helper function to convert Zod validation results into a simple error object.

export function toErrors<T extends Record<string, unknown>>(

  result: z.ZodSafeParseResult<T>,
  
): Partial<Record<keyof T, string>> {
  if (result.success) return {};

  return getFieldErrors<keyof T>(result.error);
}
