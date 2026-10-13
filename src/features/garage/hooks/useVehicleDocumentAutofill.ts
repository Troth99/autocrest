"use client";

import { useRef, useState } from "react";
import useVehicleCatalog from "@/features/garage/hooks/useVehicleCatalog";
import type { VehicleModel } from "@/features/garage/types/vehicle-catalog";
import type { VehicleDocumentDetails } from "@/features/garage/validators/vehicle-document.validator";
import type { VehicleDocumentFormValues } from "@/features/garage/types/vehicle-document-form";
import {
  mapDocumentToForm,
  findDocumentMake,
  findDocumentModel,
  getDocumentModelName,
} from "@/features/garage/services/vehicle-document-form";

/** Manages editable document fields and matches scanned makes/models to the catalog. */
export default function useVehicleDocumentAutofill() {
  const [selectedModel, setSelectedModel] = useState("");

  // Keep input values as strings so scanned details can also be edited manually.
  const [documentValues, setDocumentValues] =
    useState<VehicleDocumentFormValues>({
      custom_make: "",
      custom_model: "",
      plate: "",
      vin: "",
      registration_certificate_number: "",
      first_registration_date: "",
      engine_cc: "",
      power_hp: "",
      fuel_type: "",
      euro_standard: "",
      colour: "",
      seats: "",
    });
  // Remember the scanned model while the selected make's models are loading.
  // A ref preserves this information between renders without triggering a render.
  const pendingModel = useRef<{
    name: string;
    printedMake?: string | null;
    catalogMake?: string;
  } | null>(null);

  // Update one document field while keeping all other field values.
  function handleFieldChange(
    field: keyof VehicleDocumentFormValues,
    value: string,
  ) {
    setDocumentValues((previous) => ({ ...previous, [field]: value }));
  }

  // Select a matching catalog model, or use Other and retain the scanned name.
  function applyModel(
    name: string,
    availableModels: VehicleModel[],
    printedMake?: string | null,
    catalogMake?: string,
  ) {
    const match = findDocumentModel(
      name,
      availableModels,
      printedMake,
      catalogMake,
    );
    setSelectedModel(match?.id ?? "other");
    handleFieldChange("custom_model", match ? "" : name);
  }

  // Apply extracted fields, then resolve the make and its corresponding model.
  function handleDocumentExtracted(details: VehicleDocumentDetails) {
    setDocumentValues((previous) => ({
      ...previous,
      ...mapDocumentToForm(details),
    }));
    if (details.make !== null) {
      const make = findDocumentMake(details.make, makes);
      handleMakeChange(make?.id ?? "other");
      handleFieldChange("custom_make", make ? "" : details.make);
      // An unmatched make uses manual make/model inputs instead of the catalog.
      if (!make) {
        if (details.model !== null)
          handleFieldChange("custom_model", details.model);
      } else {
        const modelName = getDocumentModelName(
          details.model,
          details.make,
          make.name,
        );
        if (modelName !== null) {
          if (make.id === selectedMake && !isLoadingModels)
            applyModel(modelName, models, details.make, make.name);
          // Wait for the new make's catalog before trying to match its model.
          else
            pendingModel.current = {
              name: modelName,
              printedMake: details.make,
              catalogMake: make.name,
            };
        }
      }
      // If the scan has no make, try its model against the currently selected make.
    } else if (details.model !== null && selectedMake) {
      if (selectedMake === "other")
        handleFieldChange("custom_model", details.model);
      else if (isLoadingModels) pendingModel.current = { name: details.model };
      else applyModel(details.model, models);
    }
  }

  // A make change invalidates the previous model and any queued model match.
  function handleMakeChange(makeId: string) {
    pendingModel.current = null;
    if (makeId === selectedMake) return;
    catalog.handleMakeChange(makeId);
    setSelectedModel("");
    handleFieldChange("custom_model", "");
  }

  // Finish a queued scan match once the catalog supplies the make's models.
  function handleModelsLoaded(data: VehicleModel[]) {
    if (pendingModel.current === null) return;
    const { name, printedMake, catalogMake } = pendingModel.current;
    applyModel(name, data, printedMake, catalogMake);
    pendingModel.current = null;
  }

  // Reuse catalog loading and notify this hook when model data becomes available.
  const catalog = useVehicleCatalog(handleModelsLoaded);
  const { makes, selectedMake, models, isLoadingModels } = catalog;

  // A manual selection cancels a queued scan match so it cannot override the choice.
  function handleModelChange(value: string) {
    pendingModel.current = null;
    setSelectedModel(value);
  }

  return {
    ...catalog,
    selectedModel,
    documentValues,
    handleFieldChange,
    handleDocumentExtracted,
    handleMakeChange,
    handleModelChange,
  };
}
