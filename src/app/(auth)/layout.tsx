import { redirectAuthenticatedUser } from "@/features/auth/services/session.service";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await redirectAuthenticatedUser();
  return (
    <>
      {children}
    </>
  );
}
