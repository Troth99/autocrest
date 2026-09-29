import { KeyRound, PencilLine, Settings } from "lucide-react";
import { QuickAction, SectionHeading } from "./profile-ui";

export default function QuickActionsCard() {
  return (
    <section className="mt-5 content-card rounded-3xl p-6 sm:p-7">
      <SectionHeading
        icon={<PencilLine />}
        title="Quick actions"
        subtitle="Account tools will become interactive as AutoCrest grows."
      />
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <QuickAction
          icon={<PencilLine />}
          title="Edit profile"
          description="Update your account details."
        />
        <QuickAction
          icon={<KeyRound />}
          title="Change password"
          description="Keep your sign-in secure."
        />
        <QuickAction
          icon={<Settings />}
          title="Account settings"
          description="Manage your account preferences."
        />
      </div>
    </section>
  );
}
