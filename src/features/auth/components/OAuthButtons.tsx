"use client";

import { LoaderCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { FacebookIcon, GoogleIcon } from "./icons/AuthProviderIcons";

type OAuthButtonsProps = {
  isSubmitting: boolean;
  pendingProvider: "google" | "facebook" | null;
  oauthLoginHandler: (provider: "google" | "facebook") => Promise<void>;
};

export default function OAuthButtons({
  isSubmitting,
  pendingProvider,
  oauthLoginHandler,
}: OAuthButtonsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button
        className="oauth-button oauth-button-google h-11 cursor-pointer"
        type="button"
        variant="outline"
        onClick={() => oauthLoginHandler("google")}
        disabled={isSubmitting}
        aria-busy={pendingProvider === "google"}
        aria-live="polite"
      >
        {pendingProvider === "google" ? (
          <>
            <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Connecting…
          </>
        ) : (
          <>
            <GoogleIcon />
            Continue with Google
          </>
        )}
      </Button>
      <Button
        className="oauth-button oauth-button-facebook h-11 cursor-pointer"
        type="button"
        variant="outline"
        onClick={() => oauthLoginHandler("facebook")}
        disabled={isSubmitting}
        aria-busy={pendingProvider === "facebook"}
        aria-live="polite"
      >
        {pendingProvider === "facebook" ? (
          <>
            <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
            Connecting…
          </>
        ) : (
          <>
            <FacebookIcon />
            Continue with Facebook
          </>
        )}
      </Button>

      {/* Placeholder for additional OAuth buttons, e.g., Microsoft, Apple */}
    </div>
  );
}
