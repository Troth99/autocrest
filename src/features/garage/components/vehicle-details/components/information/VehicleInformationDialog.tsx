"use client";

import { useState, type ReactNode } from "react";
import { Dialog } from "@base-ui/react/dialog";
import { ChevronRight, X } from "lucide-react";
import Modal from "@/shared/components/Modal/Modal";

export default function VehicleInformationDialog({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Dialog.Trigger className="vehicle-detail-action min-h-10 cursor-pointer border-accent bg-accent/20 text-text-primary hover:bg-accent/30">
          Vehicle details <ChevronRight className="size-4" aria-hidden="true" />
        </Dialog.Trigger>
      }
      popupProps={{
        className: "modal-position w-[calc(100%-2rem)] max-h-[calc(100dvh-2rem)] max-w-4xl overflow-y-auto rounded-2xl border border-line bg-background p-5 text-text-primary shadow-2xl sm:p-6",
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <Dialog.Title className="text-xl font-semibold">Vehicle details</Dialog.Title>
        <Dialog.Close aria-label="Close vehicle details" className="cursor-pointer rounded-lg p-2 hover:bg-info-soft focus-visible:outline-2 focus-visible:outline-focus">
          <X className="size-5" aria-hidden="true" />
        </Dialog.Close>
      </div>
      <Dialog.Description className="sr-only">Technical specifications, registration information and personal notes for this vehicle.</Dialog.Description>
      <div className="space-y-5">{children}</div>
    </Modal>
  );
}
