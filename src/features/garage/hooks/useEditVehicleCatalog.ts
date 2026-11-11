"use client";

import { useState } from "react";
import useVehicleCatalog from "@/features/garage/hooks/useVehicleCatalog";
import type { Vehicle } from "@/features/garage/types/vehicle";
import type {
  VehicleMake,
  VehicleModel,
} from "@/features/garage/types/vehicle-catalog";

export default function useEditVehicleCatalog(
  vehicle: Vehicle,
  makes: VehicleMake[],
  initialModels: VehicleModel[],
) {
  const savedMake = makes.find(
    (make) =>
      make.name.trim().toLowerCase() === vehicle.make.trim().toLowerCase(),
  );
  const [selectedModel, setSelectedModel] = useState(
    () =>
      initialModels.find(
        (model) =>
          model.name.trim().toLowerCase() ===
          vehicle.model.trim().toLowerCase(),
      )?.id ?? "other",
  );
  const catalog = useVehicleCatalog(
    makes,
    () => { },
    savedMake?.id ?? "other",
    initialModels,
  );

  function handleMakeChange(makeId: string) {
    if (makeId === catalog.selectedMake) return;
    void catalog.handleMakeChange(makeId);
    setSelectedModel("");
  }

  return {
    ...catalog,
    selectedModel,
    handleMakeChange,
    handleModelChange: setSelectedModel,
  };
}
