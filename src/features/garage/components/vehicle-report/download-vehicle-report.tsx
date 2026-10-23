import type { Vehicle } from "@/features/garage/types/vehicle";

export async function downloadVehicleReport(vehicle: Vehicle): Promise<void> {
    // Load the PDF renderer only when the user requests a download.
    const { pdf } = await import("@react-pdf/renderer");
    const { default: VehicleReportPdf } = await import(
        "@/features/garage/components/vehicle-report/VehicleReportPdf"
    );

    const blob = await pdf(
        <VehicleReportPdf vehicle={vehicle} />,
    ).toBlob();

    // Create a temporary browser URL for the generated PDF.
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const filename = `${vehicle.make}-${vehicle.model}-report`
        .replace(/[^a-zA-Z0-9_-]+/g, "-");

    link.download = `${filename}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Allow the browser time to start downloading before releasing the URL.
    window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
