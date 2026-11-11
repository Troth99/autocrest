import { requirePasswordResetSession } from "@/features/auth/services/session.service";
import AuthShell from "@/features/auth/components/AuthShell";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

// This route is outside the auth layout, which redirects signed-in users away.
export default async function ResetPasswordPage() {
  await requirePasswordResetSession();

  return (
    <AuthShell>
      <ResetPasswordForm />
    </AuthShell>
  );
}
