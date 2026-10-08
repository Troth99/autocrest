"use client";

import Link from "next/link";
import VehicleBasicFields from "@/features/garage/components/add-vehicle/VehicleBasicFields";
import VehicleRegistrationFields from "@/features/garage/components/add-vehicle/VehicleRegistrationFields";
import VehicleTechnicalFields from "@/features/garage/components/add-vehicle/VehicleTechnicalFields";
import VehicleMileageFields from "@/features/garage/components/add-vehicle/VehicleMileageFields";
import VehiclePurchaseFields from "@/features/garage/components/add-vehicle/VehiclePurchaseFields";
import VehicleFormHeader from "@/features/garage/components/add-vehicle/VehicleFormHeader";
import VehicleAdditionalDetails from "@/features/garage/components/add-vehicle/VehicleAdditionalDetails";
import type { VehicleMake } from "@/features/garage/types/vehicle-catalog";
import { useEffect, useState } from "react";
import { getVehicleMakes } from "@/features/garage/services/vehicle-catalog.service";
import { getVehicleModels } from "@/features/garage/services/vehicle-catalog.service";
import type { VehicleModel } from "@/features/garage/types/vehicle-catalog";

export default function AddVehicleForm() {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [isLoadingMakes, setIsLoadingMakes] = useState(true);
  const [makesError, setMakesError] = useState<string | null>(null);
  const [selectedMake, setSelectedMake] = useState("");
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [modelsError, setModelsError] = useState<string | null>(null);

  function handleMakeChange(makeId: string) {
    if (makeId === selectedMake) return;
    setSelectedMake(makeId);
    setSelectedModel("");
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
        }
      } catch {
        if (!cancelled) {
          setModelsError("Could not load models.");
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

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <VehicleFormHeader />

      {makesError && (
        <p role="alert" className="mb-4 text-sm text-destructive">
          {makesError}
        </p>
      )}
      <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
        <input type="hidden" name="vehicle_type" value="car" />
        <VehicleBasicFields
          makes={makes}
          selectedMake={selectedMake}
          onMakeChange={handleMakeChange}
          isLoadingMakes={isLoadingMakes}
          models={models}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          isLoadingModels={isLoadingModels}
          modelsError={modelsError}
        />
        <VehicleRegistrationFields />
        <VehicleTechnicalFields />
        <VehicleMileageFields />
        <VehiclePurchaseFields />
        <VehicleAdditionalDetails />
        <div className="flex flex-wrap items-center justify-end gap-3">
          <Link
            href="/garrage"
            className="rounded-lg border border-line px-5 py-2.5 text-sm font-medium text-text-secondary hover:bg-input/45"
          >
            Cancel
          </Link>
          <button
            type="button"
            disabled
            className="action-button cursor-not-allowed opacity-50"
          >
            Add car
          </button>
        </div>
      </form>
    </main>
  );
}
