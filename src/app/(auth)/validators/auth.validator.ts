import type { RegisterFormValues } from "@/shared/types/auth";

export function validateRegisterForm(
  values: RegisterFormValues,
): Partial<RegisterFormValues> {
  const errors: Partial<RegisterFormValues> = {};

  if (values.username.length < 3) {
    errors.username = "Username must have at least 3 characters.";
  }

  if (values.password.length < 8) {
    errors.password = "Password must have at least 8 characters.";
  }

  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}
