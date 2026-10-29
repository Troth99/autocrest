"use client";

import { useEffect, useRef, useState } from "react";
import useVehicleCatalog from "@/features/garage/hooks/useVehicleCatalog";
import type { Vehicle } from "@/features/garage/types/vehicle";
import type { VehicleModel } from "@/features/garage/types/vehicle-catalog";

export default function useEditVehicleCatalog(vehicle: Vehicle) {
  const [selectedModel, setSelectedModel] = useState("");
  const hasInitializedModel = useRef(false);
  const hasInitializedMake = useRef(false);

  function handleModelsLoaded(availableModels: VehicleModel[]) {
    // A failed load leaves initialization pending for a later retry.
    if (hasInitializedModel.current || availableModels.length === 0) return;
    hasInitializedModel.current = true;
    const savedModel = availableModels.find(
      (model) =>
        model.name.trim().toLowerCase() === vehicle.model.trim().toLowerCase(),
    );
    setSelectedModel(savedModel?.id ?? "other");
  }

  const catalog = useVehicleCatalog(handleModelsLoaded);
  const { makes, isLoadingMakes, makesError, handleMakeChange } = catalog;

  useEffect(() => {
    if (isLoadingMakes || makesError || hasInitializedMake.current) return;
    hasInitializedMake.current = true;
    const savedMake = makes.find(
      (make) =>
        make.name.trim().toLowerCase() === vehicle.make.trim().toLowerCase(),
    );
    handleMakeChange(savedMake?.id ?? "other");
  }, [makes, isLoadingMakes, makesError, vehicle.make, handleMakeChange]);

  function changeMake(makeId: string) {
    if (makeId === catalog.selectedMake) return;
    // A manual choice must not be overwritten by the saved model.
    hasInitializedModel.current = true;
    handleMakeChange(makeId);
    setSelectedModel("");
  }

  return {
    ...catalog,
    selectedModel,
    handleMakeChange: changeMake,
    handleModelChange: setSelectedModel,
  };
}
