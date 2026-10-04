import { createClient as createVerificationClient } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
import {
  changePasswordSchema,
  type ChangePasswordFormValues,
} from "@/features/auth/validators/change-password.validator";

function changePasswordError(
  message: string,
  field?: "currentPassword" | "newPassword",
) {
  return Object.assign(new Error(message), { field });
}

export async function changePassword(
  values: ChangePasswordFormValues,
): Promise<void> {
  const { currentPassword, newPassword } = changePasswordSchema.parse(values);
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  if (!user?.email)
    throw changePasswordError(
      "Please sign in again before changing your password.",
    );

  const { data: assurance, error: assuranceError } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    
  if (assuranceError) throw assuranceError;
  if (assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2") {
    throw changePasswordError(
      "Complete two-factor verification before changing your password.",
    );
  }

  // Verify separately so password sign-in does not replace the active MFA session.
  const verifier = createVerificationClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    (process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    },
  );
  const { data: verified, error: verificationError } =
    await verifier.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    });

  if (verificationError) {
    if (verificationError.code === "invalid_credentials") {
      throw changePasswordError(
        "Current password is incorrect.",
        "currentPassword",
      );
    }
    throw verificationError;
  }
  if (verified.user?.id !== user.id)
    throw changePasswordError(
      "Could not verify your account. Please sign in again.",
    );

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
    current_password: currentPassword,
  });
  if (error) {
    if (error.code === "weak_password" || error.code === "same_password") {
      throw changePasswordError(error.message, "newPassword");
    }
    throw error;
  }
}
