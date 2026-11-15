"use client";

import { useFormStatus } from "react-dom";
import { Check } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

type Props = {
  savedVehicleId: string | null;
  hasPhoto: boolean;
};

export default function SubmittingFormAddCar({ savedVehicleId, hasPhoto }: Props) {
  const { pending } = useFormStatus();
  const label = pending
    ? "Saving..."
    : savedVehicleId
      ? hasPhoto
        ? "Retry photo upload"
        : "Continue to garage"
      : "Add vehicle";

  return (
    <Button
      type="submit"
      disabled={pending}
      className="h-12 cursor-pointer gap-2.5 bg-accent px-6 text-base text-ink hover:bg-accent-strong"
    >
      <Check className="size-5" aria-hidden="true" />
      {label}
    </Button>
  );
}
