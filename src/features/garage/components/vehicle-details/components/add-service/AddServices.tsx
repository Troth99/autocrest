"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ServiceAdditionalDetails from "./components/additional-details/ServiceAdditionalDetails";
import ServiceCost from "./components/ServiceCost";
import ServiceDetails from "./components/ServiceDetails";
import ServiceReminder from "./components/ServiceReminder";
import useForm from "@/shared/hooks/useForm";
import { initialValues as initialServiceValues } from "@/features/garage/constants/add-service-form";
import type { AddServiceFormValues } from "@/features/garage/types/add-service-form";
import { validateAddServiceForm } from "@/features/garage/validators/add-service-validator";
import { addVehicleService } from "@/features/garage/services/vehicle-record.service";

type Props = {
    vehicleId: string;
}
export default function AddService({ vehicleId }: Props) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);

    async function addServiceHandler(values: AddServiceFormValues) {
        if (isSaving) return;
        setIsSaving(true);
        setSaveError(null);

        try {
            await addVehicleService(vehicleId, values);
        } catch (error) {
            setSaveError(error instanceof Error ? error.message : "Could not save the service. Please try again.");
            setIsSaving(false);
            return;
        }

        router.push(`/vehicles/${vehicleId}`);
        router.refresh();
    }

    const { register, formHandler, values, errors } = useForm(
        addServiceHandler,
        initialServiceValues,
        validateAddServiceForm,
    );

    return (
        <main className="mx-auto w-full min-w-0 max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
            <div className="min-w-0">
                <header className="mb-6">
                    <p className="vehicle-heading-eyebrow">My garage / Service</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-text-primary">
                        Add car service
                    </h1>
                    <p className="mt-2 text-sm text-muted">
                        Record maintenance or a repair. Start with the service type, date and mileage.
                    </p>
                </header>
                <form className="vehicle-form grid min-w-0 gap-4" noValidate onSubmit={formHandler}>
                    <fieldset disabled={isSaving} className="grid min-w-0 gap-4">
                        <legend className="sr-only">Service record</legend>
                        <fieldset className="content-card vehicle-form-section space-y-4">
                            <legend className="sr-only">
                                Service details
                            </legend>
                            <ServiceDetails register={register} errors={errors} values={values} />

                        </fieldset>

                        <fieldset className="content-card vehicle-form-section space-y-4">
                            <ServiceCost register={register} errors={errors} />
                        </fieldset>

                        <ServiceAdditionalDetails register={register} errors={errors} values={values} />

                        <ServiceReminder register={register} errors={errors} />

                        {saveError && <p role="alert" className="text-sm text-red-400">{saveError}</p>}

                        <footer className="flex justify-end gap-3 border-t border-line pt-4">
                            <button
                                type="button"
                                disabled={isSaving}
                                onClick={() => router.push(`/vehicles/${vehicleId}`)}
                                className="button-base button-secondary cursor-pointer px-5 py-2.5 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isSaving}
                                className="button-base button-primary px-5 py-2.5 cursor-pointer disabled:cursor-not-allowed"
                            >
                                {isSaving ? "Saving..." : "Save service"}
                            </button>
                        </footer>
                    </fieldset>
                </form>
            </div>
        </main>
    )
}
