import LoginForm from "@/features/auth/components/LoginForm";

export default async function LoginPage({ searchParams }: {
  searchParams: Promise<{ password_reset?: string }>;
}) {
  const { password_reset } = await searchParams;
  return (
    <main className="auth-page">
      <div className="auth-page-card">
        <LoginForm passwordReset={password_reset === "success"} />
      </div>
    </main>
  );
}
