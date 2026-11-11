import { getMfaVerificationData } from "@/features/auth/services/session.service";
import MfaLoginForm from "@/features/auth/components/MfaLoginForm";

export default async function VerifyTwoFactorPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const { factors, nextPath } = await getMfaVerificationData(next);

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-16">
      <MfaLoginForm factors={factors} nextPath={nextPath} />
    </main>
  );
}
