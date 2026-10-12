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

export default function useVehicleDocumentAutofill() {
  const [selectedModel, setSelectedModel] = useState("");

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
  const pendingModel = useRef<{
    name: string;
    printedMake?: string | null;
    catalogMake?: string;
  } | null>(null);

  function handleFieldChange(
    field: keyof VehicleDocumentFormValues,
    value: string,
  ) {
    setDocumentValues((previous) => ({ ...previous, [field]: value }));
  }

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

  function handleDocumentExtracted(details: VehicleDocumentDetails) {
    setDocumentValues((previous) => ({
      ...previous,
      ...mapDocumentToForm(details),
    }));
    if (details.make !== null) {
      const make = findDocumentMake(details.make, makes);
      handleMakeChange(make?.id ?? "other");
      handleFieldChange("custom_make", make ? "" : details.make);
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
          else
            pendingModel.current = {
              name: modelName,
              printedMake: details.make,
              catalogMake: make.name,
            };
        }
      }
    } else if (details.model !== null && selectedMake) {
      if (selectedMake === "other")
        handleFieldChange("custom_model", details.model);
      else if (isLoadingModels) pendingModel.current = { name: details.model };
      else applyModel(details.model, models);
    }
  }

  function handleMakeChange(makeId: string) {
    pendingModel.current = null;
    if (makeId === selectedMake) return;
    catalog.handleMakeChange(makeId);
    setSelectedModel("");
    handleFieldChange("custom_model", "");
  }

  function handleModelsLoaded(data: VehicleModel[]) {
    if (pendingModel.current === null) return;
    const { name, printedMake, catalogMake } = pendingModel.current;
    applyModel(name, data, printedMake, catalogMake);
    pendingModel.current = null;
  }

  const catalog = useVehicleCatalog(handleModelsLoaded);
  const { makes, selectedMake, models, isLoadingModels } = catalog;

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
