import GaragePage from "@/features/garage/GaragePage";
import { getVehiclePhotoUrls } from "@/features/garage/services/vehicle-photo.service";
import { getVehicles } from "@/features/garage/services/vehicles.service";
import { createClient } from "@/lib/supabase/server";

export default async function GarageRoute({
  searchParams
}: {
  searchParams: Promise<{ q?: string | string[] }>
}) {
  const { q } = await searchParams;
  const supabase = await createClient();
  const vehicles = await getVehicles(supabase);

  const photos = await getVehiclePhotoUrls(
    supabase,
    vehicles.map((vehicle) => vehicle.id),
  );

  return (
    <GaragePage vehicles={vehicles} photos={photos} query={typeof q === "string" ? q.trim().slice(0, 100) : ""}
    />
  );
}
