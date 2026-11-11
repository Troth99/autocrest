import AuthShell from "@/features/auth/components/AuthShell";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";
import { redirectAuthenticatedUser } from "@/features/auth/services/session.service";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  await redirectAuthenticatedUser();

  const { error } = await searchParams;

  return (
    <AuthShell>
      <ForgotPasswordForm invalidLink={error === "invalid_reset_link"} />
    </AuthShell>
  );
}
