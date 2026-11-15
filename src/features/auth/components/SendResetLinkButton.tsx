"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/shared/components/ui/button";

export default function SendResetLinkButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="button-base button-primary h-12 cursor-pointer"
    >
      {pending ? "Sending link..." : "Send reset link"}
    </Button>
  );
}