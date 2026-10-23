"use client";

import { Dialog } from "@base-ui/react/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { deleteVehicle } from "@/features/garage/services/vehicles.service";

type Props = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    vehicleId: string;
};

export default function DeleteVehicleDialog({
    open,
    onOpenChange,
    vehicleId,
}: Props) {

    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleDelete() {
        if (isDeleting) return;

        setIsDeleting(true);
        setError(null);

        try {
            await deleteVehicle(createClient(), vehicleId);
            router.replace("/garrage");
            router.refresh();
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Could not delete the vehicle. Please try again.",
            );
            setIsDeleting(false);
        }
    }

    function handleOpenChange(nextOpen: boolean) {
        if (isDeleting) return;

        setError(null);
        onOpenChange(nextOpen);
    }
    return (
        <Dialog.Root
            open={open}
            onOpenChange={handleOpenChange}>
            <Dialog.Portal>
                <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/65" />

                <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line bg-panel p-6 text-text-primary shadow-2xl">
                    <Dialog.Title className="text-xl font-semibold">
                        Delete vehicle?
                    </Dialog.Title>

                    <Dialog.Description className="mt-3 text-sm text-muted">
                        This vehicle and its photos will be permanently deleted.
                        This action cannot be undone.
                    </Dialog.Description>

                    {error && (
                        <p role="alert" className="mt-4 text-sm text-destructive">
                            {error}
                        </p>
                    )}

                    <div className="mt-6 flex justify-end gap-3">
                        <Dialog.Close disabled={isDeleting} className="button-base button-secondary px-4 py-2 disabled:opacity-50">
                            Cancel
                        </Dialog.Close>

                        <button
                            type="button"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="button-base cursor-pointer bg-destructive px-4 py-2 text-white disabled:cursor-wait disabled:opacity-50"
                        >
                            {isDeleting ? "Deleting..." : "Delete permanently"}
                        </button>
                    </div>
                </Dialog.Popup>
            </Dialog.Portal>
        </Dialog.Root>
    );
}
