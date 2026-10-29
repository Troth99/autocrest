"use client";

import { ChevronDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function AddVehicleButton() {
  const router = useRouter();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="action-button cursor-pointer">
        <Plus className="size-4" aria-hidden="true" />
        Add vehicle
        <ChevronDown className="size-4" aria-hidden="true" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={8} className="w-64">
        <DropdownMenuItem
          onClick={() => router.push("/vehicles/add?type=car")}
          className="cursor-pointer px-4 py-2.5"
        >
          Car
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem disabled className="cursor-pointer px-4 py-2.5">
          Motorcycle
          <span className="ml-auto text-xs text-muted">Coming soon</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem disabled className="cursor-pointer px-4 py-2.5">
          ATV
          <span className="ml-auto text-xs text-muted">Coming soon</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem disabled className="cursor-pointer px-4 py-2.5">
          Van
          <span className="ml-auto text-xs text-muted">Coming soon</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem disabled className="cursor-pointer px-4 py-2.5">
          Truck
          <span className="ml-auto text-xs text-muted">Coming soon</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem disabled className="cursor-pointer px-4 py-2.5">
          Camper
          <span className="ml-auto text-xs text-muted">Coming soon</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem disabled className="cursor-pointer px-4 py-2.5">
          Trailer
          <span className="ml-auto text-xs text-muted">Coming soon</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem disabled className="cursor-pointer px-4 py-2.5">
          Other
          <span className="ml-auto text-xs text-muted">Coming soon</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
