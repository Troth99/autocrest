"use client";
import Link from "next/link";
import { ArrowLeft, Check, X } from "lucide-react";

import { Button, buttonVariants } from "@/shared/components/ui/button";
import type { Vehicle } from "@/features/garage/types/vehicle";
import useForm from "@/shared/hooks/useForm";
import type { EditVehicleFormValues } from "@/features/garage/types/edit-vehicle-form";
import { createClient } from "@/lib/supabase/client";
import { updateVehicle } from "../../services/vehicles.service";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import VehicleBasicFields from "../vehicle-fields/VehicleBasicFields";
import VehicleRegistrationFields from "@/features/garage/components/vehicle-fields/VehicleRegistrationFields";
import VehicleTechnicalFields from "../vehicle-fields/VehicleTechnicalFields";
import VehiclePurchaseFields from "@/features/garage/components/vehicle-fields/VehiclePurchaseFields";
import VehicleAdditionalDetails from "../vehicle-fields/VehicleAdditionalDetails";

import { initialValues as addVehicleInitialValues } from "@/features/garage/constants/add-vehicle-form";
import type { VehicleFormErrors } from "@/features/garage/types/add-vehicle-form";
import type { VehicleDocumentFormValues } from "@/features/garage/types/vehicle-document-form";
import useVehicleCatalog from "@/features/garage/hooks/useVehicleCatalog";
import { VehicleModel } from "../../types/vehicle-catalog";

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
    const [selectedModel, setSelectedModel] = useState("");

    const hasInitializedModel = useRef<boolean>(false);
    const hasInitializedMake = useRef<boolean>(false);

    const selectedModelAndMakeHandler = (availableModels: VehicleModel[],) => {
        if (hasInitializedModel.current) return
        // Keep initialization pending if loading failed.

        if (availableModels.length === 0) return
        hasInitializedModel.current = true;
        const savedModel = availableModels.find(
            (model) =>
                model.name.trim().toLowerCase() ===
                vehicle.model.trim().toLowerCase(),
        );
        setSelectedModel(savedModel?.id ?? "other");

    }

    const {
        makes,
        models,
        selectedMake,
        isLoadingMakes,
        isLoadingModels,
        makesError,
        modelsError,
        handleMakeChange,
    } = useVehicleCatalog(selectedModelAndMakeHandler);

    useEffect(() => {

        if (
            isLoadingMakes || makesError || hasInitializedMake.current
        ) return

        hasInitializedMake.current = true

        const savedMake = makes.find(
            (make) =>
                make.name.trim().toLowerCase() === vehicle.make.trim().toLowerCase(),
        );
        handleMakeChange(savedMake?.id ?? "other");

    }, [makes, isLoadingMakes, makesError, vehicle.make, handleMakeChange])

    const initialValues = {
        ...addVehicleInitialValues,
        ...Object.fromEntries(
            Object.entries(vehicle).map(([key, value]) => [
                key,
                typeof value === "boolean" ? value : String(value ?? ""),
            ]),
        ),
    } as EditVehicleFormValues;

    initialValues.mileage_recorded_at =
        vehicle.mileage_recorded_at?.slice(0, 10) ?? "";
    initialValues.custom_make = vehicle.make;
    initialValues.custom_model = vehicle.model;

    async function handleEditVehicle(values: EditVehicleFormValues) {
        if (isSaving || isLoadingMakes || isLoadingModels) return;
        setIsSaving(true);
        setSaveError(null);
        try {
            const supabase = createClient();

            // Resolve catalog selections just as the add-vehicle form does.
            const make = selectedMake === "other"
                ? values.custom_make
                : (makes.find((item) => item.id === selectedMake)?.name ?? "");
            const model = selectedMake === "other" || selectedModel === "other"
                ? values.custom_model
                : (models.find((item) => item.id === selectedModel)?.name ?? "");

            await updateVehicle(supabase, vehicle.id, { ...values, make, model });

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

    const { values, setFieldValue, register, registerCheckbox, formHandler } = useForm(
        handleEditVehicle,
        initialValues,
    );

    const fieldErrors: VehicleFormErrors = {};
    const handleFieldChange = (field: keyof VehicleDocumentFormValues, value: string) => {
        setFieldValue(field, value);
    };

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
                        onMakeChange={(makeId) => {
                            if (makeId === selectedMake) return;
                            hasInitializedModel.current = true;
                            handleMakeChange(makeId);
                            setSelectedModel("");
                            setFieldValue("custom_model", "");

                        }}
                        isLoadingMakes={isLoadingMakes}
                        models={models}
                        selectedModel={selectedModel}
                        onModelChange={setSelectedModel}
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
