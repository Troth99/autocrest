import AuthShell from "@/features/auth/components/AuthShell";
import ForgotPasswordForm from "@/features/auth/components/ForgotPasswordForm";

export default async function ForgotPasswordPage({ searchParams }: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return <AuthShell><ForgotPasswordForm invalidLink={error === "invalid_reset_link"} /></AuthShell>;
}
