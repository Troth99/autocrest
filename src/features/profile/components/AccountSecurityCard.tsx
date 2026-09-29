import { KeyRound, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { SectionHeading, StatusRow } from "./profile-ui";

export default function AccountSecurityCard({
  emailConfirmed,
}: {
  emailConfirmed: boolean;
}) {
  return (
    <section className="content-card rounded-3xl p-6 sm:p-7">
      <SectionHeading
        icon={<ShieldCheck />}
        title="Account security"
        subtitle="A quick view of your sign-in and verification status."
      />
      <div className="mt-6 space-y-3">
        <StatusRow
          icon={<Mail />}
          title="Email verification"
          description={
            emailConfirmed
              ? "Your email address is verified."
              : "Email verification is still pending."
          }
          tone={emailConfirmed ? "good" : "neutral"}
        />
        <StatusRow
          icon={<KeyRound />}
          title="Password protection"
          description="Your account uses email and password sign-in."
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
