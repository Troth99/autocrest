import { Mail, UserRound } from "lucide-react";
import { DetailRow, SectionHeading } from "./profile-ui";

export default function AccountOverviewCard({
  username,
  email,
}: {
  username: string;
  email: string;
}) {
  return (
    <section className="content-card rounded-3xl p-6 sm:p-7">
      <SectionHeading
        icon={<UserRound />}
        title="Account overview"
        subtitle="The details connected to your AutoCrest account."
      />
      <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-input/45 px-5">
        <DetailRow
          icon={<UserRound />}
          label="Username"
          value={`@${username}`}
        />
        <DetailRow icon={<Mail />} label="Email address" value={email} />
      </dl>
      <p className="mt-4 text-xs leading-5 text-subtle">
        Profile editing will be available here when you are ready to personalise
        your account.
      </p>
    </section>
  );
}
