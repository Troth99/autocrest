import { LoginForm } from "@/features/auth";
import AuthShell from "@/features/auth/components/AuthShell";

export default async function LoginPage({ searchParams }: {
  searchParams: Promise<{ password_reset?: string }>;
}) {
  const { password_reset } = await searchParams;
  return <AuthShell><LoginForm passwordReset={password_reset === "success"} /></AuthShell>;
}
