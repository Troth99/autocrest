import { createClient } from "@/lib/supabase/client";
import { mfaCodeSchema } from "@/features/auth/validators/mfa.validator";

const SETUP_NAME = "AutoCrest";

export async function listMfaFactors() {
  const { data, error } = await createClient().auth.mfa.listFactors();
  if (error) throw error;
  return data;
}

export async function startMfaSetup() {
  const supabase = createClient();
  const factors = await listMfaFactors();
  if (factors.totp.some((factor) => factor.status === "verified")) {
    throw new Error("Two-factor authentication is already enabled. Refresh this page.");
  }
  // Remove only unfinished setups created by this flow, including after a reload.
  for (const factor of factors.all) {
    if (factor.factor_type === "totp" && factor.status === "unverified" && factor.friendly_name === SETUP_NAME) {
      const { error } = await supabase.auth.mfa.unenroll({ factorId: factor.id });
      if (error) throw error;
    }
  }
  const { data, error } = await supabase.auth.mfa.enroll({
    factorType: "totp",
    friendlyName: SETUP_NAME,
    issuer: "AutoCrest",
  });
  if (error) throw error;
  return { factorId: data.id, qrCode: data.totp.qr_code, secret: data.totp.secret };
}

export async function verifyMfaCode(factorId: string, code: string) {
  const parsed = mfaCodeSchema.safeParse(code);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  const { error } = await createClient().auth.mfa.challengeAndVerify({ factorId, code: parsed.data });
  if (error) throw error;
}

export async function cancelMfaSetup(factorId: string) {
  const factors = await listMfaFactors();
  const factor = factors.all.find((item) => item.id === factorId);
  if (!factor) return;
  if (factor.status !== "unverified" || factor.friendly_name !== SETUP_NAME) {
    throw new Error("This setup cannot be cancelled. Refresh this page to check its status.");
  }
  const { error } = await createClient().auth.mfa.unenroll({ factorId });
  if (error) throw error;
}

export async function disableMfaFactor(factorId: string, code: string) {
  const factors = await listMfaFactors();
  if (!factors.totp.some((factor) => factor.id === factorId && factor.status === "verified")) {
    throw new Error("This authenticator is no longer enabled. Close this window and try again.");
  }
  await verifyMfaCode(factorId, code);
  const supabase = createClient();
  const { error } = await supabase.auth.mfa.unenroll({ factorId });
  if (error) throw error;

  // Removal has succeeded even if updating the local session fails.
  const { error: refreshError } = await supabase.auth.refreshSession();
  return {
    stillEnabled: factors.totp.some((factor) => factor.id !== factorId && factor.status === "verified"),
    warning: refreshError ? "Authenticator removed. Sign out and back in to refresh your session." : "",
  };
}
