"use client";

import AccountSecurityCard from "./components/AccountSecurityCard";
import DangerZone from "./components/DangerZone";
import PersonalInformationCard from "./components/PersonalInformationCard";
import CompleteYourSetup from "./components/ProfileCompletion";
import ProfileHero from "./components/ProfileHero";
import { getProfileDisplayDetails } from "@/features/profile/utils/getProfileDisplayDetails";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";

export default function ProfilePage() {
  const { user, profileError } = useCurrentUser();

  if (profileError) {
    throw new Error(profileError);
  }
  if (!user) return null;

  const { location, memberSince, lastSignIn, signInMethod } =
    getProfileDisplayDetails(user);

  return (
    <main className="mx-auto w-full max-w-310 flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8">
        <div>
          <span className="eyebrow">ACCOUNT</span>
          <h1 className="page-title mt-4">Profile</h1>
          <p className="mt-2 max-w-xl section-description sm:text-base">
            Your identity and account security in one place.
          </p>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[270px_minmax(0,1fr)] lg:items-stretch">
        <aside className="min-w-0 lg:col-start-1 lg:row-start-1">
          <ProfileHero
            name={user.fullName || user.username || "user"}
            email={user.email ?? "No email available"}
            memberSince={memberSince}
            avatarUrl={user.avatarUrl ?? null}
          />
        </aside>
        <div className="min-w-0 lg:col-start-2 lg:row-start-1">
          <PersonalInformationCard
            fullName={user.fullName ?? null}
            username={user.username || "user"}
            email={user.email ?? "No email available"}
            phone={user.phone ?? null}
            location={location}
            bio={user.bio ?? null}
          />
        </div>
        <aside className="min-w-0 lg:col-start-1 lg:row-start-2 [&>section]:h-full">
          <CompleteYourSetup user={user} />
        </aside>
        <div className="profile-details-layout">
          <AccountSecurityCard
            signInMethod={signInMethod}
            lastSignIn={lastSignIn}
          />
          <DangerZone />
        </div>
      </div>
    </main>
  );
}
