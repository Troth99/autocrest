"use client";

import { Fragment, useState } from "react";
import { VehicleType } from "../types/vehicle";
import { ChevronDown, Plus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

const vehicleOptions: { value: VehicleType; label: string }[] = [
  { value: "car", label: "Car" },
  { value: "motorcycle", label: "Motorcycle" },
  { value: "atv", label: "ATV" },
  { value: "van", label: "Van" },
  { value: "truck", label: "Truck" },
  { value: "camper", label: "Camper" },
  { value: "trailer", label: "Trailer" },
  { value: "other", label: "Other" },
];

export default function AddVehicleButton() {
  // State to track the selected vehicle type
  const [selectedType, setSelectedType] = useState<VehicleType | null>(null);

  function handleSelect(type: VehicleType) {
    setSelectedType(type);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="action-button cursor-pointer">
        <Plus className="size-4" aria-hidden="true" />
        Add vehicle
        <ChevronDown className="size-4" aria-hidden="true" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" sideOffset={8} className="w-64">
        {vehicleOptions.map(({ value, label }, index) => (
          <Fragment key={value}>
            {index > 0 && <DropdownMenuSeparator className="my-1" />}
            <DropdownMenuItem
              disabled={value !== "car"}
              aria-selected={selectedType === value}
              onClick={() => handleSelect(value)}
              className="cursor-pointer px-4 py-2.5"
            >
              {label}
              {value !== "car" && (
                <span className="ml-auto text-xs text-muted">Coming soon</span>
              )}
            </DropdownMenuItem>
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
