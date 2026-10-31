"use client"
import Link from "next/link";
import ServiceAdditionalDetails from "./components/additional-details/ServiceAdditionalDetails";
import ServiceCost from "./components/ServiceCost";
import ServiceDetails from "./components/ServiceDetails";
import ServiceReminder from "./components/ServiceReminder";
import useForm from "@/shared/hooks/useForm";
import { initialValues as initialServiceValues } from "@/features/garage/constants/add-service-form";
import { AddServiceFormValues } from "@/features/garage/types/add-service-form";
import { validateAddServiceForm } from "@/features/garage/validators/add-service-validator";

type Props = {
    vehicleId: string;
}
export default function AddService({ vehicleId }: Props) {


    async function addServiceHandler(values: AddServiceFormValues) {

        const print = Object.values(values)
        console.log(print)
    }

    const { register, formHandler, values, errors } = useForm(addServiceHandler, initialServiceValues, validateAddServiceForm)

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

                    <footer className="flex justify-end gap-3 border-t border-line pt-4">
                        <Link href={`/vehicles/${vehicleId}`}
                            className="button-base button-secondary cursor-pointer px-5 py-2.5"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="button-base button-primary  px-5 py-2.5 cursor-pointer"
                        >
                            Save service
                        </button>
                    </footer>
                </form>
            </div>
        </main>
    )
}
