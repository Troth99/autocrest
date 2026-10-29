import VehicleDetails from "@/features/garage/components/vehicle-details/Vehicle-details";
import { getVehicleById } from "@/features/garage/services/vehicles.service";
import { getVehiclePhotoUrls } from "@/features/garage/services/vehicle-photo.service";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";


export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const supabase = await createClient();
    const vehicle = await getVehicleById(supabase, id)

    if (!vehicle) {
        notFound()
    }

    const photos = await getVehiclePhotoUrls(supabase, [vehicle.id]);

    return (
        <main className="page-shell">
            {photos.error && <p role="alert" className="mb-4 text-sm text-muted">{photos.error} Refresh to try again.</p>}
            <VehicleDetails
                vehicle={vehicle}
                photoUrl={photos.urls[vehicle.id] ?? null}
                photoId={photos.selectedPhotos[vehicle.id]?.id ?? null}
            />
        </main>
    )
}

