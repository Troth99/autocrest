import { EditVehicleForm } from "@/features/garage/components/edit-vehicle/EditVehicleForm";
import { getVehiclePhotoUrls } from "@/features/garage/services/vehicle-photo.service";
import { getVehicleById } from "@/features/garage/services/vehicles.service";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";



export default async function EditVehiclePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();
    const vehicle = await getVehicleById(supabase, id)


    if (!vehicle) {
        notFound()
    }


    const photos = await getVehiclePhotoUrls(supabase, [vehicle.id]);


    return (
        <EditVehicleForm vehicle={vehicle} photoUrl={photos.urls[vehicle.id] ?? null} />
    )
}
