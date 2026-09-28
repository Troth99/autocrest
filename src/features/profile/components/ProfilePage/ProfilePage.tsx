import { CircleCheck } from "lucide-react";
import AccountOverviewCard from "./AccountOverviewCard";
import AccountSecurityCard from "./AccountSecurityCard";
import DangerZone from "./DangerZone";
import GettingStartedCard from "./GettingStartedCard";
import ProfileCompletionCard from "./ProfileCompletionCard";
import ProfileHero from "./ProfileHero";
import QuickActionsCard from "./QuickActionsCard";
import type { ProfilePageProps } from "../../types";

export default function ProfilePage({ name, email, username, memberSince, emailConfirmed }: ProfilePageProps) {
  return <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14"><div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><span className="eyebrow">ACCOUNT</span><h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">Your profile</h1><p className="mt-2 max-w-xl text-sm leading-6 text-muted sm:text-base">Manage your AutoCrest account and get your garage ready.</p></div><p className="flex items-center gap-2 text-sm font-medium text-muted"><CircleCheck className="size-4 text-accent-text" />Account ready</p></div><ProfileHero name={name} email={email} username={username} memberSince={memberSince} /><div className="mt-5 grid gap-5 lg:grid-cols-[1.08fr_.92fr]"><AccountOverviewCard username={username} email={email} /><ProfileCompletionCard emailConfirmed={emailConfirmed} /></div><div className="mt-5 grid gap-5 lg:grid-cols-[1.08fr_.92fr]"><AccountSecurityCard emailConfirmed={emailConfirmed} /><GettingStartedCard /></div><QuickActionsCard /><DangerZone /></main>;
}
