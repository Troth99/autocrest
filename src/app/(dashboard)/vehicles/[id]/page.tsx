import VehicleDetails from "@/features/garage/components/vehicle-details/Vehicle-details";


export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
    const { id: vehicleId } = await params;

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
            <VehicleDetails vehicleId={vehicleId} />
        </main>
    )
}

