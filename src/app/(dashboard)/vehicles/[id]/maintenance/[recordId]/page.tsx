import RecordVehicleDetails from "@/features/garage/components/vehicle-details/recordVehicleDetails/RecordVehicleDetails";
import { getVehicleReportById } from "@/features/garage/services/vehicle-record.service";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";


export default async function MaintenanceRecordPage({ params }: { params: Promise<{ id: string, recordId: string }> }) {

    const { id, recordId } = await params;

    const supabase = await createClient();

    const vehicleReportById = await getVehicleReportById(supabase, id, recordId);

    if (!vehicleReportById) {
        notFound();
    }


    return (
        <RecordVehicleDetails vehicleReportById={vehicleReportById}/>
    )

}
