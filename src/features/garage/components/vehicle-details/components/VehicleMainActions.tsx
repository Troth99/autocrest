"use client"

import { FileCheck2, ReceiptText, Wrench } from "lucide-react";
import { useState } from "react";
import Modal from "@/shared/components/Modal/Modal";
import AddService from "./vehicle-records/AddServices";


//To implement functionalities
export default function VehicleMainActions() {
  const [isOpen, setIsOpen] = useState(false);

  const modalOpenHandler = () => {
    setIsOpen(true)
  }
  const modalCloseHandler = () => {
    setIsOpen(false)
  }
  return (
    <div
      role="group"
      aria-label="Add vehicle records"
      className="grid gap-3 sm:grid-cols-3"

    >
      <button
        type="button"
        className="button-base button-primary justify-center gap-2 px-3 py-3.5 text-sm disabled:cursor-not-allowed cursor-pointer"
        onClick={modalOpenHandler}
      >
        <Wrench className="size-5 shrink-0" aria-hidden="true" />
        Add service
      </button>
      
      <Modal title="Add service" isOpen={isOpen} onClose={modalCloseHandler}>
        <AddService onClose={modalCloseHandler} />
      </Modal>

      <button
        type="button"
        disabled
        title="Add expense is not connected yet"
        className="button-base button-secondary justify-center gap-2 border px-3 py-3.5 text-sm disabled:cursor-not-allowed"
      >
        <ReceiptText className="size-5 shrink-0" aria-hidden="true" />
        Add expense
      </button>

      <button
        type="button"
        disabled
        title="Add document is not connected yet"
        className="button-base button-secondary justify-center gap-2 border px-3 py-3.5 text-sm disabled:cursor-not-allowed"
      >
        <FileCheck2 className="size-5 shrink-0" aria-hidden="true" />
        Add document
      </button>
    </div>
  );
}
