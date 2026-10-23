"use client";

import { Download, MoreHorizontal, Star, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { setPrimaryVehicle } from "@/features/garage/services/vehicles.service";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function VehicleActionsMenu({
  vehicleId,
  isPrimary,
}: {
  vehicleId: string
  isPrimary: boolean
}) {


  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  async function handleSetPrimary() {
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


  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="More vehicle actions"
        className="button-base button-secondary border p-2.5"
      >
        <MoreHorizontal className="size-5" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-60 rounded-xl p-2">

        <DropdownMenuItem
          disabled={isPrimary || isSaving}
          onClick={handleSetPrimary}
          className=" cursor-pointer gap-2 px-3 py-2.5">
          <Star className="size-4" aria-hidden="true" />
          {isSaving ? "Saving..." : "Set as primary"}
          {isPrimary && (
            <span className="ml-auto text-[10px]">Already primary</span>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem disabled className="gap-2 px-3 py-2.5">
          <Download className="size-4" aria-hidden="true" /> Export history
          <span className="ml-auto text-[10px]">Coming soon</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem disabled variant="destructive" className="gap-2 px-3 py-2.5">
          <Trash2 className="size-4" aria-hidden="true" /> Remove vehicle
          <span className="ml-auto text-[10px]">Coming soon</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
