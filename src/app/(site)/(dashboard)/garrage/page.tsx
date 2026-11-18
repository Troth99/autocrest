import GaragePage from "@/features/garage/GaragePage";
import { getVehiclePhotoUrls } from "@/features/garage/services/vehicle-photo.service";
import { getVehicles } from "@/features/garage/services/vehicles.service";

export default async function GarageRoute({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const vehicles = await getVehicles();

  const photos = await getVehiclePhotoUrls(
    vehicles.map((vehicle) => vehicle.id),
  );

  return (
    <GaragePage
      vehicles={vehicles}
      photos={photos}
      query={typeof q === "string" ? q.trim().slice(0, 100) : ""}
    />
  );
}
