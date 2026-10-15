"use client";

import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { ArrowLeft, Download, Gauge, MoreHorizontal, Pencil, Star, Trash2 } from "lucide-react";
import { Vehicle } from "@/features/garage/types/vehicle";


export default function VehicleHeading({
    vehicle,
}: {
    vehicle: Vehicle
}) {

    return (
        <>
            <Link href="/garrage" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-info">
                <ArrowLeft className="size-4" aria-hidden="true" /> Back to my garage
            </Link>
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-info">My garage / Vehicle details</p>

                    <h1 className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            {vehicle.make}
                        </span>
                        <span className="text-xl font-medium text-muted sm:text-2xl">
                            {vehicle.model}
                        </span>
                    </h1>              <p className="mt-2 text-sm text-muted">{[vehicle.manufacture_year, vehicle.trim, vehicle.nickname].filter((value) => value != null && value !== "").join(" \u00b7 ")}</p>
                </div>
                {/* Vehicle actions: static controls to extract into VehicleActions later. */}
                <div role="group" aria-label="Vehicle actions" className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        disabled
                        className="vehicle-edit-action"
                        title="Editing is not connected yet"
                    >
                        <Pencil className="size-4" aria-hidden="true" /> Edit vehicle
                    </button>
                    <button type="button" disabled className="vehicle-mileage-action" title="Mileage updates are not connected yet">
                        <Gauge className="size-4" aria-hidden="true" /> Update mileage
                    </button>
                    <DropdownMenu>
                        <DropdownMenuTrigger aria-label="More vehicle actions" className="button-base button-secondary border p-2.5">
                            <MoreHorizontal className="size-5" aria-hidden="true" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" sideOffset={8} className="w-60 rounded-xl p-2">
                            <DropdownMenuItem disabled className="gap-2 px-3 py-2.5">
                                <Star className="size-4" aria-hidden="true" /> Set as primary
                                <span className="ml-auto text-[10px]">Already primary</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem disabled className="gap-2 px-3 py-2.5">
                                <Download className="size-4" aria-hidden="true" /> Export history
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem disabled className="gap-2 px-3 py-2.5 text-destructive">
                                <Trash2 className="size-4" aria-hidden="true" /> Remove vehicle
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <p className="vehicle-preview-notice">
                Design preview — all vehicle details, reminders and activity below are sample data. Action buttons are previews and are not connected yet.
            </p>
        </>
    )
}