"use client";

import { useEffect, useEffectEvent, useState } from "react";
import type { VehicleMake, VehicleModel } from "@/features/garage/types/vehicle-catalog";
import { getVehicleMakes, getVehicleModels } from "@/features/garage/services/vehicle-catalog.service";

export default function useVehicleCatalog(onModelsReady: (models: VehicleModel[]) => void) {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [isLoadingMakes, setIsLoadingMakes] = useState(true);
  const [makesError, setMakesError] = useState<string | null>(null);
  const [selectedMake, setSelectedMake] = useState("");
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [modelsError, setModelsError] = useState<string | null>(null);

  const onModelsLoaded = useEffectEvent(onModelsReady);

  function handleMakeChange(makeId: string) {
    if (makeId === selectedMake) return;
    setSelectedMake(makeId);
    setModels([]);
    setModelsError(null);
    setIsLoadingModels(Boolean(makeId) && makeId !== "other");
  }

  useEffect(() => {
    let cancelled = false;

    async function loadMakes() {
      try {
        const data = await getVehicleMakes("car");
        if (!cancelled) {
          setMakes(data);
        }
      } catch {
        if (!cancelled) {
          setMakesError("Could not load vehicle makes.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingMakes(false);
        }
      }
    }

    void loadMakes();
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect(() => {
    if (!selectedMake || selectedMake === "other") return;

    let cancelled = false;

    async function loadModels() {
      try {
        const data = await getVehicleModels(selectedMake);

        if (!cancelled) {
          setModels(data);
          onModelsLoaded(data);
        }
      } catch {
        if (!cancelled) {
          setModelsError("Could not load models.");
          onModelsLoaded([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingModels(false);
        }
      }
    }

    void loadModels();

    return () => {
      cancelled = true;
    };
  }, [selectedMake]);

  return { makes, isLoadingMakes, makesError, selectedMake, models, isLoadingModels, modelsError, handleMakeChange };
}
