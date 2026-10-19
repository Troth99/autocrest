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
import useForm from "@/shared/hooks/useForm";
import type { EditVehicleFormValues } from "@/features/garage/types/edit-vehicle-form";
import { createClient } from "@/lib/supabase/client";
import { updateVehicle } from "../../services/vehicles.service";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    vehicle: Vehicle;
    photoUrl?: string | null;
};

export function EditVehicleForm({ vehicle }: Props) {
    const detailsUrl = `/vehicles/${vehicle.id}`;
    const name = `${vehicle.make} ${vehicle.model}`;
    const router = useRouter();
    const [isSaving, setIsSaving] = useState<boolean>(false)
    const [saveError, setSaveError] = useState<string | null>(null);


    const initialValues = Object.fromEntries(
        Object.entries(vehicle).map(([key, value]) => [
            key,
            typeof value === "boolean" ? value : String(value ?? ""),
        ]),
    ) as EditVehicleFormValues;

    initialValues.mileage_recorded_at =
        vehicle.mileage_recorded_at?.slice(0, 10) ?? "";

    async function handleEditVehicle(values: EditVehicleFormValues) {
        if (isSaving) return;

        setIsSaving(true);
        setSaveError(null);
        try {
            const supabase = createClient();

            await updateVehicle(supabase, vehicle.id, values);

        } catch (error) {
            setSaveError(
                error instanceof Error ? error.message : "Could not update the vehicle."
            )
            setIsSaving(false)
            return
        }
        router.push(detailsUrl);
        router.refresh();
    }

    const { register, registerCheckbox, formHandler } = useForm(
        handleEditVehicle,
        initialValues,
    );

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

            <form className="vehicle-form grid gap-5" onSubmit={formHandler}>


                <div className="grid min-w-0 gap-5 xl:grid-cols-2">
                    <EditVehicleBasicFields register={register} />

                    <EditVehicleRegistrationFields register={register} />

                    <EditVehicleTechnicalFields register={register} />

                    <div className="grid content-start gap-5">
                        <EditVehicleMileageFields register={register} />

                        <EditVehiclePurchaseFields register={register} />
                    </div>

                    <EditVehicleAdditionalDetails register={register} registerCheckbox={registerCheckbox} />
                </div>
                {saveError && (
                    <p role="alert" className="text-sm text-destructive">
                        {saveError}
                    </p>
                )}
                <div className="flex flex-wrap items-center justify-end gap-3">
                    <Link href={detailsUrl} className={buttonVariants({ variant: "outline", className: "h-12 gap-2.5 px-6 text-base" })}>
                        <X className="size-5" aria-hidden="true" /> Cancel
                    </Link>
                    <Button
                        type="submit"
                        disabled={isSaving}
                        className="h-12 gap-2.5 bg-accent px-6 text-base text-ink cursor-pointer"
                    >
                        <Check className="size-5" aria-hidden="true" />
                        {isSaving ? "Saving..." : "Save changes"}
                    </Button>
                </div>
            </form>
        </main>
    );
}
