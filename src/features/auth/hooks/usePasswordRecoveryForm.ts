"use client";

import { useRef, useState } from "react";
import useForm, { type FormValues } from "@/shared/hooks/useForm";

// Share submission state while keeping each recovery form's validation and action explicit.
export default function usePasswordRecoveryForm<T extends FormValues>(
  initialValues: T,
  validate: (values: T) => Partial<T>,
  submit: (values: T) => Promise<void>,
) {
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { reset, ...form } = useForm(save, initialValues, validate);

  async function save(values: T) {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      await submit(values);
      reset();
      setSuccess(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Please try again.");
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  return { ...form, busy, success, error };
}
