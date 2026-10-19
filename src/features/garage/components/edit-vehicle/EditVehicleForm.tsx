"use client";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import EditVehicleBasicFields from "./components/fields/EditVehicleBasicFields";
import EditVehicleRegistrationFields from "./components/fields/EditVehicleRegistrationFields";
import EditVehicleTechnicalFields from "./components/fields/EditVehicleTechnicalFields";
import EditVehicleMileageFields from "./components/fields/EditVehicleMileageFields";
import EditVehiclePurchaseFields from "./components/fields/EditVehiclePurchaseFields";
import EditVehicleAdditionalDetails from "./components/fields/EditVehicleAdditionalDetails";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import type { Vehicle } from "@/features/garage/types/vehicle";

type Props = {
    vehicle: Vehicle;
    photoUrl?: string | null;
};

export function EditVehicleForm({ vehicle }: Props) {
    const detailsUrl = `/vehicles/${vehicle.id}`;
    const name = `${vehicle.make} ${vehicle.model}`;

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
            <Link href={detailsUrl} className="mb-6 inline-flex items-center gap-2 text-sm text-muted hover:text-info">
                <ArrowLeft className="size-4" aria-hidden="true" /> Back to vehicle details
            </Link>
            <header className="mb-6">
                <p className="vehicle-heading-eyebrow">My garage / Edit vehicle</p>
                <h1 className="vehicle-heading-title">Edit {name}</h1>
                <p className="mt-2 text-sm text-muted">Keep your vehicle details up to date.</p>
            </header>

            <form className="vehicle-form grid gap-5" onSubmit={(event) => event.preventDefault()}>

                <div className="grid min-w-0 gap-5 xl:grid-cols-2">
                    <EditVehicleBasicFields vehicle={vehicle} />

                    <EditVehicleRegistrationFields vehicle={vehicle} />

                    <EditVehicleTechnicalFields vehicle={vehicle} />

                    <div className="grid content-start gap-5">
                        <EditVehicleMileageFields vehicle={vehicle} />

                        <EditVehiclePurchaseFields vehicle={vehicle} />
                    </div>

                    <EditVehicleAdditionalDetails vehicle={vehicle} />
                </div>

                <p className="text-sm text-muted">Form preview — saving changes is not connected yet.</p>
                <div className="flex flex-wrap items-center justify-end gap-3">
                    <Link href={detailsUrl} className={buttonVariants({ variant: "outline", className: "h-12 gap-2.5 px-6 text-base" })}>
                        <X className="size-5" aria-hidden="true" /> Cancel
                    </Link>
                    <Button type="submit" disabled className="h-12 gap-2.5 bg-accent px-6 text-base text-ink">
                        <Check className="size-5" aria-hidden="true" /> Save changes
                    </Button>
                </div>
            </form>
        </main>
    );
}
