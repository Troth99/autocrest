import type { ReactNode, RefObject } from "react";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import DisableTwoFactor from "@/features/profile/components/two-factor/DisableTwoFactor";

export type TwoFactorStatus = "loading" | "enabled" | "disabled" | "error";

type Props = {
  status: TwoFactorStatus;
  busy: boolean;
  error: string;
  inputId: string;
  triggerRef: RefObject<HTMLButtonElement | null>;
  onEnable: () => Promise<void>;
  onRemoved: (stillEnabled: boolean) => void;
  children: ReactNode;
};

export default function TwoFactorStatusCard({
  status, busy, error, inputId, triggerRef, onEnable, onRemoved, children,
}: Props) {
  return (
    <div
      className="rounded-2xl border border-line bg-input/45 p-4"
      aria-busy={busy || status === "loading"}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${status === "enabled" ? "bg-accent/10 text-accent-text" : "bg-info-soft text-info"}`}
        >
          <LockKeyhole className="size-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-text-primary">
            Two-factor authentication
          </p>
          <p className="mt-1 text-xs leading-5 text-muted" role="status">
            {status === "loading"
              ? "Checking status…"
              : status === "enabled"
                ? "Enabled · Authenticator app"
                : status === "error"
                  ? "Status unavailable"
                  : "Add protection with an authenticator app."}
          </p>
        </div>
      </div>
      {status === "disabled" && (
        <Button
          ref={triggerRef}
          type="button"
          className="mt-4 cursor-pointer"
          disabled={busy}
          onClick={onEnable}
        >
          {busy ? "Preparing…" : "Enable 2FA"}
        </Button>
      )}
      {status === "enabled" && (
        <DisableTwoFactor
          onRemoved={onRemoved}
        />
      )}
      {children}
      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-3 text-xs leading-5 text-destructive"
        >
          {error}
        </p>
      )}
    </div>
  );
}
