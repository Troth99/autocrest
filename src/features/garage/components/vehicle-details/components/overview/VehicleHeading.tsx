import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CarFront, Fuel, Gauge, Plus, Settings2, Star } from "lucide-react";
import type { Vehicle } from "@/features/garage/types/vehicle";
import VehiclePlate from "./VehiclePlate";
import VehicleActionsMenu from "../actions/VehicleActionsMenu";
import VehiclePhotoUpload from "./VehiclePhotoUpload";
import UpdateMileage from "../mileage/UpdateMileage";
import { formatVehicleValue } from "@/features/garage/utils/formatVehicleValue";

type Props = {
  vehicle: Vehicle;
  photoUrl?: string | null;
  photoId?: string | null;
  vehicleInformation: ReactNode;
};

export default function VehicleHeading({
  vehicle,
  photoUrl,
  photoId,
  vehicleInformation,
}: Props) {
  const name = `${vehicle.make} ${vehicle.model}`;

  const subtitle = [
    vehicle.trim,
    vehicle.nickname
  ]
    .filter((val) => val !== null && val !== "")
    .join(" / ");

  return (
    <div className="grid items-stretch lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="w-full min-w-0 border-b border-line lg:border-r lg:border-b-0">
        <div className="vehicle-heading-photo">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={name}
              fill
              unoptimized
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <>
              <CarFront className="size-20 stroke-[1.25] text-info" aria-hidden="true" />
              <span className="text-xs text-muted">No photo added</span>
            </>
          )}
        </div>
        <div className="border-t border-line p-3">
          <VehiclePhotoUpload vehicleId={vehicle.id} hasPhoto={Boolean(photoUrl)} photoId={photoId} />
        </div>
      </div>
      <div className="flex min-w-0 flex-col justify-center p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="vehicle-heading-title">{name}</h1>
          {vehicle.isPrimary && (
            <span className="vehicle-heading-primary">
              <Star className="size-3.5" aria-hidden="true" /> Primary
            </span>
          )}
        </div>
        {subtitle && <p className="mt-2 text-base text-text-secondary">{subtitle}</p>}
        <dl className="mt-3 flex flex-wrap gap-y-3 text-sm text-text-secondary">
          <div className="flex items-center gap-2 pr-4">
            <dt><span className="sr-only">Year</span><CalendarDays className="size-4" aria-hidden="true" /></dt>
            <dd>{formatVehicleValue(vehicle.manufactureYear)}</dd>
          </div>
          <div className="flex items-center gap-2 border-l border-line px-4">
            <dt><span className="sr-only">Fuel</span><Fuel className="size-4" aria-hidden="true" /></dt>
            <dd className="capitalize">{formatVehicleValue(vehicle.fuelType?.replaceAll("_", " "))}</dd>
          </div>
          <div className="flex items-center gap-2 border-l border-line px-4">
            <dt><span className="sr-only">Transmission</span><Settings2 className="size-4" aria-hidden="true" /></dt>
            <dd className="capitalize">{formatVehicleValue(vehicle.transmission?.replaceAll("_", " "))}</dd>
          </div>
        </dl>
        {vehicle.plate && (
          <div className="mt-3">
            <VehiclePlate plate={vehicle.plate} countryCode={vehicle.registrationCountryCode} />
          </div>
        )}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-line py-4">
          <div>
            <p className="sr-only">Current mileage</p>
            <p className="flex items-center gap-2 text-lg font-semibold tabular-nums">
              <Gauge className="size-5 text-accent" aria-hidden="true" />
              {vehicle.mileageKm.toLocaleString("en-GB")} km
            </p>
            {vehicle.mileageAdjustment && (
              <p className="mt-1 text-sm text-text-secondary" title={vehicle.mileageAdjustment.reason}>
                {vehicle.mileageAdjustment.kind === "replacement" ? "Odometer replaced" : "Mileage corrected"}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <UpdateMileage
              vehicleId={vehicle.id}
              currentMileage={vehicle.mileageKm}
              currentRecordedAt={vehicle.mileageRecordedAt}
            />
            <Link
              href={`/vehicles/${vehicle.id}/maintenance/add-record`}
              className="button-base button-primary gap-1.5 rounded-md px-3 py-2 text-xs"
            >
              <Plus className="size-4" aria-hidden="true" />
              Add service
            </Link>
          </div>
        </div>
        <div className="vehicle-heading-actions mt-4" role="group" aria-label="Vehicle actions">
          {vehicleInformation}
          <VehicleActionsMenu vehicleId={vehicle.id} isPrimary={vehicle.isPrimary} />
        </div>
      </div>
    </div>
  );
}
