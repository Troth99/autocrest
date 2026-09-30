import { AtSign, Mail, MapPin, Phone, UserRound } from "lucide-react";
import { DetailRow, SectionHeading } from "./profile-ui";

export default function PersonalInformationCard({
  username,
  email,
  phone,
  location,
  bio,
}: {
  username: string;
  email: string;
  phone: string | null;
  location: string | null;
  bio: string | null;
}) {
  return (
    <section className="content-card rounded-3xl p-6 sm:p-7">
      <SectionHeading
        icon={<UserRound />}
        title="Profile details"
        subtitle="The information people see on your AutoCrest account."
      />
      <dl className="mt-6 divide-y divide-line border-y border-line">
        <DetailRow icon={<AtSign />} label="Username" value={`@${username}`} />
        <DetailRow icon={<Mail />} label="Email" value={email} />
        <DetailRow
          icon={<Phone />}
          label="Phone number"
          value={phone ?? "Not added"}
        />
        <DetailRow
          icon={<MapPin />}
          label="Location"
          value={location ?? "Not added"}
        />
      </dl>
      <div className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
          About
        </p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
          {bio ?? "No bio added yet."}
        </p>
      </div>
    </section>
  );
}
