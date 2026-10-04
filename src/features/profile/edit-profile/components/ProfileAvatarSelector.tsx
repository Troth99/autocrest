"use client";

import type { RefObject } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Camera } from "lucide-react";

type Props = {
  avatarPreview: string | null;
  avatarFile: File | null;
  avatarUrl: string;
  initials: string;
  isSaving: boolean;
  avatarError: string | null;
  avatarInputRef: RefObject<HTMLInputElement | null>;
  setAvatarFile: (file: File | null) => void;
  setAvatarPreview: (url: string | null) => void;
  setAvatarError: (error: string | null) => void;
};

export default function ProfileAvatarSelector({
  avatarPreview,
  avatarFile,
  avatarUrl,
  initials,
  isSaving,
  avatarError,
  avatarInputRef,
  setAvatarFile,
  setAvatarPreview,
  setAvatarError,
}: Props) {
  return (
          <section aria-labelledby="photo-heading">
            <h3 id="photo-heading" className="text-sm font-semibold text-text-primary">
              Profile photo
            </h3>
            <p className="mt-1 text-sm text-muted">Give your profile a personal touch.</p>
            <div className="mt-4 flex flex-col items-start gap-5 rounded-2xl border border-dashed border-info-border bg-linear-to-br from-info-soft to-transparent p-5 sm:flex-row sm:items-center">
              <div className="relative shrink-0">
                <Avatar className="size-24 ring-4 ring-info/10">
                  {(avatarPreview || avatarUrl) && (
                    <AvatarImage src={avatarPreview || avatarUrl} alt="Profile photo preview" />
                  )}
                  <AvatarFallback className="bg-info-soft text-2xl font-medium text-info">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute -right-1 bottom-0 flex size-8 items-center justify-center rounded-full border-4 border-panel bg-info text-ink">
                  <Camera className="size-4" aria-hidden="true" />
                </span>
              </div>
              <div className="min-w-0 w-full flex-1 space-y-3">
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    {avatarFile ? "Looking good!" : "Your photo, your profile"}
                  </p>
                  <p id="avatar-help" className="mt-1 text-xs leading-5 text-muted">JPG, PNG or WebP. Max 2 MB.</p>
                </div>
                <input
                  ref={avatarInputRef}
                  className="hidden"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  aria-label="Choose profile photo"
                  aria-describedby="avatar-help"
                  disabled={isSaving}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    event.target.value = "";
                    if (!file) return;
                    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 2 * 1024 * 1024) {
                      setAvatarError("Choose a JPG, PNG or WebP image under 2 MB.");
                      return;
                    }
                    setAvatarError(null);
                    setAvatarFile(file);
                    setAvatarPreview(URL.createObjectURL(file));
                  }}
                />
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isSaving}
                    className="h-10 cursor-pointer gap-2 rounded-xl border-info-border bg-info-soft px-4 text-info hover:bg-info/20 hover:text-info"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Camera aria-hidden="true" />
                    {avatarFile || avatarUrl ? "Change photo" : "Choose photo"}
                  </Button>
                  {avatarFile && (
                    <Button
                      type="button"
                      variant="ghost"
                      disabled={isSaving}
                      className="h-10 cursor-pointer rounded-xl px-3 text-muted"
                      onClick={() => {
                        setAvatarFile(null);
                        setAvatarPreview(null);
                        setAvatarError(null);
                      }}
                    >Undo</Button>
                  )}
                </div>
                {avatarFile && (
                  <p role="status" className="truncate text-xs text-muted">{avatarFile.name} · Ready to save</p>
                )}
                {avatarError && (
                  <p role="alert" className="text-xs text-destructive">{avatarError}</p>
                )}
              </div>
            </div>
          </section>
  );
}
