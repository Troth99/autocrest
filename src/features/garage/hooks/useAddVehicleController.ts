"use client";

import type { FormEvent } from "react";
import useAddVehicleForm from "@/features/garage/hooks/useAddVehicleForm";
import useVehicleDocumentAutofill from "@/features/garage/hooks/useVehicleDocumentAutofill";
import type { VehicleDocumentDetails } from "@/features/garage/validators/vehicle-document.validator";

// Coordinate the existing scan, catalog and save hooks without putting handlers in JSX.
export default function useAddVehicleController() {
  const autofill = useVehicleDocumentAutofill();
  const submission = useAddVehicleForm(autofill);

  function handleFormChange(event: FormEvent<HTMLFormElement>) {
    const target = event.target;
    if (
      !(
        target instanceof HTMLInputElement ||
        target instanceof HTMLSelectElement ||
        target instanceof HTMLTextAreaElement
      )
    )
      return;
    const field =
      target.name === "custom_make"
        ? "make"
        : target.name === "custom_model"
          ? "model"
          : target.name;
    submission.setFieldErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
    submission.setSubmitError(null);
  }

  function handleDocumentExtracted(details: VehicleDocumentDetails) {
    autofill.handleDocumentExtracted(details);
    submission.setFieldErrors({});
    submission.setSubmitError(null);
  }

  function handleMakeChange(makeId: string) {
    autofill.handleMakeChange(makeId);
    submission.setFieldErrors((current) => ({
      ...current,
      make: undefined,
      model: undefined,
    }));
    submission.setSubmitError(null);
  }

  function handleModelChange(modelId: string) {
    autofill.handleModelChange(modelId);
    submission.setFieldErrors((current) => ({ ...current, model: undefined }));
    submission.setSubmitError(null);
  }

  return {
    ...autofill,
    ...submission,
    handleFormChange,
    handleDocumentExtracted,
    handleMakeChange,
    handleModelChange,
  };
}
