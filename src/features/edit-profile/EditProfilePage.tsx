"use client";
import Link from "next/link";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { useCurrentUser } from "@/shared/context/CurrentUserContext";
import { getProfileData } from "./services/edit-profile.service";
import { useEffect, useState, type ComponentProps } from "react";
import type { Profile } from "@/shared/types/auth";
import { ArrowLeft, Camera, Save } from "lucide-react";
import useForm from "@/shared/hooks/useForm";

const initialValues = {
  full_name: "",
  username: "",
  phone: "",
  avatar_url: "",
  bio: "",
};

export default function EditProfilePage() {
  const { user } = useCurrentUser();
  const [profile, setProfile] = useState<Profile | null>(null);

  const updateProfileHandler = async (values: typeof initialValues) => {
    // Implement the logic to update the profile here
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
            <Field
              label="Display name"
              id="full-name"
              placeholder="Your name"
              {...register("full_name")}
            />
            <Field
              label="Username"
              id="username"
              placeholder="username"
              {...register("username")}
            />
            <Field
              label="Phone number"
              id="phone"
              type="tel"
              placeholder="Optional"
              {...register("phone")}
            />
            <Field label="Location" id="location" placeholder="City, country" />
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
              className="bg-accent text-ink hover:bg-accent/85 cursor-pointer"
            >
              <Save />
              Save changes
            </Button>
          </div>
        </form>
      </main>
    </>
  );

  function Field({
    label,
    id,
    placeholder,
    type = "text",
    ...inputProps
  }: {
    label: string;
    id: string;
    placeholder: string;
    type?: string;
  } & Pick<ComponentProps<typeof Input>, "name" | "value" | "onChange">) {
    return (
      <label
        className="grid gap-2 text-sm font-medium text-text-secondary"
        htmlFor={id}
      >
        {label}
        <Input id={id} type={type} placeholder={placeholder} {...inputProps} />
      </label>
    );
  }
}
