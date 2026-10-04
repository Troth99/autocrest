"use client";

import { CalendarDays, KeyRound, PencilLine } from "lucide-react";
import Link from "next/link";
import { getInitials } from "@/features/profile/utils/getInitials";
import { buttonVariants } from "@/shared/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

export default function ProfileHero({
  name,
  email,
  memberSince,
  avatarUrl,

}: {
  name: string;
  email: string;
  memberSince: string;
  avatarUrl: string | null;

}) {
  const initials = getInitials(name, email);

  return (
    <section className="card-base relative">
      <div className="absolute -right-20 -top-24 size-64 rounded-full bg-info/10 blur-3xl" />
      <div className="absolute -bottom-24 right-20 size-56 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative flex flex-col gap-5">
        <Avatar className="size-20 rounded-[1.7rem] shadow-[0_12px_30px_rgb(213_243_107/12%)] after:rounded-[1.7rem] after:border-accent/35">
          {avatarUrl && (
            <AvatarImage
              src={avatarUrl}
              alt={`${name}'s profile picture`}
              className="rounded-[1.7rem]"
            />
          )}
          <AvatarFallback className="rounded-[1.7rem] bg-accent/10 text-2xl font-bold tracking-tighter text-accent-text">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h2 className="truncate text-2xl font-semibold tracking-[-0.04em] text-text-primary">
              {name}
            </h2>

          </div>
        </div>
        <div className="border-line border-t pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.13em] text-subtle">
            With AutoCrest since
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-text-primary">
            <CalendarDays className="size-4 text-info" />
            {memberSince}
          </p>
        </div>
        <div className="grid gap-2 pt-1">
          <Link
            href="/profile/edit"
            className={buttonVariants({
              className: "w-full cursor-pointer bg-accent text-ink hover:bg-accent/85",
            })}
          >
            <PencilLine />
            Update profile
          </Link>
          <Link
            href="/change-password"
            className={buttonVariants({
              variant: "outline",
              className: "w-full cursor-pointer",
            })}
          >
            <KeyRound />
            Change password
          </Link>
        </div>
      </div>
    </section>
  );
}
