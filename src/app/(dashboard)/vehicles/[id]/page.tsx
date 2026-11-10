import VehicleDetails from "@/features/garage/components/vehicle-details/VehicleDetails";
import { getVehicleById } from "@/features/garage/services/vehicles.service";
import { getVehiclePhotoUrls } from "@/features/garage/services/vehicle-photo.service";
import { notFound } from "next/navigation";
import { getVehicleReports } from "@/features/garage/services/vehicle-record.service";

export default async function VehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;


  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  const [photos, vehicleServices] = await Promise.all([
    getVehiclePhotoUrls([vehicle.id]),
    getVehicleReports(vehicle.id),
  ]);

  return (
    <main className="page-shell">
      {photos.error && (
        <p role="alert" className="mb-4 text-sm text-muted">
          {photos.error} Refresh to try again.
        </p>
      )}
      <VehicleDetails
        vehicle={vehicle}
        photoUrl={photos.urls[vehicle.id] ?? null}
        photoId={photos.selectedPhotos[vehicle.id]?.id ?? null}
        vehicleServices={vehicleServices}
      />
    </main>
  );
}
