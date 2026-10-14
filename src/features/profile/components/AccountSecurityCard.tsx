import { Clock3, KeyRound, ShieldCheck } from "lucide-react";
import TwoFactorSetup from "@/features/profile/components/two-factor/TwoFactorSetup";
import SectionHeading from "./SectionHeading";
import StatusRow from "./StatusRow";

export default function AccountSecurityCard({
  signInMethod,
  lastSignIn,
}: {
  signInMethod: string;
  lastSignIn: string;
}) {
  return (
    <section id="account-security" className="content-card rounded-3xl p-6 sm:p-7">
      <SectionHeading
        icon={<ShieldCheck />}
        title="Account security"
        subtitle="Review how you sign in and keep your account secure."
      />
      <div className="mt-6 grid gap-4 md:grid-cols-3 [&>div]:min-h-48 [&>div]:p-5">
        <StatusRow
          icon={<KeyRound />}
          title="Sign-in method"
          description={signInMethod}
          tone="good"
        />
        <StatusRow
          icon={<Clock3 />}
          title="Last sign-in"
          description={lastSignIn}
          tone="neutral"
        />
        <TwoFactorSetup />
      </div>
    </section>
  );
}
