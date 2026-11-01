"use client";

import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";
import { Button, buttonVariants } from "@/shared/components/ui/button";
import type { Vehicle } from "@/features/garage/types/vehicle";
import useEditVehicleForm from "@/features/garage/hooks/useEditVehicleForm";
import useForm from "@/shared/hooks/useForm";
import { getEditVehicleInitialValues } from "@/features/garage/utils/getEditVehicleInitialValues";
import type { VehicleDocumentFormValues } from "@/features/garage/types/vehicle-document-form";
import VehicleBasicFields from "@/features/garage/components/vehicle-fields/VehicleBasicFields";
import VehicleRegistrationFields from "@/features/garage/components/vehicle-fields/VehicleRegistrationFields";
import VehicleTechnicalFields from "@/features/garage/components/vehicle-fields/VehicleTechnicalFields";
import VehiclePurchaseFields from "@/features/garage/components/vehicle-fields/VehiclePurchaseFields";
import VehicleAdditionalDetails from "@/features/garage/components/vehicle-fields/VehicleAdditionalDetails";

type Props = {
    vehicle: Vehicle;
    photoUrl?: string | null;
};

export function EditVehicleForm({ vehicle }: Props) {
    const detailsUrl = `/vehicles/${vehicle.id}`;

    const name = `${vehicle.make} ${vehicle.model}`;

    const {
        makes, models, selectedMake, selectedModel,
        isLoadingMakes, isLoadingModels, modelsError,
        handleMakeChange: changeCatalogMake, handleModelChange, handleEditVehicle,
        isSaving, saveError, fieldErrors,
    } = useEditVehicleForm(vehicle);

    const { values, register, registerCheckbox, formHandler, setFieldValue } = useForm(
        handleEditVehicle,
        getEditVehicleInitialValues(vehicle),
    );

    function handleMakeChange(makeId: string) {
        if (makeId === selectedMake) return;
        changeCatalogMake(makeId);
        // A new make invalidates the previous manually entered model.
        setFieldValue("customModel", "");
    }

    function handleFieldChange(field: keyof VehicleDocumentFormValues, value: string) {
        setFieldValue(field, value);
    }

    return (
        <main className="page-shell">
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
                    <VehicleBasicFields
                        errors={fieldErrors}
                        register={register}
                        values={values}
                        onFieldChange={handleFieldChange}
                        makes={makes}
                        selectedMake={selectedMake}
                        onMakeChange={handleMakeChange}
                        isLoadingMakes={isLoadingMakes}
                        models={models}
                        selectedModel={selectedModel}
                        onModelChange={handleModelChange}
                        isLoadingModels={isLoadingModels}
                        modelsError={modelsError}
                    />

                    <VehicleRegistrationFields register={register} errors={fieldErrors} values={values} onFieldChange={handleFieldChange} />

                    <VehicleTechnicalFields register={register} errors={fieldErrors} values={values} onFieldChange={handleFieldChange} />

                    <div className="grid content-start gap-5">
                        <VehiclePurchaseFields register={register} errors={fieldErrors} />
                    </div>

                    <VehicleAdditionalDetails errors={fieldErrors} register={register} registerCheckbox={registerCheckbox} />
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
                        disabled={isSaving || isLoadingMakes || isLoadingModels}
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
