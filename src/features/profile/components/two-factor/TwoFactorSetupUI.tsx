import type { FormEvent, RefObject } from "react";
import { Check, LoaderCircle, ShieldCheck, X } from "lucide-react";
import { Dialog } from "@base-ui/react/dialog";
import { Button } from "@/shared/components/ui/button";
import type { startMfaSetup } from "@/features/auth/services/mfa.service";

export type TwoFactorSetupData = Awaited<ReturnType<typeof startMfaSetup>>;

type Props = {
  open: boolean;
  complete: boolean;
  busy: boolean;
  setup: TwoFactorSetupData | null;
  code: string;
  error: string;
  inputId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onClose: () => Promise<void>;
  onVerify: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  onCodeChange: (code: string) => void;
  onRetry: () => Promise<void>;
};

export default function TwoFactorSetupDialog({
  open,
  complete,
  busy,
  setup,
  code,
  error,
  inputId,
  triggerRef,
  onClose,
  onVerify,
  onCodeChange,
  onRetry,
}: Props) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={async (nextOpen, details) => {
        if (!nextOpen) {
          details.cancel();
          await onClose();
        }
      }}
      disablePointerDismissal
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/65 transition-opacity duration-200 data-ending-style:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup
          finalFocus={triggerRef}
          className="card-base fixed top-1/2 left-1/2 z-50 max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto text-text-primary shadow-2xl outline-none transition-[opacity,scale] duration-200 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 motion-reduce:transition-none"
        >
          <Dialog.Close
            disabled={busy}
            aria-label="Close two-factor setup"
            className="button-base button-ghost absolute top-4 right-4 size-8 cursor-pointer disabled:cursor-default disabled:opacity-50"
          >
            <X className="size-4" />
          </Dialog.Close>
          <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-text">
            <ShieldCheck className="size-6" />
          </span>
          <Dialog.Title className="pr-5 text-xl font-semibold tracking-tight">
            {complete
              ? "Two-factor authentication enabled"
              : "Set up two-factor authentication"}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-muted">
            {complete
              ? "Your authenticator app is connected to your AutoCrest account."
              : "Connect your authenticator app in two simple steps."}
          </Dialog.Description>
          {complete ? (
            <div className="mt-6">
              <div
                role="status"
                className="flex items-center gap-3 rounded-2xl border border-accent/25 bg-accent/5 p-4 text-sm text-accent-text"
              >
                <Check className="size-5" />
                Setup complete
              </div>
              <Button
                type="button"
                size="lg"
                className="button-base button-primary mt-6 w-full cursor-pointer rounded-xl"
                onClick={onClose}
              >
                Done
              </Button>
            </div>
          ) : setup ? (
            <form
              onSubmit={onVerify}
              className="mt-6 space-y-5"
              aria-busy={busy}
            >
              <div className="rounded-2xl border border-line bg-input/45 p-5">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <span className="flex size-6 items-center justify-center rounded-full bg-info-soft text-xs text-info">
                    1
                  </span>
                  Scan the QR code
                </p>
                <p className="mt-2 text-xs leading-5 text-muted">
                  Open your authenticator app and add a new account.
                </p>
                {/* Supabase supplies a local SVG data URL; keep this secret out of image optimization. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={setup.qrCode}
                  alt="Scan to set up AutoCrest two-factor authentication"
                  width={200}
                  height={200}
                  className="mx-auto mt-4 size-52 max-w-full rounded-2xl bg-white p-3"
                />
                <details className="mt-4 text-xs text-muted">
                  <summary className="cursor-pointer">
                    Can’t scan? Enter the setup key manually
                  </summary>
                  <code className="mt-2 block break-all rounded-lg border border-line p-2 select-all">
                    {setup.secret}
                  </code>
                </details>
              </div>
              <div className="rounded-2xl border border-line bg-input/45 p-5">
                <label
                  htmlFor={inputId}
                  className="field-label flex items-center gap-2"
                >
                  <span className="flex size-6 items-center justify-center rounded-full bg-info-soft text-xs text-info">
                    2
                  </span>
                  Enter the six-digit code
                </label>
                <input
                  id={inputId}
                  className="form-input mt-4 h-12 text-center font-mono text-xl tracking-[0.35em] disabled:opacity-50"
                  placeholder="000000"
                  value={code}
                  onChange={(event) => onCodeChange(event.target.value)}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  disabled={busy}
                  aria-describedby={error ? `${inputId}-error` : undefined}
                />
              </div>
              {error && (
                <p
                  id={`${inputId}-error`}
                  role="alert"
                  className="text-sm leading-5 text-destructive"
                >
                  {error}
                </p>
              )}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  disabled={busy}
                  className="button-base button-secondary cursor-pointer rounded-xl px-5"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="button-base button-primary cursor-pointer rounded-xl px-5"
                  disabled={busy}
                >
                  {busy ? "Please wait…" : "Verify and enable"}
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
                  Preparing your setup...
                </p>
              )}
              {error && (
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
              {!busy && (
                <Button
                  type="button"
                  className="button-base button-primary cursor-pointer"
                  onClick={onRetry}
                >
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
