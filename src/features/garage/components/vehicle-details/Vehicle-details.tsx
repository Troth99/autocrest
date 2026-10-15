import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import VehicleHeading from "./components/VehicleHeading";
import VehicleOverview from "./components/VehicleOverview";
import VehicleMainActions from "./components/VehicleMainActions";
import VehicleSpecifications from "./components/VehicleSpecifications";
import VehicleRegistration from "./components/VehicleRegistration";
import VehicleActivity from "./components/VehicleActivity";
import VehicleReminders from "./components/VehicleReminders";
import VehiclePurchaseDetails from "./components/VehiclePurchaseDetails";
import VehicleNotes from "./components/VehicleNotes";

export default function VehicleDetails({ vehicleId }: { vehicleId: string }) {
    return (
        <div className="space-y-6">
            {/* Page heading */}
            <VehicleHeading />

            {/* Vehicle overview */}
            <VehicleOverview />

            <VehicleMainActions />

            <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                <div className="space-y-6">
                    <VehicleSpecifications />

                    <VehicleRegistration />

                    <VehicleActivity />
                </div>

                <aside className="space-y-6">
                    <VehicleReminders />

                    <VehiclePurchaseDetails />

                    <VehicleNotes />
                    <Link href="/garrage" className="vehicle-back-link">
                        Back to all vehicles <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                    <p className="break-all px-1 text-xs text-subtle">Vehicle reference: {vehicleId}</p>
                </aside>
            </div>
        </div>
    );
}
