import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/shared/services/auth-user.service";
import AuthShell from "@/features/auth/components/AuthShell";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

// This route is outside the auth layout, which redirects signed-in users away.
export default async function ResetPasswordPage() {

  const supabase = await createClient();

  const { data: { user }, error: userError } = await getAuthenticatedUser(supabase);

  if (userError || !user) {
    redirect("/forgot-password?error=invalid_reset_link");
  }

  const { data: assurance, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (error) throw error;

  if (assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2") {

    redirect("/verify-2fa?next=/reset-password");
  }

  return <AuthShell><ResetPasswordForm /></AuthShell>;
}
