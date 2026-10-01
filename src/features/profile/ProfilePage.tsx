"use client";
import AccountSecurityCard from "./components/AccountSecurityCard";
import DangerZone from "./components/DangerZone";
import PersonalInformationCard from "./components/PersonalInformationCard";
import ProfileHero from "./components/ProfileHero";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";

export default function ProfilePage() {
  const { user } = useCurrentUser();

  if (!user) return null;
  const {
    name,
    username,
    email: savedEmail,
    avatarUrl,
    phone,
    countryCode,
    region,
    city,
    bio,
    provider,
    createdAt,
    lastSignInAt,
  } = user;

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

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14">
        <div className="mb-8">
          <div>
            <span className="eyebrow">ACCOUNT</span>
            <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">
              Profile
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base">
              Your identity and account security in one place.
            </p>
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(15rem,0.72fr)_minmax(0,1.5fr)] lg:items-start">
          <aside>
            <ProfileHero
              name={name}
              email={email}
              memberSince={memberSince}
              avatarUrl={avatarUrl}
            />
          </aside>
          <div className="space-y-5">
            <PersonalInformationCard
              username={username}
              email={email}
              phone={phone}
              location={location}
              bio={bio}
            />
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
