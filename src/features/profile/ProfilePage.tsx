"use client";

import AccountSecurityCard from "./components/AccountSecurityCard";
import DangerZone from "./components/DangerZone";
import PersonalInformationCard from "./components/PersonalInformationCard";
import ProfileCompletionCard from "./components/ProfileCompletionCard";
import ProfileHero from "./components/ProfileHero";
import QuickActionsCard from "./components/QuickActionsCard";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";

export default function ProfilePage() {
  const { user } = useCurrentUser();

  if (!user) return null;
  const {
    name,
    fullName,
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
  const hasLocation = Boolean(countryCode && city);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">ACCOUNT</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">
            Your profile
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base">
            Manage your personal details, sign-in, and account security.
          </p>
        </div>
      </div>
      <ProfileHero
        name={name}
        email={email}
        username={username}
        memberSince={memberSince}
        avatarUrl={avatarUrl}
      />
      <div className="mt-5 grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
        <PersonalInformationCard
          phone={phone}
          location={location}
          bio={bio}
        />
        <ProfileCompletionCard
          avatarUrl={avatarUrl}
          fullName={fullName}
          phone={phone}
          hasLocation={hasLocation}
          bio={bio}
        />
      </div>
      <div className="mt-5">
        <AccountSecurityCard
          signInMethod={signInMethod}
          lastSignIn={lastSignIn}
        />
      </div>
      <QuickActionsCard />
      <DangerZone />
    </main>
  );
}
