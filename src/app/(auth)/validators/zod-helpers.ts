import { z } from "zod";

// Helper function to convert Zod validation results into a simple error object.
export function toErrors<T extends Record<string, unknown>>(
  result: z.ZodSafeParseResult<T>,
): Partial<T> {
  if (result.success) return {};

  const errors: Partial<T> = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof T;
    if (!errors[key]) errors[key] = issue.message as T[keyof T];
  }

  return errors;
}
