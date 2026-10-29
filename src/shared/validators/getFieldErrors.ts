import type { ZodError } from "zod";

// Convert field-level issues to messages; form-level issues have no field key.
export function getFieldErrors<Field extends PropertyKey>(
  error: ZodError,
): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (field === undefined) continue;
    const key = field as Field;
    if (!errors[key]) errors[key] = issue.message;
  }
  return errors;
}
