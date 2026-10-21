import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CarFront, Pencil, Star } from "lucide-react";
import type { Vehicle } from "@/features/garage/types/vehicle";
import VehiclePlate from "./VehiclePlate";
import VehicleActionsMenu from "./VehicleActionsMenu";
import VehiclePhotoUpload from "./VehiclePhotoUpload";
import UpdateMileage from "./UpdateMileage";

type Props = {
  vehicle: Vehicle;
  photoUrl?: string | null;
  photoId?: string | null;
};

export default function VehicleHeading({ vehicle, photoUrl, photoId }: Props) {
  const name = `${vehicle.make} ${vehicle.model}`;

  const subtitle = [
    vehicle.manufacture_year,
    vehicle.trim,
    vehicle.nickname
  ]
    .filter((val) => val !== null && val !== "")
    .join(" . ");

  return (
    <div className="flex flex-wrap items-start gap-5">
      <div className="w-full shrink-0 space-y-3 sm:w-72 lg:w-80">
        <div className="vehicle-heading-photo">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={name}
              fill
              unoptimized
              sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 100vw"
              className="object-cover"
            />
          ) : (
            <>
              <CarFront className="size-20 stroke-[1.25] text-info" aria-hidden="true" />
              <span className="text-xs text-muted">No photo added</span>
            </>
          )}
        </div>
        <VehiclePhotoUpload vehicleId={vehicle.id} hasPhoto={Boolean(photoUrl)} photoId={photoId} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="vehicle-heading-eyebrow">My garage / Vehicle details</p>
        <h1 className="vehicle-heading-title">{name}</h1>
        <p className="mt-2 text-sm text-muted">{subtitle}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">

          {vehicle.plate && (
            <VehiclePlate
              plate={vehicle.plate}
              countryCode={vehicle.registration_country_code}
            />
          )}
          {vehicle.is_primary && (
            <span className="vehicle-heading-primary">
              <Star className="size-3.5" aria-hidden="true" /> Primary
            </span>
          )}
        </div>
      </div>
      <div className="vehicle-heading-actions" role="group" aria-label="Vehicle actions">
        <Link href="/garrage" className="vehicle-heading-back">
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to my garage
        </Link>
        <Link
          href={`/vehicles/${vehicle.id}/editVehicle`}
          className="vehicle-edit-action"
        >
          <Pencil className="size-4" aria-hidden="true" />
          <span>Edit Vehicle</span>
        </Link>
             <UpdateMileage
          vehicleId={vehicle.id}
          currentMileage={vehicle.mileage_km}
          currentRecordedAt={vehicle.mileage_recorded_at}
          />
        <VehicleActionsMenu isPrimary={vehicle.is_primary} />
      </div>
    </div>
  );
}
