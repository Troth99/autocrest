import VehicleCard from "@/features/garage/components/overview/VehicleCard";
import GarageOverview from "@/features/garage/components/overview/GarageOverview";
import { CarFront } from "lucide-react";
import { getVehicles } from "@/features/garage/services/vehicles.service";
import { getVehiclePhotoUrls } from "@/features/garage/services/vehicle-photo.service";
import { createClient } from "@/lib/supabase/server";
import AddVehicleButton from "@/features/garage/components/header/AddVehicleButton";
import Link from "next/link";

export default async function GaragePage({ query = "" }: { query?: string }) {
  const supabase = await createClient();
  const vehicles = await getVehicles(supabase);

  const photos = await getVehiclePhotoUrls(supabase, vehicles.map((vehicle) => vehicle.id));


  const matchingVehicles = vehicles.filter((vehicle) =>
    [vehicle.make, vehicle.model, vehicle.nickname, vehicle.plate].filter(Boolean).join(" ").toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );


  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-5 xl:mr-86">
        <div>
          <h1 className="text-3xl font-semibold tracking-[-0.045em] text-text-primary sm:text-4xl">
            My Garage
          </h1>
          <p className="mt-2 section-description sm:text-base">
            Your vehicles, organised.
          </p>
        </div>
        <AddVehicleButton />
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <section className="min-w-0" aria-labelledby="vehicles-heading">
          {query && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-line bg-input/45 px-4 py-3 text-sm">
              <p className="text-muted">{matchingVehicles.length} results for <span className="font-medium text-text-primary">“{query}”</span></p>
              <Link href="/garrage" className="font-semibold text-info hover:text-info-strong">Clear search</Link>
            </div>
          )}
          <div className="sr-only">
            <h2 id="vehicles-heading" className="sr-only">
              Your vehicles
            </h2>
            <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              {vehicles.length} {vehicles.length === 1 ? "vehicle" : "vehicles"}
            </span>
          </div>

          {photos.error && <p role="alert" className="mb-4 text-sm text-muted">{photos.error} Refresh to try again.</p>}

          {vehicles.length === 0 ? (
            <div className="panel-card px-6 py-14 text-center">
              <CarFront
                className="mx-auto size-12 text-info"
                aria-hidden="true"
              />
              <h3 className="mt-5 text-xl font-semibold text-text-primary">
                Your garage is empty
              </h3>
              <p className="mt-2 section-description">
                Add your first vehicle to keep its details and history together.
              </p>
              <div className="mt-6">
                <AddVehicleButton />
              </div>
            </div>
          ) : matchingVehicles.length === 0 ? (
            <div className="panel-card px-6 py-14 text-center">
              <h3 className="text-xl font-semibold text-text-primary">No matching vehicles</h3>
              <p className="mt-2 section-description">Try a different vehicle name or registration plate.</p>
              <Link href="/garrage" className="mt-5 inline-flex text-sm font-semibold text-info">Show all vehicles</Link>
            </div>
          ) : (
            <div className={matchingVehicles.length === 1
              ? "grid grid-cols-1 justify-items-center gap-5"
              : "grid gap-5 md:grid-cols-2"}>
              {matchingVehicles.map((vehicle) => (
                <div key={vehicle.id} className={matchingVehicles.length === 1 ? "@container w-full max-w-170" : "@container min-w-0"}>
                  <VehicleCard vehicle={vehicle} photoUrl={photos.urls[vehicle.id]} />
                </div>
              ))}
            </div>
          )}
        </section>
        <GarageOverview />
      </div>
    </main>
  );
}
