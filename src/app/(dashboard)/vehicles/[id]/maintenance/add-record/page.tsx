import AddService from "@/features/garage/components/vehicle-details/components/add-service/AddServices";
import { getVehicleById } from "@/features/garage/services/vehicles.service";
import { notFound } from "next/navigation";


export default async function NewServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const vehicle = await getVehicleById(id);

    if (!vehicle) {
        notFound();
    }

    return (
        <AddService key={vehicle.id} vehicleId={vehicle.id} />
    )
}
