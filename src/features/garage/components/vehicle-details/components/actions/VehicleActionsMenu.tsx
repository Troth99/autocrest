"use client";

import { Download, LoaderCircle, MoreHorizontal, Star, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { getVehicleById, setPrimaryVehicle } from "@/features/garage/services/vehicles.service";
import { downloadVehicleReport } from "@/features/garage/components/vehicle-report/download-vehicle-report";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import DeleteVehicleDialog from "@/features/garage/components/vehicle-details/components/actions/DeleteVehicleDialog";

export default function VehicleActionsMenu({
  vehicleId,
  isPrimary,
}: {
  vehicleId: string
  isPrimary: boolean
}) {


  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  async function setPrimaryHandler() {
    if (isPrimary || isSaving) return;

    setIsSaving(true);


    try {
      await setPrimaryVehicle(createClient(), vehicleId);
      router.refresh();
    } catch {
    } finally {
      setIsSaving(false);
    }
  }

  const exportHandler = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportError(null);
    try {
      // Fetch the latest saved details with the existing ownership check.
      const vehicle = await getVehicleById(createClient(), vehicleId);
      if (!vehicle) throw new Error("Vehicle not found.");
      await downloadVehicleReport(vehicle);
    } catch {
      setExportError("Could not download the report. Please try again.");
    } finally {
      setIsExporting(false);
    }
  }

  function handleOpenDelete() {
    setIsDeleteOpen(true);
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          aria-label={isExporting ? "Generating PDF" : "More vehicle actions"}
          aria-busy={isExporting}
          className="button-base button-secondary border p-2.5 cursor-pointer"
        >
          {isExporting ? (
            <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />
          ) : (
            <MoreHorizontal className="size-5" aria-hidden="true" />
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8} className="w-60 rounded-xl p-2">

          <DropdownMenuItem
            disabled={isPrimary || isSaving}
            onClick={setPrimaryHandler}
            className=" cursor-pointer gap-2 px-3 py-2.5">
            <Star className="size-4" aria-hidden="true" />
            {isSaving ? "Saving..." : "Set as primary"}
            {isPrimary && (
              <span className="ml-auto text-[10px]">Already primary</span>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={exportHandler}
            disabled={isExporting}
            className="cursor-pointer gap-2 px-3 py-2.5"
          >
            <Download className="size-4" aria-hidden="true" /> {isExporting ? "Generating PDF..." : "Export history"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleOpenDelete}
            variant="destructive"
            className="cursor-pointer gap-2 px-3 py-2.5"
          >
            <Trash2 className="size-4" aria-hidden="true" /> Remove vehicle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isExporting && <p role="status" className="sr-only">Generating PDF...</p>}

      {exportError && <p role="alert" className="text-sm text-destructive">{exportError}</p>}

      <DeleteVehicleDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        vehicleId={vehicleId}
      />
    </>
  );
}
