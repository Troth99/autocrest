import { BadgeCheck, CalendarDays } from "lucide-react";
import { getInitials } from "./profile-ui";

export default function ProfileHero({
  name,
  email,
  username,
  memberSince,
}: {
  name: string;
  email: string;
  username: string;
  memberSince: string;
}) {
  const initials = getInitials(name, email);
  return (
    <section className="card-base relative">
      <div className="absolute -right-20 -top-24 size-64 rounded-full bg-info/10 blur-3xl" />
      <div className="absolute -bottom-24 right-20 size-56 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-[1.7rem] border border-accent/35 bg-accent/10 text-2xl font-bold tracking-tighter text-accent-text shadow-[0_12px_30px_rgb(213_243_107/12%)]">
          {initials}
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2 className="truncate text-2xl font-semibold tracking-[-0.04em] text-text-primary">
              {name}
            </h2>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent-text">
              <BadgeCheck className="size-3.5" />
              Active member
            </span>
          </div>
          <p className="mt-2 text-sm text-muted">@{username}</p>
          <p className="mt-1 truncate text-sm text-text-secondary">{email}</p>
        </div>
        <div className="border-line sm:ml-auto sm:border-l sm:pl-8">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-subtle">
            With AutoCrest since
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <CalendarDays className="size-4 text-info" />
            {memberSince}
          </p>
        </div>
      </div>
    </section>
  );
}
