import { RegisterForm } from "@/features/auth";
import AuthShell from "@/features/auth/components/AuthShell";

export default function RegisterPage() {
  return <AuthShell><RegisterForm /></AuthShell>;
}
