"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import { PasswordField } from "@/features/auth/components/PasswordField";
import { changePassword } from "@/features/auth/services/change-password.service";
import {
  validateChangePasswordForm,
  type ChangePasswordFormValues,
} from "@/features/auth/validators/change-password.validator";
import { Button } from "@/shared/components/ui/button";
import useForm from "@/shared/hooks/useForm";

const initialValues: ChangePasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ChangePasswordForm() {
  const inputId = useId();
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [success, setSuccess] = useState(false);
  const { register, formHandler, errors, setErrors, reset } = useForm(
    save,
    initialValues,
    validateChangePasswordForm,
  );

  async function save(values: ChangePasswordFormValues) {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setSaveError("");
    setSuccess(false);
    try {
      await changePassword(values);
      reset();
      setSuccess(true);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Could not change your password. Please try again.";
      if (cause instanceof Error && "field" in cause &&
          (cause.field === "currentPassword" || cause.field === "newPassword")) {
        setErrors({ [cause.field]: message });
      } else {
        setSaveError(message);
      }
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  return (
    <form className="grid gap-5" onSubmit={formHandler} aria-busy={busy}
      onChange={() => { setSuccess(false); setSaveError(""); }}>
      <fieldset disabled={busy} className="grid min-w-0 gap-5">
        <PasswordField
          id={`${inputId}-current`}
          label="Current password"
          hint={null}
          placeholder="Enter your current password"
          autoComplete="current-password"
          error={errors.currentPassword}
          aria-invalid={Boolean(errors.currentPassword)}
          {...register("currentPassword")}
        />
        <PasswordField
          id={`${inputId}-new`}
          label="New password"
          placeholder="Enter a new password"
          autoComplete="new-password"
          error={errors.newPassword}
          aria-invalid={Boolean(errors.newPassword)}
          {...register("newPassword")}
        />
        <PasswordField
          id={`${inputId}-confirm`}
          label="Confirm new password"
          hint={null}
          placeholder="Re-enter your new password"
          autoComplete="new-password"
          error={errors.confirmPassword}
          aria-invalid={Boolean(errors.confirmPassword)}
          {...register("confirmPassword")}
        />
      </fieldset>
      {saveError && <p role="alert" className="text-sm text-destructive">{saveError}</p>}
      {success && (
        <p role="status" className="flex items-center gap-3 rounded-xl border border-accent/25 bg-accent/5 p-4 text-sm text-accent-text">
          <Check className="size-5 shrink-0" />Your password has been changed successfully.
        </p>
      )}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Link href="/profile" className={`button-base button-secondary px-5 py-2.5 text-sm ${busy ? "pointer-events-none opacity-50" : ""}`} aria-disabled={busy} tabIndex={busy ? -1 : undefined}>Back to profile</Link>
        <Button type="submit" size="lg" disabled={busy} className="button-base button-primary h-auto cursor-pointer px-5 py-2.5">
          {busy && <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" />}
          {busy ? "Updating password..." : "Update password"}
        </Button>
      </div>
    </form>
  );
}
