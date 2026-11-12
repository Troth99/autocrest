"use client";

import { useEffect, useState } from "react";
import { MailCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

type Props = {
  titleId: string;
  email: string;
  retryAt: number;
  onRetry: () => void;
};

export default function PasswordResetSent({ titleId, email, retryAt, onRetry }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, Math.ceil((retryAt - Date.now()) / 1000)),
  );

  useEffect(() => {
    
    const interval = window.setInterval(() => {
      const remaining = Math.max(0, Math.ceil((retryAt - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) window.clearInterval(interval);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [retryAt]);

  return (
    <div className="mt-6 grid gap-5">
      <MailCheck className="size-10 text-info" aria-hidden="true" />
      <h1 id={titleId} className="text-3xl font-semibold tracking-tight text-text-primary">
        Check your email
      </h1>
      <div role="status" className="section-description text-sm leading-6">
        <p>
          If an account exists for <span className="wrap-break-word font-medium">{email}</span>,
          you will receive a password reset link. Please check your inbox and spam folder.
        </p>
      </div>
      <Button
        type="button"
        disabled={secondsLeft > 0}
        onClick={onRetry}
        className="button-base button-primary h-12 cursor-pointer"
      >
        {secondsLeft > 0 ? `Try again in ${secondsLeft}s` : "Try again"}
      </Button>
    </div>
  );
}
