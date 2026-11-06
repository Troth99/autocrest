import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Exchange OAuth and password-recovery codes without allowing external redirects.
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  // Read the authorization code and check whether this is password recovery.
  const code = requestUrl.searchParams.get("code");
  const isPasswordReset =
    requestUrl.searchParams.get("next") === "/reset-password";

  if (code) {
    const supabase = await createClient();
    // Preserve the flow identifier when exchanging the code for a session.
    const flowId = requestUrl.searchParams.get("sb_flow_id");
    const { error } = await supabase.auth.exchangeCodeForSession(
      code,
      flowId ? { flowId } : undefined,
    );

    if (!error) {
      // Send successful sign-ins to MFA verification and recovery to password reset.
      const destination = isPasswordReset ? "/reset-password" : "/verify-2fa";

      const response = NextResponse.redirect(
        new URL(destination, requestUrl.origin),
      );

      // Read the display-only sign-in method supplied by our OAuth redirect URL.
      const provider = requestUrl.searchParams.get("provider");

      // Remember supported OAuth methods only after a successful code exchange.
      // This cookie is for the profile label, not authorization or MFA checks.
      if (
        !isPasswordReset &&
        (provider === "google" || provider === "facebook")
      ) {
        response.cookies.set("autocrest-login-provider", provider, {
          httpOnly: false,
          secure: requestUrl.protocol === "https:",
          sameSite: "lax",
          path: "/",
        });
      }

      return response;
    }
  }

  // Return missing or failed codes to the appropriate authentication page.
  return NextResponse.redirect(
    new URL(
      isPasswordReset
        ? "/forgot-password?error=invalid_reset_link"
        : "/login?error=oauth_callback_failed",
      requestUrl.origin,
    ),
  );
}
