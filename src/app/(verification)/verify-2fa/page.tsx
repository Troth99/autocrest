import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import MfaLoginForm from "@/features/auth/components/MfaLoginForm";

export default async function VerifyTwoFactorPage() {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) redirect("/login");

  const { data: assurance, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (error) throw error;
  if (assurance.currentLevel === "aal2" || assurance.nextLevel !== "aal2") redirect("/");

  const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
  if (factorsError) throw factorsError;
  const totpFactors = factors.totp
    .filter((factor) => factor.status === "verified")
    .map((factor) => ({ id: factor.id, name: factor.friendly_name || "Authenticator app" }));

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-16">
      <MfaLoginForm factors={totpFactors} />
    </main>
  );
}
