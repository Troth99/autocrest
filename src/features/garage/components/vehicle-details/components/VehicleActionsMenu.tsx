"use client";

import { Download, MoreHorizontal, Star, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

export default function VehicleActionsMenu({ isPrimary }: { isPrimary: boolean }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="More vehicle actions"
        className="button-base button-secondary border p-2.5"
      >
        <MoreHorizontal className="size-5" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-60 rounded-xl p-2">
        <DropdownMenuItem disabled className="gap-2 px-3 py-2.5">
          <Star className="size-4" aria-hidden="true" /> Set as primary
          <span className="ml-auto text-[10px]">{isPrimary ? "Already primary" : "Coming soon"}</span>
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
