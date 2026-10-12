"use client";

import Link from "next/link";
import VehicleBasicFields from "@/features/garage/components/add-vehicle/fields/VehicleBasicFields";
import VehicleRegistrationFields from "@/features/garage/components/add-vehicle/fields/VehicleRegistrationFields";
import VehicleTechnicalFields from "@/features/garage/components/add-vehicle/fields/VehicleTechnicalFields";
import VehicleMileageFields from "@/features/garage/components/add-vehicle/fields/VehicleMileageFields";
import VehiclePurchaseFields from "@/features/garage/components/add-vehicle/fields/VehiclePurchaseFields";
import VehicleFormHeader from "@/features/garage/components/add-vehicle/VehicleFormHeader";
import VehicleAdditionalDetails from "@/features/garage/components/add-vehicle/fields/VehicleAdditionalDetails";
import { useState } from "react";
import useVehicleDocumentAutofill from "@/features/garage/hooks/useVehicleDocumentAutofill";
import VehiclePhotoFields from "@/features/garage/components/add-vehicle/fields/VehiclePhotoFields";
import VehicleDocumentScan from "@/features/garage/components/add-vehicle/VehicleDocumentScan";

export default function AddVehicleForm() {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const {
    makes, isLoadingMakes, makesError, selectedMake,
    models, selectedModel, isLoadingModels, modelsError,
    documentValues, handleFieldChange, handleDocumentExtracted,
    handleMakeChange, handleModelChange,
  } = useVehicleDocumentAutofill();

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <VehicleFormHeader />

      {makesError && (
        <p role="alert" className="mb-4 text-sm text-destructive">
          {makesError}
        </p>
      )}
      <form className="vehicle-form grid gap-4" onSubmit={(event) => event.preventDefault()}>

        <input type="hidden" name="vehicle_type" value="car" />

        <VehicleDocumentScan onExtracted={handleDocumentExtracted} />

        <VehiclePhotoFields
          photoFile={photoFile}
          photoError={photoError}
          onPhotoChange={setPhotoFile}
          onPhotoError={setPhotoError}
        />

        <VehicleBasicFields
          values={documentValues}
          onFieldChange={handleFieldChange}
          makes={makes}
          selectedMake={selectedMake}
          onMakeChange={handleMakeChange}
          isLoadingMakes={isLoadingMakes}
          models={models}
          selectedModel={selectedModel}
          onModelChange={handleModelChange}
          isLoadingModels={isLoadingModels}
          modelsError={modelsError}
        />
        <VehicleRegistrationFields values={documentValues} onFieldChange={handleFieldChange} />
        <VehicleTechnicalFields
          values={documentValues}
          onFieldChange={handleFieldChange}
        />
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
