import { VehicleServiceRecordDetails } from "@/features/garage/types/vehicle-service-record";
import { Receipt } from "lucide-react";


export default function VehicleCost({
    vehicleReportById
}:
    { vehicleReportById: VehicleServiceRecordDetails }) {

    function totalCost() {
        const partsCost = vehicleReportById.partsCost || 0;
        const laborCost = vehicleReportById.laborCost || 0;
        return partsCost + laborCost;
    }


    return (

        <section className="section-card">
            <h2 className="maintenance-section-title"><span className="maintenance-section-icon">
                <Receipt className="size-4" aria-hidden="true" /></span>Cost</h2>

            <dl className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                    <dt className="detail-label">Parts</dt>
                    <dd className="detail-value">{vehicleReportById.partsCost?.toFixed(2)} €</dd>
                </div>
                <div>
                    <dt className="detail-label">Labor</dt>
                    <dd className="detail-value">{vehicleReportById.laborCost?.toFixed(2)} €</dd>
                </div>
            </dl>

            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <span className="text-sm text-muted">Total cost</span>
                <span className="text-3xl font-semibold tracking-tight text-info-strong">{totalCost().toFixed(2)} €</span>
            </div>
        </section>


    )
}
