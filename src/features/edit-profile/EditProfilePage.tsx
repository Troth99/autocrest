"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";
import { updateProfile } from "./services/edit-profile.service";
import type { ProfileFormValues } from "./services/edit-profile.service";
import { useState } from "react";
import { Camera, Mail, Phone, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { getInitials } from "@/features/profile/components/profile-ui";
import useForm from "@/shared/hooks/useForm";
import { useRouter } from "next/navigation";
import PhoneEditSelector, { normalizePhoneNumber } from "./components/PhoneEditSelector";

export default function EditProfilePage() {
  const { user } = useCurrentUser();

  const initialValues: ProfileFormValues = {
    full_name: user?.fullName ?? "",
    username: user?.username ?? "",
    phone: normalizePhoneNumber(user?.phone),
    city: user?.city ?? "",
    avatar_url: user?.avatarUrl ?? "",
    bio: user?.bio ?? "",
  };
  const router = useRouter();
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const updateProfileHandler = async (values: typeof initialValues) => {
    if (!user) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      await updateProfile(user.id, values);
      router.push("/profile");
      router.refresh();
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Unable to save your profile.",
      );
      setIsSaving(false);
    }
  };

  const { register, formHandler, values, setFieldValue } = useForm(
    updateProfileHandler,
    initialValues,
  );
  if (!user) return null;

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-10">

      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">
          Edit profile
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
          Update the information shown on your AutoCrest account.
        </p>
      </div>

      <div className="mt-8 grid items-stretch gap-6 xl:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.6fr)]">
        <aside className="rounded-2xl border border-line bg-panel px-6 py-10 sm:px-8">
          <div className="flex flex-col items-center text-center">
            <Avatar className="size-32 sm:size-40">
              {values.avatar_url && <AvatarImage src={values.avatar_url} alt={`${user.name}'s profile picture`} />}
              <AvatarFallback className="bg-linear-to-br from-info-soft to-info/30 text-5xl font-medium text-info sm:text-6xl">
                {getInitials(values.full_name || user.name, user.email ?? "")}
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-6 w-full break-words text-2xl font-semibold tracking-tight">{values.full_name || user.name}</h2>
            <span className="mt-3 rounded-full border border-info-border bg-info-soft px-4 py-1.5 text-xs font-medium text-info">AutoCrest member</span>
          </div>
          <div className="mt-8 space-y-5 border-t border-line pt-6 text-sm text-muted">
            <p className="flex items-start gap-3"><Mail className="mt-0.5 size-5 shrink-0 text-info" /><span className="break-all">{user.email ?? "No email available"}</span></p>
            <p className="flex items-center gap-3"><Phone className="size-5 shrink-0 text-info" />{values.phone || "No phone added"}</p>
          </div>
        </aside>
      <form className="space-y-7 rounded-2xl border border-line bg-panel p-6 sm:p-8 [&_input]:h-12 [&_input]:rounded-xl [&_input]:px-4" onSubmit={formHandler}>
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Personal information</h2>
          <p className="mt-2 text-sm text-muted">Update the details on your AutoCrest account.</p>
        </div>
        <section>
          <p className="text-sm font-semibold text-text-primary">
            Profile photo
          </p>
          <p className="mt-1 text-sm text-muted">
            Add an image URL to personalize your account.
          </p>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-info-soft text-info">
              <Camera className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <label className="sr-only" htmlFor="avatar-url">
                {`Avatar URL for ${user.fullName || user.email}`}
              </label>
              <Input
                id="avatar-url"
                type="url"
                {...register("avatar_url")}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>
        </section>

        <div className="border-t border-line" />

        <section className="grid gap-5 sm:grid-cols-2">
          <label
            className="grid gap-2 text-sm font-medium text-text-secondary"
            htmlFor="full-name"
          >
            Display name
            <Input
              id="full-name"
              placeholder="Your name"
              {...register("full_name")}
            />
          </label>
          <label
            className="grid gap-2 text-sm font-medium text-text-secondary"
            htmlFor="username"
          >
            Username
            <Input
              id="username"
              placeholder="username"
              {...register("username")}
            />
          </label>
          <PhoneEditSelector
            value={values.phone}
            onChange={(value) => setFieldValue("phone", value)}
          />
          <label
            className="grid gap-2 text-sm font-medium text-text-secondary"
            htmlFor="location"
          >
            Location
            <Input id="location" placeholder="City" {...register("city")} />
          </label>
          <label className="grid gap-2 text-sm font-medium text-text-secondary sm:col-span-2">
            About
            <textarea
              id="bio"
              rows={4}
              placeholder="Tell people a little about yourself."
              className="w-full resize-none rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm text-text-primary outline-none transition-colors placeholder:text-muted focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              {...register("bio")}
            />
          </label>
        </section>

        <div className="flex flex-col-reverse gap-3 border-t border-line pt-6 sm:flex-row sm:justify-end">
          <Link
            href="/profile"
            className={buttonVariants({ variant: "outline", className: "h-11 px-6" })}
          >
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={isSaving}
            className="h-11 cursor-pointer bg-accent px-6 text-ink hover:bg-accent/85"
          >
            <Save />
            {isSaving ? "Saving..." : "Save changes"}
          </Button>
        </div>
        {saveError ? (
          <p className="text-sm text-destructive" role="alert">
            {saveError}
          </p>
        ) : null}
      </form>
      </div>
    </main>
  );
}
