import AddVehicleForm from "@/features/garage/components/add-vehicle/AddVehicleForm";
import VehicleTypeSelection from "@/features/garage/components/add-vehicle/components/VehicleTypeSelection";

import { getVehicleMakes } from "@/features/garage/services/vehicle-catalog.service";

export const maxDuration = 70;

type Props = {
  searchParams: Promise<{
    type?: string | string[];
  }>;
};

export default async function AddVehiclePage({ searchParams }: Props) {
  const { type } = await searchParams;

  if (type !== "car") return <VehicleTypeSelection />;

  const makes = await getVehicleMakes("car");

  return <AddVehicleForm makes={makes} />;
}
