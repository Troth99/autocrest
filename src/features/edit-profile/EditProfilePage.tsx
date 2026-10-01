"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";
import {
  getProfileData,
  updateProfile,
} from "./services/edit-profile.service";
import type { ProfileFormValues } from "./services/edit-profile.service";
import { useEffect, useState } from "react";
import type { Profile } from "@/shared/types/auth";
import { ArrowLeft, Camera, Save } from "lucide-react";
import useForm from "@/shared/hooks/useForm";
import { useRouter } from "next/navigation";
import { toUpdatedCurrentUser } from "./utils/to-updated-current-user";

const initialValues: ProfileFormValues = {
  full_name: "",
  username: "",
  phone: "",
  city: "",
  avatar_url: "",
  bio: "",
};

export default function EditProfilePage() {
  const { user, setUser } = useCurrentUser();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const updateProfileHandler = async (values: typeof initialValues) => {
    if (!user) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      await updateProfile(user.id, values);
      setUser(toUpdatedCurrentUser(user, values));
      router.push("/profile");
      router.refresh();
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Unable to save your profile.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const { register, formHandler, setFormValues } = useForm(
    updateProfileHandler,
    initialValues,
  );

  useEffect(() => {
    if (!user) return;

    async function loadProfile() {
      const data = await getProfileData(user?.id);
      setProfile(data);
      if (data) setFormValues(data);
    }

    loadProfile();
  }, [user, setFormValues]);
  if (!user) return null;

  return (
    <>
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-10 sm:py-14">
        <Link
          href="/profile"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          <ArrowLeft />
          Back to profile
        </Link>

        <div className="mt-6">
          <span className="eyebrow">PROFILE</span>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">
            Edit profile
          </h1>
          <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
            Update the information shown on your AutoCrest account.
          </p>
        </div>

        <form className="card-base mt-8 space-y-7" onSubmit={formHandler}>
          <section>
            <p className="text-sm font-semibold text-text-primary">
              Profile photo
            </p>
            <p className="mt-1 text-sm text-muted">
              Use an image URL for now. Upload can be added later.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-info-soft text-info">
                <Camera className="size-5" />
              </div>
              <div className="min-w-0 flex-1">
                <label className="sr-only" htmlFor="avatar-url">
                  {`Avatar URL for ${profile?.full_name || user.email}`}
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
            <label
              className="grid gap-2 text-sm font-medium text-text-secondary"
              htmlFor="phone"
            >
              Phone number
              <Input
                id="phone"
                type="text"
                placeholder="Optional"
                {...register("phone")}
              />
            </label>
            <label
              className="grid gap-2 text-sm font-medium text-text-secondary"
              htmlFor="location"
            >
              Location
              <Input
                id="location"
                placeholder="City"
                {...register("city")}
              />
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
              className={buttonVariants({ variant: "ghost" })}
            >
              Cancel
            </Link>
            <Button
              type="submit"
              disabled={isSaving}
              className="bg-accent text-ink hover:bg-accent/85 cursor-pointer"
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
      </main>
    </>
  );

}
