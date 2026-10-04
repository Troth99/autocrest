"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import TwoFactorStatusCard, { type TwoFactorStatus } from "@/features/profile/components/two-factor/TwoFactorStatusCard";
import TwoFactorSetupDialog, { type TwoFactorSetupData } from "@/features/profile/components/two-factor/TwoFactorSetupDialog";
import {
  cancelMfaSetup,
  listMfaFactors,
  startMfaSetup,
  verifyMfaCode,
} from "@/features/auth/services/mfa.service";

export default function TwoFactorSetup() {
  const inputId = useId();
  const busyRef = useRef(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [complete, setComplete] = useState(false);
  const [status, setStatus] = useState<TwoFactorStatus>("loading");
  const [setup, setSetup] = useState<TwoFactorSetupData | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const factors = await listMfaFactors();
        if (active)
          setStatus(
            factors.totp.some((factor) => factor.status === "verified")
              ? "enabled"
              : "disabled",
          );
      } catch (cause) {
        if (active) {
          setStatus("error");
          setError(
            cause instanceof Error
              ? cause.message
              : "Could not load two-factor authentication. Refresh to retry.",
          );
        }
      }
    }
    void load();
    return () => {
      active = false;
    };
  }, []);

  async function run(action: () => Promise<void>) {
    if (busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError("");
    try {
      await action();
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!setup) return;
    await run(async () => {
      await verifyMfaCode(setup.factorId, code);
      setStatus("enabled");
      setSetup(null);
      setCode("");
      setComplete(true);
    });
  }

  async function closeSetup() {
    if (busyRef.current) return;
    await run(async () => {
      if (setup) await cancelMfaSetup(setup.factorId);
      setOpen(false);
      setSetup(null);
      setCode("");
    });
  }

  async function prepareSetup() {
    await run(async () => {
      setSetup(await startMfaSetup());
    });
  }

  async function openSetup() {
    setComplete(false);
    setOpen(true);
    await prepareSetup();
  }

  return (
    <TwoFactorStatusCard
      status={status}
      busy={busy}
      error={open ? "" : error}
      inputId={inputId}
      triggerRef={triggerRef}
      onEnable={openSetup}
      onRemoved={(stillEnabled) => setStatus(stillEnabled ? "enabled" : "disabled")}
    >
      <TwoFactorSetupDialog
        open={open}
        complete={complete}
        busy={busy}
        setup={setup}
        code={code}
        error={error}
        inputId={inputId}
        triggerRef={triggerRef}
        onClose={closeSetup}
        onVerify={verify}
        onCodeChange={setCode}
        onRetry={prepareSetup}
      />
    </TwoFactorStatusCard>
  );
}
