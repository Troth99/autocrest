import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AccountNavigation from "@/app/(dashboard)/components/AccountNavigation";

export default async function IsDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: assurance, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

  if (error) {
    throw error
  }

  //check if account has enabled 2FA
  if (assurance.nextLevel === "aal2" && assurance.currentLevel !== "aal2") {
    redirect("/verify-2fa");
  }
  return (
    <div className="flex w-full flex-1 flex-col lg:flex-row">
      <AccountNavigation />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
