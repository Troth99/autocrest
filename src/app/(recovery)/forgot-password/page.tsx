import AuthShell from "@/features/auth/components/AuthShell";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/shared/services/auth-user.service";
import { redirect } from "next/navigation";

export default async function ForgotPasswordPage({ searchParams }: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const { data: { user } } = await getAuthenticatedUser(supabase);

  if (user) {
    const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
    if (error) throw error;
    redirect(
      data.nextLevel === "aal2" && data.currentLevel !== "aal2"
        ? "/verify-2fa"
        : "/",
    );
  }

  const { error } = await searchParams;
  return <AuthShell><ForgotPasswordForm invalidLink={error === "invalid_reset_link"} /></AuthShell>;
}
