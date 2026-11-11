import { EditVehicleForm } from "@/features/garage/components/edit-vehicle/EditVehicleForm";
import { getVehiclePhotoUrls } from "@/features/garage/services/vehicle-photo.service";
import { getVehicleById } from "@/features/garage/services/vehicles.service";
import {
  getVehicleMakes,
  getVehicleModels,
} from "@/features/garage/services/vehicle-catalog.service";
import { notFound } from "next/navigation";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string; }>;
}) {
  const { id } = await params;
  const vehicle = await getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  const photos = await getVehiclePhotoUrls([vehicle.id]);
  const makes = await getVehicleMakes(vehicle.vehicleType);
  const savedMake = makes.find((make) =>
    make.name.trim().toLowerCase() === vehicle.make.trim().toLowerCase(),
  );
  const models = savedMake ? await getVehicleModels(savedMake.id) : [];

  return (
    <EditVehicleForm
      key={vehicle.id}
      makes={makes}
      models={models}
      vehicle={vehicle}
      photoUrl={photos.urls[vehicle.id] ?? null}
    />
  );
}
