import { createClient } from "@/lib/supabase/server";
import { getAuthenticatedUser } from "@/lib/supabase/auth-user";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
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
  return (
    <>
      {children}
    </>
  );
}
