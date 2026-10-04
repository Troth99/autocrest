"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { logoutUser } from "@/features/auth/services/auth.service";
import { verifyMfaCode } from "@/features/auth/services/mfa.service";

export default function MfaLoginForm({ factors }: {
  factors: { id: string; name: string }[];
}) {
  const router = useRouter();
  const inputId = useId();
  const pending = useRef(false);
  const [factorId, setFactorId] = useState(factors[0]?.id ?? "");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function run(action: () => Promise<void>) {
    if (pending.current) return;
    pending.current = true;
    setBusy(true);
    setError("");
    try {
      await action();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not complete verification. Please try again.");
    } finally {
      pending.current = false;
      setBusy(false);
    }
  }

  async function verify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await run(async () => {
      if (!factors.some((factor) => factor.id === factorId)) throw new Error("Select an authenticator to continue.");
      await verifyMfaCode(factorId, code);
      setCode("");
      router.replace("/");
      router.refresh();
    });
  }

  return (
    <section className="card-base w-full" aria-labelledby={`${inputId}-title`} aria-busy={busy}>
      <span className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent/10 text-accent-text"><ShieldCheck className="size-6" /></span>
      <span className="eyebrow">AUTOCREST ACCOUNT</span>
      <h1 id={`${inputId}-title`} className="mt-4 text-3xl font-semibold tracking-tight text-text-primary">Verify your sign-in</h1>
      <p className="mt-3 text-sm leading-6 text-muted">Enter the six-digit code from your authenticator app to continue.</p>
      {factors.length === 0 && <p role="alert" className="mt-4 text-sm text-destructive">No supported authenticator was found. Sign out and contact support if this continues.</p>}
      <form className="mt-6 grid gap-4" onSubmit={verify}>
        {factors.length > 1 && (
          <div className="grid gap-2">
            <label className="field-label" htmlFor={`${inputId}-factor`}>Authenticator</label>
            <select id={`${inputId}-factor`} value={factorId} disabled={busy} className="form-input" onChange={(event) => { setFactorId(event.target.value); setCode(""); setError(""); }}>
              {factors.map((factor) => <option key={factor.id} value={factor.id}>{factor.name}</option>)}
            </select>
          </div>
        )}
        <div className="grid gap-2">
          <label className="field-label" htmlFor={inputId}>Authenticator code</label>
          <Input id={inputId} value={code} onChange={(event) => setCode(event.target.value)} inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="000000" disabled={busy || !factorId} className="h-12 text-center font-mono text-xl tracking-[0.35em] md:text-xl" aria-invalid={Boolean(error)} aria-describedby={error ? `${inputId}-error` : undefined} />
        </div>
        {error && <p id={`${inputId}-error`} role="alert" className="text-sm text-destructive">{error}</p>}
        <Button type="submit" size="lg" disabled={busy || !factorId} className="button-primary button-base h-12 w-full">{busy ? "Please wait..." : "Verify and continue"}</Button>
        <Button type="button" variant="outline" disabled={busy} className="h-11 w-full" onClick={async () => {
          await run(async () => {
            await logoutUser();
            router.replace("/login");
            router.refresh();
          });
        }}>Sign out and use another account</Button>
      </form>
    </section>
  );
}
