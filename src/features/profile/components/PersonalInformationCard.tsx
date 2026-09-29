import { MapPin, Phone, UserRound } from "lucide-react";
import { DetailRow, SectionHeading } from "./profile-ui";

export default function PersonalInformationCard({
  phone,
  location,
  bio,
}: {
  phone: string | null;
  location: string | null;
  bio: string | null;
}) {
  return (
    <section className="content-card rounded-3xl p-6 sm:p-7">
      <SectionHeading
        icon={<UserRound />}
        title="Personal information"
        subtitle="The personal details connected to your AutoCrest account."
      />
      <dl className="mt-6 divide-y divide-line rounded-2xl border border-line bg-input/45 px-5">
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
      <div className="mt-4 rounded-2xl border border-line bg-input/45 p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle">
          About
        </p>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          {bio ?? "Add a short bio to make your profile feel more personal."}
        </p>
      </div>
    </section>
  );
}
