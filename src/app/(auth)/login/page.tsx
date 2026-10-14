import { LoginForm } from "@/features/auth";
import AuthShell from "@/features/auth/components/AuthShell";

export default function LoginPage() {
  return <AuthShell><LoginForm /></AuthShell>;
}
