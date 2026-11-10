import RecordVehicleDetails from "@/features/garage/components/vehicle-details/recordVehicleDetails/RecordVehicleDetails";
import { getVehicleReportById } from "@/features/garage/services/vehicle-record.service";
import { notFound } from "next/navigation";


export default async function MaintenanceRecordPage({ params }: { params: Promise<{ id: string, recordId: string }> }) {

    const { id, recordId } = await params;

    const vehicleReportById = await getVehicleReportById( id, recordId);

    if (!vehicleReportById) {
        notFound();
    }


    return (
        <RecordVehicleDetails vehicleReportById={vehicleReportById}/>
    )

}
