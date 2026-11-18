"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Download, FileUp, LoaderCircle, Pencil, ReceiptText } from "lucide-react";
import { getVehicleById } from "@/features/garage/services/vehicles.service";
import { downloadVehicleReport } from "@/features/garage/components/vehicle-report/download-vehicle-report";

export default function VehicleQuickActions({ vehicleId }: { vehicleId: string }) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    if (isExporting) return;
    setIsExporting(true);
    setError(null);
    try {
      const vehicle = await getVehicleById(vehicleId);
      if (!vehicle) throw new Error("Vehicle not found.");
      await downloadVehicleReport(vehicle);
    } catch {
      setError("Could not download the report. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <section aria-labelledby="quick-actions-heading" className="section-card h-full min-w-0">
      <h2 id="quick-actions-heading" className="text-lg font-semibold">Quick actions</h2>
      <div className="mt-3 divide-y divide-line">
        <button type="button" disabled className="vehicle-quick-action">
          <FileUp className="size-4 shrink-0" aria-hidden="true" />
          Upload document <span className="ml-auto text-xs text-muted">Coming soon</span>
        </button>
        <button type="button" disabled className="vehicle-quick-action">
          <ReceiptText className="size-4 shrink-0" aria-hidden="true" />
          Add expense <span className="ml-auto text-xs text-muted">Coming soon</span>
        </button>
        <button type="button" onClick={handleDownload} disabled={isExporting} className="vehicle-quick-action" aria-busy={isExporting}>
          {isExporting ? <LoaderCircle className="size-4 shrink-0 animate-spin" aria-hidden="true" /> : <Download className="size-4 shrink-0" aria-hidden="true" />}
          {isExporting ? "Generating PDF..." : "Download vehicle report"}
          <ChevronRight className="ml-auto size-4 shrink-0" aria-hidden="true" />
        </button>
        <Link href={`/vehicles/${vehicleId}/edit-vehicle`} className="vehicle-quick-action">
          <Pencil className="size-4 shrink-0" aria-hidden="true" />
          Edit vehicle information <ChevronRight className="ml-auto size-4 shrink-0" aria-hidden="true" />
        </Link>
      </div>
      {error && <p role="alert" className="mt-3 text-sm text-destructive">{error}</p>}
    </section>
  );
}
