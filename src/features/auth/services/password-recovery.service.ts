import { createClient } from "@/lib/supabase/client";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
  type ResetPasswordValues,
} from "@/features/auth/validators/password-recovery.validator";

export async function requestPasswordReset(email: string) {
  const values = forgotPasswordSchema.parse({ email });
  // The callback exchanges the email link's PKCE code for a session.
  const redirectTo = new URL("/auth/callback", window.location.origin);
  redirectTo.searchParams.set("next", "/reset-password");
  const { error } = await createClient().auth.resetPasswordForEmail(values.email, {
    redirectTo: redirectTo.toString(),
  });
  if (error) throw error;
}

export async function resetPassword(input: ResetPasswordValues) {
  const values = resetPasswordSchema.parse(input);
  const supabase = createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("Your reset session has expired. Request a new password reset link.");
  }

  // Password recovery must preserve the account's existing MFA requirement.
  const { data: assurance, error: assuranceError } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (assuranceError) throw assuranceError;
  if (assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2") {
    throw new Error("Complete two-factor authentication before resetting your password.");
  }

  const { error } = await supabase.auth.updateUser({ password: values.newPassword });
  if (error) throw error;
}
