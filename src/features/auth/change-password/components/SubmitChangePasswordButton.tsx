"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

export default function SubmitChangePasswordButton() {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="button-base button-primary h-auto cursor-pointer px-5 py-2.5"
        >
            {pending && (
                <LoaderCircle className="size-4 animate-spin motion-reduce:animate-none" />
            )}
            {pending ? "Updating password..." : "Update password"}
        </Button>
    );
}