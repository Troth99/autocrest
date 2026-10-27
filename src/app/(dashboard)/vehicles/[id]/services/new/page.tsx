import AddService from "@/features/garage/components/vehicle-details/components/add-service/AddServices";


export default async function NewServicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <AddService vehicleId={id} />
    )
}
