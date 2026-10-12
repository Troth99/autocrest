import AddVehicleForm from "@/features/garage/components/add-vehicle/AddVehicleForm";
import VehicleTypeSelection from "@/features/garage/components/VehicleTypeSelection";

type Props = {
  searchParams: Promise<{
    type?: string | string[];
  }>;
};

export default async function AddVehiclePage({ searchParams }: Props) {
  const { type } = await searchParams;

  return type === "car" ? <AddVehicleForm /> : <VehicleTypeSelection />;
}
