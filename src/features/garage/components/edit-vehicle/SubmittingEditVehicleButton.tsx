"use client";

import { useFormStatus } from "react-dom";
import { Check } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function SubmitEditVehicleButton({
    isLoadingModels,
}: {
    isLoadingModels: boolean;
}) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending || isLoadingModels}
            className="h-12 gap-2.5 bg-accent px-6 text-base text-ink cursor-pointer"
        >
            <Check className="size-5" aria-hidden="true" />
            {pending ? "Saving..." : "Save changes"}
        </Button>
    );
}