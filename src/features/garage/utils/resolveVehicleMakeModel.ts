import type { VehicleMake, VehicleModel } from "@/features/garage/types/vehicle-catalog";

type Selection = {
  selectedMake: string;
  selectedModel: string;
  makes: VehicleMake[];
  models: VehicleModel[];
};

// Both forms save catalog names, or the manual names entered for Other.
export function resolveVehicleMakeModel(
  values: { custom_make: string; custom_model: string },
  { selectedMake, selectedModel, makes, models }: Selection,
) {
  return {
    make: selectedMake === "other"
      ? values.custom_make
      : (makes.find((item) => item.id === selectedMake)?.name ?? ""),
    model: selectedMake === "other" || selectedModel === "other"
      ? values.custom_model
      : (models.find((item) => item.id === selectedModel)?.name ?? ""),
  };
}
