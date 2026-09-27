import { z } from "zod";
import { toErrors } from "./zod-helpers";

// Validation schemas and helper functions for authentication forms.
//register form validation schema
export const registerSchema = z
  .object({
    username: z.string().min(3, "Username must have at least 3 characters."),
    email: z.email("Invalid email address."),
    password: z.string().min(8, "Password must have at least 8 characters."),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

// Type for the register form values derived from the schema automatically generated.
export type RegisterFormValues = z.infer<typeof registerSchema>;

export function validateRegisterForm(values: RegisterFormValues) {
  return toErrors(registerSchema.safeParse(values));
}
