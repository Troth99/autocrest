"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { Check, LoaderCircle, ShieldAlert, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  disableMfaFactor,
  listMfaFactors,
} from "@/features/auth/services/mfa.service";

type Factor = { id: string; name: string };

export default function DisableTwoFactor({
  onRemoved,
}: {
  onRemoved: (stillEnabled: boolean) => void;
}) {
  const inputId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pending = useRef(false);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [factors, setFactors] = useState<Factor[]>([]);
  const [factorId, setFactorId] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    stillEnabled: boolean;
    warning: string;
  } | null>(null);

  //Shared function to run an async action while managing busy state and error handling.
  async function run(action: () => Promise<void>) {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      await action();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Could not remove your authenticator. Try again.",
      );
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  //Function to load the list of enabled two-factor authenticators and update the state accordingly. If no verified authenticators are found, an error is thrown.
  async function loadFactors() {
    await run(async () => {
      const data = await listMfaFactors();
      const verified = data.totp.filter(
        (factor) => factor.status === "verified",
      );
      if (!verified.length)
        throw new Error(
          "No enabled authenticator was found. Refresh your profile.",
        );
      setFactors(
        verified.map((factor) => ({
          id: factor.id,
          name: factor.friendly_name || "Authenticator app",
        })),
      );
      setFactorId(verified[0].id);
    });
  }

  function close() {
    if (pending.current) return;
    setOpen(false);
    setCode("");
    setError("");
    if (result) onRemoved(result.stillEnabled);
  }

  async function disable(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await run(async () => {
      if (!factors.some((factor) => factor.id === factorId))
        throw new Error("Select an authenticator to remove.");
      const removal = await disableMfaFactor(factorId, code);
      setCode("");
      setResult(removal);
    });
  }

  return (
    <Dialog.Root
      open={open}
      disablePointerDismissal
      onOpenChange={(nextOpen, details) => {
        if (!nextOpen) {
          details.cancel();
          close();
        }
      }}
    >
      <Button
        ref={triggerRef}
        type="button"
        variant="outline"
        className="mt-4 cursor-pointer "
        onClick={async () => {
          setResult(null);
          setFactors([]);
          setFactorId("");
          setCode("");
          setOpen(true);
          await loadFactors();
        }}
      >
        Disable 2FA
      </Button>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm" />
        <Dialog.Popup
          finalFocus={triggerRef}
          className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-line bg-panel p-6 text-text-primary shadow-2xl outline-none sm:p-8"
          aria-busy={busy}
        >
          <Dialog.Close
            disabled={busy}
            aria-label="Close disable two-factor authentication"
            className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full text-muted hover:bg-input hover:text-text-primary focus-visible:outline-2 focus-visible:outline-info disabled:opacity-50"
          >
            <X className="size-4" />
          </Dialog.Close>
          <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <ShieldAlert className="size-6" />
          </span>
          <Dialog.Title className="pr-5 text-xl font-semibold tracking-tight">
            {result
              ? result.stillEnabled
                ? "Authenticator removed"
                : "Two-factor authentication disabled"
              : "Disable two-factor authentication?"}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-muted">
            {result
              ? result.stillEnabled
                ? "Your other authenticator is still enabled."
                : "Your account will no longer ask for an authenticator code at login."
              : factors.length > 1
                ? "Choose the authenticator to remove and enter its current code. Other authenticators will stay enabled."
                : "This removes your authenticator and its extra protection. Enter its current six-digit code to confirm."}
          </Dialog.Description>
          {result ? (
            <div className="mt-6">
              <p
                role="status"
                className="flex items-center gap-3 rounded-2xl border border-line bg-input/45 p-4 text-sm"
              >
                <Check className="size-5 text-accent-text" />
                {result.stillEnabled
                  ? "Selected authenticator removed"
                  : "2FA is now disabled"}
              </p>
              {result.warning && (
                <p role="alert" className="mt-3 text-sm text-muted">
                  {result.warning}
                </p>
              )}
              <Button
                type="button"
                size="lg"
                className="mt-6 w-full rounded-xl cursor-pointer"
                onClick={close}
              >
                Done
              </Button>
            </div>
          ) : factors.length > 0 ? (
            <form onSubmit={disable} className="mt-6 space-y-4">
              {factors.length > 1 && (
                <div className="grid gap-2">
                  <label htmlFor={`${inputId}-factor`} className="field-label">
                    Authenticator to remove
                  </label>
                  <select
                    id={`${inputId}-factor`}
                    className="form-input"
                    value={factorId}
                    disabled={busy}
                    onChange={(event) => {
                      setFactorId(event.target.value);
                      setCode("");
                      setError("");
                    }}
                  >
                    {factors.map((factor) => (
                      <option key={factor.id} value={factor.id}>
                        {factor.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="grid gap-2 rounded-2xl border border-line bg-input/45 p-5">
                <label htmlFor={inputId} className="text-sm font-semibold">
                  Authenticator code
                </label>
                <Input
                  id={inputId}
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="000000"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  disabled={busy}
                  className="h-12 text-center font-mono text-xl tracking-[0.35em] md:text-xl"
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? `${inputId}-error` : undefined}
                />
              </div>
              {error && (
                <p
                  id={`${inputId}-error`}
                  role="alert"
                  className="text-sm text-destructive"
                >
                  {error}
                </p>
              )}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled={busy}
                  className="rounded-xl px-5 cursor-pointer"
                  onClick={close}
                >
                  Keep 2FA enabled
                </Button>
                <Button
                  type="submit"
                  variant="destructive"
                  size="lg"
                  disabled={busy}
                  className="rounded-xl px-5 cursor-pointer"
                >
                  {busy
                    ? "Please wait..."
                    : factors.length > 1
                      ? "Verify and remove"
                      : "Verify and disable"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              {busy && (
                <p
                  role="status"
                  className="flex items-center gap-2 text-sm text-muted"
                >
                  <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" />
                  Loading your authenticator...
                </p>
              )}
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              {!busy && (
                <Button type="button" onClick={loadFactors}>
                  Try again
                </Button>
              )}
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
