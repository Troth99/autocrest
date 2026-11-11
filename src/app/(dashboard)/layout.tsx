import { requireVerifiedSession } from "@/features/auth/services/session.service";
import AccountNavigation from "@/app/(dashboard)/components/AccountNavigation";

export default async function IsDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  await requireVerifiedSession();
  return (
    <>
      <div className="flex w-full flex-1 flex-col lg:flex-row">
        <AccountNavigation />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </>
  );
}
