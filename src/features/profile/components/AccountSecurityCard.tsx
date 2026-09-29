import { Clock3, KeyRound, LockKeyhole, ShieldCheck } from "lucide-react";
import { SectionHeading, StatusRow } from "./profile-ui";

export default function AccountSecurityCard({
  signInMethod,
  lastSignIn,
}: {
  signInMethod: string;
  lastSignIn: string;
}) {
  return (
    <section className="content-card rounded-3xl p-6 sm:p-7">
      <SectionHeading
        icon={<ShieldCheck />}
        title="Account security"
        subtitle="Review how you sign in and keep your account secure."
      />
      <div className="mt-6 grid gap-3 md:grid-cols-3">
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
        <StatusRow
          icon={<LockKeyhole />}
          title="Two-factor authentication"
          description="Coming soon - add an extra layer of protection."
          tone="neutral"
        />
      </div>
    </section>
  );
}
