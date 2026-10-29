import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Exchange OAuth and password-recovery codes without allowing external redirects.
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const isPasswordReset = requestUrl.searchParams.get("next") === "/reset-password";

  if (code) {
    const supabase = await createClient();
    const flowId = requestUrl.searchParams.get("sb_flow_id");
    const { error } = await supabase.auth.exchangeCodeForSession(
      code,
      flowId ? { flowId } : undefined,
    );

    if (!error) {
      const destination = isPasswordReset ? "/reset-password" : "/verify-2fa";
      return NextResponse.redirect(new URL(destination, requestUrl.origin));
    }
  }

  return NextResponse.redirect(
    new URL(
      isPasswordReset ? "/forgot-password?error=invalid_reset_link" : "/login?error=oauth_callback_failed",
      requestUrl.origin,
    ),
  );
}
