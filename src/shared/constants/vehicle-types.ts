import { CarFront, Caravan, Ellipsis, Motorbike, Tractor, Truck, Van } from "lucide-react";
import type { VehicleType } from "@/features/garage/types/vehicle";

export const vehicleTypes = [
  { value: "car", label: "Car", icon: CarFront },
  { value: "motorcycle", label: "Motorcycle", icon: Motorbike },
  { value: "atv", label: "ATV", icon: Tractor },
  { value: "van", label: "Van", icon: Van },
  { value: "truck", label: "Truck", icon: Truck },
  { value: "camper", label: "Camper", icon: Caravan },
  { value: "trailer", label: "Trailer", icon: Caravan },
  { value: "other", label: "Other", icon: Ellipsis },
] satisfies { value: VehicleType; label: string; icon: typeof CarFront }[];
