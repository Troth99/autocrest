import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="auth-page">
      <div className="auth-page-card">
        <ForgotPasswordForm invalidLink={error === "invalid_reset_link"} />
      </div>
    </main>
  );
}
