"use client";

import { useRef, useState } from "react";
import type {
  VehicleMake,
  VehicleModel,
} from "@/features/garage/types/vehicle-catalog";
import { getVehicleModels } from "@/features/garage/services/vehicle-catalog.service";

export default function useVehicleCatalog(
  makes: VehicleMake[],
  onModelsReady: (models: VehicleModel[]) => void,
  initialMake = "",
  initialModels: VehicleModel[] = [],
) {
  const [selectedMake, setSelectedMake] = useState(initialMake);
  const [models, setModels] = useState(initialModels);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [modelsError, setModelsError] = useState<string | null>(null);
  const currentMake = useRef(initialMake);
  const requestId = useRef(0);

  async function handleMakeChange(makeId: string) {
    if (makeId === currentMake.current) return;
    currentMake.current = makeId;
    const id = ++requestId.current;
    setSelectedMake(makeId);
    setModels([]);
    setModelsError(null);
    const needsModels = Boolean(makeId) && makeId !== "other";
    setIsLoadingModels(needsModels);
    if (!needsModels) return;

    try {
      const data = await getVehicleModels(makeId);
      // Ignore results from a make that the user has already changed.
      if (id !== requestId.current) return;
      setModels(data);
      onModelsReady(data);
    } catch {
      if (id !== requestId.current) return;
      setModelsError("Could not load models.");
      onModelsReady([]);
    } finally {
      if (id === requestId.current) setIsLoadingModels(false);
    }
  }

  return {
    makes,
    selectedMake,
    models,
    isLoadingModels,
    modelsError,
    handleMakeChange,
  };
}
