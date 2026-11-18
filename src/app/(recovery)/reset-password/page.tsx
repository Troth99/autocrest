import { requirePasswordResetSession } from "@/features/auth/services/session.service";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

// This route is outside the auth layout, which redirects signed-in users away.
export default async function ResetPasswordPage() {
  await requirePasswordResetSession();

  return (
    <main className="auth-page">
      <div className="auth-page-card">
        <ResetPasswordForm />
      </div>
    </main>
  );
}
