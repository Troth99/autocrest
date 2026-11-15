import { requirePasswordResetSession } from "@/features/auth/services/session.service";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";

// This route is outside the auth layout, which redirects signed-in users away.
export default async function ResetPasswordPage() {
  await requirePasswordResetSession();

  return (
    <main className="flex w-full flex-1 items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md rounded-2xl border border-line bg-panel p-6 shadow-xl sm:p-8">
        <ResetPasswordForm />
      </div>
    </main>
  );
}
