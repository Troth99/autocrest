"use client"

import { FileCheck2, ReceiptText, Wrench } from "lucide-react";
import Link from "next/link";


type Props = {
  vehicleId: string;
};

export default function VehicleMainActions({ vehicleId  }: Props) {

  return (
    <div
      role="group"
      aria-label="Add vehicle records"
      className="grid gap-3 sm:grid-cols-3"

    >

      <Link
        href={`/vehicles/${vehicleId}/services/new`}
        className="button-base button-primary justify-center gap-2 px-3 py-3.5 text-sm"
      >
        <Wrench className="size-5 shrink-0" aria-hidden="true" />
        Add service
      </Link>



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
