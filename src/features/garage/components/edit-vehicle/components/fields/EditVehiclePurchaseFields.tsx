import type { EditVehicleFormRegister } from "@/features/garage/types/edit-vehicle-form";
import { Input } from "@/shared/components/ui/input";

type Props = {
    register: EditVehicleFormRegister;
};

export default function EditVehiclePurchaseFields({ register }: Props) {
    return (
        <fieldset className="content-card min-w-0 rounded-2xl p-4 sm:p-5">
            <legend className="sr-only">Purchase details</legend>
            <h2 className="section-title">Purchase details</h2>
            <div className="mt-4 grid items-start gap-4 sm:grid-cols-2">
                <label htmlFor="purchase_date" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Purchase date</span>
                    <Input
                        id="purchase_date"
                        type="date" {...register("purchase_date")}
                    />
                </label>
                <label htmlFor="purchase_price" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Purchase price</span>
                    <Input
                        id="purchase_price"
                        type="number"
                        min={0}
                        step={0.01} {...register("purchase_price")}
                    />
                </label>
                <label htmlFor="purchase_currency_code" className="grid gap-2 text-sm font-medium text-text-secondary">
                    <span>Currency code</span>
                    <Input
                        id="purchase_currency_code"
                        placeholder="e.g. EUR" {...register("purchase_currency_code")}
                    />
                </label>
            </div>
        </fieldset>
    );
}
