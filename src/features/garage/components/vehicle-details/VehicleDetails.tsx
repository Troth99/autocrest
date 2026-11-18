import VehicleInformationDialog from "./components/information/VehicleInformationDialog";
import VehicleTabs from "./components/overview/VehicleTabs";
import VehicleHeading from "./components/overview/VehicleHeading";
import VehicleSpecifications from "./components/information/VehicleSpecifications";
import VehicleRegistration from "./components/information/VehicleRegistration";
import VehicleActivity from "./components/history/VehicleActivity";
import VehicleReminders from "./components/reminders/VehicleReminders";
import VehicleNotes from "./components/information/VehicleNotes";
import type { Vehicle } from "@/features/garage/types/vehicle";
import type { VehicleServiceRecord } from "@/features/garage/types/vehicle-service-record";
import { ArrowLeft, ChevronRight, FileText, FileUp, Plus, ReceiptText } from "lucide-react";
import Link from "next/link";
import VehicleQuickActions from "./components/actions/VehicleQuickActions";

export default function VehicleDetails({
  vehicle,
  photoUrl,
  photoId,
  vehicleServices,
}: {
  vehicle: Vehicle;
  photoUrl?: string | null;
  photoId?: string | null;
  vehicleServices: VehicleServiceRecord[];
}) {
  return (
    <div className="space-y-4">
      <Link href="/garrage" className="inline-flex items-center gap-2 rounded text-sm font-medium text-text-secondary outline-offset-4 hover:text-accent focus-visible:outline-2 focus-visible:outline-focus">
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to My Garage
      </Link>
      <section
        aria-label="Vehicle overview"
        className="overflow-hidden rounded-xl border border-line bg-panel shadow-sm"
      >
        <VehicleHeading
          vehicle={vehicle}
          photoUrl={photoUrl}
          photoId={photoId}
          vehicleInformation={
            <VehicleInformationDialog>
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <VehicleSpecifications vehicle={vehicle} />
        <VehicleRegistration vehicle={vehicle} />
      </div>
      {vehicle.description?.trim() && <VehicleNotes description={vehicle.description} />}
            </VehicleInformationDialog>
          }
        />

      </section>
      <VehicleTabs
        overview={
          <>
      <VehicleReminders vehicleServices={vehicleServices} />
      <div className="grid gap-5 lg:grid-cols-2">
        <section aria-labelledby="vehicle-history-heading" className="section-card h-full min-w-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2 id="vehicle-history-heading" className="text-lg font-semibold">Service history</h2>
            <Link href={"/vehicles/" + vehicle.id + "/maintenance/add-record"} className="button-base button-primary gap-2 rounded-md px-3 py-2 text-sm">
              Add service record <ChevronRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <VehicleActivity vehicleServices={vehicleServices.slice(0, 2)} />
          {vehicleServices.length > 2 && (
            <details className="mt-3 border-t border-line pt-3">
              <summary className="cursor-pointer rounded text-sm font-medium text-accent outline-offset-4 focus-visible:outline-2 focus-visible:outline-focus">
                View all services ({vehicleServices.length})
              </summary>
              <VehicleActivity vehicleServices={vehicleServices.slice(2)} />
            </details>
          )}
        </section>
        <VehicleQuickActions vehicleId={vehicle.id} />
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <section aria-labelledby="vehicle-documents-heading" className="section-card min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="vehicle-documents-heading" className="text-lg font-semibold">Documents</h2>
            <button type="button" disabled className="vehicle-detail-action">
              <FileUp className="size-4" aria-hidden="true" /> Upload document
            </button>
          </div>
          <div className="flex items-start gap-3 border-b border-line py-6">
            <FileText className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">Vehicle documents, together.</p>
              <p className="mt-1 text-sm leading-6 text-text-secondary">A place for insurance, inspections and other vehicle documents is coming soon.</p>
            </div>
          </div>
          <p className="mt-3 text-xs font-medium text-text-secondary">Coming soon</p>
        </section>
        <section aria-labelledby="vehicle-expenses-heading" className="section-card min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="vehicle-expenses-heading" className="text-lg font-semibold">Expenses</h2>
            <button type="button" disabled className="vehicle-detail-action">
              <Plus className="size-4" aria-hidden="true" /> Add expense
            </button>
          </div>
          <div className="flex items-start gap-3 border-b border-line py-6">
            <ReceiptText className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
            <div>
              <p className="text-sm font-medium">A clearer view of vehicle costs.</p>
              <p className="mt-1 text-sm leading-6 text-text-secondary">Expense tracking is coming soon. Parts and labour costs can already be saved in service records.</p>
            </div>
          </div>
          <p className="mt-3 text-xs font-medium text-text-secondary">Coming soon</p>
        </section>
      </div>

          </>
        }
        serviceHistory={
          <section aria-labelledby="full-service-history-heading" className="section-card">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <h2 id="full-service-history-heading" className="text-lg font-semibold">Service history ({vehicleServices.length})</h2>
              <Link href={"/vehicles/" + vehicle.id + "/maintenance/add-record"} className="button-base button-primary gap-2 px-3 py-2 text-xs">
                Add service record
              </Link>
            </div>
            <VehicleActivity vehicleServices={vehicleServices} />
          </section>
        }
      />
    </div>
  );
}
