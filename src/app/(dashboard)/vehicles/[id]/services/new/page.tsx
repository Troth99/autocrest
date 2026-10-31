import AddService from "@/features/garage/components/vehicle-details/components/add-service/AddServices";
import { getVehicleById } from "@/features/garage/services/vehicles.service";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";


export default async function NewServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const vehicle = await getVehicleById(supabase, id);

    if (!vehicle) {
        notFound();
    }

    return (
        <AddService key={vehicle.id} vehicleId={vehicle.id} />
    )
}
