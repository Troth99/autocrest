"use client"
import Link from "next/link";
import ServiceAdditionalDetails from "./components/additional-details/ServiceAdditionalDetails";
import ServiceCost from "./components/ServiceCost";
import ServiceDetails from "./components/ServiceDetails";
import ServiceReminder from "./components/ServiceReminder";
import useForm from "@/shared/hooks/useForm";
import { initialValues as initialServiceValues } from "@/features/garage/constants/add-service-form";
import { AddServiceFormValues } from "@/features/garage/types/add-service-form";

type Props = {
    vehicleId: string
}
export default function AddService({ vehicleId }: Props) {


    async function addServiceHandler(values : AddServiceFormValues ) {
   
        console.log("adding service")

    }

    const {register, formHandler} = useForm(addServiceHandler, initialServiceValues)

    return (
        <main className="mx-auto w-full min-w-0 max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
            <div className="min-w-0">
                <header className="mb-6">
                    <p className="vehicle-heading-eyebrow">My garage / Service</p>
                    <h1 className="text-3xl font-semibold tracking-tight text-text-primary">Add service</h1>
                    <p className="mt-2 text-sm text-muted">
                        Record maintenance or a repair for your vehicle.
                    </p>
                </header>
                <form className="vehicle-form grid min-w-0 gap-4" onSubmit={formHandler}>
                    <fieldset className="content-card vehicle-form-section space-y-4">
                        <legend className="sr-only">
                            Service details
                        </legend>
                        <ServiceDetails />

                    </fieldset>

                    <fieldset className="content-card vehicle-form-section space-y-4">
                        <ServiceCost />
                    </fieldset>

                    <ServiceAdditionalDetails />

                    <ServiceReminder />

                    <footer className="flex justify-end gap-3 border-t border-line pt-4">
                        <Link href={`/vehicles/${vehicleId}`}
                            className="button-base button-secondary cursor-pointer px-5 py-2.5"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="button-base button-primary  px-5 py-2.5"
                        >
                            Save service
                        </button>
                    </footer>
                </form>
            </div>
        </main>
    )
}
