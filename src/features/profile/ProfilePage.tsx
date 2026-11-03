"use client";
import AccountSecurityCard from "./components/AccountSecurityCard";
import DangerZone from "./components/DangerZone";
import PersonalInformationCard from "./components/PersonalInformationCard";
import CompleteYourSetup from "./components/ProfileCompletion";
import ProfileHero from "./components/ProfileHero";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";
export default function ProfilePage() {
  const { user, profile } = useCurrentUser();

  if (!user) return null;
  const metadata = user.user_metadata ?? {};
  const fullName = profile?.fullName?.trim() || metadata.full_name || metadata.name || null;
  const username = profile?.username?.trim() || metadata.username || user.email?.split("@")[0] || "user";
  const name = fullName || username;
  const avatarUrl = profile?.avatarUrl?.trim() || metadata.avatar_url || metadata.picture || null;
  const { phone = null, countryCode = null, region = null, city = null, bio = null } = profile ?? {};
  const provider = user.app_metadata?.provider;
  const createdAt = user.created_at;
  const lastSignInAt = user.last_sign_in_at;
  const savedEmail = user.email;

  const email = savedEmail ?? "No email available";

  const memberSince = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(createdAt));

  const lastSignIn = lastSignInAt
    ? new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date(lastSignInAt))
    : "Not available";

  const signInMethod =
    provider === "email"
      ? "Email and password"
      : provider
        ? `${provider.charAt(0).toUpperCase()}${provider.slice(1)} account`
        : "Not available";
  const countryName = countryCode
    ? (new Intl.DisplayNames(["en"], { type: "region" }).of(countryCode) ??
      countryCode)
    : null;
  const locationParts = [city, region, countryName].filter(Boolean);
  const location = locationParts.length ? locationParts.join(", ") : null;

  return (
    <main className="mx-auto w-full max-w-310 flex-1 px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mb-8">
        <div>
          <span className="eyebrow">ACCOUNT</span>
          <h1 className="page-title mt-4">
            Profile
          </h1>
          <p className="mt-2 max-w-xl section-description sm:text-base">
            Your identity and account security in one place.
          </p>
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[270px_minmax(0,1fr)] lg:items-stretch">
        <aside className="min-w-0 lg:col-start-1 lg:row-start-1">
          <ProfileHero
            name={name}
            email={email}
            memberSince={memberSince}
            avatarUrl={avatarUrl}
          />
        </aside>
        <div className="min-w-0 lg:col-start-2 lg:row-start-1">
          <PersonalInformationCard
            fullName={fullName}
            username={username}
            email={email}
            phone={phone}
            location={location}
            bio={bio}
          />
        </div>
        <aside className="min-w-0 lg:col-start-1 lg:row-start-2 [&>section]:h-full">
          <CompleteYourSetup user={{ fullName, username, avatarUrl, phone, city, bio }} />
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
